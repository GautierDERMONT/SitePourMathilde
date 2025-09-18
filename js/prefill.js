// prefill.js - Gestion du préremplissage du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si nous sommes sur la page de contact
    if (window.location.pathname.includes('contact.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const offerType = urlParams.get('offer');
        
        if (offerType) {
            // Attendre que le formulaire soit chargé
            setTimeout(function() {
                prefillForm(offerType);
            }, 500);
        }
    }
});

function prefillForm(offerType) {
    const messageField = document.getElementById('message');
    if (!messageField) return;
    
    let offerText = '';
    
    switch(offerType) {
        case 'bilan':
            offerText = "Je souhaite prendre rendez-vous pour un Bilan Nutritionnel (60€).\n\n";
            break;
        case 'suivi':
            offerText = "Je souhaite prendre rendez-vous pour un Suivi Nutritionnel (40€).\n\n";
            break;
        default:
            return;
    }
    
    // Préremplir le champ message seulement s'il est vide
    if (!messageField.value.trim()) {
        messageField.value = offerText;
    }
    
    // Vérifier si on est en mode mobile
    if (window.innerWidth <= 768) {
        // En mobile, on scroll jusqu'au formulaire qui est en bas
        setTimeout(function() {
            const formElement = document.querySelector('.contact-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
    
    // Afficher une notification discrète
    showPreFillNotification(offerType);
}

function showPreFillNotification(offerType) {
    // Créer une notification toast discrète
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 30px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        transition: opacity 0.3s ease;
        opacity: 0;
        transform: translateX(100px);
    `;
    
    const offerName = offerType === 'bilan' ? 'Bilan Nutritionnel' : 'Suivi Nutritionnel';
    toast.textContent = `Formulaire prérempli pour ${offerName}`;
    
    document.body.appendChild(toast);
    
    
}