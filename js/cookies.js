document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const cookieBanner = document.getElementById('cookie-banner');
    const mapBlockedMessage = document.getElementById('map-blocked');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const refuseCookiesBtn = document.getElementById('refuse-cookies');
    const enableCookiesBtn = document.getElementById('enable-cookies');
    const cookieFloatIcon = document.getElementById('cookie-float');
    const mapContainer = document.querySelector('.map-container');
    
    // Vérifier si nous sommes sur une page avec carte
    const hasMap = mapContainer !== null;

    // URL complète de Google Maps (identique à celle dans le HTML)
    const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4328.363391409548!2d2.137616895562259!3d49.05707190536313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e65fa3fd5b9315%3A0xec949c3ba0e21300!2s2%20Rue%20Saint-Simon%2C%2095310%20Saint-Ouen-l'Aum%C3%B4ne!5e0!3m2!1sfr!2sfr!4v1757937472157!5m2!1sfr!2sfr`;

    // Vérifier si l'utilisateur a déjà fait un choix
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (cookiesAccepted === null) {
        // Aucun choix n'a été fait - afficher la bannière
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
        
        // Bloquer la carte si elle existe
        if (hasMap) {
            blockMapIframe();
        }
    } else if (cookiesAccepted === 'true') {
        // Cookies acceptés - afficher la carte si elle existe
        if (hasMap) {
            loadMapIframe();
        }
    } else {
        // Cookies refusés - bloquer la carte si elle existe et afficher l'icône flottante
        if (hasMap) {
            blockMapIframe();
        }
        if (cookieFloatIcon) {
            cookieFloatIcon.style.display = 'flex';
        }
    }

    // Gestionnaire d'événements pour accepter les cookies
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            acceptCookies();
        });
    }

    // Gestionnaire d'événements pour refuser les cookies
    if (refuseCookiesBtn) {
        refuseCookiesBtn.addEventListener('click', function() {
            refuseCookies();
        });
    }

    // Gestionnaire pour le bouton "Accepter les cookies" dans le message de carte bloquée
    if (enableCookiesBtn) {
        enableCookiesBtn.addEventListener('click', function() {
            acceptCookies();
        });
    }

    // Gestionnaire pour l'icône flottante
    if (cookieFloatIcon) {
        cookieFloatIcon.addEventListener('click', function() {
            if (cookieBanner) {
                cookieBanner.style.display = 'block';
            }
            if (cookieFloatIcon) {
                cookieFloatIcon.style.display = 'none';
            }
        });
    }

    // Fonction pour accepter les cookies
    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
        if (cookieFloatIcon) {
            cookieFloatIcon.style.display = 'none';
        }
        
        // Charger la carte si elle existe
        if (hasMap) {
            loadMapIframe();
        }
        
        // Utiliser SweetAlert2 pour confirmer
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Cookies acceptés',
                text: 'Les cookies ont été acceptés.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    // Fonction pour refuser les cookies
    function refuseCookies() {
        localStorage.setItem('cookiesAccepted', 'false');
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
        if (cookieFloatIcon) {
            cookieFloatIcon.style.display = 'flex';
        }
        
        // Bloquer la carte si elle existe
        if (hasMap) {
            blockMapIframe();
        }
        
        // Utiliser SweetAlert2 pour informer
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'Cookies refusés',
                text: 'Vous pouvez modifier votre choix à tout moment en cliquant sur l\'icône en bas à gauche.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    // Fonction pour charger l'iframe de la carte (seulement après acceptation)
    function loadMapIframe() {
        if (mapContainer) {
            mapContainer.classList.remove('blocked');
            
            // Vérifier si l'iframe existe déjà
            let existingIframe = mapContainer.querySelector('iframe');
            
            // Si l'iframe n'existe pas, la créer
            if (!existingIframe) {
                const newIframe = document.createElement('iframe');
                newIframe.src = mapEmbedUrl;
                newIframe.width = '600';
                newIframe.height = '450';
                newIframe.style.border = '0';
                newIframe.allowFullscreen = true;
                newIframe.loading = 'lazy';
                newIframe.referrerPolicy = 'no-referrer-when-downgrade';
                newIframe.title = "Localisation du cabinet de Mathilde JOYEUX";
                
                // Insérer l'iframe avant le message bloqué
                if (mapBlockedMessage) {
                    mapContainer.insertBefore(newIframe, mapBlockedMessage);
                } else {
                    mapContainer.appendChild(newIframe);
                }
            } else {
                // Si l'iframe existe déjà, simplement l'afficher
                existingIframe.style.display = 'block';
                // Recharger la source au cas où
                existingIframe.src = mapEmbedUrl;
            }
            
            // Cacher le message bloqué
            if (mapBlockedMessage) {
                mapBlockedMessage.style.display = 'none';
            }
        }
    }

    // Fonction pour bloquer l'iframe (supprime complètement l'iframe pour éviter les cookies)
    function blockMapIframe() {
        if (mapContainer) {
            mapContainer.classList.add('blocked');
            
            // Supprimer complètement l'iframe existante pour éviter tout dépôt de cookie
            const existingIframe = mapContainer.querySelector('iframe');
            if (existingIframe) {
                existingIframe.remove();
            }
        }
        
        // Afficher le message bloqué
        if (mapBlockedMessage) {
            mapBlockedMessage.style.display = 'block';
        }
    }
});