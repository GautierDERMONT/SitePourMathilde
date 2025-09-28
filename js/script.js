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
        // Fermer le menu mobile immédiatement
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // La navigation normale se fera via le href naturel du lien
        // Pas besoin de setTimeout ou de prévention du comportement par défaut
    });
});

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

// Animation on scroll - UNIFORMISÉ POUR TOUTES LES PAGES
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .about-content, .contact-container, .timeline-item, .accompaniment-item, .recette-card, .offer-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            // Element entre dans la vue
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            if (element.classList.contains('timeline-item')) {
                element.classList.add('visible');
            }
        }
    });
}

// Initialiser les éléments pour l'animation - VERSION AMÉLIORÉE
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .about-content, .contact-container, .timeline-item, .accompaniment-item, .recette-card, .offer-card');
    
    elements.forEach(element => {
        // Vérifier si l'élément est déjà visible au chargement
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition > screenPosition) {
            // Élément hors de la vue initiale - initialiser l'animation
            element.style.opacity = 0;
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        } else {
            // Élément déjà visible - pas d'animation initiale
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
            
            // Pour les éléments timeline, ajouter la classe visible si nécessaire
            if (element.classList.contains('timeline-item')) {
                element.classList.add('visible');
            }
        }
    });
}

// Écouter les événements de défilement
window.addEventListener('scroll', animateOnScroll);

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    // Vérifier une première fois au chargement
    setTimeout(animateOnScroll, 100);
});

// Réinitialiser les animations lors du redimensionnement
window.addEventListener('resize', function() {
    setTimeout(initScrollAnimations, 100);
    setTimeout(animateOnScroll, 150);
});





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





// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check on page load
window.addEventListener('load', animateOnScroll);


// Optimisation spécifique pour les images des cartes - CORRIGÉ
function optimizeCardImages() {
    const cards = document.querySelectorAll('.service-card, .accompaniment-item');
    
    cards.forEach(card => {
        // Appliquer l'accélération matérielle seulement aux conteneurs
        card.style.transform = 'translateZ(0)';
        card.style.willChange = 'transform';
        
        const img = card.querySelector('img');
        if (img) {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                img.addEventListener('error', function() {
                    this.style.opacity = '1';
                });
            }
        }
        
        // S'assurer que le texte reste net
        const content = card.querySelector('.service-content, .accompaniment-content');
        if (content) {
            content.style.transform = 'translateZ(0)';
            content.style.webkitFontSmoothing = 'auto';
            content.style.mozOsxFontSmoothing = 'auto';
            content.style.textRendering = 'auto';
        }
    });
}

// FONCTION SPÉCIFIQUE POUR LES IMAGES DE NAVIGATION
function optimizeNavigationImages() {
    const navImages = document.querySelectorAll('.simple-nav-image img');
    
    // Préchargement intelligent
    navImages.forEach((img, index) => {
        // Donner la priorité aux images visibles
        if (index < 4) { // Premières images
            img.loading = 'eager';
        } else {
            img.loading = 'lazy';
        }
        
        // S'assurer que les images sont bien chargées
        if (!img.complete) {
            img.onload = function() {
                this.style.opacity = 1;
            };
            img.style.opacity = 0;
        }
    });
}

// Appeler cette fonction après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    optimizeNavigationImages();
    
    // Re-optimiser après un délai pour les images retardataires
    setTimeout(optimizeNavigationImages, 1000);
});

// Bouton de retour en haut avec progression - VERSION ULTRA RAPIDE
// Bouton de retour en haut avec progression - VERSION CORRIGÉE
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
    let docHeight = 0;
    let ticking = false;
    
    // Fonction pour calculer la hauteur du document
    function calculateDocHeight() {
        docHeight = Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight,
            document.body.offsetHeight, 
            document.documentElement.offsetHeight,
            document.body.clientHeight, 
            document.documentElement.clientHeight
        ) - window.innerHeight;
        
        // S'assurer que docHeight est au moins 1 pour éviter la division par zéro
        docHeight = Math.max(docHeight, 1);
    }
    
    // Calculer la hauteur initiale
    calculateDocHeight();
    
    // Recalculer la hauteur du document lors du redimensionnement et du chargement complet
    window.addEventListener('resize', calculateDocHeight);
    window.addEventListener('load', calculateDocHeight);
    
    // Fonction ultra-optimisée pour mettre à jour le bouton
    function updateBackToTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mise à jour de la visibilité
        if (scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Mise à jour de la barre de progression avec limite à 100%
        let scrollProgress = (scrollTop / docHeight) * 100;
        scrollProgress = Math.min(scrollProgress, 100); // Ne pas dépasser 100%
        
        progressFill.style.strokeDashoffset = 100 - scrollProgress;
        
        ticking = false;
    }
    
    // Gestionnaire de défilement optimisé
    window.addEventListener('scroll', () => {
        if (!ticking) {
            // Recalculer occasionnellement la hauteur (toutes les 50 scrolls environ)
            if (window.scrollY % 500 === 0) {
                calculateDocHeight();
            }
            
            updateBackToTopButton();
            ticking = true;
            
            // Réinitialiser après un court délai
            setTimeout(() => {
                ticking = false;
            }, 20);
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
    
    // Recalculer après le chargement complet de la page
    window.addEventListener('load', function() {
        setTimeout(() => {
            calculateDocHeight();
            updateBackToTopButton();
        }, 500);
    });
}

// Initialiser le bouton au chargement de la page
document.addEventListener('DOMContentLoaded', initBackToTopButton);