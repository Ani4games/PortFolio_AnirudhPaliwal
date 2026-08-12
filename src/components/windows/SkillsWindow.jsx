import React from 'react';

const GROUPS = [
  { icon: 'bxs-joystick', label: 'Game Development', skills: ['Unity', 'C#', 'Game Design'] },
  { icon: 'bx-code-alt', label: 'Web Development', skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Bootstrap', 'Jinja2'] },
  { icon: 'bx-bot', label: 'AI & Machine Learning', skills: ['Python', 'RAG', 'SLM Training', 'NLP', 'TF-IDF'] },
  { icon: 'bx-data', label: 'Programming & Data', skills: ['C++', 'SQL', 'Scikit-learn'] },
  { icon: 'bx-wrench', label: 'Tools & Platforms', skills: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Anaplan', 'Excel'] },
];

export default function SkillsWindow() {
  return (
    <div className="skills-body">
      {GROUPS.map((g) => (
        <div className="skill-group" key={g.label}>
          <h4><i className={`bx ${g.icon}`}></i> {g.label}</h4>
          <div className="skills">
            {g.skills.map((s) => <span className="skill-tag" key={s}>{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}
