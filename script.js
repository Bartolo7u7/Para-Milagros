document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const initialScreen = document.getElementById('initial-screen');
    const mainScene = document.getElementById('main-scene');
    const message = document.getElementById('message');
    const bouquet = document.querySelector('.bouquet-container');
    const composition = document.getElementById('composition');
    const photoContainers = document.querySelectorAll('.photo-container');
    const carouselTrack = document.getElementById('carousel-track');

    // Initialize photos
    const photos = [
        "WhatsApp Image 2026-09-21 at 14.00.39.jpeg",
        "WhatsApp Image 2026-09-21 at 14.00.39 (1).jpeg",
        "WhatsApp Image 2026-09-21 at 14.00.39 (2).jpeg",
        "WhatsApp Image 2026-09-21 at 14.00.39 (3).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.54.jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.54 (1).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.54 (2).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.54 (3).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.54 (4).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.55.jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.55 (1).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.55 (2).jpeg",
        "WhatsApp Image 2026-09-21 at 14.47.56.jpeg"
    ];

    function createPhotoElement(src) {
        return `
            <div class="photo-container">
                <div class="heart-mask">
                    <img src="${src}" alt="Fotografía">
                </div>
            </div>
        `;
    }

    // Insert 2 copies of all photos for seamless scroll
    const allPhotosHTML = photos.map(createPhotoElement).join('');
    carouselTrack.innerHTML = allPhotosHTML + allPhotosHTML;

    // Initialize Message for letter-by-letter reveal
    const messageText = "Te amo Milagros";
    message.innerHTML = `
        <span class="heart-side">💛</span>
        ${messageText.split('').map(char => {
        if (char === ' ') return '<span>&nbsp;</span>';
        return `<span class="letter">${char}</span>`;
    }).join('')}
        <span class="heart-side">💛</span>
    `;

    let isStarted = false;
    let particleInterval, petalInterval;

    startBtn.addEventListener('click', () => {
        if (isStarted) return;
        isStarted = true;

        // 0.0s - Iniciar secuencia
        startBtn.style.opacity = '0';
        startBtn.style.pointerEvents = 'none';

        // Play music
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.volume = 0.5; // Start with a nice volume
            bgMusic.play().catch(e => console.log('Audio autoplay blocked:', e));
        }

        setTimeout(() => {
            initialScreen.classList.remove('visible');
            mainScene.classList.add('visible');
            startParticleSystem();
        }, 800); // fade out duration

        // Timeline as requested:

        // 1.5s - 3.5s | Pétalos y flores
        setTimeout(() => {
            startPetalSystem();
        }, 1500);

        // 3.5s - 5.0s | Preparación (Reducir fondo)
        setTimeout(() => {
            clearInterval(particleInterval);
            // keep petals coming
        }, 3500);

        // 5.0s - 7.0s | Aparición del mensaje
        setTimeout(() => {
            message.classList.remove('hidden');
            message.classList.add('show');
            const letters = message.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('visible');
                }, index * 80); // 80ms delay per letter
            });

            // Reveal hearts after the letters finish
            const totalDelay = letters.length * 80;
            setTimeout(() => {
                const hearts = message.querySelectorAll('.heart-side');
                hearts.forEach(heart => heart.classList.add('visible'));
            }, totalDelay + 300); // wait 300ms after text
        }, 5000);

        // 7.0s - 7.5s | Pausa emocional (No se hace nada activo, es solo mantener)

        // 7.5s | Aparición del ramo
        setTimeout(() => {
            message.classList.add('move-up');
            composition.classList.remove('hidden');
            bouquet.classList.add('show');

            // Show photos carousel
            const carousel = document.getElementById('photos-carousel');
            carousel.classList.remove('hidden');
            carousel.classList.add('show');
        }, 7500);

        // 10.5 - 12+s | Escena Final
        setTimeout(() => {
            // Keep a slower steady flow of petals for the final scene
            clearInterval(petalInterval);
            setInterval(createPetal, 600); // Aumentado la cantidad en la escena final
        }, 10500);
    });

    function startParticleSystem() {
        createParticle();
        particleInterval = setInterval(createParticle, 200);
    }

    function startPetalSystem() {
        createPetal();
        petalInterval = setInterval(createPetal, 150); // Genera más rosas (antes 300)
    }

    function createParticle() {
        const container = document.getElementById('particles-container');
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 4 + 4; // 4 to 8s
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Lightbox logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    carouselTrack.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightbox.classList.add('show');
            }, 10);
        }
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.classList.add('hidden');
            }, 400);
        }
    });

    function createPetal() {
        const container = document.getElementById('petals-container');
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.innerText = '🌹'; // Rosa que será pintada de amarillo por CSS

        const size = Math.random() * 30 + 30; // 30px a 60px (Rosas más grandes)
        petal.style.fontSize = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 5 + 5; // 5 to 10s
        petal.style.animationDuration = `${duration}s`;

        container.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Bouquet Confetti Interaction
    bouquet.addEventListener('click', () => {
        // Obtenemos la posición central del ramo
        const rect = bouquet.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // Disparamos 25 rosas de confeti
        for (let i = 0; i < 25; i++) {
            createConfettiRose(originX, originY);
        }
    });

    function createConfettiRose(x, y) {
        const rose = document.createElement('div');
        rose.classList.add('confetti-rose');
        rose.innerText = '🌹'; // Pintada de amarillo en CSS

        rose.style.left = `${x}px`;
        rose.style.top = `${y}px`;

        // Dirección y fuerza aleatorias (explosión en 360 grados)
        const angle = Math.random() * Math.PI * 2; // Círculo completo
        const distance = Math.random() * 250 + 100; // Radio de 100px a 350px

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        const scale = Math.random() * 0.6 + 0.6; // Tamaño variable entre 0.6 y 1.2
        const rotation = Math.random() * 720 - 360; // Rotación aleatoria

        rose.style.setProperty('--tx', `${tx}px`);
        rose.style.setProperty('--ty', `${ty}px`);
        rose.style.setProperty('--s', scale);
        rose.style.setProperty('--r', `${rotation}deg`);

        rose.style.fontSize = `${Math.random() * 20 + 20}px`;

        document.body.appendChild(rose);

        // Limpiamos el DOM después de la animación
        setTimeout(() => {
            rose.remove();
        }, 1500);
    }
});
