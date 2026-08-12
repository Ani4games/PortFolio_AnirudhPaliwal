# Anirudh Paliwal — Portfolio OS (React)

A Windows 7–styled desktop OS portfolio, rebuilt in React + Vite. Boots into a
login screen, then a desktop with draggable/resizable windows, a taskbar, and
a Start menu.

## Setup

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build       # production build -> dist/
npm run preview     # preview the production build locally
```

Deploy the contents of `dist/` anywhere that serves static files (Vercel,
Netlify, GitHub Pages, etc.) — same as the plain HTML/CSS/JS version.

## Project structure

```
src/
  App.jsx                     boot -> login -> desktop -> shutdown state machine
  main.jsx                    React entry point, imports global.css
  components/
    BootScreen / LoginScreen / ShutdownScreen.jsx
    Desktop.jsx                wallpaper, wraps everything in WindowManagerProvider
    DesktopIcons.jsx           icon grid, reads from data/windows.js
    StartMenu.jsx / Taskbar.jsx
    Window.jsx                 generic window shell: titlebar, drag, resize, controls
    WindowsLayer.jsx           renders one <Window> per open window
    windows/                   the actual content of each window
      AboutWindow.jsx
      ProjectsWindow.jsx
      SkillsWindow.jsx
      ExperienceWindow.jsx    <- sample data, edit this
      EducationWindow.jsx     <- sample data, edit this
      ResumeWindow.jsx        <- expects public/resume.pdf
      ContactWindow.jsx
      TerminalWindow.jsx       interactive fake CLI (help/about/skills/projects/contact/whoami/date/clear)
      RecycleBinWindow.jsx
  context/
    WindowManagerContext.jsx   the window manager: a useReducer holding every
                                open window's position/size/z-index/min/max state
  hooks/
    useDraggable.js             pointer-drag on the titlebar
    useResizable.js             pointer-drag on the resize handle
    useClock.js                 taskbar clock, updates every 15s
  data/
    windows.js                  single registry: id, title, icon, glyph color,
                                 default size, and which component to render —
                                 desktop icons, Start menu, and the window
                                 manager all read from this one list
  styles/
    global.css                  same Aero-styled stylesheet as the HTML/CSS/JS
                                 version, unchanged — it's already class-based
public/
  resume.pdf                    add yours here — the Resume window links to it
```

## Two things to personalize

1. **`src/components/windows/ExperienceWindow.jsx`** and
   **`EducationWindow.jsx`** — each has one placeholder entry (marked with a
   yellow banner in the app) in an `EXPERIENCE` / `EDUCATION` array at the top
   of the file. Edit the array; the JSX below it renders whatever's there.
2. **`public/resume.pdf`** — the Resume window's download button points at
   `/resume.pdf`, which 404s until you add the file.

## Design notes (why it's built this way)

- **One reducer, not scattered DOM state.** Every window's position, size,
  z-index, minimized/maximized flag lives in a single `useReducer` in
  `WindowManagerContext.jsx`. The taskbar, Start menu, and desktop icons all
  dispatch actions (`OPEN`, `CLOSE`, `FOCUS`, `MINIMIZE`, `TOGGLE_MAXIMIZE`,
  `MOVE`, `RESIZE`, `SHOW_DESKTOP`) instead of reaching into the DOM.
- **Drag/resize bypass React state mid-gesture.** `useDraggable` /
  `useResizable` mutate the window's DOM node directly via a ref on every
  `pointermove`, and only dispatch the final position to the reducer on
  `pointerup`. Dispatching (and re-rendering the whole window tree) on every
  pixel of movement would feel noticeably laggier than the original vanilla
  JS version, which set `.style.left/.top` directly too.
- **`data/windows.js` is the single source of truth.** Desktop icons, the
  Start menu list, and the window manager's default sizes all read from the
  same array — add a tenth window by adding one entry here plus one content
  component, instead of touching four different files like the HTML version
  required (template tag + desktop icon + start-menu item + `WINDOW_META`
  entry).
- **Terminal and Contact form now use real React state** instead of directly
  appending to `innerHTML` or calling `alert()` — `TerminalWindow.jsx` keeps
  its output as an array in `useState`, and the contact form shows an inline
  "message noted" confirmation instead of a blocking alert.

## Verification

I ran this through a syntax/import-resolution pass on every source file, then
server-rendered the boot screen, login screen, and full desktop (with zero
windows open) to confirm structure — all 9 desktop icons, the taskbar, and
the Start button render correctly, and the window layer is empty until you
open something. I couldn't fully click-test drag/resize/window-open in this
sandbox (no network access to install Vite here), so give the interactive
bits — dragging, resizing, minimizing, the terminal — a real spin after
`npm install && npm run dev` and let me know if anything's off.
