// Filtrage des recettes par catégorie avec fonctionnalité toggle
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recetteCards = document.querySelectorAll('.recette-card');
    let activeFilter = 'all';

    // Initialiser l'animation pour les recette-card qui ne sont pas visibles initialement
    recetteCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (cardPosition > screenPosition) {
            // Carte hors de la vue initiale - initialiser l'animation
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease, display 0.3s ease';
        } else {
            // Carte déjà visible - pas d'animation
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
            card.style.transition = 'display 0.3s ease';
        }
    });

    // Fonction d'animation pour les cartes de recettes
    function animateRecettes() {
        recetteCards.forEach(card => {
            if (card.style.display !== 'none') {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }
            }
        });
    }

    // Animation initiale au chargement
    setTimeout(animateRecettes, 100);
    
    // Écouter le défilement pour animer les cartes au fur et à mesure
    window.addEventListener('scroll', animateRecettes);

    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Si on clique sur le filtre déjà actif, on réinitialise à "all"
            if (filterValue === activeFilter && filterValue !== 'all') {
                // Activer le filtre "all" à la place
                const allButton = document.querySelector('.filter-btn[data-filter="all"]');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                allButton.classList.add('active');
                activeFilter = 'all';
                
                // Afficher toutes les recettes
                recetteCards.forEach(card => {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                });
            } else {
                // Appliquer le nouveau filtre
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                activeFilter = filterValue;
                
                // Filtrer les recettes
                recetteCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            }
            
            // Réanimer les cartes après le filtrage
            setTimeout(animateRecettes, 50);
        });
    });
    

});