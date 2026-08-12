import { useEffect, useRef } from 'react';

/**
 * Wires pointer-drag behaviour onto a title bar.
 *
 * During the drag we mutate the DOM node's style directly (via ref) instead
 * of dispatching on every pointermove — dispatching to the reducer on every
 * pixel would re-render the whole window tree and feel laggy. We only commit
 * the final position back into state (onCommit) once the pointer is released.
 */
export function useDraggable({ nodeRef, handleRef, enabled, onFocus, onCommit }) {
  const dragRef = useRef(null);

  useEffect(() => {
    const handleEl = handleRef.current;
    const node = nodeRef.current;
    if (!handleEl || !node) return undefined;

    function onPointerDown(e) {
      if (!enabled) return;
      if (e.target.closest('.win-controls')) return;
      onFocus?.();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: node.offsetLeft,
        startTop: node.offsetTop,
      };
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const left = Math.max(0, dragRef.current.startLeft + dx);
      const top = Math.max(0, dragRef.current.startTop + dy);
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
      dragRef.current.lastLeft = left;
      dragRef.current.lastTop = top;
    }

    function onPointerUp() {
      if (dragRef.current) {
        const { lastLeft, lastTop, startLeft, startTop } = dragRef.current;
        onCommit(lastLeft ?? startLeft, lastTop ?? startTop);
      }
      dragRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }

    handleEl.addEventListener('pointerdown', onPointerDown);
    return () => {
      handleEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [enabled, onFocus, onCommit, nodeRef, handleRef]);
}
