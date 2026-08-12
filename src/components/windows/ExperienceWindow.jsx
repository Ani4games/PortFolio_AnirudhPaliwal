import React from 'react';

const EXPERIENCE = [
  {
    role: 'AI Research Intern',
    org: 'IIT Bombay, Mumbai',
    period: 'Feb 2, 2026 – Jul 10, 2026',
    bullets: [
      'Built a Web Profile Generator using two different databases, rendered with Jinja templates.',
      'Gained hands-on exposure to SLM training and model optimization.',
    ],
  },
  {
    role: 'Anaplan Data Analyst Intern',
    org: 'Veear Analytics, Jaipur',
    period: 'Feb 16, 2024 – Jul 14, 2024',
    bullets: [
      'Collaborated with senior analysts to translate business requirements into Anaplan modules, reducing reporting time by 30%.',
      'Gained hands-on exposure to enterprise planning workflows and model optimization.',
    ],
  },
];

export default function ExperienceWindow() {
  return (
    <div className="timeline-body">
      {EXPERIENCE.map((item, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h4>{item.role}</h4>
            <p className="timeline-meta">{item.org} &middot; {item.period}</p>
            <ul className="timeline-bullets">
              {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
