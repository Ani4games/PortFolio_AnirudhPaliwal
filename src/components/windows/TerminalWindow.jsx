import React, { useEffect, useRef, useState } from 'react';

const COMMANDS = {
  help: () => 'Available commands: help, about, skills, projects, contact, whoami, date, clear',
  about: () => "Anirudh Paliwal — Game Developer & Frontend Web Developer. Passionate about building immersive digital experiences.",
  skills: () => 'Unity, C#, Game Design, JavaScript, HTML/CSS, React, UI/UX',
  projects: () => 'Space Dodger Game, Portfolio Dashboard, Memory Master — open the Projects window for details.',
  contact: () => 'Email: anibro16@gmail.com | anipalgames016@gmail.com',
  whoami: () => 'guest@anirudh-os',
  date: () => new Date().toString(),
  sudo: () => "Nice try. This terminal doesn't need root — everything here is already open.",
};

export default function TerminalWindow() {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState('');
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }

    const echo = { text: `anirudh@portfolio:~$ ${trimmed}`, className: 'term-cmd-echo' };
    const handler = COMMANDS[trimmed.toLowerCase()];
    const response = handler
      ? { text: handler() }
      : { text: `Command not found: ${trimmed}. Type "help" for a list of commands.`, className: 'term-error' };

    setLines((prev) => [...prev, echo, response]);
  }

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    runCommand(value);
    setValue('');
  }

  return (
    <div className="terminal-body" onMouseDown={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef}>
        <p>AnirudhOS Terminal — type <span className="term-hl">help</span> to see available commands.</p>
        {lines.map((l, i) => (
          <p key={i} className={l.className}>{l.text}</p>
        ))}
      </div>
      <div className="terminal-input-line">
        <span className="term-prompt">anirudh@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
