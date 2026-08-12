import React, { useEffect } from 'react';

export default function LoginScreen({ onLogin }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Enter') onLogin();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onLogin]);

  return (
    <div id="login-screen">
      <div className="login-glow"></div>
      <div className="login-box">
        <div className="user-tile">AP</div>
        <p className="user-name">Anirudh Paliwal</p>
        <button id="login-btn" className="login-arrow" aria-label="Log in" onClick={onLogin}>
          <i className="bx bx-chevron-right"></i>
        </button>
        <p className="login-hint">Click the arrow or press Enter to log in</p>
      </div>
      <p className="login-footer">Game Developer &amp; Frontend Web Developer</p>
    </div>
  );
}
