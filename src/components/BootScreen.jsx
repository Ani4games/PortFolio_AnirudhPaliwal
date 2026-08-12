import React, { useEffect } from 'react';

export default function BootScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="boot-screen">
      <div className="boot-orb">
        <span></span><span></span><span></span><span></span>
      </div>
      <p className="boot-title">Anirudh<span>OS</span></p>
      <p className="boot-subtitle">Starting up…</p>
    </div>
  );
}
