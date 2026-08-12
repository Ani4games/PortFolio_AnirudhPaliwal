import React from 'react';

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Indian Institute of Information Technology, Surat',
    period: '2020 – 2026',
    description: 'CGPA: 7.26',
  },
  {
    degree: 'CBSE, 10th–12th',
    institution: 'Senior Secondary School, Kota',
    period: '2017 – 2019',
    description: 'CGPA: 8.3',
  },
];

export default function EducationWindow() {
  return (
    <div className="timeline-body">
      {EDUCATION.map((item, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h4>{item.degree}</h4>
            <p className="timeline-meta">{item.institution} &middot; {item.period}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
