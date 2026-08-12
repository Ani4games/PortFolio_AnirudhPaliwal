import React from 'react';

const CATEGORIES = [
  {
    label: 'Game Development',
    icon: 'bxs-joystick',
    projects: [
      {
        icon: 'bxs-joystick',
        title: 'Space Dodger Game',
        description: 'An immersive 2D adventure game with custom mechanics and engaging AI.',
        tech: ['JavaScript', 'HTML5', '2D Graphics'],
        links: [
          { label: 'Demo', href: '#' },
          { label: 'Code', href: 'https://github.com/Ani4games/Space-Dodger' },
        ],
      },
      {
        icon: 'bx-brain',
        title: 'Memory Master',
        description: 'A challenging memory game with innovative mechanics and beautiful visuals.',
        tech: ['JavaScript', 'Mobile', 'Game Design'],
        links: [
          { label: 'GitHub', href: 'https://github.com/Ani4games/Memory-Game' },
          { label: 'Trailer', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'AI & Machine Learning',
    icon: 'bx-bot',
    projects: [
      {
        icon: 'bx-id-card',
        title: 'Web Profile Generator',
        description: 'Built for IIT Bombay: an employee web profile system pulling HR records and slot-booking info from two databases, plus a QA bot and a profile summary generator using TF-IDF, logistic regression, and cosine similarity. Deployed on the IIT Bombay CEN server.',
        tech: ['Python', 'Jinja', 'HTML', 'CSS', 'JavaScript'],
        links: [
          { label: 'Code', href: '#' },
        ],
      },
      {
        icon: 'bx-chat',
        title: 'E-Commerce Website with AI ChatBot',
        description: 'An ML-powered chatbot for an e-commerce site using FastAPI and React, with NLP for intent detection, entity extraction, and FAQ retrieval. Context-aware responses improved conversational accuracy by 40% (accuracy, ROC, F1-score).',
        tech: ['React', 'Python', 'FastAPI', 'NLP'],
        links: [
          { label: 'Code', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Web Development',
    icon: 'bx-globe',
    projects: [
      {
        icon: 'bx-window-alt',
        title: 'Portfolio Website',
        description: 'This site — showcasing my interests across Front-End Web Development, AI/ML, and Video Game Development. Version-controlled with Git, deployed on Vercel.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: [
          { label: 'Live Site', href: 'http://port-folio-anirudh-paliwal.vercel.app/' },
          { label: 'GitHub', href: 'https://github.com/Ani4games/PortFolio_AnirudhPaliwal' },
        ],
      },
      {
        icon: 'bx-plus-medical',
        title: 'Health Care Website',
        description: 'Built with a 5-member team: an interactive front-end for a healthcare web portal, including a video-call registration feature and improved form validation for usability and responsiveness.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: [
          { label: 'Code', href: '#' },
        ],
      },
    ],
  },
];

export default function ProjectsWindow() {
  return (
    <div className="explorer-body">
      <div className="explorer-path"><i className="bx bx-folder-open"></i> Projects</div>
      {CATEGORIES.map((cat) => (
        <div className="project-category" key={cat.label}>
          <h4 className="project-category-title"><i className={`bx ${cat.icon}`}></i> {cat.label}</h4>
          <div className="projects-grid">
            {cat.projects.map((p) => (
              <div className="project-card" key={p.title}>
                <div className="project-image"><i className={`bx ${p.icon}`}></i></div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-description">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="project-link" target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
