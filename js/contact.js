emailjs.init("vkBvpfM1lMN-iC0kR"); 

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Vérifier d'abord si le formulaire est valide
    if (!contactForm.checkValidity()) {
        // Afficher les messages de validation natifs
        contactForm.reportValidity();
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    // Afficher la modale de consentement
    Swal.fire({
        title: 'Consentement aux données personnelles',
        html: `
            <div style="text-align: left; padding: 10px;">                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Je consente au traitement de mes données personnelles pour :</strong></p>
                    <ul style="margin-left: 20px;">
                        <li>La réponse à ma demande de contact</li>
                        <li>L'échange d'informations relatives à ma demande</li>
                        <li>La prise de rendez-vous si nécessaire</li>
                    </ul>
                </div>
                
                <div style="margin-top: 20px;">
                    <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer;">
                        <input type="checkbox" id="consentCheckbox" style="margin-top: 2px;">
                        <span>Je confirme avoir lu et accepté le traitement de mes données personnelles</span>
                    </label>
                </div>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'J\'accepte',
        cancelButtonText: 'Refuser',
        confirmButtonColor: '#1E555C',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
        focusConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            // Désactiver le bouton "J'accepte" initialement
            const confirmButton = Swal.getConfirmButton();
            confirmButton.disabled = true;
            confirmButton.style.opacity = '0.5';
            
            // Activer le bouton lorsque la case est cochée
            const checkbox = document.getElementById('consentCheckbox');
            checkbox.addEventListener('change', function() {
                confirmButton.disabled = !this.checked;
                confirmButton.style.opacity = this.checked ? '1' : '0.5';
            });
        },
        preConfirm: () => {
            return new Promise((resolve) => {
                // Vérifier que la case est cochée
                const checkbox = document.getElementById('consentCheckbox');
                if (!checkbox.checked) {
                    Swal.showValidationMessage('Veuillez cocher la case pour accepter le traitement de vos données');
                    resolve(false);
                    return;
                }
                
                // Marquer le consentement comme donné
                document.getElementById('consentGiven').value = 'true';
                resolve(true);
            });
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
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
            emailjs.sendForm('service_zs48k1a', 'template_fm831la', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Message envoyé!',
                        html: 'Merci pour votre message! Je vous répondrai dans les plus brefs délais',
                        confirmButtonColor: '#1E555C'
                    });
                    contactForm.reset();
                    // Réinitialiser le consentement
                    document.getElementById('consentGiven').value = 'false';
                    
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
        } else {
            // Si l'utilisateur refuse le consentement ou n'a pas coché la case
            if (result.isDismissed) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Consentement refusé',
                    text: 'Votre message ne peut pas être envoyé sans votre consentement.',
                    confirmButtonColor: '#1E555C'
                });
            }
        }
    });
});