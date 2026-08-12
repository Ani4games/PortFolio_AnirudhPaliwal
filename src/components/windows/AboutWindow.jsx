import React from 'react';

export default function AboutWindow() {
  return (
    <div className="about-body">
      <div className="about-photo">AP</div>
      <div className="about-text">
        <h3>Hello! I'm Anirudh</h3>
        <p>I'm a Computer Science student passionate about Front-End Web Development, Artificial Intelligence &amp; Machine Learning, and Video Game Development. I love bringing ideas to life through code and design.</p>
        <p>My journey in technology has led me to work with various cutting-edge technologies and frameworks, always staying updated with the latest trends across game development, web development, and applied ML.</p>
        <div className="skills">
          <span className="skill-tag">Unity</span>
          <span className="skill-tag">C#</span>
          <span className="skill-tag">Python</span>
          <span className="skill-tag">JavaScript</span>
          <span className="skill-tag">HTML/CSS</span>
          <span className="skill-tag">React</span>
          <span className="skill-tag">UI/UX</span>
        </div>
        <ul className="achievements-list">
          <li><i className="bx bx-trophy"></i> Represented Dadra and Nagar Haveli in the National School Badminton Tournament (Andhra Pradesh, 2016)</li>
          <li><i className="bx bx-medal"></i> Top 3, Edu-Heal National Biotechnology Olympiad, 2013 (100,000+ participants)</li>
        </ul>
      </div>
    </div>
  );
}
