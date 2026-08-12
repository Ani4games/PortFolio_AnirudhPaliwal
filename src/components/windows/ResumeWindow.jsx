import React from 'react';

export default function ResumeWindow() {
  return (
    <div className="resume-body">
      <i className="bx bxs-file-pdf resume-icon"></i>
      <h3>Anirudh Paliwal — Resume</h3>
      <p>B.Tech CSE @ IIIT Surat · Front-End &amp; Game Development · AI/ML</p>
      <a href="/resume.pdf" download className="resume-download-btn">
        <i className="bx bx-download"></i> Download Resume
      </a>
    </div>
  );
}
