/**
 * CleanYourTV - Samsung TV Live IPTV Player Controller
 * Seamless HLS streaming with TV Remote Channel Surfing & Electronic Program Guide.
 * Powered by https://github.com/iptv-org/iptv
 */

const IPTVPlayer = {
    isOpen: false,
    channels: [],
    currentIndex: 0,
    currentCountry: 'ALL',
    currentCategory: 'ALL',
    hls: null,
    videoEl: null,
    playerModalEl: null,
    osdTimer: null,
    sidebarOpen: false,
    sidebarFocus: 'CHANNELS', // 'CATEGORIES', 'COUNTRIES', 'CHANNELS'
    selectedCategoryIndex: 0,
    selectedCountryIndex: 0,
    selectedChannelIndex: 0,

    init: function() {
        this.videoEl = document.getElementById('iptv-video');
        this.playerModalEl = document.getElementById('iptv-player-modal');
        this.channels = window.DEFAULT_IPTV_CHANNELS || [];
        this.renderSidebarCategories();
        this.renderSidebarCountries();
    },

    open: function(channelIndex = 0, countryCode = 'ALL') {
        console.log('[IPTVPlayer] Opening Live TV mode...');
        this.isOpen = true;
        this.currentCountry = countryCode;
        this.currentCategory = 'ALL';
        this.playerModalEl.style.display = 'block';

        IPTVService.loadCountryChannels(countryCode, (loaded) => {
            this.channels = loaded;
            this.currentIndex = Math.min(channelIndex, Math.max(0, this.channels.length - 1));
            this.renderSidebarChannels();
            this.playChannel(this.currentIndex);
        });
    },

    close: function() {
        console.log('[IPTVPlayer] Closing Live TV...');
        this.stopStream();
        this.playerModalEl.style.display = 'none';
        this.isOpen = false;
        this.sidebarOpen = false;
        document.getElementById('iptv-sidebar').classList.remove('open');
    },

    stopStream: function() {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
        if (this.videoEl) {
            this.videoEl.pause();
            this.videoEl.removeAttribute('src');
            this.videoEl.load();
        }
    },

    playChannel: function(index) {
        if (!this.channels || this.channels.length === 0) return;
        this.currentIndex = (index + this.channels.length) % this.channels.length;
        const channel = this.channels[this.currentIndex];

        console.log(`[IPTVPlayer] Playing CH ${this.currentIndex + 1}: ${channel.name} (${channel.url})`);
        this.stopStream();
        this.showOSD(channel);
        this.showSpinner(true);

        const video = this.videoEl;
        const streamUrl = channel.url;

        // Try Hls.js first (for broad Smart TV HLS codec support)
        if (window.Hls && window.Hls.isSupported()) {
            this.hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 60
            });
            this.hls.loadSource(streamUrl);
            this.hls.attachMedia(video);

            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(e => console.warn('Auto-play error:', e));
                this.showSpinner(false);
            });

            this.hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.warn('[IPTVPlayer] HLS fatal error, recovering:', data.type);
                    if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                        this.hls.startLoad();
                    } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                        this.hls.recoverMediaError();
                    } else {
                        this.stopStream();
                        this.showStreamError();
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native Tizen WebKit HLS
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch(e => console.warn('Native play error:', e));
                this.showSpinner(false);
            });
            video.addEventListener('error', () => {
                this.showStreamError();
            });
        }
    },

    nextChannel: function() {
        this.playChannel(this.currentIndex + 1);
    },

    prevChannel: function() {
        this.playChannel(this.currentIndex - 1);
    },

    showOSD: function(channel) {
        const osdEl = document.getElementById('iptv-osd');
        const numEl = document.getElementById('osd-channel-num');
        const nameEl = document.getElementById('osd-channel-name');
        const metaEl = document.getElementById('osd-channel-meta');
        const logoEl = document.getElementById('osd-channel-logo');

        const chNumber = String(this.currentIndex + 1).padStart(2, '0');
        const isFav = (window.IPTVService && IPTVService.isFavorite) ? IPTVService.isFavorite(channel.url) : false;
        numEl.textContent = `CH ${chNumber}`;
        nameEl.innerHTML = `${isFav ? '<span class="fav-star">★ </span>' : ''}${channel.name}`;
        metaEl.textContent = `${channel.flag || '📺'} ${channel.country || ''} · ${channel.category || 'General'} · 1080p LIVE`;

        if (channel.logo) {
            logoEl.src = channel.logo;
            logoEl.style.display = 'block';
        } else {
            logoEl.style.display = 'none';
        }

        const hintEl = document.querySelector('.osd-hint');
        if (hintEl) {
            hintEl.textContent = isFav ? '★ Favorited · Press F/Yellow to remove · ◄ Guide' : 'Press F/Yellow to ★ Favorite · ◄ Guide · ▲/▼ surf';
        }

        osdEl.classList.add('visible');
        clearTimeout(this.osdTimer);
        this.osdTimer = setTimeout(() => {
            osdEl.classList.remove('visible');
        }, 4500);
    },

    showSpinner: function(show) {
        const spinner = document.getElementById('iptv-spinner');
        if (spinner) spinner.style.display = show ? 'flex' : 'none';
    },

    showStreamError: function() {
        this.showSpinner(false);
        const nameEl = document.getElementById('osd-channel-name');
        if (nameEl) nameEl.textContent += " (Stream offline or geo-restricted)";
    },

    toggleSidebar: function() {
        this.sidebarOpen = !this.sidebarOpen;
        const sidebar = document.getElementById('iptv-sidebar');
        if (this.sidebarOpen) {
            sidebar.classList.add('open');
            this.sidebarFocus = 'CHANNELS';
            this.selectedChannelIndex = this.currentIndex;
            this.updateSidebarFocus();
        } else {
            sidebar.classList.remove('open');
        }
    },

    renderSidebarCategories: function() {
        const list = document.getElementById('iptv-categories-bar');
        if (!list) return;
        list.innerHTML = '';
        const cats = (window.IPTVService && IPTVService.getCategories) ? IPTVService.getCategories() : [
            { id: "ALL", name: "All Genres", icon: "📺" },
            { id: "News", name: "News", icon: "📰" },
            { id: "Sports", name: "Sports", icon: "⚽" },
            { id: "Movies", name: "Movies", icon: "🎬" },
            { id: "Music", name: "Music", icon: "🎵" },
            { id: "Documentary", name: "Documentary", icon: "📚" }
        ];

        cats.forEach((c, idx) => {
            const chip = document.createElement('div');
            chip.className = 'category-chip';
            chip.setAttribute('data-id', c.id);
            chip.innerHTML = `<span class="c-icon">${c.icon}</span> <span>${c.name}</span>`;
            if (c.id === this.currentCategory) chip.classList.add('active');

            chip.addEventListener('click', () => {
                this.selectCategory(idx);
            });
            list.appendChild(chip);
        });
    },

    renderSidebarCountries: function() {
        const list = document.getElementById('iptv-countries-list');
        if (!list) return;
        list.innerHTML = '';
        const countries = (window.IPTVService && IPTVService.getCountries) ? IPTVService.getCountries() : window.IPTV_COUNTRIES;
        countries.forEach((c, idx) => {
            const pill = document.createElement('div');
            pill.className = 'country-pill';
            pill.setAttribute('data-code', c.code);
            pill.innerHTML = `<span class="flag">${c.flag}</span> <span class="cname">${c.name}</span>`;
            if (c.code === this.currentCountry) pill.classList.add('active');

            pill.addEventListener('click', () => {
                this.selectCountry(idx);
            });
            list.appendChild(pill);
        });
    },

    renderSidebarChannels: function() {
        const list = document.getElementById('iptv-channels-list');
        if (!list) return;
        list.innerHTML = '';
        this.channels.forEach((ch, idx) => {
            const item = document.createElement('div');
            item.className = 'sidebar-ch-item';
            item.setAttribute('data-index', idx);
            const num = String(idx + 1).padStart(2, '0');
            const isFav = (window.IPTVService && IPTVService.isFavorite) ? IPTVService.isFavorite(ch.url) : false;
            item.innerHTML = `
                <span class="ch-num">${num}</span>
                <span class="ch-title">${isFav ? '<span class="fav-icon">★</span> ' : ''}${ch.name}</span>
                <span class="ch-tag">${ch.category || 'Live'}</span>
            `;
            item.addEventListener('click', () => {
                this.playChannel(idx);
                this.toggleSidebar();
            });
            list.appendChild(item);
        });
    },

    selectCategory: function(index) {
        const cats = (window.IPTVService && IPTVService.getCategories) ? IPTVService.getCategories() : [];
        if (!cats[index]) return;
        this.selectedCategoryIndex = index;
        this.currentCategory = cats[index].id;
        this.renderSidebarCategories();

        this.showSpinner(true);
        IPTVService.loadCategoryChannels(this.currentCategory, (loaded) => {
            this.channels = loaded;
            this.renderSidebarChannels();
            this.selectedChannelIndex = 0;
            this.showSpinner(false);
            this.sidebarFocus = 'CHANNELS';
            this.updateSidebarFocus();
        });
    },

    selectCountry: function(index) {
        const countries = (window.IPTVService && IPTVService.getCountries) ? IPTVService.getCountries() : window.IPTV_COUNTRIES;
        if (!countries[index]) return;
        this.selectedCountryIndex = index;
        this.currentCountry = countries[index].code;
        this.renderSidebarCountries();

        this.showSpinner(true);
        IPTVService.loadCountryChannels(this.currentCountry, (loaded) => {
            this.channels = loaded;
            this.renderSidebarChannels();
            this.selectedChannelIndex = 0;
            this.showSpinner(false);
            this.sidebarFocus = 'CHANNELS';
            this.updateSidebarFocus();
        });
    },

    updateSidebarFocus: function() {
        document.querySelectorAll('.sidebar-focused').forEach(el => el.classList.remove('sidebar-focused'));

        if (this.sidebarFocus === 'CATEGORIES') {
            const chips = document.querySelectorAll('.category-chip');
            if (chips[this.selectedCategoryIndex]) {
                chips[this.selectedCategoryIndex].classList.add('sidebar-focused');
                chips[this.selectedCategoryIndex].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
            }
        } else if (this.sidebarFocus === 'COUNTRIES') {
            const pills = document.querySelectorAll('.country-pill');
            if (pills[this.selectedCountryIndex]) {
                pills[this.selectedCountryIndex].classList.add('sidebar-focused');
                pills[this.selectedCountryIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        } else if (this.sidebarFocus === 'CHANNELS') {
            const items = document.querySelectorAll('.sidebar-ch-item');
            if (items[this.selectedChannelIndex]) {
                items[this.selectedChannelIndex].classList.add('sidebar-focused');
                items[this.selectedChannelIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    },

    handleKeyDown: function(e) {
        if (!this.isOpen) return false;

        const key = e.keyCode;

        // Remote Channel Up / Down
        if (key === 427 || e.key === 'ChannelUp') {
            this.nextChannel();
            e.preventDefault();
            return true;
        }
        if (key === 428 || e.key === 'ChannelDown') {
            this.prevChannel();
            e.preventDefault();
            return true;
        }

        // Return / Back
        if (key === 10009 || key === 27) {
            if (this.sidebarOpen) {
                this.toggleSidebar();
            } else {
                this.close();
            }
            e.preventDefault();
            return true;
        }

        // If sidebar is open, handle navigation
        if (this.sidebarOpen) {
            const cats = (window.IPTVService && IPTVService.getCategories) ? IPTVService.getCategories() : [];
            const countries = (window.IPTVService && IPTVService.getCountries) ? IPTVService.getCountries() : window.IPTV_COUNTRIES;

            switch (key) {
                case 38: // Up
                    if (this.sidebarFocus === 'CATEGORIES') {
                        // Top reached
                    } else if (this.sidebarFocus === 'COUNTRIES') {
                        if (this.selectedCountryIndex === 0) {
                            this.sidebarFocus = 'CATEGORIES';
                        } else {
                            this.selectedCountryIndex = Math.max(0, this.selectedCountryIndex - 1);
                        }
                    } else if (this.sidebarFocus === 'CHANNELS') {
                        if (this.selectedChannelIndex === 0) {
                            this.sidebarFocus = 'CATEGORIES';
                        } else {
                            this.selectedChannelIndex = Math.max(0, this.selectedChannelIndex - 1);
                        }
                    }
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 40: // Down
                    if (this.sidebarFocus === 'CATEGORIES') {
                        this.sidebarFocus = 'CHANNELS';
                    } else if (this.sidebarFocus === 'COUNTRIES') {
                        this.selectedCountryIndex = Math.min(countries.length - 1, this.selectedCountryIndex + 1);
                    } else if (this.sidebarFocus === 'CHANNELS') {
                        this.selectedChannelIndex = Math.min(this.channels.length - 1, this.selectedChannelIndex + 1);
                    }
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 37: // Left
                    if (this.sidebarFocus === 'CATEGORIES') {
                        this.selectedCategoryIndex = Math.max(0, this.selectedCategoryIndex - 1);
                    } else if (this.sidebarFocus === 'CHANNELS') {
                        this.sidebarFocus = 'COUNTRIES';
                    }
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 39: // Right
                    if (this.sidebarFocus === 'CATEGORIES') {
                        this.selectedCategoryIndex = Math.min(cats.length - 1, this.selectedCategoryIndex + 1);
                    } else if (this.sidebarFocus === 'COUNTRIES') {
                        this.sidebarFocus = 'CHANNELS';
                    }
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 13: // Enter
                    if (this.sidebarFocus === 'CATEGORIES') {
                        this.selectCategory(this.selectedCategoryIndex);
                    } else if (this.sidebarFocus === 'COUNTRIES') {
                        this.selectCountry(this.selectedCountryIndex);
                    } else if (this.sidebarFocus === 'CHANNELS') {
                        this.playChannel(this.selectedChannelIndex);
                        this.toggleSidebar();
                    }
                    e.preventDefault();
                    return true;
            }
        }

        // When watching video (sidebar closed)
        switch (key) {
            case 38: // Up -> Prev Channel
                this.prevChannel();
                e.preventDefault();
                return true;
            case 40: // Down -> Next Channel
                this.nextChannel();
                e.preventDefault();
                return true;
            case 37: // Left -> Open Channel Guide
                this.toggleSidebar();
                e.preventDefault();
                return true;
            case 13: // Enter -> Show OSD or toggle guide
                this.showOSD(this.channels[this.currentIndex]);
                e.preventDefault();
                return true;
            case 70: // 'F' Key
            case 405: // Samsung ColorF2Yellow
            case 404: // Samsung ColorF1Green
            case 10140: // Samsung Tools
                if (this.channels && this.channels[this.currentIndex]) {
                    window.IPTVService && IPTVService.toggleFavorite(this.channels[this.currentIndex]);
                    this.showOSD(this.channels[this.currentIndex]);
                    this.renderSidebarChannels();
                    e.preventDefault();
                    return true;
                }
                break;
        }

        return false;
    }
};

window.IPTVPlayer = IPTVPlayer;
