/* =========================================
   1. GESTIONE MENU HAMBURGER & NAVIGAZIONE
   ========================================= */
   const hamburger = document.querySelector(".hamburger");
   const navLinks = document.querySelector(".nav-links");
   const links = document.querySelectorAll(".nav-links li");
   
   if (hamburger) {
       hamburger.addEventListener("click", () => {
           navLinks.classList.toggle("open");
           hamburger.classList.toggle("toggle");
       });
   }
   
   links.forEach(link => {
       link.addEventListener("click", () => {
           navLinks.classList.remove("open");
           hamburger.classList.remove("toggle");
       });
   });
   
   /* =========================================
      2. DISPOSITIVO PHYGITAL 3D (Generazione & Animazione)
      ========================================= */
   function initDevice() {
       const pillarsContainer = document.getElementById('pillars-container');
       const device = document.getElementById('device3D');
       const wrapper = document.querySelector('.device-visual-wrapper');
   
       if (!pillarsContainer || !device || !wrapper) return;
   
       const totalPillars = 12;
       const radius = 130; 
   
       for (let i = 0; i < totalPillars; i++) {
           const pillar = document.createElement('div');
           pillar.classList.add('pillar');
           // I pilastri vengono posizionati assolutamente rispetto al centro
           // grazie al CSS che centra .pillar con top/left/bottom/right:0 e margin:auto
           const angle = i * (360 / totalPillars);
           // Aggiungiamo la traslazione radiale
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
   initDevice();
   
   /* =========================================
      3. TYPEWRITER EFFECT (Terminale Codice)
      ========================================= */
   const codeText = [
       `<span class="code-keyword">class</span> Musigramma <span class="code-keyword">extends</span> <span class="code-function">Startup</span> {`,
       `  <span class="code-keyword">constructor</span>() {`,
       `    <span class="code-keyword">this</span>.mission = <span class="code-string">"Phygital Education"</span>;`,
       `    <span class="code-keyword">this</span>.tool = <span class="code-string">"Analog Device"</span>;`,
       `    <span class="code-keyword">this</span>.humanConnected = <span class="code-keyword">true</span>;`,
       `  }`,
       ``,
       `  <span class="code-function">learn</span>(user) {`,
       `    <span class="code-comment">// Connecting hand & mind...</span>`,
       `    <span class="code-keyword">if</span> (user.touch === <span class="code-keyword">true</span>) {`,
       `      <span class="code-keyword">return</span> <span class="code-function">Harmony</span>();`,
       `    }`,
       `  }`,
       `}`
   ];
   
   const typeWriterElement = document.getElementById('typewriter');
   let lineIndex = 0;
   let isTypingStarted = false;
   
   function typeWriter() {
       if (!typeWriterElement) return;
       if (lineIndex < codeText.length) {
           const currentLine = codeText[lineIndex];
           if (currentLine === "") {
               typeWriterElement.innerHTML += "<br>";
               lineIndex++;
               setTimeout(typeWriter, 100);
               return;
           }
           typeWriterElement.innerHTML += currentLine + "<br>";
           lineIndex++;
           const randomSpeed = Math.floor(Math.random() * 200) + 50;
           setTimeout(typeWriter, randomSpeed);
       }
   }
   
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting && !isTypingStarted) {
               isTypingStarted = true;
               typeWriter();
           }
       });
   });
   const terminalBox = document.querySelector('.terminal-wrapper');
   if(terminalBox) observer.observe(terminalBox);

 /* =========================================
   4. HERO BACKGROUND: RISING DATA FLOW
   ========================================= */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    
    // Mouse interaction
    const mouse = {
        x: null,
        y: null,
        radius: 150 // Raggio di interazione
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; // Dimensione base
            this.baseX = this.x;
            this.baseY = this.y;
            // Velocità di salita (più è alta, più sono veloci)
            this.speedY = Math.random() * 0.5 + 0.2; 
            // Opacità casuale per profondità
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Colore Ciano Neon con opacità variabile
            ctx.fillStyle = 'rgba(0, 243, 255,' + this.opacity + ')';
            ctx.fill();
        }

        update() {
            // Movimento verso l'alto
            this.y -= this.speedY;

            // Se esce dallo schermo in alto, riappare sotto
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }

            // Interazione col Mouse (Effetto "Scan")
            // Calcola distanza tra mouse e particella
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                // Se il mouse è vicino, la particella diventa più grande e luminosa
                const scale = (mouse.radius - distance) / mouse.radius;
                this.size = (Math.random() * 2 + 0.5) + (scale * 3); // Ingrandisce
                this.opacity = 0.8; // Diventa luminosa
            } else {
                // Torna normale
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Numero particelle (più alto = più denso)
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        // Pulisce il canvas lasciando una scia quasi impercettibile (effetto motion blur)
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animate();
}  