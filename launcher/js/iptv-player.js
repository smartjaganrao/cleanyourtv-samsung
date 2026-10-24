/**
 * CleanYourTV - Samsung TV Live IPTV Player Controller
 * Seamless HLS streaming with TV Remote Channel Surfing & Electronic Program Guide.
 */

const IPTVPlayer = {
    isOpen: false,
    channels: [],
    currentIndex: 0,
    currentCountry: 'ALL',
    hls: null,
    videoEl: null,
    playerModalEl: null,
    osdTimer: null,
    sidebarOpen: false,
    sidebarFocus: 'CHANNELS', // 'COUNTRIES', 'CHANNELS'
    selectedCountryIndex: 0,
    selectedChannelIndex: 0,

    init: function() {
        this.videoEl = document.getElementById('iptv-video');
        this.playerModalEl = document.getElementById('iptv-player-modal');
        this.channels = window.DEFAULT_IPTV_CHANNELS || [];
        this.renderSidebarCountries();
    },

    open: function(channelIndex = 0, countryCode = 'ALL') {
        console.log('[IPTVPlayer] Opening Live TV mode...');
        this.isOpen = true;
        this.currentCountry = countryCode;
        this.playerModalEl.style.display = 'block';

        IPTVService.loadCountryChannels(countryCode, (loaded) => {
            this.channels = loaded;
            this.currentIndex = Math.min(channelIndex, this.channels.length - 1);
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
        numEl.textContent = `CH ${chNumber}`;
        nameEl.textContent = channel.name;
        metaEl.textContent = `${channel.flag || '📺'} ${channel.country || ''} · ${channel.category || 'General'} · 1080p LIVE`;

        if (channel.logo) {
            logoEl.src = channel.logo;
            logoEl.style.display = 'block';
        } else {
            logoEl.style.display = 'none';
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

    renderSidebarCountries: function() {
        const list = document.getElementById('iptv-countries-list');
        if (!list) return;
        list.innerHTML = '';
        window.IPTV_COUNTRIES.forEach((c, idx) => {
            const pill = document.createElement('div');
            pill.className = 'country-pill';
            pill.setAttribute('data-code', c.code);
            pill.innerHTML = `<span class="flag">${c.flag}</span> <span class="cname">${c.name}</span>`;
            if (c.code === this.currentCountry) pill.classList.add('active');
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
            item.innerHTML = `
                <span class="ch-num">${num}</span>
                <span class="ch-title">${ch.name}</span>
                <span class="ch-tag">${ch.category || 'Live'}</span>
            `;
            list.appendChild(item);
        });
    },

    updateSidebarFocus: function() {
        document.querySelectorAll('.sidebar-focused').forEach(el => el.classList.remove('sidebar-focused'));

        if (this.sidebarFocus === 'COUNTRIES') {
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

        // If sidebar is open, navigate sidebar
        if (this.sidebarOpen) {
            switch (key) {
                case 38: // Up
                    if (this.sidebarFocus === 'COUNTRIES') {
                        this.selectedCountryIndex = Math.max(0, this.selectedCountryIndex - 1);
                    } else {
                        this.selectedChannelIndex = Math.max(0, this.selectedChannelIndex - 1);
                    }
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 40: // Down
                    if (this.sidebarFocus === 'COUNTRIES') {
                        this.selectedCountryIndex = Math.min(window.IPTV_COUNTRIES.length - 1, this.selectedCountryIndex + 1);
                    } else {
                        this.selectedChannelIndex = Math.min(this.channels.length - 1, this.selectedChannelIndex + 1);
                    }
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 37: // Left -> Move to Countries
                    this.sidebarFocus = 'COUNTRIES';
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 39: // Right -> Move to Channels
                    this.sidebarFocus = 'CHANNELS';
                    this.updateSidebarFocus();
                    e.preventDefault();
                    return true;

                case 13: // Enter
                    if (this.sidebarFocus === 'COUNTRIES') {
                        const targetCountry = window.IPTV_COUNTRIES[this.selectedCountryIndex].code;
                        this.currentCountry = targetCountry;
                        this.renderSidebarCountries();
                        IPTVService.loadCountryChannels(targetCountry, (loaded) => {
                            this.channels = loaded;
                            this.renderSidebarChannels();
                            this.sidebarFocus = 'CHANNELS';
                            this.selectedChannelIndex = 0;
                            this.updateSidebarFocus();
                        });
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
        }

        return false;
    }
};

window.IPTVPlayer = IPTVPlayer;
