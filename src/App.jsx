import React, { useCallback, useState } from 'react';
import BootScreen from './components/BootScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import Desktop from './components/Desktop.jsx';
import ShutdownScreen from './components/ShutdownScreen.jsx';

export default function App() {
  const [phase, setPhase] = useState('boot'); // boot -> login -> desktop -> shutdown -> login

  const goToDesktop = useCallback(() => setPhase('desktop'), []);

  const shutdown = useCallback(() => {
    setPhase('shutdown');
    setTimeout(() => setPhase('login'), 1800);
  }, []);

  return (
    <>
      {phase === 'boot' && <BootScreen onFinish={() => setPhase('login')} />}
      {phase === 'login' && <LoginScreen onLogin={goToDesktop} />}
      {phase === 'desktop' && <Desktop onShutdown={shutdown} />}
      {phase === 'shutdown' && <ShutdownScreen />}
    </>
  );
}
