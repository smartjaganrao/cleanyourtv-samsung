/**
 * CleanYourTV Samsung - 24/7 Lo-Fi & Ambient Audio Player
 * Commercial-free streaming music for relaxation, study, sleep & working from home.
 * Features OLED Screen-Off Audio mode and Animated Spectrum Visualizer.
 */

(function(window) {
    'use strict';

    const STATIONS = [
        {
            id: 'lofi-beats',
            name: '☕ Lofi Chillhop Beats',
            genre: 'Lofi / Study / Beats',
            desc: '24/7 Chillhop & Downtempo Beats for Focus and Relaxation',
            color: 'rgba(245, 158, 11, 0.45)',
            url: 'https://play.streamafrica.net/lofiradio'
        },
        {
            id: 'peaceful-piano',
            name: '🎹 Peaceful Classical & Piano',
            genre: 'Classical / Solo Piano',
            desc: 'Gentle Acoustic Piano Melodies for Calm and Sleep',
            color: 'rgba(56, 189, 248, 0.45)',
            url: 'http://stream.zeno.fm/0r0xa792kwzuv'
        },
        {
            id: 'synthwave-chill',
            name: '🌆 Synthwave & Cyber Chill',
            genre: 'Retrowave / Synthwave',
            desc: 'Analog Synthesizers, Neon Vibes & Night Driving Sounds',
            color: 'rgba(236, 72, 153, 0.45)',
            url: 'http://stream.zeno.fm/s42k68ecw18uv'
        },
        {
            id: 'jazz-cafe',
            name: '☕ Midnight Jazz & Rain',
            genre: 'Smooth Jazz / Bossa Nova',
            desc: 'Warm Saxophone, Double Bass & Rainy Cafe Atmospheres',
            color: 'rgba(168, 85, 247, 0.45)',
            url: 'http://stream.zeno.fm/7x45y3x4w18uv'
        },
        {
            id: 'deep-ambient',
            name: '🌌 Deep Space & Meditation',
            genre: 'Ambient / Soundscapes',
            desc: 'Drone Soundscapes and Ethereal Frequencies for Deep Sleep',
            color: 'rgba(52, 211, 153, 0.45)',
            url: 'http://stream.zeno.fm/8bkv7b47b2zuv'
        }
    ];

    const AmbientMusic = {
        isOpen: false,
        isPlaying: false,
        currentIndex: 0,
        isScreenBlanked: false,
        audioEl: null,
        modalEl: null,
        stationNameEl: null,
        stationGenreEl: null,
        statusPillEl: null,
        stationListEl: null,

        init: function() {
            this.modalEl = document.getElementById('music-modal');
            this.audioEl = document.getElementById('music-audio');
            this.stationNameEl = document.getElementById('music-station-name');
            this.stationGenreEl = document.getElementById('music-station-genre');
            this.statusPillEl = document.getElementById('music-status-pill');
            this.stationListEl = document.getElementById('music-stations-list');

            this.renderStationList();
        },

        open: function() {
            this.isOpen = true;
            if (this.modalEl) {
                this.modalEl.style.display = 'flex';
                this.modalEl.focus();
            }
            if (!this.isPlaying) {
                this.play(this.currentIndex);
            } else {
                this.updateUI();
            }
        },

        close: function() {
            this.isOpen = false;
            if (this.modalEl) {
                this.modalEl.style.display = 'none';
            }
            // Note: Audio continues in background unless explicitly paused!
            console.log('[AmbientMusic] Closed modal (audio running in background)');
        },

        renderStationList: function() {
            if (!this.stationListEl) return;
            this.stationListEl.innerHTML = '';

            STATIONS.forEach((st, idx) => {
                const item = document.createElement('div');
                item.className = 'music-station-item modal-nav-item';
                item.setAttribute('data-index', idx);
                item.innerHTML = `
                    <span class="st-num">${idx + 1}</span>
                    <div class="st-info">
                        <span class="st-name">${st.name}</span>
                        <span class="st-genre">${st.genre}</span>
                    </div>
                    <span class="st-badge">${idx === this.currentIndex && this.isPlaying ? '▶ LIVE' : ''}</span>
                `;
                item.addEventListener('click', () => {
                    this.play(idx);
                });
                this.stationListEl.appendChild(item);
            });
        },

        play: function(index) {
            this.currentIndex = (index + STATIONS.length) % STATIONS.length;
            const station = STATIONS[this.currentIndex];

            if (!this.audioEl) return;
            this.audioEl.src = station.url;
            this.audioEl.play().catch(e => {
                console.log('[AmbientMusic] Autoplay notice:', e);
            });
            this.isPlaying = true;
            this.updateUI();
            this.renderStationList();
        },

        togglePlayPause: function() {
            if (!this.audioEl) return;
            if (this.isPlaying) {
                this.audioEl.pause();
                this.isPlaying = false;
            } else {
                this.audioEl.play().catch(e => {});
                this.isPlaying = true;
            }
            this.updateUI();
            this.renderStationList();
        },

        next: function() {
            this.play(this.currentIndex + 1);
        },

        prev: function() {
            this.play(this.currentIndex - 1);
        },

        toggleBlankScreen: function() {
            this.isScreenBlanked = !this.isScreenBlanked;
            const blankEl = document.getElementById('music-screen-blank');
            if (blankEl) {
                blankEl.style.display = this.isScreenBlanked ? 'block' : 'none';
            }
        },

        updateUI: function() {
            const station = STATIONS[this.currentIndex];
            if (!station) return;

            if (this.stationNameEl) this.stationNameEl.textContent = station.name;
            if (this.stationGenreEl) this.stationGenreEl.textContent = `${station.genre} · ${station.desc}`;
            if (this.statusPillEl) {
                this.statusPillEl.textContent = this.isPlaying ? '▶ STREAMING LIVE (COMMERCIAL-FREE)' : '⏸ PAUSED';
            }

            const visualizer = document.getElementById('music-visualizer');
            if (visualizer) {
                visualizer.classList.toggle('active', this.isPlaying);
            }
        },

        handleKeyDown: function(e) {
            if (!this.isOpen) return false;

            // If screen is blanked, any button un-blanks it
            if (this.isScreenBlanked) {
                this.toggleBlankScreen();
                e.preventDefault();
                return true;
            }

            const code = e.keyCode || e.which;
            switch(code) {
                case 38: // Up
                    this.prev();
                    e.preventDefault();
                    return true;
                case 40: // Down
                    this.next();
                    e.preventDefault();
                    return true;
                case 13: // OK / Enter
                case 415: // MediaPlay
                case 19: // MediaPause
                case 10252: // MediaPlayPause
                    this.togglePlayPause();
                    e.preventDefault();
                    return true;
                case 37: // Left -> Toggle OLED blank screen
                case 39: // Right
                    this.toggleBlankScreen();
                    e.preventDefault();
                    return true;
                case 10009: // Return / Back
                case 27: // Escape
                    this.close();
                    e.preventDefault();
                    return true;
            }
            return false;
        }
    };

    window.AmbientMusic = AmbientMusic;

})(window);
