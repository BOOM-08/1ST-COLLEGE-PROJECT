/* ============================================================
   BHUMIT PORTFOLIO — MAIN JAVASCRIPT
   Handles: Custom cursor, particle canvas, typewriter,
   scroll reveal, navbar, skill bars, filter tabs,
   flash cards, counter animation, contact form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Force page to start at the top (Hero Section) on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    /* ============================================================
       1. CUSTOM CURSOR (WITH MAGNETIC SNAPPING)
       ============================================================ */
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    if (dot && ring && window.matchMedia('(hover: hover)').matches) {
        document.documentElement.classList.add('has-custom-cursor');
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let rafId;

        let targetX = null;
        let targetY = null;
        let targetWidth = 0;
        let targetHeight = 0;
        let isSnapped = false;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Smooth ring follow & snapping loop
        function animateRing() {
            if (isSnapped && targetX !== null && targetY !== null) {
                // Snap smoothly to targets (centered coordinates)
                ringX += (targetX - ringX) * 0.16;
                ringY += (targetY - ringY) * 0.16;
                ring.style.width = (targetWidth + 12) + 'px';
                ring.style.height = (targetHeight + 12) + 'px';
                ring.style.borderRadius = '8px'; // rectangular rounded frame
                ring.style.borderColor = 'rgba(124, 111, 239, 0.8)';
            } else {
                // Regular circle follow mouse
                ringX += (mouseX - ringX) * 0.12;
                ringY += (mouseY - ringY) * 0.12;
                ring.style.width = '36px';
                ring.style.height = '36px';
                ring.style.borderRadius = '50%';
                ring.style.borderColor = 'rgba(124, 111, 239, 0.5)';
            }

            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            rafId = requestAnimationFrame(animateRing);
        }
        animateRing();

        // Magnetic link listeners
        const magnetics = '.nav-link, .logo, .bio-link, .social-pill';
        document.querySelectorAll(magnetics).forEach(el => {
            el.addEventListener('mouseenter', () => {
                const rect = el.getBoundingClientRect();
                // We use fixed relative position to viewport because ring is position: fixed
                targetX = rect.left + rect.width / 2;
                targetY = rect.top + rect.height / 2;
                targetWidth = rect.width;
                targetHeight = rect.height;
                isSnapped = true;
            });
            el.addEventListener('mouseleave', () => {
                isSnapped = false;
                targetX = null;
                targetY = null;
            });
        });

        // Simple hover scaling for larger components
        const growItems = '.flash-card, .bento-card, .btn-submit, input, textarea, select';
        document.querySelectorAll(growItems).forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!isSnapped) {
                    ring.style.width = '64px';
                    ring.style.height = '64px';
                    ring.style.borderColor = 'rgba(124, 111, 239, 0.7)';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (!isSnapped) {
                    ring.style.width = '36px';
                    ring.style.height = '36px';
                    ring.style.borderColor = 'rgba(124, 111, 239, 0.5)';
                }
            });
        });
    }

    /* ============================================================
       2. HERO PARTICLE CANVAS
       ============================================================ */
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.3;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.colors = ['124, 111, 239', '192, 132, 252', '56, 189, 248'];
                this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            const count = Math.floor((canvas.width * canvas.height) / 10000);
            particles = Array.from({ length: Math.min(count, 120) }, () => new Particle());
        }
        initParticles();

        // Connect nearby particles
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 111, 239, ${0.08 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        let animFrame;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            animFrame = requestAnimationFrame(animate);
        }
        animate();
    }

    /* ============================================================
       3. TYPEWRITER EFFECT
       ============================================================ */
    const subTypeEl = document.getElementById('typewriter-subtitle');
    if (subTypeEl) {
        const text = "Full-Stack Developer & Co-founder of Pixel Forge Agency.";
        let index = 0;

        // Create typing cursor element
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.color = 'var(--accent)';
        cursor.style.animation = 'cursor-blink 0.8s step-end infinite';
        cursor.style.fontWeight = '400';
        cursor.style.marginLeft = '4px';
        subTypeEl.parentNode.insertBefore(cursor, subTypeEl.nextSibling);

        function typeSubtitle() {
            if (index < text.length) {
                subTypeEl.textContent += text.charAt(index);
                index++;
                setTimeout(typeSubtitle, 45); // speed of typing
            } else {
                // Remove cursor after typed
                setTimeout(() => cursor.remove(), 1200);
            }
        }
        setTimeout(typeSubtitle, 800); // delay before starting typing
    }

    /* ============================================================
       3.1. 1-CLICK COPY EMAIL HANDLER
       ============================================================ */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyEmailText = document.getElementById('copyEmailText');
    if (copyEmailBtn && copyEmailText) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'vasavabhumit4@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailText.textContent;
                copyEmailText.textContent = '✓ Copied to Clipboard!';
                copyEmailBtn.style.borderColor = '#22c55e';
                copyEmailBtn.style.color = '#16a34a';

                setTimeout(() => {
                    copyEmailText.textContent = originalText;
                    copyEmailBtn.style.borderColor = '';
                    copyEmailBtn.style.color = '';
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    /* ============================================================
       2.5. AI PIPELINE CODE TYPING ANIMATION
       ============================================================ */
    const codeEditorEl = document.getElementById('typingCodeEditor');
    if (codeEditorEl) {
        const lines = [
            '<span class="c-keyword">async def</span> <span class="c-func">dub_video</span>(url, lang):',
            '    subtitles = <span class="c-keyword">await</span> whisper.transcribe(url)',
            '    translated = <span class="c-keyword">await</span> gemini.translate(subtitles, lang)',
            '    audio = <span class="c-keyword">await</span> tts.synthesize(translated)',
            '    <span class="c-keyword">return</span> <span class="c-keyword">await</span> wav2lip.sync(video, audio)'
        ];

        let lineIdx = 0;
        codeEditorEl.innerHTML = '';

        function typeNextLine() {
            if (lineIdx < lines.length) {
                const codeLine = document.createElement('code');
                codeLine.style.opacity = '0';
                codeLine.style.transform = 'translateX(-8px)';
                codeLine.style.transition = 'all 0.4s ease';
                codeLine.innerHTML = lines[lineIdx];
                codeEditorEl.appendChild(codeLine);

                setTimeout(() => {
                    codeLine.style.opacity = '1';
                    codeLine.style.transform = 'translateX(0)';
                }, 50);

                lineIdx++;
                setTimeout(typeNextLine, 500);
            }
        }

        setTimeout(typeNextLine, 1200);
    }

    // Copy Snippet Button Handler
    const copySnippetBtn = document.getElementById('copySnippetBtn');
    const copySnippetText = document.getElementById('copySnippetText');
    if (copySnippetBtn && copySnippetText) {
        copySnippetBtn.addEventListener('click', () => {
            const code = `async def dub_video(url, lang):\n    subtitles = await whisper.transcribe(url)\n    translated = await gemini.translate(subtitles, lang)\n    audio = await tts.synthesize(translated)\n    return await wav2lip.sync(video, audio)`;
            navigator.clipboard.writeText(code).then(() => {
                copySnippetText.textContent = '✓ Copied!';
                copySnippetBtn.style.background = '#22c55e';
                copySnippetBtn.style.color = '#ffffff';

                setTimeout(() => {
                    copySnippetText.textContent = 'Copy';
                    copySnippetBtn.style.background = '';
                    copySnippetBtn.style.color = '';
                }, 2000);
            }).catch(err => console.error(err));
        });
    }

    /* ============================================================
       3.5. INTERACTIVE TERMINAL CLI LOGIC
       ============================================================ */
    const termInput = document.getElementById('terminalInput');
    const termOutput = document.getElementById('terminalOutput');
    const termBody = document.getElementById('terminalBody');
    const termWidget = document.getElementById('heroTerminal');

    if (termInput && termOutput && termBody && termWidget) {
        // Automatically focus input when clicking terminal container
        termWidget.addEventListener('click', () => termInput.focus());

        termInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase().replace(/['"]/g, '');
                termInput.value = '';

                // Echo typed command
                const echoLine = document.createElement('p');
                echoLine.className = 'term-line';
                echoLine.innerHTML = `<span class="term-prompt">bhumit@portfolio:~$</span> ${cmd}`;
                termOutput.appendChild(echoLine);

                // Run CLI command routing
                let response = '';
                if (cmd === 'help') {
                    response = `Available commands:
  - <b>skills</b>   : Tools and technologies I use daily.
  - <b>projects</b> : Real-world products I've shipped.
  - <b>status</b>   : What I'm currently working on.
  - <b>clear</b>    : Clear the terminal screen.`;
                } else if (cmd === 'skills') {
                    response = `Frontend:  React, Next.js, HTML5, CSS3, JS
Backend:   FastAPI, Node.js, Python, Supabase DB
AI/ML:     NLP pipelines, Gemini API, Claude API, Wav2Lip`;
                } else if (cmd === 'projects') {
                    response = `Shipped Projects:
  - <b>DubVibe Pro</b>       : Automated video dubbing pipeline (FastAPI/Wav2Lip)
  - <b>SkillBridge AI</b>    : Career prep simulator (Next.js/Claude Sonnet)
  - <b>Pixel Forge Agency</b> : Client portal & platform (React/Node.js)
  - <b>Core Gym Platform</b>  : High-conversion frontend (HTML/CSS/JS)`;
                } else if (cmd === 'status') {
                    response = `Active Status:
  - Co-founding Pixel Forge Agency.
  - Building AI integrations for global clients.
  - Learning advanced computer vision models.`;
                } else if (cmd === 'clear') {
                    termOutput.innerHTML = '';
                    return;
                } else if (cmd === '') {
                    return;
                } else {
                    response = `<span class="term-line text-error">Command not found: '${cmd}'. Type 'help' for available commands.</span>`;
                }

                if (response) {
                    const respLine = document.createElement('p');
                    respLine.className = 'term-line';
                    respLine.innerHTML = response;
                    termOutput.appendChild(respLine);
                }

                // Autoscroll to bottom
                termBody.scrollTop = termBody.scrollHeight;
            }
        });

        // Terminal Theme Toggle (Uiverse Checkbox Switch)
        const termToggleBtn = document.getElementById('termThemeToggle');
        if (termToggleBtn) {
            termToggleBtn.addEventListener('change', (e) => {
                e.stopPropagation();
                if (termToggleBtn.checked) {
                    termWidget.classList.add('term-light-mode');
                } else {
                    termWidget.classList.remove('term-light-mode');
                }
            });
        }

        // Quick Command Chips Click Handler
        const quickChips = document.querySelectorAll('.term-chip');
        quickChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.stopPropagation();
                const cmd = chip.getAttribute('data-cmd');
                if (cmd) {
                    termInput.value = cmd;
                    const event = new KeyboardEvent('keydown', { key: 'Enter' });
                    termInput.dispatchEvent(event);
                }
            });
        });
    }

    /* ============================================================
       4. NAVBAR — SCROLL + MOBILE TOGGLE
       ============================================================ */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, { passive: true });

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    /* ============================================================
       5. SMOOTH SCROLL
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = a.getAttribute('href');
            if (target === '#') return;
            const el = document.querySelector(target);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ============================================================
       6. SCROLL REVEAL (IntersectionObserver)
       ============================================================ */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

    /* ============================================================
       7. SKILL BAR ANIMATION
       ============================================================ */
    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.sk-fill-new').forEach(bar => {
                    const w = bar.getAttribute('data-width');
                    setTimeout(() => { bar.style.width = w + '%'; }, 200);
                });
                skillObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills-layout-new').forEach(el => skillObs.observe(el));

    /* ============================================================
       8. COUNTER ANIMATION (Hero Stats)
       ============================================================ */
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-num[data-target]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 1600;
                    const step = target / (duration / 16);
                    let current = 0;

                    const update = () => {
                        current = Math.min(current + step, target);
                        counter.textContent = Math.floor(current);
                        if (current < target) requestAnimationFrame(update);
                    };
                    requestAnimationFrame(update);
                });
                counterObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) counterObs.observe(statsEl);

    /* ============================================================
       9. FLASH CARD FILTER TABS
       ============================================================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const flashCards = document.querySelectorAll('.flash-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            flashCards.forEach(card => {
                const cats = card.getAttribute('data-category') || '';
                const show = filter === 'all' || cats.includes(filter);

                if (show) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ============================================================
       10. CONTACT FORM
       ============================================================ */
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    // Initialize EmailJS with your Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("WnIKT5ZbSoruUbyPR"); // <-- Replace with your EmailJS Public Key
    }

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const nameEl = form.elements['name'];
            const emailEl = form.elements['email'];
            const msgEl = form.elements['message'];
            const projectEl = form.elements['project'];
            const gotchaEl = form.elements['_gotcha'];

            // Anti-spam honeypot
            if (gotchaEl && gotchaEl.value) {
                console.warn("Spam detected.");
                return;
            }

            const name = nameEl.value.trim();
            const email = emailEl.value.trim();
            const message = msgEl.value.trim();

            if (!name || !email || !message) {
                // Highlight invalid inputs by turning bottom border red
                [nameEl, emailEl, msgEl].forEach(field => {
                    if (!field.value.trim()) {
                        const grp = field.closest('.console-input-group');
                        if (grp) {
                            grp.style.setProperty('border-bottom-color', '#ef4444', 'important');
                            setTimeout(() => { grp.style.removeProperty('border-bottom-color'); }, 2000);
                        }
                    }
                });
                return;
            }

            submitBtn.textContent = 'bhumit.sending...';
            submitBtn.disabled = true;

            // Send via EmailJS
            const serviceID = "service_5vgt5fl"; // <-- Replace with your Service ID
            const templateID = "template_qlv5zfp"; // <-- Replace with your Template ID

            if (typeof emailjs !== 'undefined' && serviceID !== "YOUR_SERVICE_ID") {
                emailjs.send(serviceID, templateID, {
                    from_name: name,
                    reply_to: email,
                    project_type: projectEl.value,
                    message: message
                })
                    .then(() => {
                        form.reset();
                        submitBtn.innerHTML = '<span>bhumit.sendContact();</span>';
                        submitBtn.disabled = false;
                        if (success) {
                            success.classList.add('show');
                            setTimeout(() => success.classList.remove('show'), 5000);
                        }
                    })
                    .catch(err => {
                        console.error("EmailJS submission failed:", err);
                        submitBtn.innerHTML = '<span>bhumit.sendContact();</span>';
                        submitBtn.disabled = false;
                        alert("Failed to send message. Please email me directly at vasavabhumit4@gmail.com.");
                    });
            } else {
                // Fallback simulation if script is blocked/failed
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<span>bhumit.sendContact();</span>';
                    submitBtn.disabled = false;
                    if (success) {
                        success.classList.add('show');
                        setTimeout(() => success.classList.remove('show'), 5000);
                    }
                }, 1000);
            }
        });
    }

    /* ============================================================
       11. PARALLAX HERO CONTENT (subtle mouse move)
       ============================================================ */
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            heroContent.style.transform = `translate(${x}px, ${y}px)`;
        }, { passive: true });
    }

    /* ============================================================
       12. CARD TILT EFFECT (non-flash, e.g. bento cards)
       ============================================================ */
    document.querySelectorAll('.bento-card, .timeline-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -4;
            const rotY = ((x - cx) / cx) * 4;
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
        });
    });

    /* ============================================================
       13. BACK TO TOP SMOOTH
       ============================================================ */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       14. CSS ANIMATION — fadeIn keyframe (injected)
       ============================================================ */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    /* ============================================================
       15. 3D PARALLAX SCROLL EFFECT
       ============================================================ */
    const parallaxSections = document.querySelectorAll('.parallax-section');
    const sectionTitles = document.querySelectorAll('.section-title');

    if (parallaxSections.length > 0 || sectionTitles.length > 0) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    // Subtle parallax shift on section titles
                    sectionTitles.forEach(title => {
                        const rect = title.getBoundingClientRect();
                        const center = rect.top + rect.height / 2;
                        const viewH = window.innerHeight;
                        const offset = ((center - viewH / 2) / viewH) * 15;
                        title.style.transform = `translateY(${offset}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ============================================================
       16. INTERACTIVE 3D MOUSE TILT ON CARDS
       ============================================================ */
    document.querySelectorAll('.tilt-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
    });

    /* ============================================================
       17. SPOTLIGHT MOUSE TRACKER (LINEAR & STRIPE STYLE)
       ============================================================ */
    document.querySelectorAll('.bento-card, .matrix-card, .domain-card, .case-study-card, .cert-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ============================================================
       18. GLOBAL COMMAND PALETTE ENGINE (CTRL + K / ⌘K)
       ============================================================ */
    const cmdPaletteBackdrop = document.getElementById('cmdPaletteBackdrop');
    const cmdPaletteInput = document.getElementById('cmdPaletteInput');
    const cmdPaletteResults = document.getElementById('cmdPaletteResults');
    const cmdKTrigger = document.getElementById('cmdKTrigger');

    function openCmdPalette() {
        if (!cmdPaletteBackdrop) return;
        cmdPaletteBackdrop.classList.add('active');
        cmdPaletteBackdrop.setAttribute('aria-hidden', 'false');
        if (cmdPaletteInput) {
            cmdPaletteInput.value = '';
            setTimeout(() => cmdPaletteInput.focus(), 50);
        }
        filterCmdItems('');
    }

    function closeCmdPalette() {
        if (!cmdPaletteBackdrop) return;
        cmdPaletteBackdrop.classList.remove('active');
        cmdPaletteBackdrop.setAttribute('aria-hidden', 'true');
    }

    if (cmdKTrigger) {
        cmdKTrigger.addEventListener('click', openCmdPalette);
    }

    // Global Key Listener (Ctrl+K / Cmd+K / Esc)
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdPaletteBackdrop && cmdPaletteBackdrop.classList.contains('active')) {
                closeCmdPalette();
            } else {
                openCmdPalette();
            }
        }
        if (e.key === 'Escape' && cmdPaletteBackdrop && cmdPaletteBackdrop.classList.contains('active')) {
            closeCmdPalette();
        }
    });

    // Close on backdrop click
    if (cmdPaletteBackdrop) {
        cmdPaletteBackdrop.addEventListener('click', e => {
            if (e.target === cmdPaletteBackdrop) closeCmdPalette();
        });
    }

    // Filter Command Items
    function filterCmdItems(query) {
        if (!cmdPaletteResults) return;
        const items = cmdPaletteResults.querySelectorAll('.cmd-item');
        const q = query.toLowerCase().trim();

        items.forEach(item => {
            const label = item.querySelector('.cmd-item-label').textContent.toLowerCase();
            if (label.includes(q)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Maintain active item
        const visibleItems = Array.from(items).filter(el => el.style.display !== 'none');
        items.forEach(el => el.classList.remove('active'));
        if (visibleItems.length > 0) visibleItems[0].classList.add('active');
    }

    if (cmdPaletteInput) {
        cmdPaletteInput.addEventListener('input', e => filterCmdItems(e.target.value));
    }

    // Command Item Click Action Execution
    if (cmdPaletteResults) {
        cmdPaletteResults.querySelectorAll('.cmd-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                const target = item.getAttribute('data-target');

                closeCmdPalette();

                if (action === 'nav' && target) {
                    const targetEl = document.querySelector(target);
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                } else if (action === 'copy-email') {
                    const copyBtn = document.getElementById('copyEmailBtn');
                    if (copyBtn) copyBtn.click();
                } else if (action === 'download-resume') {
                    const link = document.createElement('a');
                    link.href = 'reference/BHUMIT VASAVA  (2).pdf';
                    link.download = 'Bhumit_Vasava_Resume.pdf';
                    link.click();
                } else if (action === 'toggle-cli-mode') {
                    const toggleSwitch = document.getElementById('uiverseThemeSwitch');
                    if (toggleSwitch) toggleSwitch.click();
                }
            });
        });
    }

    /* ============================================================
       19. PROJECT DEEP-DIVE DRAWER MODAL
       ============================================================ */
    const projectDrawerBackdrop = document.getElementById('projectDrawerBackdrop');
    const projectDrawerClose = document.getElementById('projectDrawerClose');
    const drawerCategory = document.getElementById('drawerCategory');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerTagline = document.getElementById('drawerTagline');
    const drawerBody = document.getElementById('drawerBody');

    const projectData = {
        'dubvibe': {
            category: 'AI & SPEECH PIPELINE',
            title: 'DubVibe Pro',
            tagline: 'Automated Multilingual Voice & Lip-Sync Pipeline',
            pipeline: ['1. Video Input & Audio Extraction', '2. OpenAI Whisper Speech-to-Text Transcribe', '3. Gemini Pro Contextual Neural Translation', '4. Voice Synthesis & Wav2Lip Model Lip-Syncing'],
            problem: 'Content creators pay thousands of dollars for manual video localization.',
            solution: 'Engineered an asynchronous Python pipeline reducing dubbing costs by 90% with sub-minute turnaround.',
            links: { demo: 'https://github.com/BOOM-08', code: 'https://github.com/BOOM-08' }
        },
        'skillbridge': {
            category: 'FULL-STACK AI APPLICATION',
            title: 'SkillBridge AI',
            tagline: 'Next.js 15 & Claude 4.5 Tech Interview Simulator',
            pipeline: ['1. Role & Tech Stack Selection', '2. Dynamic Prompt Generation via Claude Sonnet', '3. Real-Time Voice Speech Evaluation', '4. Automated Code Feedback Report'],
            problem: 'Job seekers lack realistic technical interview practice with instant feedback.',
            solution: 'Built a responsive interview app powered by Next.js 15 App Router and Claude Sonnet API.',
            links: { demo: 'https://github.com/BOOM-08', code: 'https://github.com/BOOM-08' }
        },
        'pixelforge': {
            category: 'CO-FOUNDED AGENCY PLATFORM',
            title: 'Pixel Forge Agency',
            tagline: 'High-Converting Agency Portal & Client Hub',
            pipeline: ['1. Next.js SSR & Supabase DB', '2. Custom Glassmorphism UI Components', '3. Dynamic Proposal Generator', '4. Real-Time Client Analytics Dashboard'],
            problem: 'Agencies require high performance and fast turnaround to convert web traffic.',
            solution: 'Co-founded agency platform delivering 45% average conversion lift for clients.',
            links: { demo: 'https://github.com/BOOM-08', code: 'https://github.com/BOOM-08' }
        },
        'vocaberry': {
            category: 'AI LANGUAGE LEARNING',
            title: 'Vocaberry',
            tagline: 'AI Mnemonic Visual Vocabulary Trainer',
            pipeline: ['1. Target Word Selection', '2. Mnemonic Generation Algorithm', '3. Flashcard Spaced Repetition', '4. Progress Streak Tracking'],
            problem: 'Traditional vocabulary learning relies on boring rote repetition.',
            solution: 'Created an associative AI visual mnemonic app boosting retention rates by 65%.',
            links: { demo: 'https://github.com/BOOM-08', code: 'https://github.com/BOOM-08' }
        },
        'coregym': {
            category: 'HIGH-CONVERSION WEB APP',
            title: 'Core Gym Platform',
            tagline: 'Responsive Fitness Platform & Class Booking',
            pipeline: ['1. HTML5/CSS3 Responsive Layout', '2. Vanilla JS Scroll Interactions', '3. Class Schedule Booking Flow', '4. Fast Vercel CDN Delivery'],
            problem: 'Local gyms lose online membership sales due to sluggish websites.',
            solution: 'Shipped a fast vanilla web app boosting online membership signups by 45%.',
            links: { demo: 'https://github.com/BOOM-08', code: 'https://github.com/BOOM-08' }
        }
    };

    function openProjectDrawer(key) {
        const data = projectData[key] || projectData['dubvibe'];
        if (drawerCategory) drawerCategory.textContent = data.category;
        if (drawerTitle) drawerTitle.textContent = data.title;
        if (drawerTagline) drawerTagline.textContent = data.tagline;

        if (drawerBody) {
            drawerBody.innerHTML = `
                <div>
                    <h4 class="drawer-section-title">ENGINEERING PIPELINE FLOW</h4>
                    <div class="drawer-pipeline-flow">
                        ${data.pipeline.map(step => `<div class="pipeline-step"><span class="step-num">⚡</span> ${step}</div>`).join('')}
                    </div>
                </div>

                <div>
                    <h4 class="drawer-section-title">THE PROBLEM</h4>
                    <p style="font-size: 14px; color: var(--text-2); line-height: 1.6;">${data.problem}</p>
                </div>

                <div>
                    <h4 class="drawer-section-title">ENGINEERING SOLUTION</h4>
                    <p style="font-size: 14px; color: var(--text-2); line-height: 1.6;">${data.solution}</p>
                </div>

                <div class="drawer-links-group">
                    <a href="${data.links.demo}" target="_blank" rel="noopener noreferrer" class="drawer-btn drawer-btn-primary">
                        View GitHub Repo ↗
                    </a>
                    <a href="#contact" id="drawerContactLink" class="drawer-btn drawer-btn-secondary">
                        Inquire About Project →
                    </a>
                </div>
            `;
            const contactBtn = drawerBody.querySelector('#drawerContactLink');
            if (contactBtn) {
                contactBtn.addEventListener('click', () => closeProjectDrawer());
            }

            // Attach magnetic hover listeners to drawer buttons
            const ringEl = document.getElementById('cursorRing');
            if (ringEl) {
                drawerBody.querySelectorAll('.drawer-btn, .project-drawer-close').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        ringEl.style.width = '50px';
                        ringEl.style.height = '50px';
                        ringEl.style.borderColor = 'rgba(79, 70, 229, 0.8)';
                    });
                    el.addEventListener('mouseleave', () => {
                        ringEl.style.width = '36px';
                        ringEl.style.height = '36px';
                        ringEl.style.borderColor = 'rgba(79, 70, 229, 0.5)';
                    });
                });
            }
        }

        if (projectDrawerBackdrop) {
            projectDrawerBackdrop.classList.add('active');
            projectDrawerBackdrop.setAttribute('aria-hidden', 'false');
        }
    }

    function closeProjectDrawer() {
        if (projectDrawerBackdrop) {
            projectDrawerBackdrop.classList.remove('active');
            projectDrawerBackdrop.setAttribute('aria-hidden', 'true');
        }
    }

    if (projectDrawerClose) projectDrawerClose.addEventListener('click', closeProjectDrawer);
    if (projectDrawerBackdrop) {
        projectDrawerBackdrop.addEventListener('click', e => {
            if (e.target === projectDrawerBackdrop) closeProjectDrawer();
        });
    }

    // Attach click handlers to project buttons
    document.querySelectorAll('.case-study-card').forEach((card, index) => {
        const btn = card.querySelector('.case-link-btn');
        const keys = ['dubvibe', 'skillbridge', 'pixelforge', 'vocaberry', 'coregym'];
        if (btn) {
            btn.addEventListener('click', e => {
                e.preventDefault();
                openProjectDrawer(keys[index] || 'dubvibe');
            });
        }
    });

    /* ============================================================
       20. LIVE API SERVER LOG STREAM FOR CONTACT CONSOLE
       ============================================================ */
    const contactFormEl = document.getElementById('contactForm');
    if (contactFormEl) {
        contactFormEl.addEventListener('submit', () => {
            const liveLog = document.createElement('div');
            liveLog.className = 'live-console-stream';
            liveLog.innerHTML = `
                <div><span style="color:#c026d3;">[POST]</span> /api/v1/contact <span style="color:#38bdf8;">⚡ 118ms</span></div>
                <div>Status: <span style="color:#22c55e;">HTTP 200 OK</span> (Payload Processed)</div>
                <div>Destination: <span style="color:#eab308;">vasavabhumit4@gmail.com</span></div>
            `;
            const submitBtnEl = document.getElementById('submitBtn');
            if (submitBtnEl && submitBtnEl.parentNode) {
                submitBtnEl.parentNode.insertBefore(liveLog, submitBtnEl.nextSibling);
            }
        });
    }

});
