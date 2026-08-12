import React from 'react';
import { useWindowManager } from '../context/WindowManagerContext.jsx';
import { getWindowMeta } from '../data/windows.js';
import Window from './Window.jsx';

export default function WindowsLayer() {
  const { openIds } = useWindowManager();

  return (
    <div id="windows-container">
      {openIds.map((id) => {
        const meta = getWindowMeta(id);
        if (!meta) return null;
        return <Window key={id} meta={meta} />;
      })}
    </div>
  );
}
