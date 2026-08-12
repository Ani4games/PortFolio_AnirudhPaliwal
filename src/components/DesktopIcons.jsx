import React from 'react';
import { WINDOWS } from '../data/windows.js';
import { useWindowManager } from '../context/WindowManagerContext.jsx';

export default function DesktopIcons() {
  const { openWindow } = useWindowManager();

  return (
    <div className="desktop-icons">
      {WINDOWS.map((w) => (
        <button key={w.id} className="desktop-icon" onClick={() => openWindow(w.id)}>
          <span className={`icon-glyph ${w.glyphClass}`}>
            <i className={`bx ${w.icon}`}></i>
          </span>
          <span className="icon-label">{w.title}</span>
        </button>
      ))}
    </div>
  );
}
