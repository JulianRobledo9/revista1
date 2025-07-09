// Navegación smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto parallax en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled <= hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll(
        '.timeline-content, .analysis-card, .competitor-card, .swot-quadrant, .p-card, .strategy-card, .tech-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar transparente/sólido en scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0,0,0,0.9)';
        } else {
            navbar.style.background = 'rgba(0,0,0,0.2)';
        }
    });

    // Contador animado para estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.digital-stat h3, .stat h3, .market-share, .percentage');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                let originalText = counter.textContent;
                
                // Mantener formato original
                if (originalText.includes('M')) {
                    counter.textContent = displayValue + 'M+';
                } else if (originalText.includes('B')) {
                    counter.textContent = displayValue + 'B';
                } else if (originalText.includes('%')) {
                    counter.textContent = displayValue + '%';
                } else if (originalText.includes('+')) {
                    counter.textContent = displayValue + '+';
                } else {
                    counter.textContent = displayValue;
                }
            }, 20);
        });
    }

    // Animación de barras de mercado
    function animateMarketBars() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                bar.style.transition = 'width 1.5s ease-out';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    // Intersection Observer para contadores y barras
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('digital-stats') || 
                    entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                if (entry.target.classList.contains('market-bars')) {
                    animateMarketBars();
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observar secciones de estadísticas
    const statsElements = document.querySelectorAll('.digital-stats, .hero-stats, .market-bars');
    statsElements.forEach(el => {
        statsObserver.observe(el);
    });

    // Efecto hover en cards
    const cards = document.querySelectorAll('.competitor-card, .p-card, .strategy-card, .analysis-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Efecto typewriter para el título
    function typewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }

    // Iniciar efecto typewriter después de un delay
    setTimeout(typewriterEffect, 1000);

    // Animación de entrada para elementos
    const style = document.createElement('style');
    style.textContent = `
        .timeline-content, .analysis-card, .competitor-card, 
        .swot-quadrant, .p-card, .strategy-card, .tech-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .timeline-content.animate-in, .analysis-card.animate-in, 
        .competitor-card.animate-in, .swot-quadrant.animate-in, 
        .p-card.animate-in, .strategy-card.animate-in, .tech-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(even) .timeline-content {
            transform: translateX(30px) translateY(30px);
        }
        
        .timeline-item:nth-child(odd) .timeline-content {
            transform: translateX(-30px) translateY(30px);
        }
        
        .timeline-item:nth-child(even) .timeline-content.animate-in,
        .timeline-item:nth-child(odd) .timeline-content.animate-in {
            transform: translateX(0) translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Loading animation
    function showLoadingComplete() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    // Mostrar página cuando esté completamente cargada
    window.addEventListener('load', showLoadingComplete);

    // Smooth scroll para el indicador de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.author-bio');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Efecto de partículas en el hero (opcional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255,255,255,${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s infinite linear;
            `;
            particlesContainer.appendChild(particle);
        }
        
        hero.appendChild(particlesContainer);
    }

    createParticles();

    // Efecto de escritura en tiempo real para las descripciones
    function typeText(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Aplicar efecto de escritura a elementos específicos cuando sean visibles
    const typeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const originalText = element.textContent;
                typeText(element, originalText, 30);
                typeObserver.unobserve(element);
            }
        });
    }, { threshold: 0.8 });

    // Observar descripciones para efecto de escritura
    const typeElements = document.querySelectorAll('.hero-description, .author-info .description');
    typeElements.forEach(el => {
        const originalText = el.textContent;
        el.setAttribute('data-text', originalText);
        typeObserver.observe(el);
    });

    // Cursor personalizado para elementos interactivos
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #DC143C;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Cambiar cursor en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .p-card, .competitor-card, .strategy-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = '#DC143C';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
});

// Función para mostrar/ocultar información adicional
function toggleInfo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

// Funciones de utilidad para efectos adicionales
function addGlowEffect(element) {
    element.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.5)';
}

function removeGlowEffect(element) {
    element.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
}

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > 10) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        // Activar modo "Classic Coke"
        document.body.style.filter = 'sepia(1) hue-rotate(320deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Mostrar mensaje
        const message = document.createElement('div');
        message.textContent = '🥤 ¡Classic Coke Mode Activated! 🥤';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #DC143C;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-size: 1.2rem;
            font-weight: bold;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});