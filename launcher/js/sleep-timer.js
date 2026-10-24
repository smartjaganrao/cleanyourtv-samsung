/**
 * CleanYourTV Samsung - 1-Click Sleep Timer
 * Simple, instant bedtime auto-power off for Samsung Smart TVs.
 * Replaces buried 6-submenu settings with a 1-click countdown.
 */

(function(window) {
    'use strict';

    const SLEEP_DURATIONS = [0, 15, 30, 45, 60, 90, 120]; // Minutes

    const SleepTimer = {
        currentIndex: 0,
        remainingSeconds: 0,
        intervalId: null,
        btnEl: null,
        toastEl: null,

        init: function() {
            this.btnEl = document.getElementById('btn-sleep');
            this.updateButtonLabel();
        },

        cycle: function() {
            this.currentIndex = (this.currentIndex + 1) % SLEEP_DURATIONS.length;
            const minutes = SLEEP_DURATIONS[this.currentIndex];

            if (minutes === 0) {
                this.cancel();
                this.showToast('⏱️ Sleep Timer Disabled');
            } else {
                this.start(minutes);
                this.showToast(`⏱️ TV will power off in ${minutes} minutes`);
            }
        },

        start: function(minutes) {
            this.cancel();
            this.remainingSeconds = minutes * 60;
            this.updateButtonLabel();

            this.intervalId = setInterval(() => {
                this.remainingSeconds--;
                if (this.remainingSeconds % 60 === 0) {
                    this.updateButtonLabel();
                }
                if (this.remainingSeconds <= 0) {
                    this.triggerSleep();
                }
            }, 1000);
        },

        cancel: function() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            this.remainingSeconds = 0;
            this.updateButtonLabel();
        },

        updateButtonLabel: function() {
            if (!this.btnEl) return;
            const textEl = this.btnEl.querySelector('span');
            if (!textEl) return;

            if (this.remainingSeconds > 0) {
                const mins = Math.ceil(this.remainingSeconds / 60);
                textEl.textContent = `Sleep: ${mins}m`;
                this.btnEl.classList.add('active-timer');
            } else {
                textEl.textContent = 'Sleep Timer';
                this.btnEl.classList.remove('active-timer');
            }
        },

        triggerSleep: function() {
            this.cancel();
            this.showToast('🌙 Sleep Timer Expired. Powering off...');

            // Graceful shutdown animation: fade to black
            const overlay = document.createElement('div');
            overlay.className = 'sleep-fade-overlay';
            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 50);

            setTimeout(() => {
                // Try Tizen official power API
                try {
                    if (window.tizen && tizen.power && tizen.power.turnOffScreen) {
                        tizen.power.turnOffScreen();
                    } else if (window.TizenAPI && TizenAPI.sendKey) {
                        TizenAPI.sendKey('KEY_POWER');
                    }
                } catch(e) {
                    console.log('[SleepTimer] Standby triggered:', e);
                }
            }, 3000);
        },

        showToast: function(message) {
            let toast = document.getElementById('cleanyourtv-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'cleanyourtv-toast';
                toast.className = 'cleanyourtv-toast';
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.classList.add('visible');

            clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => {
                toast.classList.remove('visible');
            }, 3500);
        }
    };

    window.SleepTimer = SleepTimer;

})(window);
