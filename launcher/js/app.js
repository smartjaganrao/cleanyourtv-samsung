/**
 * CleanYourTV Launcher Controller for Samsung Tizen OS
 */

document.addEventListener('DOMContentLoaded', function() {
    TizenAPI.init();
    if (window.IPTVPlayer) IPTVPlayer.init();
    LauncherConfig.load();

    const state = {
        currentZone: 'DOCK', // 'TOP', 'DOCK', 'GRID', 'MODAL'
        dockIndex: 0,
        gridIndex: 0,
        topIndex: 0,
        modalIndex: 0,
        currentModal: null, // null, 'inputs', 'settings'
        activeGlow: 'rgba(229, 9, 20, 0.4)',
        idleTimer: null,
        isScreensaverActive: false,
        apps: []
    };

    // DOM Elements
    const ambientGlowEl = document.getElementById('ambient-glow');
    const focusedAppNameEl = document.getElementById('focused-app-name');
    const focusedAppDescEl = document.getElementById('focused-app-desc');
    const dockContainerEl = document.getElementById('dock-container');
    const appGridEl = document.getElementById('app-grid');
    const contentViewportEl = document.getElementById('content-viewport');
    const floatingFocusEl = document.getElementById('floating-focus');
    const inputsModalEl = document.getElementById('inputs-modal');
    const settingsModalEl = document.getElementById('settings-modal');
    const screensaverEl = document.getElementById('screensaver');

    const topActionBtns = Array.from(document.querySelectorAll('.glass-pill-btn'));

    // 1. Initialize Applications List
    function initApps() {
        TizenAPI.getInstalledApps(function(installedApps) {
            let catalog = window.DEFAULT_CATALOG.slice();
            
            if (installedApps && installedApps.length > 0) {
                // Merge real installed apps with catalog
                installedApps.forEach(function(inst) {
                    const match = catalog.find(c => c.id === inst.id || c.aliasId === inst.id);
                    if (match) {
                        match.name = inst.name || match.name;
                        if (inst.iconPath) match.icon = inst.iconPath;
                    } else if (inst.show !== false) {
                        catalog.push({
                            id: inst.id,
                            name: inst.name || inst.id,
                            desc: 'Installed Application',
                            icon: inst.iconPath || window.APP_ICONS.browser,
                            color: 'rgba(100, 150, 255, 0.3)',
                            isDock: false
                        });
                    }
                });
            }

            state.apps = catalog;
            renderDock();
            renderGrid();
            updateFocus();
        });
    }

    // 2. Render Dock (Default 4-6 pinned apps)
    function renderDock() {
        dockContainerEl.innerHTML = '';
        const dockApps = state.apps.slice(0, LauncherConfig.settings.dockSize);
        dockApps.forEach(function(app, idx) {
            const card = document.createElement('div');
            card.className = 'app-card dock-card';
            card.setAttribute('data-app-id', app.id);
            card.setAttribute('data-index', idx);

            card.innerHTML = `
                <div class="app-icon-wrap">
                    <img class="app-icon" src="${app.icon}" alt="${app.name}">
                </div>
            `;

            card.addEventListener('click', function() {
                state.currentZone = 'DOCK';
                state.dockIndex = idx;
                updateFocus();
                launchFocusedApp();
            });

            dockContainerEl.appendChild(card);
        });
    }

    // 3. Render All Apps Grid
    function renderGrid() {
        appGridEl.innerHTML = '';
        state.apps.forEach(function(app, idx) {
            const card = document.createElement('div');
            card.className = 'app-card grid-card';
            card.setAttribute('data-app-id', app.id);
            card.setAttribute('data-index', idx);

            card.innerHTML = `
                <div class="app-icon-wrap">
                    <img class="app-icon" src="${app.icon}" alt="${app.name}">
                </div>
                <div class="card-caption">${app.name}</div>
            `;

            card.addEventListener('click', function() {
                state.currentZone = 'GRID';
                state.gridIndex = idx;
                updateFocus();
                launchFocusedApp();
            });

            appGridEl.appendChild(card);
        });
    }

    // 4. Update Focus and Visual Highlights
    function updateFocus() {
        // Clear all previous focus classes
        document.querySelectorAll('.focused').forEach(el => el.classList.remove('focused'));

        let focusedEl = null;
        let focusedApp = null;

        if (state.currentZone === 'TOP') {
            contentViewportEl.classList.remove('show-grid');
            if (topActionBtns[state.topIndex]) {
                focusedEl = topActionBtns[state.topIndex];
                focusedEl.classList.add('focused');
                const btnAction = focusedEl.getAttribute('data-action');
                focusedAppNameEl.textContent = focusedEl.querySelector('span').textContent;
                if (btnAction === 'livetv') {
                    focusedAppDescEl.textContent = 'Free Public Broadcasts from All Countries · Press OK to watch';
                    setAmbientGlow('rgba(56, 189, 248, 0.45)');
                } else if (btnAction === 'artmode') {
                    focusedAppDescEl.textContent = 'The Frame Mode · 4K Museum Masterpieces & Ambient Clock · Press OK';
                    setAmbientGlow('rgba(245, 158, 11, 0.45)');
                } else if (btnAction === 'remote') {
                    focusedAppDescEl.textContent = 'Scan QR to control TV from your phone browser · No app needed';
                    setAmbientGlow('rgba(52, 211, 153, 0.45)');
                } else {
                    focusedAppDescEl.textContent = 'System Quick Action';
                    setAmbientGlow('rgba(255, 255, 255, 0.25)');
                }
            }
        } else if (state.currentZone === 'DOCK') {
            contentViewportEl.classList.remove('show-grid');
            const dockCards = dockContainerEl.querySelectorAll('.dock-card');
            if (dockCards[state.dockIndex]) {
                focusedEl = dockCards[state.dockIndex];
                focusedEl.classList.add('focused');
                focusedApp = state.apps[state.dockIndex];
            }
        } else if (state.currentZone === 'GRID') {
            contentViewportEl.classList.add('show-grid');
            const gridCards = appGridEl.querySelectorAll('.grid-card');
            if (gridCards[state.gridIndex]) {
                focusedEl = gridCards[state.gridIndex];
                focusedEl.classList.add('focused');
                focusedApp = state.apps[state.gridIndex];
            }
        } else if (state.currentZone === 'MODAL') {
            const activeModalEl = state.currentModal === 'inputs' ? inputsModalEl : settingsModalEl;
            const modalItems = activeModalEl.querySelectorAll('.modal-nav-item');
            if (modalItems[state.modalIndex]) {
                focusedEl = modalItems[state.modalIndex];
                focusedEl.classList.add('focused');
            }
        }

        if (focusedApp) {
            focusedAppNameEl.textContent = focusedApp.name;
            focusedAppDescEl.textContent = focusedApp.desc || 'Press OK to launch';
            setAmbientGlow(focusedApp.color || 'rgba(100, 150, 255, 0.35)');
        }

        // Align floating focus highlight
        if (focusedEl && state.currentZone !== 'MODAL') {
            const rect = focusedEl.getBoundingClientRect();
            floatingFocusEl.style.width = (rect.width + 12) + 'px';
            floatingFocusEl.style.height = (rect.height + 12) + 'px';
            floatingFocusEl.style.transform = `translate3d(${rect.left - 6}px, ${rect.top - 6}px, 0)`;
            floatingFocusEl.style.opacity = '1';
        } else {
            floatingFocusEl.style.opacity = '0';
        }
    }

    function setAmbientGlow(color) {
        if (!LauncherConfig.settings.ambientGlow) {
            ambientGlowEl.style.opacity = '0';
            return;
        }
        ambientGlowEl.style.opacity = '0.75';
        ambientGlowEl.style.background = `radial-gradient(ellipse at center, ${color} 0%, rgba(7, 8, 11, 0) 70%)`;
    }

    // 5. App Launching and Actions
    function launchFocusedApp() {
        let app = null;
        if (state.currentZone === 'DOCK') {
            app = state.apps[state.dockIndex];
        } else if (state.currentZone === 'GRID') {
            app = state.apps[state.gridIndex];
        }

        if (app) {
            if (app.id === "cleanyourtv.livetv" || app.id === "livetv") {
                if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
                return;
            }
            TizenAPI.launchApp(app.id);
        }
    }

    function executeTopAction() {
        const btn = topActionBtns[state.topIndex];
        const action = btn.getAttribute('data-action');
        if (action === 'livetv') {
            if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
        } else if (action === 'artmode') {
            if (window.ArtMode) ArtMode.open(0);
        } else if (action === 'remote') {
            openModal('remote');
        } else if (action === 'inputs') {
            openModal('inputs');
        } else if (action === 'settings') {
            openModal('settings');
        }
    }

    // 6. Modals
    function openModal(type) {
        state.currentModal = type;
        state.currentZone = 'MODAL';
        state.modalIndex = 0;

        if (type === 'inputs') {
            inputsModalEl.style.display = 'flex';
        } else if (type === 'settings') {
            settingsModalEl.style.display = 'flex';
            updateSettingsUI();
        } else if (type === 'remote') {
            const remoteEl = document.getElementById('remote-modal');
            if (remoteEl) remoteEl.style.display = 'flex';
        }
        updateFocus();
    }

    function closeModal() {
        inputsModalEl.style.display = 'none';
        settingsModalEl.style.display = 'none';
        const remoteEl = document.getElementById('remote-modal');
        if (remoteEl) remoteEl.style.display = 'none';
        state.currentModal = null;
        state.currentZone = 'TOP';
        updateFocus();
    }

    function handleModalSelect() {
        if (state.currentModal === 'inputs') {
            const items = inputsModalEl.querySelectorAll('.modal-nav-item');
            const target = items[state.modalIndex];
            const inputId = target.getAttribute('data-input-id');
            closeModal();
            if (inputId === 'TV') {
                if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
                return;
            }
            // Switch HDMI input via Tizen system API or deep link
            TizenAPI.launchApp('com.samsung.tv.input.' + inputId.toLowerCase(), null, function() {
                console.log('Switched to input:', inputId);
            });
        } else if (state.currentModal === 'settings') {
            const items = settingsModalEl.querySelectorAll('.modal-nav-item');
            const target = items[state.modalIndex];
            const settingKey = target.getAttribute('data-setting');
            cycleSetting(settingKey);
        }
    }

    function cycleSetting(key) {
        if (key === 'theme') {
            const themes = LauncherConfig.getThemes();
            const currIdx = themes.findIndex(t => t.id === LauncherConfig.settings.theme);
            const nextTheme = themes[(currIdx + 1) % themes.length];
            LauncherConfig.applyTheme(nextTheme.id);
        } else if (key === 'glow') {
            LauncherConfig.settings.ambientGlow = !LauncherConfig.settings.ambientGlow;
            LauncherConfig.save();
        } else if (key === 'dock') {
            LauncherConfig.settings.dockSize = LauncherConfig.settings.dockSize === 4 ? 6 : 4;
            LauncherConfig.save();
            renderDock();
        } else if (key === 'screensaver') {
            const times = [2, 5, 10, 0];
            const currIdx = times.indexOf(LauncherConfig.settings.screensaverMinutes);
            LauncherConfig.settings.screensaverMinutes = times[(currIdx + 1) % times.length];
            LauncherConfig.save();
        } else if (key === 'autoboot') {
            alert('To auto-boot into CleanYourTV on Samsung TV:\n\n1. Open TV Settings → General → Smart Features.\n2. Turn "Autorun Smart Hub" OFF.\n3. Turn "Autorun Last App" ON.\nNow whenever your TV turns on, it launches CleanYourTV!');
        }
        updateSettingsUI();
        updateFocus();
    }

    function updateSettingsUI() {
        document.getElementById('setting-theme-btn').textContent = LauncherConfig.settings.theme.toUpperCase();
        document.getElementById('setting-glow-btn').textContent = LauncherConfig.settings.ambientGlow ? 'Enabled' : 'Disabled';
        document.getElementById('setting-dock-btn').textContent = LauncherConfig.settings.dockSize + ' Apps';
        document.getElementById('setting-screensaver-btn').textContent = LauncherConfig.settings.screensaverMinutes === 0 ? 'Off' : LauncherConfig.settings.screensaverMinutes + ' Min';
    }

    // 7. Navigation Controller (Spatial D-pad)
    function onKeyDown(e) {
        resetIdleTimer();

        if (window.IPTVPlayer && IPTVPlayer.isOpen) {
            if (IPTVPlayer.handleKeyDown(e)) {
                return;
            }
        }

        if (window.ArtMode && ArtMode.isOpen) {
            if (ArtMode.handleKeyDown(e)) {
                return;
            }
        }

        if (state.isScreensaverActive) {
            wakeFromScreensaver();
            e.preventDefault();
            return;
        }

        const key = e.keyCode;
        const GRID_COLUMNS = 6;
        const dockCount = LauncherConfig.settings.dockSize;
        const gridCount = state.apps.length;

        // Remote Key codes:
        // 37 = Left, 38 = Up, 39 = Right, 40 = Down, 13 = Enter
        // 10009 = Tizen Return/Back, 27 = Escape
        switch (key) {
            case 37: // Left
                if (state.currentZone === 'TOP') {
                    state.topIndex = Math.max(0, state.topIndex - 1);
                } else if (state.currentZone === 'DOCK') {
                    state.dockIndex = Math.max(0, state.dockIndex - 1);
                } else if (state.currentZone === 'GRID') {
                    state.gridIndex = Math.max(0, state.gridIndex - 1);
                }
                updateFocus();
                e.preventDefault();
                break;

            case 39: // Right
                if (state.currentZone === 'TOP') {
                    state.topIndex = Math.min(topActionBtns.length - 1, state.topIndex + 1);
                } else if (state.currentZone === 'DOCK') {
                    state.dockIndex = Math.min(dockCount - 1, state.dockIndex + 1);
                } else if (state.currentZone === 'GRID') {
                    state.gridIndex = Math.min(gridCount - 1, state.gridIndex + 1);
                }
                updateFocus();
                e.preventDefault();
                break;

            case 38: // Up
                if (state.currentZone === 'GRID') {
                    if (state.gridIndex < GRID_COLUMNS) {
                        state.currentZone = 'DOCK';
                        state.dockIndex = Math.min(dockCount - 1, state.gridIndex);
                    } else {
                        state.gridIndex -= GRID_COLUMNS;
                    }
                } else if (state.currentZone === 'DOCK') {
                    state.currentZone = 'TOP';
                    state.topIndex = 0;
                } else if (state.currentZone === 'MODAL') {
                    const activeModalEl = state.currentModal === 'inputs' ? inputsModalEl : settingsModalEl;
                    const items = activeModalEl.querySelectorAll('.modal-nav-item');
                    state.modalIndex = Math.max(0, state.modalIndex - 1);
                }
                updateFocus();
                e.preventDefault();
                break;

            case 40: // Down
                if (state.currentZone === 'TOP') {
                    state.currentZone = 'DOCK';
                    state.dockIndex = 0;
                } else if (state.currentZone === 'DOCK') {
                    state.currentZone = 'GRID';
                    state.gridIndex = 0;
                } else if (state.currentZone === 'GRID') {
                    if (state.gridIndex + GRID_COLUMNS < gridCount) {
                        state.gridIndex += GRID_COLUMNS;
                    }
                } else if (state.currentZone === 'MODAL') {
                    const activeModalEl = state.currentModal === 'inputs' ? inputsModalEl : settingsModalEl;
                    const items = activeModalEl.querySelectorAll('.modal-nav-item');
                    state.modalIndex = Math.min(items.length - 1, state.modalIndex + 1);
                }
                updateFocus();
                e.preventDefault();
                break;

            case 13: // Enter / OK
                if (state.currentZone === 'TOP') {
                    executeTopAction();
                } else if (state.currentZone === 'DOCK' || state.currentZone === 'GRID') {
                    launchFocusedApp();
                } else if (state.currentZone === 'MODAL') {
                    handleModalSelect();
                }
                e.preventDefault();
                break;

            case 10009: // Tizen Return / Back
            case 27:    // Escape
                if (state.currentZone === 'MODAL') {
                    closeModal();
                } else if (state.currentZone === 'GRID') {
                    state.currentZone = 'DOCK';
                    updateFocus();
                }
                e.preventDefault();
                break;
        }
    }

    window.addEventListener('keydown', onKeyDown);

    // 8. Clock & Date Tick
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;

        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', dateOptions);

        document.getElementById('digital-clock').textContent = timeStr;
        document.getElementById('current-date').textContent = dateStr;

        if (state.isScreensaverActive) {
            document.getElementById('ss-clock').textContent = timeStr;
            document.getElementById('ss-date').textContent = dateStr;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 9. OLED Screensaver (Drift prevention)
    function resetIdleTimer() {
        clearTimeout(state.idleTimer);
        const mins = LauncherConfig.settings.screensaverMinutes;
        if (mins > 0) {
            state.idleTimer = setTimeout(startScreensaver, mins * 60 * 1000);
        }
    }

    function startScreensaver() {
        state.isScreensaverActive = true;
        screensaverEl.style.display = 'flex';
        driftScreensaver();
    }

    function driftScreensaver() {
        if (!state.isScreensaverActive) return;
        const x = (Math.random() - 0.5) * 160;
        const y = (Math.random() - 0.5) * 120;
        screensaverEl.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(driftScreensaver, 60000);
    }

    function wakeFromScreensaver() {
        state.isScreensaverActive = false;
        screensaverEl.style.display = 'none';
        screensaverEl.style.transform = 'translate(0, 0)';
        resetIdleTimer();
    }

    // 10. System Info update
    TizenAPI.getSystemInfo(function(info) {
        if (info && info.model) {
            document.getElementById('network-name').textContent = info.network.includes('Wi-Fi') ? 'Wi-Fi' : 'Ethernet';
            const statsEl = document.getElementById('sys-stats');
            if (statsEl) {
                statsEl.textContent = `${info.model} · ${info.version}`;
            }
        }
    });

    LauncherConfig.applyTheme(LauncherConfig.settings.theme);
    initApps();
    if (window.ArtMode) ArtMode.init();
    resetIdleTimer();
});
