import React, { useRef } from 'react';
import { useWindowManager } from '../context/WindowManagerContext.jsx';
import { useDraggable } from '../hooks/useDraggable.js';
import { useResizable } from '../hooks/useResizable.js';

export default function Window({ meta }) {
  const {
    windows, topId, closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow, resizeWindow,
  } = useWindowManager();

  const win = windows[meta.id];
  const nodeRef = useRef(null);
  const titlebarRef = useRef(null);
  const resizeHandleRef = useRef(null);

  const focus = () => focusWindow(meta.id);

  useDraggable({
    nodeRef,
    handleRef: titlebarRef,
    enabled: !!win && !win.maximized,
    onFocus: focus,
    onCommit: (x, y) => moveWindow(meta.id, x, y),
  });

  useResizable({
    nodeRef,
    handleRef: resizeHandleRef,
    enabled: !!win && !win.maximized,
    onFocus: focus,
    onCommit: (width, height) => resizeWindow(meta.id, width, height),
  });

  if (!win) return null;

  const isActive = meta.id === topId;
  const Content = meta.component;

  const style = win.maximized
    ? { zIndex: win.zIndex }
    : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex };

  const className = [
    'os-window',
    win.maximized ? 'maximized' : '',
    win.minimized ? 'minimized' : '',
    !isActive ? 'inactive' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={nodeRef} className={className} style={style} onMouseDown={focus}>
      <div className="win-titlebar" ref={titlebarRef} onDoubleClick={() => toggleMaximize(meta.id)}>
        <div className="win-title">
          <i className={`bx ${meta.icon}`}></i>
          <span>{meta.title}</span>
        </div>
        <div className="win-controls">
          <button className="win-min" aria-label="Minimize" onClick={() => minimizeWindow(meta.id)}>
            <i className="bx bx-minus"></i>
          </button>
          <button className="win-max" aria-label="Maximize" onClick={() => toggleMaximize(meta.id)}>
            <i className={win.maximized ? 'bx bx-copy-alt' : 'bx bx-square'}></i>
          </button>
          <button className="win-close" aria-label="Close" onClick={() => closeWindow(meta.id)}>
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>
      <div className="win-body">
        <Content />
      </div>
      {!win.maximized && <div className="win-resize-handle" ref={resizeHandleRef}></div>}
    </div>
  );
}
