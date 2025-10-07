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

    // S'assurer qu'aucune iframe n'existe au chargement si les cookies sont refusés
    if (cookiesAccepted === 'false' || cookiesAccepted === null) {
        const existingIframe = document.querySelector('.map-container iframe');
        if (existingIframe) {
            existingIframe.remove();
        }
    }

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
        
        // Supprimer l'icône "i" du message de carte bloquée
        const infoIcon = document.querySelector('.cookie-info-icon');
        if (infoIcon) {
            infoIcon.remove();
        }
        
        // Charger la carte si elle existe
        if (hasMap) {
            loadMapIframe();
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
        
       
    }

        // Fonction pour charger l'iframe de la carte (seulement après acceptation)
    // Fonction pour charger l'iframe de la carte (seulement après acceptation)
        function loadMapIframe() {
            if (mapContainer) {
                mapContainer.classList.remove('blocked');
                
                // Afficher le loader
                const mapLoader = document.getElementById('map-loader');
                if (mapLoader) {
                    mapLoader.style.display = 'flex';
                }
                
                let existingIframe = mapContainer.querySelector('iframe');
                
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
                    
                    // Masquer le loader une fois chargé
                    newIframe.onload = function() {
                        if (mapLoader) {
                            mapLoader.style.display = 'none';
                        }
                    };
                    
                    // Gérer les erreurs de chargement
                    newIframe.onerror = function() {
                        if (mapLoader) {
                            mapLoader.style.display = 'none';
                        }
                        console.error('Erreur lors du chargement de la carte');
                    };
                    
                    if (mapBlockedMessage) {
                        mapContainer.insertBefore(newIframe, mapBlockedMessage);
                    } else {
                        mapContainer.appendChild(newIframe);
                    }
                } else {
                    existingIframe.style.display = 'block';
                    if (mapLoader) {
                        mapLoader.style.display = 'none';
                    }
                }
                
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
            
            // SUPPRIMER D'ABORD l'icône "i" existante avant d'en créer une nouvelle
            const existingInfoIcon = mapContainer.querySelector('.cookie-info-icon');
            if (existingInfoIcon) {
                existingInfoIcon.remove();
            }
            
            // Créer et ajouter l'icône "i" dans le message de carte bloquée
            const infoIcon = document.createElement('div');
            infoIcon.className = 'cookie-info-icon';
            infoIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
            `;
            infoIcon.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                color: var(--primary-color);
                opacity: 0.7;
                transition: opacity 0.3s ease;
            `;
            
            infoIcon.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
            });
            
            infoIcon.addEventListener('mouseleave', function() {
                this.style.opacity = '0.7';
            });
            
            infoIcon.addEventListener('click', function() {
                // Afficher le bandeau de cookies et cacher l'icône flottante
                if (cookieBanner) {
                    cookieBanner.style.display = 'block';
                }
                if (cookieFloatIcon) {
                    cookieFloatIcon.style.display = 'none';
                }
            });
            
            // Ajouter l'icône au message de carte bloquée
            if (mapBlockedMessage) {
                mapBlockedMessage.style.position = 'relative'; // Pour le positionnement absolu de l'icône
                mapBlockedMessage.appendChild(infoIcon);
            }
        }
        
        // Afficher le message bloqué
        if (mapBlockedMessage) {
            mapBlockedMessage.style.display = 'block';
        }
    }
});