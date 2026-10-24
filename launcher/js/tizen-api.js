/**
 * CleanYourTV - Samsung Tizen TV API Wrapper
 * Bridges W3C Web runtime with Samsung Tizen OS platform capabilities.
 */

const TizenAPI = {
    isTizen: function() {
        return typeof window.tizen !== 'undefined';
    },

    init: function() {
        if (!this.isTizen()) {
            console.log('[TizenAPI] Running in web simulator/preview mode.');
            return;
        }

        console.log('[TizenAPI] Initializing Samsung Tizen TV capabilities.');
        this.registerRemoteKeys();
    },

    registerRemoteKeys: function() {
        if (!this.isTizen() || !window.tizen.tvinputdevice) {
            return;
        }

        const keysToRegister = [
            'MediaPlayPause', 'MediaPlay', 'MediaPause', 'MediaStop',
            'MediaFastForward', 'MediaRewind',
            'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue',
            'ChannelUp', 'ChannelDown', 'Info', 'Guide'
        ];

        keysToRegister.forEach(function(keyName) {
            try {
                window.tizen.tvinputdevice.registerKey(keyName);
            } catch (e) {
                // Not all TV models support all keys; safely ignore unsupported ones
            }
        });
    },

    getInstalledApps: function(callback) {
        if (!this.isTizen() || !window.tizen.application) {
            callback(null);
            return;
        }

        try {
            window.tizen.application.getAppsInfo(function(apps) {
                const list = apps.map(function(app) {
                    return {
                        id: app.id,
                        name: app.name,
                        iconPath: app.iconPath,
                        version: app.version,
                        show: app.show
                    };
                });
                callback(list);
            }, function(err) {
                console.error('[TizenAPI] Failed to get apps info:', err);
                callback(null);
            });
        } catch (e) {
            console.error('[TizenAPI] Exception reading apps:', e);
            callback(null);
        }
    },

    launchApp: function(appId, onSuccess, onError) {
        console.log('[TizenAPI] Request to launch App ID:', appId);
        if (!this.isTizen() || !window.tizen.application) {
            alert('Preview Mode: Launching ' + appId + '\nOn a real Samsung TV, this opens the native Tizen application.');
            if (onSuccess) onSuccess();
            return;
        }

        try {
            window.tizen.application.launch(appId, function() {
                console.log('[TizenAPI] Successfully launched:', appId);
                if (onSuccess) onSuccess();
            }, function(err) {
                console.error('[TizenAPI] Failed to launch ' + appId + ':', err);
                if (onError) onError(err);
            });
        } catch (e) {
            console.error('[TizenAPI] Launch error:', e);
            if (onError) onError(e);
        }
    },

    getSystemInfo: function(callback) {
        if (!this.isTizen() || !window.tizen.systeminfo) {
            callback({
                model: 'Samsung Tizen Simulator',
                version: 'Tizen 8.0 (2025/2026)',
                network: 'Wi-Fi (100 Mbps)'
            });
            return;
        }

        const info = { model: 'Samsung Smart TV', version: 'Tizen OS', network: 'Connected' };
        try {
            window.tizen.systeminfo.getPropertyValue('BUILD', function(build) {
                info.model = build.modelName || info.model;
                info.version = 'Tizen ' + (build.platformVersion || '');
                callback(info);
            }, function() {
                callback(info);
            });
        } catch (e) {
            callback(info);
        }
    },

    exit: function() {
        if (this.isTizen() && window.tizen.application) {
            try {
                const app = window.tizen.application.getCurrentApplication();
                app.exit();
            } catch (e) {
                console.warn('Could not exit:', e);
            }
        }
    }
};

window.TizenAPI = TizenAPI;
