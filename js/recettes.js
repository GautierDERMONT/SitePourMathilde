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

        // Données des recettes (normalement viendraient d'une base de données)
    const recettesData = {
        "recette1": {
            title: "Bowl petit-déjeuner énergétique",
            category: "Petit-déjeuner",
            image: "data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'&gt;&lt;rect width='400' height='300' fill='%23F9EBE7'/&gt;&lt;text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23333'&gt;Bowl petit-déjeuner&lt;/text&gt;&lt;/svg&gt;",
            calories: "350 kcal",
            protein: "12 g",
            carbs: "55 g",
            fat: "8 g",
            ingredients: [
                "40g de flocons d'avoine",
                "150ml de lait d'amande",
                "1 banane",
                "1 cuillère à soupe de graines de chia",
                "1 cuillère à café de miel",
                "50g de fruits rouges frais",
                "10g de noix concassées"
            ],
            instructions: [
                "Mélanger les flocons d'avoine avec le lait d'amande dans un bol.",
                "Ajouter les graines de chia et bien remuer.",
                "Laisser reposer 10 minutes au réfrigérateur.",
                "Peler et couper la banane en rondelles.",
                "Ajouter la banane, les fruits rouges et les noix sur le mélange d'avoine.",
                "Arroser de miel et servir frais."
            ]
        },
        "recette2": {
            title: "Salade complète aux légumes de saison",
            category: "Déjeuner",
            image: "data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'&gt;&lt;rect width='400' height='300' fill='%23F9EBE7'/&gt;&lt;text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23333'&gt;Salade complète&lt;/text&gt;&lt;/svg&gt;",
            calories: "420 kcal",
            protein: "25 g",
            carbs: "35 g",
            fat: "18 g",
            ingredients: [
                "100g de mélange de salade verte",
                "1 poignée de roquette",
                "1/2 concombre",
                "1 tomate",
                "1/2 avocat",
                "50g de feta",
                "100g de poulet grillé",
                "1 cuillère à soupe d'huile d'olive",
                "Jus de 1/2 citron",
                "Sel et poivre"
            ],
            instructions: [
                "Laver et sécher la salade et la roquette.",
                "Couper le concombre, la tomate et l'avocat en dés.",
                "Émietter la feta.",
                "Préparer la vinaigrette en mélangeant l'huile d'olive, le jus de citron, le sel et le poivre.",
                "Disposer la salade dans un grand bol.",
                "Ajouter les légumes, le poulet et la feta.",
                "Arroser de vinaigrette et mélanger délicatement."
            ]
        },
        "recette3": {
            title: "Curry de légumes et pois chiches",
            category: "Dîner",
            image: "data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'&gt;&lt;rect width='400' height='300' fill='%23F9EBE7'/&gt;&lt;text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23333'&gt;Curry végétarien&lt;/text&gt;&lt;/svg&gt;",
            calories: "380 kcal",
            protein: "15 g",
            carbs: "60 g",
            fat: "10 g",
            ingredients: [
                "1 boîte de pois chiches (400g)",
                "1 aubergine",
                "1 courgette",
                "1 poivron",
                "1 oignon",
                "2 gousses d'ail",
                "400ml de lait de coco light",
                "2 cuillères à soupe de pâte de curry",
                "1 cuillère à café de curcuma",
                "Huile d'olive",
                "Coriandre fraîche"
            ],
            instructions: [
                "Émincer l'oignon et l'ail, les faire revenir dans une grande poêle avec un peu d'huile.",
                "Couper les légumes en dés et les ajouter dans la poêle.",
                "Ajouter la pâte de curry et le curcuma, bien mélanger.",
                "Incorporer les pois chiches égouttés et le lait de coco.",
                "Saler, poivrer et laisser mijoter 20 minutes à feu doux.",
                "Parsemer de coriandre fraîche avant de servir."
            ]
        },
        "recette4": {
            title: "Energy balls aux fruits secs",
            category: "Collation",
            image: "data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'&gt;&lt;rect width='400' height='300' fill='%23F9EBE7'/&gt;&lt;text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23333'&gt;Energy balls&lt;/text&gt;&lt;/svg&gt;",
            calories: "90 kcal/pièce",
            protein: "3 g",
            carbs: "12 g",
            fat: "4 g",
            ingredients: [
                "150g de dattes dénoyautées",
                "100g d'amandes",
                "50g de noix de cajou",
                "2 cuillères à soupe de graines de lin",
                "1 cuillère à soupe de cacao en poudre",
                "1 pincée de sel",
                "Noix de coco râpée pour enrober"
            ],
            instructions: [
                "Mixer les amandes et les noix de cajou jusqu'à obtention d'une texture granuleuse.",
                "Ajouter les dattes, les graines de lin, le cacao et le sel.",
                "Mixer jusqu'à ce que la préparation forme une boule.",
                "Former des petites boules avec les mains.",
                "Rouler les boules dans la noix de coco râpée.",
                "Conserver au réfrigérateur pendant au moins 1 heure avant de déguster."
            ]
        },
        "recette5": {
            title: "Mousse au chocolat allégée",
            category: "Dessert",
            image: "data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'&gt;&lt;rect width='400' height='300' fill='%23F9EBE7'/&gt;&lt;text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23333'&gt;Mousse chocolat&lt;/text&gt;&lt;/svg&gt;",
            calories: "120 kcal",
            protein: "6 g",
            carbs: "10 g",
            fat: "7 g",
            ingredients: [
                "100g de chocolat noir à 70%",
                "2 œufs",
                "1 cuillère à soupe de sucre de coco",
                "1 pincée de sel",
                "Quelques framboises pour la décoration"
            ],
            instructions: [
                "Faire fondre le chocolat au bain-marie.",
                "Séparer les blancs des jaunes d'œufs.",
                "Mélanger les jaunes avec le sucre de coco jusqu'à ce que le mélange blanchisse.",
                "Incorporer le chocolat fondu refroidi.",
                "Monter les blancs en neige ferme avec une pincée de sel.",
                "Incorporer délicatement les blancs en neige au mélange chocolat.",
                "Répartir dans des verrines et réfrigérer au moins 4 heures.",
                "Décorer avec des framboises avant de servir."
            ]
        },
        "recette6": {
            title: "Wraps légers aux crudités",
            category: "Déjeuner",
            image: "data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'&gt;&lt;rect width='400' height='300' fill='%23F9EBE7'/&gt;&lt;text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23333'&gt;Wrap healthy&lt;/text&gt;&lt;/svg&gt;",
            calories: "280 kcal",
            protein: "15 g",
            carbs: "35 g",
            fat: "9 g",
            ingredients: [
                "2 wraps complets",
                "100g de houmous",
                "1 carotte",
                "1/2 concombre",
                "1 poignée de pousses d'épinards",
                "1/2 avocat",
                "Quelques feuilles de menthe",
                "Jus de citron"
            ],
            instructions: [
                "Étaler le houmous sur les wraps.",
                "Râper la carotte et couper le concombre en fines lamelles.",
                "Écraser l'avocat à la fourchette avec un peu de jus de citron.",
                "Disposer les légumes, les pousses d'épinards et l'avocat sur les wraps.",
                "Ajouter quelques feuilles de menthe.",
                "Replier les bords et rouler serré.",
                "Couper en deux et servir frais."
            ]
        }
    };

    // Gestion des modals
    const modal = document.getElementById('recette-modal');
    const closeModal = document.querySelector('.close-modal');
    const recetteButtons = document.querySelectorAll('.recette-btn');

    // Ouvrir le modal avec les données de la recette
    recetteButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const recetteId = 'recette' + (index + 1);
            const recette = recettesData[recetteId];
            
            if (recette) {
                document.getElementById('modal-title').textContent = recette.title;
                document.getElementById('modal-category').textContent = recette.category;
                document.getElementById('modal-image').src = recette.image;
                document.getElementById('modal-image').alt = recette.title;
                document.getElementById('modal-calories').textContent = recette.calories;
                document.getElementById('modal-protein').textContent = recette.protein;
                document.getElementById('modal-carbs').textContent = recette.carbs;
                document.getElementById('modal-fat').textContent = recette.fat;
                
                // Ajouter les ingrédients
                const ingredientsList = document.getElementById('modal-ingredients');
                ingredientsList.innerHTML = '';
                recette.ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    ingredientsList.appendChild(li);
                });
                
                // Ajouter les instructions
                const instructionsList = document.getElementById('modal-instructions');
                instructionsList.innerHTML = '';
                recette.instructions.forEach(instruction => {
                    const li = document.createElement('li');
                    li.textContent = instruction;
                    instructionsList.appendChild(li);
                });
                
                // Afficher le modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Empêcher le défilement
            }
        });
    });

    // Fermer le modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactiver le défilement
    });

    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Fermer le modal avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    

});