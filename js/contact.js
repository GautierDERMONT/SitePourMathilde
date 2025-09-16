// contact.js - Gestion spécifique du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Initialisation d'EmailJS
    emailjs.init("PM9XqztJbWOXqRK0G");
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
        emailjs.sendForm('service_ycu98z2', 'template_tcjkkjk', this)
            .then(function() {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Message envoyé!',
                    text: 'Merci pour votre message! Je vous répondrai très rapidement.',
                    confirmButtonColor: '#1E555C'
                });
                contactForm.reset();
            }, function(error) {
                console.error('Erreur:', error);
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.',
                    confirmButtonColor: '#1E555C'
                });
            });
    });
});