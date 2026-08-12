import React from 'react';
import { WINDOWS } from '../data/windows.js';
import { useWindowManager } from '../context/WindowManagerContext.jsx';

export default function StartMenu({ onNavigate, onShutdown }) {
  const { openWindow } = useWindowManager();

  function handleOpen(id) {
    openWindow(id);
    onNavigate?.();
  }

  return (
    <div id="start-menu">
      <div className="start-menu-left">
        <p className="start-section-label">Pinned</p>
        {WINDOWS.map((w) => (
          <button key={w.id} className="start-item" onClick={() => handleOpen(w.id)}>
            <i className={`bx ${w.icon}`}></i><span>{w.title}</span>
          </button>
        ))}
      </div>
      <div className="start-menu-right">
        <div className="start-user">
          <div className="start-user-tile">AP</div>
          <span>Anirudh Paliwal</span>
        </div>
        <a href="https://github.com/Ani4games" target="_blank" rel="noreferrer" className="start-link">
          <i className="bx bxl-github"></i> GitHub
        </a>
        <a href="mailto:anibro16@gmail.com" className="start-link">
          <i className="bx bx-envelope"></i> Email
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="start-link">
          <i className="bx bxl-linkedin"></i> LinkedIn
        </a>
        <button id="shutdown-btn" className="start-shutdown" onClick={onShutdown}>
          <i className="bx bx-power-off"></i> Shut down
        </button>
      </div>
    </div>
  );
}
