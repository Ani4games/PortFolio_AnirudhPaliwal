import React from 'react';
import { useWindowManager } from '../context/WindowManagerContext.jsx';
import { getWindowMeta } from '../data/windows.js';
import { useClock } from '../hooks/useClock.js';

export default function Taskbar({ onToggleStart }) {
  const { openIds, windows, topId, toggleMinimize, showDesktop } = useWindowManager();
  const clock = useClock();

  return (
    <div id="taskbar">
      <button id="start-btn" aria-label="Start" onClick={onToggleStart}>
        <span className="start-orb"></span>
      </button>

      <div id="taskbar-apps">
        {openIds.map((id) => {
          const meta = getWindowMeta(id);
          const win = windows[id];
          if (!meta || !win) return null;
          const isActive = id === topId && !win.minimized;
          return (
            <button
              key={id}
              className={`taskbar-app-btn${isActive ? ' active' : ''}`}
              onClick={() => toggleMinimize(id)}
            >
              <i className={`bx ${meta.icon}`}></i>
              <span>{meta.title}</span>
            </button>
          );
        })}
      </div>

      <div id="system-tray">
        <i className="bx bx-volume-full"></i>
        <i className="bx bx-wifi"></i>
        <div id="clock">
          <span id="clock-time">{clock.time}</span>
          <span id="clock-date">{clock.date}</span>
        </div>
        <div id="show-desktop" role="button" aria-label="Show desktop" onClick={showDesktop}></div>
      </div>
    </div>
  );
}
