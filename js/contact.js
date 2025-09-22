// contact.js - Gestion spécifique du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Initialisation d'EmailJS
    emailjs.init("PM9XqztJbWOXqRK0G");
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.textContent;
        
        // Désactiver le bouton pour éviter les doubles clics
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Masquer tout message précédent
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.style.display = 'none');
        
        // Afficher la modale de chargement
        Swal.fire({
            title: 'Envoi en cours...',
            text: 'Veuillez patienter',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        // Envoyer l'email via EmailJS
        emailjs.sendForm('service_wbrwivw', 'template_tcjkkjk', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Message envoyé!',
                    html: 'Merci pour votre message! Je vous répondrais dans les plus bref délais',
                    confirmButtonColor: '#1E555C'
                });
                contactForm.reset();
                
            }, function(error) {
                console.error('Erreur EmailJS:', error);
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur technique',
                    html: `Une erreur s'est produite (${error.status}).<br>Veuillez m'envoyer directement un email à <strong>mathildejoyeuxdiet@outlook.fr</strong>`,
                    confirmButtonColor: '#1E555C'
                });
            })
            .finally(() => {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    });
});