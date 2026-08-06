// ============================================================================
// Anirudh OS — boot sequence, login, and window manager
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

    const bootScreen = document.getElementById('boot-screen');
    const loginScreen = document.getElementById('login-screen');
    const desktop = document.getElementById('desktop');
    const shutdownScreen = document.getElementById('shutdown-screen');
    const loginBtn = document.getElementById('login-btn');
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');
    const shutdownBtn = document.getElementById('shutdown-btn');
    const windowsContainer = document.getElementById('windows-container');
    const taskbarApps = document.getElementById('taskbar-apps');
    const showDesktopBtn = document.getElementById('show-desktop');

    // ---------------- Boot -> Login ----------------
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    }, 2500);

    function goToDesktop() {
        loginScreen.classList.add('hidden');
        desktop.classList.remove('hidden');
    }

    loginBtn.addEventListener('click', goToDesktop);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !loginScreen.classList.contains('hidden')) {
            goToDesktop();
        }
    });

    // ---------------- Clock ----------------
    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        if (!timeEl) return;
        let h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12; h = h ? h : 12;
        timeEl.textContent = `${h}:${m} ${ampm}`;
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }
    updateClock();
    setInterval(updateClock, 15000);

    // ---------------- Window Manager ----------------
    const WINDOW_META = {
        about:      { title: 'About Me', icon: 'bx-user',    template: 'tpl-about',    w: 620, h: 360 },
        projects:   { title: 'Projects', icon: 'bx-folder',  template: 'tpl-projects', w: 700, h: 460 },
        contact:    { title: 'Contact',  icon: 'bx-envelope', template: 'tpl-contact',  w: 640, h: 420 },
        recyclebin: { title: 'Recycle Bin', icon: 'bx-trash', template: 'tpl-recyclebin', w: 380, h: 260 },
        skills:     { title: 'Skills', icon: 'bx-wrench', template: 'tpl-skills', w: 480, h: 420 },
        experience: { title: 'Experience', icon: 'bx-briefcase', template: 'tpl-experience', w: 540, h: 380 },
        education:  { title: 'Education', icon: 'bx-book-open', template: 'tpl-education', w: 540, h: 380 },
        resume:     { title: 'Resume', icon: 'bx-file', template: 'tpl-resume', w: 440, h: 340 },
        terminal:   { title: 'Terminal', icon: 'bx-terminal', template: 'tpl-terminal', w: 560, h: 380 },
    };

    const openWindows = {}; // id -> { el, taskbarBtn, minimized, maximized }
    let zCounter = 10;
    let cascadeOffset = 0;

    function openWindow(id) {
        if (openWindows[id]) {
            restoreWindow(id);
            focusWindow(id);
            return;
        }

        const meta = WINDOW_META[id];
        if (!meta) return;

        const tpl = document.getElementById(meta.template);
        const winEl = document.createElement('div');
        winEl.className = 'os-window';
        winEl.dataset.winId = id;
        winEl.appendChild(tpl.content.cloneNode(true));

        // Sizing / position (cascaded)
        const offset = (cascadeOffset % 6) * 28;
        cascadeOffset++;
        const left = Math.max(20, (window.innerWidth - meta.w) / 2 + offset - 60);
        const top = Math.max(20, (window.innerHeight - meta.h) / 2 + offset - 80);
        winEl.style.width = meta.w + 'px';
        winEl.style.height = meta.h + 'px';
        winEl.style.left = left + 'px';
        winEl.style.top = top + 'px';

        // Resize handle
        const handle = document.createElement('div');
        handle.className = 'win-resize-handle';
        winEl.appendChild(handle);

        windowsContainer.appendChild(winEl);

        // Taskbar button
        const btn = document.createElement('button');
        btn.className = 'taskbar-app-btn';
        btn.innerHTML = `<i class='bx ${meta.icon}'></i><span>${meta.title}</span>`;
        btn.addEventListener('click', () => {
            const state = openWindows[id];
            if (state.minimized) {
                restoreWindow(id);
                focusWindow(id);
            } else if (!state.el.classList.contains('inactive')) {
                minimizeWindow(id);
            } else {
                focusWindow(id);
            }
        });
        taskbarApps.appendChild(btn);

        openWindows[id] = { el: winEl, taskbarBtn: btn, minimized: false, maximized: false };

        wireWindowControls(id, winEl);
        makeDraggable(id, winEl);
        makeResizable(id, winEl, handle);

        focusWindow(id);
    }

    function wireWindowControls(id, winEl) {
        winEl.querySelector('.win-close').addEventListener('click', () => closeWindow(id));
        winEl.querySelector('.win-min').addEventListener('click', () => minimizeWindow(id));
        winEl.querySelector('.win-max').addEventListener('click', () => toggleMaximize(id));
        winEl.querySelector('.win-titlebar').addEventListener('dblclick', () => toggleMaximize(id));
        winEl.addEventListener('mousedown', () => focusWindow(id));

        const form = winEl.querySelector('#contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert("Thank you for your message! I'll get back to you soon.");
                form.reset();
            });
        }

        if (id === 'terminal') wireTerminal(winEl);
    }

    // ---------------- Terminal ----------------
    function wireTerminal(winEl) {
        const output = winEl.querySelector('.terminal-output');
        const input = winEl.querySelector('.terminal-input');

        const TERM_COMMANDS = {
            help: () => `Available commands: help, about, skills, projects, contact, whoami, date, clear`,
            about: () => `Anirudh Paliwal — Game Developer & Frontend Web Developer. Passionate about building immersive digital experiences.`,
            skills: () => `Unity, C#, Game Design, JavaScript, HTML/CSS, React, UI/UX`,
            projects: () => `Space Dodger Game, Portfolio Dashboard, Memory Master — open the Projects window for details.`,
            contact: () => `Email: anibro16@gmail.com | anipalgames016@gmail.com`,
            whoami: () => `guest@anirudh-os`,
            date: () => new Date().toString(),
            sudo: () => `Nice try. This terminal doesn't need root — everything here is already open.`,
        };

        function printLine(text, cls) {
            const p = document.createElement('p');
            if (cls) p.className = cls;
            p.textContent = text;
            output.appendChild(p);
            output.scrollTop = output.scrollHeight;
        }

        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const raw = input.value.trim();
            input.value = '';
            if (!raw) return;
            printLine(`anirudh@portfolio:~$ ${raw}`, 'term-cmd-echo');

            if (raw === 'clear') {
                output.innerHTML = '';
                return;
            }
            const cmd = raw.toLowerCase();
            if (TERM_COMMANDS[cmd]) {
                printLine(TERM_COMMANDS[cmd]());
            } else {
                printLine(`Command not found: ${raw}. Type "help" for a list of commands.`, 'term-error');
            }
        });

        winEl.addEventListener('mousedown', () => setTimeout(() => input.focus(), 0));
        setTimeout(() => input.focus(), 50);
    }

    function closeWindow(id) {
        const state = openWindows[id];
        if (!state) return;
        state.el.remove();
        state.taskbarBtn.remove();
        delete openWindows[id];
    }

    function minimizeWindow(id) {
        const state = openWindows[id];
        if (!state) return;
        state.el.classList.add('minimized');
        state.minimized = true;
        state.taskbarBtn.classList.remove('active');
    }

    function restoreWindow(id) {
        const state = openWindows[id];
        if (!state) return;
        state.el.classList.remove('minimized');
        state.minimized = false;
    }

    function toggleMaximize(id) {
        const state = openWindows[id];
        if (!state) return;
        state.maximized = !state.maximized;
        state.el.classList.toggle('maximized', state.maximized);
        const icon = state.el.querySelector('.win-max i');
        icon.className = state.maximized ? 'bx bx-copy-alt' : 'bx bx-square';
    }

    function focusWindow(id) {
        zCounter++;
        Object.entries(openWindows).forEach(([winId, state]) => {
            const isActive = winId === id;
            state.el.style.zIndex = isActive ? zCounter : state.el.style.zIndex || 10;
            state.el.classList.toggle('inactive', !isActive);
            state.taskbarBtn.classList.toggle('active', isActive);
        });
        openWindows[id].el.style.zIndex = zCounter;
    }

    function makeDraggable(id, winEl) {
        const titlebar = winEl.querySelector('.win-titlebar');
        let dragging = false, startX, startY, startLeft, startTop;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.win-controls')) return;
            if (openWindows[id].maximized) return;
            dragging = true;
            startX = e.clientX; startY = e.clientY;
            startLeft = winEl.offsetLeft; startTop = winEl.offsetTop;
            focusWindow(id);
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            winEl.style.left = Math.max(0, startLeft + dx) + 'px';
            winEl.style.top = Math.max(0, startTop + dy) + 'px';
        });

        document.addEventListener('mouseup', () => { dragging = false; });

        // Touch support
        titlebar.addEventListener('touchstart', (e) => {
            if (e.target.closest('.win-controls')) return;
            if (openWindows[id].maximized) return;
            const t = e.touches[0];
            dragging = true;
            startX = t.clientX; startY = t.clientY;
            startLeft = winEl.offsetLeft; startTop = winEl.offsetTop;
            focusWindow(id);
        }, { passive: true });
        document.addEventListener('touchmove', (e) => {
            if (!dragging) return;
            const t = e.touches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            winEl.style.left = Math.max(0, startLeft + dx) + 'px';
            winEl.style.top = Math.max(0, startTop + dy) + 'px';
        }, { passive: true });
        document.addEventListener('touchend', () => { dragging = false; });
    }

    function makeResizable(id, winEl, handle) {
        let resizing = false, startX, startY, startW, startH;
        handle.addEventListener('mousedown', (e) => {
            if (openWindows[id].maximized) return;
            resizing = true;
            startX = e.clientX; startY = e.clientY;
            startW = winEl.offsetWidth; startH = winEl.offsetHeight;
            focusWindow(id);
            e.preventDefault();
            e.stopPropagation();
        });
        document.addEventListener('mousemove', (e) => {
            if (!resizing) return;
            const dw = e.clientX - startX;
            const dh = e.clientY - startY;
            winEl.style.width = Math.max(320, startW + dw) + 'px';
            winEl.style.height = Math.max(220, startH + dh) + 'px';
        });
        document.addEventListener('mouseup', () => { resizing = false; });
    }

    // ---------------- Icon / start-item wiring ----------------
    document.querySelectorAll('.desktop-icon, .start-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.window;
            openWindow(id);
            startMenu.classList.add('hidden');
        });
    });

    // ---------------- Start menu ----------------
    startBtn.addEventListener('click', (e) => {
        startMenu.classList.toggle('hidden');
        e.stopPropagation();
    });
    document.addEventListener('click', (e) => {
        if (!startMenu.classList.contains('hidden') && !startMenu.contains(e.target) && e.target !== startBtn) {
            startMenu.classList.add('hidden');
        }
    });

    // ---------------- Show desktop ----------------
    showDesktopBtn.addEventListener('click', () => {
        Object.keys(openWindows).forEach(id => minimizeWindow(id));
    });

    // ---------------- Shut down ----------------
    shutdownBtn.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        desktop.classList.add('hidden');
        shutdownScreen.classList.remove('hidden');
        setTimeout(() => {
            shutdownScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        }, 1800);
    });

});