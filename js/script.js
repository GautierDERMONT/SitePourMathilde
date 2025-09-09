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

// Animation on scroll - EXCLURE les éléments déjà gérés par recettes.js
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .about-content, .contact-container, .timeline-item');
    
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

// Initialize elements for animation - EXCLURE les recette-card
document.querySelectorAll('.service-card, .pricing-card, .about-content, .contact-container, .timeline-item').forEach(element => {
    // Ne pas initialiser les recette-card qui sont déjà gérées par recettes.js
    if (!element.classList.contains('recette-card')) {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check on page load
window.addEventListener('load', animateOnScroll);