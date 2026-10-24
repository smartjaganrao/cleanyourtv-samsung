/**
 * CleanYourTV Samsung - Ambient Art Mode
 * Free "Samsung The Frame" alternative for all Tizen Smart TVs.
 * Features 4K Public Domain Masterpieces, Museum Curations, OLED Burn-in Protection,
 * and Subtle Ken Burns Pan/Zoom Transitions.
 */

(function(window) {
    'use strict';

    // Curated collection of high-resolution public domain museum masterpieces
    const ART_CATALOG = [
        {
            id: 'vangogh-starry-night',
            title: 'The Starry Night',
            artist: 'Vincent van Gogh',
            year: '1889',
            medium: 'Oil on canvas',
            museum: 'Museum of Modern Art (MoMA), New York',
            accent: 'rgba(56, 189, 248, 0.5)',
            // Wikimedia Commons high-res thumbnail
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1920px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
        },
        {
            id: 'monet-water-lilies',
            title: 'Water Lilies (Nymphéas)',
            artist: 'Claude Monet',
            year: '1916',
            medium: 'Oil on canvas',
            museum: 'Musée Marmottan Monet, Paris',
            accent: 'rgba(52, 211, 153, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Monet_-_Water_Lilies_1916.jpg/1920px-Monet_-_Water_Lilies_1916.jpg'
        },
        {
            id: 'hokusai-great-wave',
            title: 'The Great Wave off Kanagawa',
            artist: 'Katsushika Hokusai',
            year: '1831',
            medium: 'Color woodblock print',
            museum: 'Metropolitan Museum of Art, New York',
            accent: 'rgba(96, 165, 250, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1920px-Tsunami_by_hokusai_19th_century.jpg'
        },
        {
            id: 'vermeer-pearl-earring',
            title: 'Girl with a Pearl Earring',
            artist: 'Johannes Vermeer',
            year: '1665',
            medium: 'Oil on canvas',
            museum: 'Mauritshuis, The Hague',
            accent: 'rgba(251, 191, 36, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1600px-1665_Girl_with_a_Pearl_Earring.jpg'
        },
        {
            id: 'klimt-the-kiss',
            title: 'The Kiss (Der Kuss)',
            artist: 'Gustav Klimt',
            year: '1908',
            medium: 'Oil and gold leaf on canvas',
            museum: 'Österreichische Galerie Belvedere, Vienna',
            accent: 'rgba(245, 158, 11, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1920px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg'
        },
        {
            id: 'friedrich-wanderer',
            title: 'Wanderer above the Sea of Fog',
            artist: 'Caspar David Friedrich',
            year: '1818',
            medium: 'Oil on canvas',
            museum: 'Hamburger Kunsthalle, Hamburg',
            accent: 'rgba(148, 163, 184, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_%C3%BCber_dem_Nebelmeer.jpg/1920px-Caspar_David_Friedrich_-_Wanderer_%C3%BCber_dem_Nebelmeer.jpg'
        },
        {
            id: 'seurat-grand-jatte',
            title: 'A Sunday on La Grande Jatte',
            artist: 'Georges Seurat',
            year: '1884–1886',
            medium: 'Oil on canvas (Pointillism)',
            museum: 'Art Institute of Chicago',
            accent: 'rgba(34, 197, 94, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1920px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg'
        },
        {
            id: 'jwst-carina-nebula',
            title: 'Cosmic Cliffs in Carina Nebula',
            artist: 'James Webb Space Telescope (NASA / ESA)',
            year: '2022',
            medium: 'Infrared Space Astrophotography',
            museum: 'NASA / Space Telescope Science Institute',
            accent: 'rgba(236, 72, 153, 0.5)',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs%2C_Glittering_Landscape_of_Star_Birth.png/1920px-NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs%2C_Glittering_Landscape_of_Star_Birth.png'
        }
    ];

    const ArtMode = {
        isOpen: false,
        currentIndex: 0,
        slideInterval: 45000, // 45 seconds per painting
        timerId: null,
        isPaused: false,
        showHud: true,
        pixelShiftX: 0,
        pixelShiftY: 0,
        shiftTimerId: null,

        // DOM elements
        modalEl: null,
        bgImageEl: null,
        titleEl: null,
        artistEl: null,
        metaEl: null,
        museumEl: null,
        clockEl: null,
        dateEl: null,
        hudEl: null,
        statusPillEl: null,

        init: function() {
            this.modalEl = document.getElementById('artmode-modal');
            this.bgImageEl = document.getElementById('artmode-image');
            this.titleEl = document.getElementById('artmode-title');
            this.artistEl = document.getElementById('artmode-artist');
            this.metaEl = document.getElementById('artmode-meta');
            this.museumEl = document.getElementById('artmode-museum');
            this.clockEl = document.getElementById('artmode-clock');
            this.dateEl = document.getElementById('artmode-date');
            this.hudEl = document.getElementById('artmode-hud');
            this.statusPillEl = document.getElementById('artmode-status-pill');

            // Setup clock ticker for HUD
            setInterval(() => {
                if (this.isOpen) this.updateClock();
            }, 1000);

            // Setup OLED Burn-in pixel shifter (runs every 30s)
            this.shiftTimerId = setInterval(() => {
                if (this.isOpen) this.shiftPixels();
            }, 30000);
        },

        open: function(startIndex = 0) {
            this.isOpen = true;
            this.currentIndex = startIndex >= 0 && startIndex < ART_CATALOG.length ? startIndex : 0;
            this.isPaused = false;
            this.showHud = true;

            if (this.modalEl) {
                this.modalEl.style.display = 'block';
                this.modalEl.focus();
            }

            this.renderCurrentArt();
            this.startSlideshow();
            this.updateClock();
            console.log('[ArtMode] Opened gallery at index:', this.currentIndex);
        },

        close: function() {
            this.isOpen = false;
            this.stopSlideshow();
            if (this.modalEl) {
                this.modalEl.style.display = 'none';
            }
            console.log('[ArtMode] Closed');
        },

        renderCurrentArt: function() {
            const art = ART_CATALOG[this.currentIndex];
            if (!art) return;

            // Fade out slightly during image transition
            if (this.bgImageEl) {
                this.bgImageEl.style.opacity = '0';
                
                const tempImg = new Image();
                tempImg.onload = () => {
                    this.bgImageEl.style.backgroundImage = `url('${art.imageUrl}')`;
                    this.bgImageEl.style.opacity = '1';
                };
                tempImg.onerror = () => {
                    // Fallback to elegant gradient if offline
                    this.bgImageEl.style.backgroundImage = `radial-gradient(ellipse at 50% 50%, ${art.accent} 0%, rgba(8, 10, 16, 0.98) 100%)`;
                    this.bgImageEl.style.opacity = '1';
                };
                tempImg.src = art.imageUrl;
            }

            if (this.titleEl) this.titleEl.textContent = art.title;
            if (this.artistEl) this.artistEl.textContent = art.artist;
            if (this.metaEl) this.metaEl.textContent = `${art.year} · ${art.medium}`;
            if (this.museumEl) this.museumEl.textContent = art.museum;

            this.updatePill();
        },

        next: function() {
            this.currentIndex = (this.currentIndex + 1) % ART_CATALOG.length;
            this.renderCurrentArt();
            this.resetSlideshowTimer();
        },

        prev: function() {
            this.currentIndex = (this.currentIndex - 1 + ART_CATALOG.length) % ART_CATALOG.length;
            this.renderCurrentArt();
            this.resetSlideshowTimer();
        },

        togglePause: function() {
            this.isPaused = !this.isPaused;
            if (this.isPaused) {
                this.stopSlideshow();
            } else {
                this.startSlideshow();
            }
            this.updatePill();
        },

        toggleHud: function() {
            this.showHud = !this.showHud;
            if (this.hudEl) {
                this.hudEl.style.opacity = this.showHud ? '1' : '0';
            }
        },

        startSlideshow: function() {
            this.stopSlideshow();
            this.timerId = setInterval(() => {
                if (this.isOpen && !this.isPaused) {
                    this.next();
                }
            }, this.slideInterval);
        },

        stopSlideshow: function() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        },

        resetSlideshowTimer: function() {
            if (!this.isPaused) {
                this.startSlideshow();
            }
        },

        updatePill: function() {
            if (!this.statusPillEl) return;
            const current = this.currentIndex + 1;
            const total = ART_CATALOG.length;
            const status = this.isPaused ? '⏸ PAUSED' : '▶ AUTO';
            this.statusPillEl.textContent = `${current} / ${total} · ${status}`;
        },

        updateClock: function() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            if (this.clockEl) this.clockEl.textContent = `${hours}:${mins}`;

            if (this.dateEl) {
                const options = { weekday: 'long', month: 'short', day: 'numeric' };
                this.dateEl.textContent = now.toLocaleDateString(undefined, options);
            }
        },

        // Anti-Burn-in Pixel Shift: subtly shifts HUD and plaque by ±6px
        shiftPixels: function() {
            this.pixelShiftX = (Math.random() * 12 - 6).toFixed(1);
            this.pixelShiftY = (Math.random() * 12 - 6).toFixed(1);
            if (this.hudEl) {
                this.hudEl.style.transform = `translate3d(${this.pixelShiftX}px, ${this.pixelShiftY}px, 0)`;
            }
        },

        handleKeyDown: function(e) {
            if (!this.isOpen) return false;

            const code = e.keyCode || e.which;
            // Samsung Tizen Remote Key Codes
            switch(code) {
                case 37: // Left
                    this.prev();
                    e.preventDefault();
                    return true;
                case 39: // Right
                    this.next();
                    e.preventDefault();
                    return true;
                case 38: // Up
                case 40: // Down
                    this.toggleHud();
                    e.preventDefault();
                    return true;
                case 13: // OK / Enter
                case 415: // MediaPlay
                case 19: // MediaPause
                case 10252: // MediaPlayPause
                    this.togglePause();
                    e.preventDefault();
                    return true;
                case 10009: // RETURN / BACK
                case 27: // Escape
                    this.close();
                    e.preventDefault();
                    return true;
            }
            return false;
        }
    };

    window.ArtMode = ArtMode;
    window.ART_CATALOG = ART_CATALOG;

})(window);
