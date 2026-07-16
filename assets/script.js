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

});
