/**
 * CleanYourTV Configuration and Theme Handler
 */

const LauncherConfig = {
    settings: {
        theme: 'default',
        dockSize: 4,
        ambientGlow: true,
        reducedMotion: false,
        screensaverMinutes: 5,
        dockAppIds: ["11101200001", "111299001912", "3201512006785", "3201907018807"],
        showStats: false
    },

    load: function() {
        try {
            const saved = localStorage.getItem('cleanyourtv_config');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.settings = Object.assign(this.settings, parsed);
            }
        } catch (e) {
            console.warn('Could not read config from storage:', e);
        }
        return this.settings;
    },

    save: function() {
        try {
            localStorage.setItem('cleanyourtv_config', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Could not save config to storage:', e);
        }
    },

    getThemes: function() {
        return [
            { id: 'default', name: 'Pitch Black OLED', bg: '#07080b', wallpaper: null },
            { id: 'aurora', name: 'Northern Aurora', bg: '#050c14', wallpaper: 'linear-gradient(135deg, #0b1d28 0%, #03080e 100%)' },
            { id: 'midnight', name: 'Midnight Glass', bg: '#060814', wallpaper: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' },
            { id: 'minimal', name: 'Monochrome Quiet', bg: '#000000', wallpaper: null }
        ];
    },

    applyTheme: function(themeId) {
        this.settings.theme = themeId;
        this.save();

        const theme = this.getThemes().find(t => t.id === themeId) || this.getThemes()[0];
        document.body.className = 'theme-' + theme.id;
        document.documentElement.style.setProperty('--bg-color', theme.bg);

        const wp = document.getElementById('wallpaper');
        if (wp) {
            if (theme.wallpaper) {
                wp.style.background = theme.wallpaper;
                wp.style.opacity = '1';
            } else {
                wp.style.opacity = '0';
            }
        }
    }
};

window.LauncherConfig = LauncherConfig;
