import React, { useCallback, useEffect, useState } from 'react';
import { WindowManagerProvider } from '../context/WindowManagerContext.jsx';
import DesktopIcons from './DesktopIcons.jsx';
import WindowsLayer from './WindowsLayer.jsx';
import StartMenu from './StartMenu.jsx';
import Taskbar from './Taskbar.jsx';

export default function Desktop({ onShutdown }) {
  const [startOpen, setStartOpen] = useState(false);
  const closeStart = useCallback(() => setStartOpen(false), []);

  useEffect(() => {
    if (!startOpen) return undefined;
    function handleClick(e) {
      if (e.target.closest('#start-menu') || e.target.closest('#start-btn')) return;
      setStartOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [startOpen]);

  return (
    <WindowManagerProvider>
      <div id="desktop">
        <div className="wallpaper">
          <svg className="wallpaper-ribbon" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 700 C 300 500, 500 850, 900 600 S 1500 350, 1750 500 L 1750 950 L -100 950 Z" fill="url(#ribbonA)" />
            <path d="M-100 780 C 350 600, 600 900, 1000 680 S 1500 480, 1750 620 L 1750 950 L -100 950 Z" fill="url(#ribbonB)" />
            <defs>
              <linearGradient id="ribbonA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1c4f8c" />
                <stop offset="100%" stopColor="#0b2a4d" />
              </linearGradient>
              <linearGradient id="ribbonB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3a7fc4" />
                <stop offset="100%" stopColor="#164b7d" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <DesktopIcons />
        <WindowsLayer />

        {startOpen && (
          <StartMenu
            onNavigate={closeStart}
            onShutdown={() => {
              closeStart();
              onShutdown();
            }}
          />
        )}

        <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen((v) => !v)} />
      </div>
    </WindowManagerProvider>
  );
}
