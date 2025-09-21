// Gestion des modales
document.addEventListener('DOMContentLoaded', function() {
    // Ouvrir la modale des crédits
    const creditsLink = document.querySelector('a[data-modal="modal-credits"]');
    if (creditsLink) {
        creditsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('modal-credits');
        });
    }

    // Ouvrir la modale de politique de confidentialité
    const policyLink = document.querySelector('a[data-modal="modal-policy"]');
    if (policyLink) {
        policyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('modal-policy');
        });
    }

    // Fermer les modales
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            closeModals();
        });
    });

    // Fermer en cliquant en dehors du contenu
    document.querySelectorAll('.modal-credits').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModals();
            }
        });
    });

    // Fonction pour ouvrir une modale spécifique
    function openModal(modalId) {
        closeModals(); // Fermer d'abord toutes les modales
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Empêcher le défilement
        }
    }

    // Fonction pour fermer toutes les modales
    function closeModals() {
        document.querySelectorAll('.modal-credits').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = ''; // Rétablir le défilement
    }

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
});