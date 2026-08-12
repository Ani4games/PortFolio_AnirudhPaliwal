import AboutWindow from '../components/windows/AboutWindow.jsx';
import ProjectsWindow from '../components/windows/ProjectsWindow.jsx';
import SkillsWindow from '../components/windows/SkillsWindow.jsx';
import ExperienceWindow from '../components/windows/ExperienceWindow.jsx';
import EducationWindow from '../components/windows/EducationWindow.jsx';
import ResumeWindow from '../components/windows/ResumeWindow.jsx';
import ContactWindow from '../components/windows/ContactWindow.jsx';
import TerminalWindow from '../components/windows/TerminalWindow.jsx';
import RecycleBinWindow from '../components/windows/RecycleBinWindow.jsx';

// Single source of truth for every window: desktop icons, the Start menu,
// and the window manager all read from this list.
export const WINDOWS = [
  { id: 'about', title: 'About Me', icon: 'bx-user', glyphClass: 'about-glyph', component: AboutWindow, w: 620, h: 360 },
  { id: 'projects', title: 'Projects', icon: 'bx-folder', glyphClass: 'projects-glyph', component: ProjectsWindow, w: 720, h: 560 },
  { id: 'skills', title: 'Skills', icon: 'bx-wrench', glyphClass: 'skills-glyph', component: SkillsWindow, w: 480, h: 420 },
  { id: 'experience', title: 'Experience', icon: 'bx-briefcase', glyphClass: 'experience-glyph', component: ExperienceWindow, w: 540, h: 380 },
  { id: 'education', title: 'Education', icon: 'bx-book-open', glyphClass: 'education-glyph', component: EducationWindow, w: 540, h: 380 },
  { id: 'resume', title: 'Resume', icon: 'bx-file', glyphClass: 'resume-glyph', component: ResumeWindow, w: 440, h: 340 },
  { id: 'contact', title: 'Contact', icon: 'bx-envelope', glyphClass: 'contact-glyph', component: ContactWindow, w: 640, h: 420 },
  { id: 'terminal', title: 'Terminal', icon: 'bx-terminal', glyphClass: 'terminal-glyph', component: TerminalWindow, w: 560, h: 380 },
  { id: 'recyclebin', title: 'Recycle Bin', icon: 'bx-trash', glyphClass: 'bin-glyph', component: RecycleBinWindow, w: 380, h: 260 },
];

export function getWindowMeta(id) {
  return WINDOWS.find((w) => w.id === id);
}
