import React, { useState } from 'react';

export default function ContactWindow() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="contact-body">
      <div className="contact-info">
        <h3>Let's Connect!</h3>
        <p>I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and games.</p>
        <div className="contact-item">
          <i className="bx bx-phone"></i>
          <div><p>+91 7284068878</p><p>+91 7041002373</p></div>
        </div>
        <div className="contact-item">
          <i className="bx bx-envelope"></i>
          <div><p>anibro16@gmail.com</p><p>anipalgames016@gmail.com</p></div>
        </div>
        <div className="social-icons">
          <a href="https://github.com/Ani4games" className="social-icon" target="_blank" rel="noreferrer"><i className="bx bxl-github"></i></a>
          <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noreferrer"><i className="bx bxl-linkedin"></i></a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noreferrer"><i className="bx bxl-twitter"></i></a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer"><i className="bx bxl-instagram"></i></a>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send a Message</h3>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">{submitted ? 'Thanks — message noted!' : 'Send Message'}</button>
      </form>
    </div>
  );
}
