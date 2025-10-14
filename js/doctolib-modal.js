document.addEventListener('DOMContentLoaded', function() {
    console.log('Doctolib modal script loaded');
    
    const doctolibModal = document.getElementById('doctolibModal');
    const doctolibLinks = document.querySelectorAll('.doctolib-logo-link, .doctolib-footer-logo a');
    const doctolibContinue = document.getElementById('doctolibContinue');
    const doctolibClose = document.querySelector('.doctolib-modal-close');
    
    console.log('Elements found:', {
        modal: doctolibModal,
        links: doctolibLinks.length,
        continueBtn: doctolibContinue,
        closeBtn: doctolibClose
    });
    
    let targetUrl = '';
    
    // Vérifier que tous les éléments existent
    if (!doctolibModal || !doctolibContinue || !doctolibClose) {
        console.error('Elements manquants pour la modale Doctolib');
        return;
    }
    
    // Gérer le clic sur les liens Doctolib
    doctolibLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Doctolib link clicked:', this.href);
            targetUrl = this.href;
            showDoctolibModal();
        });
    });
    
    // Afficher la modale
    function showDoctolibModal() {
        console.log('Showing modal');
        doctolibModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Cacher la modale
    function hideDoctolibModal() {
        console.log('Hiding modal');
        doctolibModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Continuer vers Doctolib - CORRECTION ICI
    doctolibContinue.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Continue to Doctolib:', targetUrl);
        
        // D'abord ouvrir le lien
        if (targetUrl) {
            console.log('Opening URL:', targetUrl);
            window.open(targetUrl, '_blank');
        }
        
        // Puis fermer la modale
        hideDoctolibModal();
    });
    
    // Fermer avec la croix
    doctolibClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        hideDoctolibModal();
    });
    
    // Fermer en cliquant en dehors de la modale
    doctolibModal.addEventListener('click', function(e) {
        if (e.target === doctolibModal) {
            hideDoctolibModal();
        }
    });
    
    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && doctolibModal.style.display === 'flex') {
            hideDoctolibModal();
        }
    });
    
    console.log('Doctolib modal handlers registered');
});