/* =========================================
   1. GESTIONE MENU HAMBURGER & NAVIGAZIONE
   ========================================= */
   const hamburger = document.querySelector(".hamburger");
   const navLinks = document.querySelector(".nav-links");
   const links = document.querySelectorAll(".nav-links li");
   
   // Apertura/Chiusura al click sul pulsante
   if (hamburger) {
       hamburger.addEventListener("click", () => {
           navLinks.classList.toggle("open");
           hamburger.classList.toggle("toggle");
       });
   }
   
   // Chiusura automatica quando si clicca un link
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
   
       // Controllo di sicurezza se gli elementi esistono
       if (!pillarsContainer || !device || !wrapper) return;
   
       // Generazione dinamica dei 12 pilastri
       const totalPillars = 12;
       const radius = 130; 
   
       for (let i = 0; i < totalPillars; i++) {
           const pillar = document.createElement('div');
           pillar.classList.add('pillar');
           // Calcolo posizione circolare
           const angle = i * (360 / totalPillars);
           pillar.style.transform = `rotateZ(${angle}deg) translateY(${radius}px) rotateZ(-${angle}deg)`;
           pillarsContainer.appendChild(pillar);
       }
   
       // Effetto Tilt interattivo col Mouse (Desktop)
       wrapper.addEventListener('mousemove', (e) => {
           const rect = wrapper.getBoundingClientRect();
           // Calcola la posizione del mouse relativa al centro del contenitore
           const x = e.clientX - rect.left - rect.width / 2;
           const y = e.clientY - rect.top - rect.height / 2;
           
           // Calcola rotazione (sensibilità ridotta diviso 10)
           const rotateX = 60 - (y / 10);
           const rotateZ = (x / 10);
   
           device.style.animation = 'none'; // Ferma rotazione automatica
           device.style.transform = `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
       });
   
       // Ripristina rotazione automatica quando il mouse esce
       wrapper.addEventListener('mouseleave', () => {
           device.style.animation = 'slowSpin 20s linear infinite';
       });
   }
   
   // Avvia la funzione
   initDevice();
   
   
   /* =========================================
      3. TYPEWRITER EFFECT (Terminale Codice)
      ========================================= */
   // Testo del codice simulato
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
       if (lineIndex < codeText.length) {
           const currentLine = codeText[lineIndex];
           
           // Gestione righe vuote
           if (currentLine === "") {
               typeWriterElement.innerHTML += "<br>";
               lineIndex++;
               setTimeout(typeWriter, 100);
               return;
           }
   
           // Scrittura riga
           typeWriterElement.innerHTML += currentLine + "<br>";
           lineIndex++;
           
           // Velocità di scrittura casuale per realismo
           const randomSpeed = Math.floor(Math.random() * 200) + 50;
           setTimeout(typeWriter, randomSpeed);
       }
   }
   
   // Intersection Observer: Fa partire l'animazione solo quando l'utente vede il terminale
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting && !isTypingStarted) {
               isTypingStarted = true;
               typeWriter();
           }
       });
   });
   
   const terminalBox = document.querySelector('.terminal-wrapper');
   if(terminalBox) {
       observer.observe(terminalBox);
   }