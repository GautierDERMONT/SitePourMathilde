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
    link.addEventListener('click', () => {
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
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


// Hero background carousel functionality
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

// Initialiser le carrousel au chargement de la page
document.addEventListener('DOMContentLoaded', initHeroCarousel);

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check on page load
window.addEventListener('load', animateOnScroll);