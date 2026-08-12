import { useEffect, useRef } from 'react';

/** Same direct-DOM-then-commit pattern as useDraggable, for the bottom-right resize handle. */
export function useResizable({ nodeRef, handleRef, enabled, onFocus, onCommit, minWidth = 320, minHeight = 220 }) {
  const resizeRef = useRef(null);

  useEffect(() => {
    const handleEl = handleRef.current;
    const node = nodeRef.current;
    if (!handleEl || !node) return undefined;

    function onPointerDown(e) {
      if (!enabled) return;
      onFocus?.();
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: node.offsetWidth,
        startHeight: node.offsetHeight,
      };
      e.preventDefault();
      e.stopPropagation();
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
      if (!resizeRef.current) return;
      const dw = e.clientX - resizeRef.current.startX;
      const dh = e.clientY - resizeRef.current.startY;
      const width = Math.max(minWidth, resizeRef.current.startWidth + dw);
      const height = Math.max(minHeight, resizeRef.current.startHeight + dh);
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      resizeRef.current.lastWidth = width;
      resizeRef.current.lastHeight = height;
    }

    function onPointerUp() {
      if (resizeRef.current) {
        const { lastWidth, lastHeight, startWidth, startHeight } = resizeRef.current;
        onCommit(lastWidth ?? startWidth, lastHeight ?? startHeight);
      }
      resizeRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }

    handleEl.addEventListener('pointerdown', onPointerDown);
    return () => {
      handleEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [enabled, onFocus, onCommit, nodeRef, handleRef, minWidth, minHeight]);
}
