// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Empêcher le comportement par défaut qui pourrait causer des problèmes
        e.preventDefault();
        
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Navigation manuelle après un court délai
        const targetUrl = link.getAttribute('href');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message! Je vous répondrai très rapidement.');
        this.reset();
    });
}

// Smooth scrolling for anchor links (seulement sur la page d'accueil)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    }
});

// Animation on scroll - EXCLURE les éléments déjà visibles à l'écran sur les pages spécifiques
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .about-content, .contact-container, .timeline-item');
    
    // Vérifier si nous sommes sur une page où on veut désactiver les animations initiales
    const isTargetPage = window.location.pathname.includes('recettes') || 
                         window.location.pathname.includes('tarifs') || 
                         window.location.pathname.includes('contact');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
            if (element.classList.contains('timeline-item')) {
                element.classList.add('visible');
            }
        }
    });
}

// Initialize elements for animation - EXCLURE les éléments déjà visibles sur les pages spécifiques
document.querySelectorAll('.service-card, .pricing-card, .about-content, .contact-container, .timeline-item').forEach(element => {
    // Vérifier si nous sommes sur une page cible
    const isTargetPage = window.location.pathname.includes('recettes') || 
                         window.location.pathname.includes('tarifs') || 
                         window.location.pathname.includes('contact');
    
    if (isTargetPage) {
        // Sur les pages cibles, vérifier si l'élément est déjà visible
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition > screenPosition) {
            // Élément hors de la vue initiale - initialiser l'animation
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        } else {
            // Élément déjà visible - pas d'animation
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
            element.style.transition = 'none';
        }
    } else {
        // Sur les autres pages, garder l'animation normale
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
});


// Hero background carousel functionality - VERSION CORRIGÉE
function initHeroCarousel() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const slides = document.querySelectorAll('.hero-bg-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Initialiser toutes les slides comme invisibles sauf la première
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.opacity = 0;
            slide.classList.remove('active');
        } else {
            slide.style.opacity = 1;
            slide.classList.add('active');
        }
    });
    
    function showNextSlide() {
        // Masquer la slide actuelle avec transition
        slides[currentSlide].style.opacity = 0;
        slides[currentSlide].classList.remove('active');
        
        // Passer à la slide suivante
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Afficher la nouvelle slide avec transition
        setTimeout(() => {
            slides[currentSlide].style.opacity = 1;
            slides[currentSlide].classList.add('active');
        }, 50); // Petit délai pour permettre la transition
    }
    
    // Changer de slide toutes les 5 secondes
    setInterval(showNextSlide, 5000);
}






// Navigation background carousel functionality - VERSION CORRIGÉE
function initNavigationCarousel() {
    const navigationSection = document.querySelector('.navigation-section');
    if (!navigationSection) return;
    
    const slides = document.querySelectorAll('.navigation-bg-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Initialiser toutes les slides comme invisibles sauf la première
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.opacity = 0;
            slide.classList.remove('active');
        } else {
            slide.style.opacity = 1;
            slide.classList.add('active');
        }
    });
    
    function showNextSlide() {
        // Masquer la slide actuelle avec transition
        slides[currentSlide].style.opacity = 0;
        slides[currentSlide].classList.remove('active');
        
        // Passer à la slide suivante
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Afficher la nouvelle slide avec transition
        setTimeout(() => {
            slides[currentSlide].style.opacity = 1;
            slides[currentSlide].classList.add('active');
        }, 50);
    }
    
    // Changer de slide toutes les 5 secondes
    setInterval(showNextSlide, 5000);
}

// Lazy loading amélioré pour toutes les images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            // Stocker la source originale dans data-src
            if (!img.dataset.src) {
                img.dataset.src = img.src;
            }
            imageObserver.observe(img);
        });
    }
}

// Appeler cette fonction au chargement du DOM
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Lazy loading pour les images de fond
function lazyLoadBackgroundImages() {
    const backgroundSlides = document.querySelectorAll('[data-bg]');
    
    const loadImage = (slide) => {
        const imageUrl = slide.getAttribute('data-bg');
        const img = new Image();
        
        img.src = imageUrl;
        img.onload = () => {
            slide.style.backgroundImage = `url('${imageUrl}')`;
            slide.classList.add('loaded');
        };
        
        img.onerror = () => {
            console.error(`Erreur de chargement de l'image: ${imageUrl}`);
        };
    };
    
    // Options pour l'Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Callback pour l'Observer
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer l'Observer et observer chaque slide
    const observer = new IntersectionObserver(handleIntersection, options);
    backgroundSlides.forEach(slide => {
        observer.observe(slide);
    });
    
    // Charger immédiatement la première slide active
    const activeSlide = document.querySelector('.hero-bg-slide.active');
    if (activeSlide && activeSlide.hasAttribute('data-bg')) {
        loadImage(activeSlide);
    }
}

// Appeler la fonction au chargement du DOM
document.addEventListener('DOMContentLoaded', lazyLoadBackgroundImages);



// Initialiser les deux carrousels au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initHeroCarousel();
    initNavigationCarousel();
});

// Initialiser le carrousel au chargement de la page
document.addEventListener('DOMContentLoaded', initHeroCarousel);

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check on page load
window.addEventListener('load', animateOnScroll);


// Bouton de retour en haut avec progression - VERSION ULTRA RAPIDE
function initBackToTopButton() {
    // Créer l'élément du bouton
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Retour en haut de la page');
    
    // Structure SVG pour la barre de progression circulaire (autour du bouton)
    backToTopButton.innerHTML = `
        <div class="progress-container">
            <svg class="progress-ring" viewBox="0 0 64 64">
                <circle class="progress-bg" cx="32" cy="32" r="30" pathLength="100"></circle>
                <circle class="progress-fill" cx="32" cy="32" r="30" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"></circle>
            </svg>
            <div class="progress-icon">
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                </svg>
            </div>
        </div>
    `;
    
    // Ajouter le bouton au body
    document.body.appendChild(backToTopButton);
    
    // Références aux éléments DOM
    const progressFill = backToTopButton.querySelector('.progress-fill');
    
    // Variables pour optimisation
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let ticking = false;
    
    // Recalculer la hauteur du document lors du redimensionnement
    window.addEventListener('resize', () => {
        docHeight = document.documentElement.scrollHeight - window.innerHeight;
    });
    
    // Fonction ultra-optimisée pour mettre à jour le bouton
    function updateBackToTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mise à jour de la visibilité
        if (scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Mise à jour de la barre de progression (calcul simplifié)
        const scrollProgress = (scrollTop / docHeight) * 100;
        progressFill.style.strokeDashoffset = 100 - scrollProgress;
        
        ticking = false;
    }
    
    // Gestionnaire de défilement optimisé
    window.addEventListener('scroll', () => {
        if (!ticking) {
            // Utilisation directe sans requestAnimationFrame pour plus de réactivité
            updateBackToTopButton();
            ticking = true;
            
            // Réinitialiser après un court délai
            setTimeout(() => {
                ticking = false;
            }, 20); // Limiter à 50 appels par seconde maximum
        }
    }, { passive: true });
    
    // Événement de clic sur le bouton
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialiser l'état du bouton
    updateBackToTopButton();
}

// Initialiser le bouton au chargement de la page
document.addEventListener('DOMContentLoaded', initBackToTopButton);