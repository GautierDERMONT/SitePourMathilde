document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const cookieBanner = document.getElementById('cookie-banner');
    const mapBlockedMessage = document.getElementById('map-blocked');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const refuseCookiesBtn = document.getElementById('refuse-cookies');
    const enableCookiesBtn = document.getElementById('enable-cookies');
    const cookieFloatIcon = document.getElementById('cookie-float');
    const mapContainer = document.querySelector('.map-container');
    const mapIframe = document.querySelector('.map-container iframe');
    
    // Vérifier si nous sommes sur une page avec carte
    const hasMap = mapContainer !== null;

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
        cookieFloatIcon.style.display = 'flex';
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
            cookieBanner.style.display = 'block';
            cookieFloatIcon.style.display = 'none';
        });
    }

    // Fonction pour accepter les cookies
    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
        cookieFloatIcon.style.display = 'none';
        
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
        cookieBanner.style.display = 'none';
        cookieFloatIcon.style.display = 'flex';
        
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

        // Remplacer la fonction loadMapIframe
    function loadMapIframe() {
        if (mapIframe) {
            mapContainer.classList.remove('blocked');
            mapIframe.style.display = 'block';
            if (mapBlockedMessage) {
                mapBlockedMessage.style.display = 'none';
            }
            
            // Recharger la source pour s'assurer qu'elle s'affiche
            // Stocker la source originale si ce n'est pas déjà fait
            if (!mapIframe.dataset.src) {
                mapIframe.dataset.src = mapIframe.src;
            }
            mapIframe.src = mapIframe.dataset.src;
        }
    }

    // Remplacer la fonction blockMapIframe
    function blockMapIframe() {
        if (mapContainer) {
            mapContainer.classList.add('blocked');
        }
        if (mapIframe) {
            // Sauvegarder la source avant de la vider
            if (!mapIframe.dataset.src) {
                mapIframe.dataset.src = mapIframe.src;
            }
            mapIframe.src = '';
            mapIframe.style.display = 'none';
        }
        if (mapBlockedMessage) {
            mapBlockedMessage.style.display = 'block';
        }
    }

    // Fonction pour bloquer l'iframe (uniquement sur les pages avec carte)
    function blockMapIframe() {
        if (mapContainer) {
            mapContainer.classList.add('blocked');
        }
        if (mapIframe) {
            mapIframe.style.display = 'none';
        }
        if (mapBlockedMessage) {
            mapBlockedMessage.style.display = 'block';
        }
    }
});