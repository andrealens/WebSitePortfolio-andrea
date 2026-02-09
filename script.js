document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. HERO PARTICLE BACKGROUND (HIGH DENSITY)
       ========================================= */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = []; // Rete neurale
        let bgParticlesArray = []; // Polvere di sfondo
        
        let mouse = { x: null, y: null, radius: (canvas.height/80) * (canvas.width/80) };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        // CLASSE 1: Particella Principale (Rete)
        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = '#00f3ff';
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
                if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < mouse.radius + this.size){
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
                    if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
                    if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
                }
                
                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        // CLASSE 2: Particella Sfondo (Polvere densa)
        class BgParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2; // Leggermente più grandi per vederle meglio
                this.speedX = (Math.random() * 0.8) - 0.4; // Un po' più veloci
                this.speedY = (Math.random() * 0.8) - 0.4;
                this.opacity = Math.random() * 0.5 + 0.1; // Opacità variabile
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`; // Ciano variabile
                ctx.fill();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            bgParticlesArray = [];
            
            // 1. DENSITÀ RETE (Aumentata: divisore abbassato da 9000 a 6000)
            let numberOfParticles = (canvas.height * canvas.width) / 6000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = Math.random() * (innerWidth - size * 2) + size * 2;
                let y = Math.random() * (innerHeight - size * 2) + size * 2;
                let dx = (Math.random() * 1) - 0.5;
                let dy = (Math.random() * 1) - 0.5;
                particlesArray.push(new Particle(x, y, dx, dy, size, '#00f3ff'));
            }

            // 2. DENSITÀ SFONDO (Molto aumentata e dinamica)
            // Divisore 3500 genererà centinaia di particelle di sfondo su schermi grandi
            let numberOfBgParticles = (canvas.height * canvas.width) / 3500; 
            for (let i = 0; i < numberOfBgParticles; i++) {
                bgParticlesArray.push(new BgParticle());
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,innerWidth, innerHeight);

            // Disegna Sfondo
            for (let i = 0; i < bgParticlesArray.length; i++) {
                bgParticlesArray[i].update();
            }

            // Disegna Rete
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dist = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    // Raggio di connessione aumentato leggermente per legare di più
                    if (dist < (canvas.width/6.5) * (canvas.height/6.5)) {
                        ctx.strokeStyle = `rgba(0, 243, 255, ${1 - (dist/25000)})`;
                        ctx.lineWidth = 1; 
                        ctx.beginPath(); 
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y); 
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y); 
                        ctx.stroke();
                    }
                }
            }
        }

        init();
        animate();

        window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; init(); });
    }

    /* 2. HACKING TEXT EFFECT */
    const hackingElement = document.getElementById('hacking-typed-text');
    if (hackingElement) {
        const text = "INITIALIZING_MARKET_SCAN... ANALYZING_DATA_STREAMS... ACCESS_GRANTED.";
        let i = 0; let isDel = false;
        function typeHacking() {
            hackingElement.textContent = text.substring(0, i);
            let speed = isDel ? 25 : 50;
            if (!isDel && i === text.length) { speed = 2000; isDel = true; }
            else if (isDel && i === 0) { isDel = false; speed = 500; }
            if (isDel) i--; else i++;
            setTimeout(typeHacking, speed);
        }
        typeHacking();
    }

    /* 3. TYPEWRITER (CODICE COLORATO VS CODE STYLE) */
    const codeEl = document.getElementById('typewriter');
    if (codeEl) {
        const codeSegments = [
            { text: "class", class: "code-keyword" },
            { text: " Musigramma", class: "code-class" },
            { text: " extends", class: "code-keyword" },
            { text: " Startup", class: "code-class" },
            { text: " {\n", class: "code-punctuation" },
            { text: "  constructor", class: "code-keyword" },
            { text: "() {\n", class: "code-punctuation" },
            { text: "    this", class: "code-variable" },
            { text: ".", class: "code-punctuation" },
            { text: "mission", class: "code-variable" },
            { text: " = ", class: "code-operator" },
            { text: "\"Phygital Education\"", class: "code-string" },
            { text: ";\n", class: "code-punctuation" },
            { text: "    this", class: "code-variable" },
            { text: ".", class: "code-punctuation" },
            { text: "tool", class: "code-variable" },
            { text: " = ", class: "code-operator" },
            { text: "\"Analog Device\"", class: "code-string" },
            { text: ";\n", class: "code-punctuation" },
            { text: "    this", class: "code-variable" },
            { text: ".", class: "code-punctuation" },
            { text: "humanConnected", class: "code-variable" },
            { text: " = ", class: "code-operator" },
            { text: "true", class: "code-bool" },
            { text: ";\n  }\n\n", class: "code-punctuation" },
            { text: "  learn", class: "code-function" },
            { text: "(", class: "code-punctuation" },
            { text: "user", class: "code-variable" },
            { text: ") {\n", class: "code-punctuation" },
            { text: "    // Connecting hand & mind...\n", class: "code-comment" },
            { text: "    if", class: "code-keyword" },
            { text: " (", class: "code-punctuation" },
            { text: "user", class: "code-variable" },
            { text: ".", class: "code-punctuation" },
            { text: "touch", class: "code-variable" },
            { text: " === ", class: "code-operator" },
            { text: "true", class: "code-bool" },
            { text: ") {\n", class: "code-punctuation" },
            { text: "      return", class: "code-keyword" },
            { text: " Harmony();\n", class: "code-function" },
            { text: "    }\n  }\n}\n", class: "code-punctuation" },
            { text: "|", class: "cursor" }
        ];

        let segIndex = 0;
        let charIndex = 0;
        let currentSpan = null;

        function typeCode() {
            if (segIndex < codeSegments.length) {
                const segment = codeSegments[segIndex];
                if (charIndex === 0) {
                    currentSpan = document.createElement("span");
                    if (segment.class) currentSpan.className = segment.class;
                    codeEl.appendChild(currentSpan);
                }
                const char = segment.text.charAt(charIndex);
                if (char === "\n") currentSpan.innerHTML += "<br>";
                else currentSpan.textContent += char;
                charIndex++;
                if (charIndex >= segment.text.length) {
                    segIndex++;
                    charIndex = 0;
                }
                setTimeout(typeCode, 20);
            }
        }
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) { typeCode(); observer.disconnect(); }
        });
        observer.observe(codeEl.parentElement);
    }

    /* 4. DEVICE 3D ANIMATION (Logica "Old" Ripristinata) */
    const device = document.getElementById('device3D');
    const pillarsContainer = document.getElementById('pillars-container');
    const wrapper = document.querySelector('.device-visual-wrapper');

    if(device && pillarsContainer && wrapper) {
        const totalPillars = 12;
        const radius = 130; 
        for (let i = 0; i < totalPillars; i++) {
            const pillar = document.createElement('div');
            pillar.classList.add('pillar');
            const angle = i * (360 / totalPillars);
            pillar.style.transform = `rotateZ(${angle}deg) translateY(${radius}px) rotateZ(-${angle}deg)`;
            pillarsContainer.appendChild(pillar);
        }
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = 60 - (y / 10);
            const rotateZ = (x / 10); 
            device.style.animation = 'none'; 
            device.style.transform = `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
        });
        wrapper.addEventListener('mouseleave', () => {
            device.style.animation = 'slowSpin 20s linear infinite';
        });
    }

    /* 5. HAMBURGER */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open'); hamburger.classList.toggle('toggle');
        });
        document.querySelectorAll('.nav-links li').forEach(l => l.addEventListener('click', () => {
            navLinks.classList.remove('open'); hamburger.classList.remove('toggle');
        }));
    }
});