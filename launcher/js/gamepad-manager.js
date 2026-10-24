/**
 * GamepadManager - HTML5 Gamepad API Engine & Stick Drift Diagnostic Hub
 * CleanYourTV Samsung TV Edition
 *
 * Provides:
 * 1. Automatic detection of Xbox, PlayStation (DualSense/DualShock), Nintendo Pro, 8BitDo & USB gamepads.
 * 2. Couch Navigation: Maps gamepad D-pad, left stick & buttons to TV navigation so gamers can browse CleanYourTV with their controller.
 * 3. Stick Drift Analyzer: Real-time dual circular radar showing (X, Y) drift coordinates, deadzone thresholds, and health rating.
 * 4. Haptic Feedback / Rumble Test: Dual-rumble motor actuation test.
 * 5. Trigger Pressure Gauges: Linear analog trigger depth meters (LT/RT, L2/R2).
 */

const GamepadManager = (function() {
    let connectedGamepads = {};
    let pollingRafId = null;
    let lastNavTime = 0;
    const NAV_THROTTLE_MS = 180;
    let isOpen = false;
    let modalNavIndex = 0;

    // Gamepad button index mappings (Standard Gamepad Specification)
    const BTN = {
        A: 0,        // Cross / A
        B: 1,        // Circle / B
        X: 2,        // Square / X
        Y: 3,        // Triangle / Y
        LB: 4,       // L1 / Left Bumper
        RB: 5,       // R1 / Right Bumper
        LT: 6,       // L2 / Left Trigger (Analog)
        RT: 7,       // R2 / Right Trigger (Analog)
        SELECT: 8,   // Share / Back / View
        START: 9,    // Options / Menu / Start
        L3: 10,      // Left Stick Click
        R3: 11,      // Right Stick Click
        DPAD_UP: 12,
        DPAD_DOWN: 13,
        DPAD_LEFT: 14,
        DPAD_RIGHT: 15,
        HOME: 16     // Guide / PS Button
    };

    function init() {
        window.addEventListener('gamepadconnected', onGamepadConnected);
        window.addEventListener('gamepaddisconnected', onGamepadDisconnected);
        startPolling();
    }

    function onGamepadConnected(e) {
        const gp = e.gamepad;
        connectedGamepads[gp.index] = gp;
        console.log('[Gamepad] Connected:', gp.id, 'at index', gp.index);
        showToast('🎮 ' + (cleanGamepadName(gp.id)) + ' Connected');
        updateStatusPill();
    }

    function onGamepadDisconnected(e) {
        delete connectedGamepads[e.gamepad.index];
        console.log('[Gamepad] Disconnected:', e.gamepad.id);
        showToast('⚠️ Gamepad Disconnected');
        updateStatusPill();
    }

    function cleanGamepadName(id) {
        if (!id) return 'Wireless Controller';
        if (id.includes('DualSense') || id.includes('054c:0ce6')) return 'PS5 DualSense Wireless';
        if (id.includes('DualShock') || id.includes('054c:05c4') || id.includes('054c:09cc')) return 'PS4 DualShock 4';
        if (id.includes('Xbox') || id.includes('045e:')) return 'Xbox Wireless Controller';
        if (id.includes('Nintendo') || id.includes('Pro Controller')) return 'Nintendo Switch Pro Controller';
        if (id.includes('8BitDo')) return '8BitDo Gamepad';
        // Generic cleanup
        return id.replace(/\(.*?\)/g, '').trim().slice(0, 24) || 'Game Controller';
    }

    function startPolling() {
        if (pollingRafId) cancelAnimationFrame(pollingRafId);

        function poll() {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            let activeGp = null;

            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] && gamepads[i].connected) {
                    activeGp = gamepads[i];
                    connectedGamepads[i] = activeGp;
                    break;
                }
            }

            if (activeGp) {
                if (isOpen) {
                    renderDiagnosticHUD(activeGp);
                } else if (!window.RetroArcade || !RetroArcade.isOpen) {
                    handleLauncherGamepadNav(activeGp);
                }
            }

            pollingRafId = requestAnimationFrame(poll);
        }
        pollingRafId = requestAnimationFrame(poll);
    }

    // Maps gamepad presses to keyboard navigation for couch browsing
    function handleLauncherGamepadNav(gp) {
        const now = Date.now();
        if (now - lastNavTime < NAV_THROTTLE_MS) return;

        const leftX = gp.axes[0] || 0;
        const leftY = gp.axes[1] || 0;

        let key = null;

        if (isButtonPressed(gp, BTN.DPAD_UP) || leftY < -0.55) {
            key = 'ArrowUp';
        } else if (isButtonPressed(gp, BTN.DPAD_DOWN) || leftY > 0.55) {
            key = 'ArrowDown';
        } else if (isButtonPressed(gp, BTN.DPAD_LEFT) || leftX < -0.55) {
            key = 'ArrowLeft';
        } else if (isButtonPressed(gp, BTN.DPAD_RIGHT) || leftX > 0.55) {
            key = 'ArrowRight';
        } else if (isButtonPressed(gp, BTN.A)) {
            key = 'Enter';
        } else if (isButtonPressed(gp, BTN.B)) {
            key = 'Escape'; // Return/Back
        } else if (isButtonPressed(gp, BTN.START) || isButtonPressed(gp, BTN.Y)) {
            key = 'F'; // Favorite / Menu
        }

        if (key) {
            lastNavTime = now;
            dispatchSyntheticKey(key);
        }
    }

    function isButtonPressed(gp, btnIdx) {
        if (!gp.buttons || !gp.buttons[btnIdx]) return false;
        const b = gp.buttons[btnIdx];
        return typeof b === 'object' ? b.pressed : b === 1.0;
    }

    function getButtonValue(gp, btnIdx) {
        if (!gp.buttons || !gp.buttons[btnIdx]) return 0;
        const b = gp.buttons[btnIdx];
        return typeof b === 'object' ? b.value : (b ? 1.0 : 0);
    }

    function dispatchSyntheticKey(keyName) {
        const event = new KeyboardEvent('keydown', {
            key: keyName,
            code: keyName,
            bubbles: true,
            cancelable: true
        });
        window.dispatchEvent(event);
    }

    function updateStatusPill() {
        const pill = document.getElementById('gamepad-status-pill');
        if (!pill) return;
        const count = Object.keys(connectedGamepads).length;
        if (count > 0) {
            pill.innerHTML = `🎮 ${count} Controller Connected`;
            pill.style.display = 'inline-block';
        } else {
            pill.innerHTML = `🎮 No Gamepad`;
            pill.style.display = 'none';
        }
    }

    // Modal UI & Stick Drift Diagnostic Engine
    function open() {
        isOpen = true;
        const modal = document.getElementById('gamepad-modal');
        if (modal) {
            modal.style.display = 'flex';
            modalNavIndex = 0;
            updateModalFocus();
        }
    }

    function close() {
        isOpen = false;
        const modal = document.getElementById('gamepad-modal');
        if (modal) modal.style.display = 'none';
    }

    function updateModalFocus() {
        const modal = document.getElementById('gamepad-modal');
        if (!modal) return;
        const items = modal.querySelectorAll('.modal-nav-item');
        items.forEach((item, idx) => {
            if (idx === modalNavIndex) item.classList.add('focused');
            else item.classList.remove('focused');
        });
    }

    function renderDiagnosticHUD(gp) {
        const nameEl = document.getElementById('gp-name');
        if (nameEl) nameEl.textContent = cleanGamepadName(gp.id);

        const idSubEl = document.getElementById('gp-id-sub');
        if (idSubEl) idSubEl.textContent = (gp.id || 'Standard Gamepad') + ' · Index ' + gp.index;

        // Stick coordinates (deadzone evaluation)
        const lx = gp.axes[0] || 0;
        const ly = gp.axes[1] || 0;
        const rx = gp.axes[2] !== undefined ? gp.axes[2] : (gp.axes[3] || 0);
        const ry = gp.axes[3] !== undefined ? gp.axes[3] : 0;

        renderRadar('gp-radar-left', lx, ly, 'gp-left-drift-val', 'gp-left-coord');
        renderRadar('gp-radar-right', rx, ry, 'gp-right-drift-val', 'gp-right-coord');

        // Triggers (Analog LT / RT)
        const ltVal = getButtonValue(gp, BTN.LT);
        const rtVal = getButtonValue(gp, BTN.RT);
        updateMeter('gp-meter-lt', ltVal, 'gp-val-lt');
        updateMeter('gp-meter-rt', rtVal, 'gp-val-rt');

        // Buttons Active States
        highlightButton('gp-btn-a', isButtonPressed(gp, BTN.A));
        highlightButton('gp-btn-b', isButtonPressed(gp, BTN.B));
        highlightButton('gp-btn-x', isButtonPressed(gp, BTN.X));
        highlightButton('gp-btn-y', isButtonPressed(gp, BTN.Y));
        highlightButton('gp-btn-lb', isButtonPressed(gp, BTN.LB));
        highlightButton('gp-btn-rb', isButtonPressed(gp, BTN.RB));
        highlightButton('gp-btn-start', isButtonPressed(gp, BTN.START));
        highlightButton('gp-btn-select', isButtonPressed(gp, BTN.SELECT));
        highlightButton('gp-dpad-u', isButtonPressed(gp, BTN.DPAD_UP));
        highlightButton('gp-dpad-d', isButtonPressed(gp, BTN.DPAD_DOWN));
        highlightButton('gp-dpad-l', isButtonPressed(gp, BTN.DPAD_LEFT));
        highlightButton('gp-dpad-r', isButtonPressed(gp, BTN.DPAD_RIGHT));
    }

    function renderRadar(radarId, x, y, valElId, coordElId) {
        const radar = document.getElementById(radarId);
        if (!radar) return;
        const dot = radar.querySelector('.radar-dot');
        const line = radar.querySelector('.radar-vector');

        // Calculate magnitude (distance from center)
        const dist = Math.sqrt(x * x + y * y);
        const driftPct = (dist * 100).toFixed(1);

        // Clamp to radar box (-1..1 to 0..100%)
        const px = 50 + (x * 45);
        const py = 50 + (y * 45);

        if (dot) {
            dot.style.left = px + '%';
            dot.style.top = py + '%';

            // Color indicator for stick health
            if (dist < 0.05) {
                dot.style.background = '#10b981'; // Green: Pristine
                dot.style.boxShadow = '0 0 12px #10b981';
            } else if (dist < 0.15) {
                dot.style.background = '#f59e0b'; // Amber: Slight drift
                dot.style.boxShadow = '0 0 12px #f59e0b';
            } else {
                dot.style.background = '#ef4444'; // Red: Noticeable drift
                dot.style.boxShadow = '0 0 16px #ef4444';
            }
        }

        const valEl = document.getElementById(valElId);
        if (valEl) {
            if (dist < 0.05) {
                valEl.innerHTML = `<span style="color:#10b981">${driftPct}% (Pristine)</span>`;
            } else if (dist < 0.15) {
                valEl.innerHTML = `<span style="color:#f59e0b">${driftPct}% (Mild Drift)</span>`;
            } else {
                valEl.innerHTML = `<span style="color:#ef4444">${driftPct}% (Defective / Drift)</span>`;
            }
        }

        const coordEl = document.getElementById(coordElId);
        if (coordEl) {
            coordEl.textContent = `X: ${x.toFixed(3)} · Y: ${y.toFixed(3)}`;
        }
    }

    function updateMeter(meterId, val, labelId) {
        const meter = document.getElementById(meterId);
        if (meter) meter.style.width = (val * 100).toFixed(0) + '%';
        const lbl = document.getElementById(labelId);
        if (lbl) lbl.textContent = (val * 100).toFixed(0) + '%';
    }

    function highlightButton(id, active) {
        const el = document.getElementById(id);
        if (!el) return;
        if (active) el.classList.add('btn-active');
        else el.classList.remove('btn-active');
    }

    // Trigger dual vibration rumble
    function testRumble() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (let i = 0; i < gamepads.length; i++) {
            const gp = gamepads[i];
            if (gp && gp.vibrationActuator) {
                try {
                    gp.vibrationActuator.playEffect('dual-rumble', {
                        startDelay: 0,
                        duration: 500,
                        weakMagnitude: 0.8,
                        strongMagnitude: 1.0
                    });
                    showToast('📳 Haptic Rumble Test Sent');
                    return;
                } catch (e) {
                    console.warn('[Gamepad] Vibration failed:', e);
                }
            }
        }
        showToast('⚠️ No vibration motor detected on this controller');
    }

    function handleKeyDown(e) {
        if (!isOpen) return false;
        const key = e.key;
        if (key === 'Escape' || key === 'XF86Back' || key === '10009') {
            close();
            return true;
        }

        const modal = document.getElementById('gamepad-modal');
        const items = modal ? modal.querySelectorAll('.modal-nav-item') : [];
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            modalNavIndex = (modalNavIndex + 1) % items.length;
            updateModalFocus();
            return true;
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            modalNavIndex = (modalNavIndex - 1 + items.length) % items.length;
            updateModalFocus();
            return true;
        }
        if (key === 'Enter') {
            if (items[modalNavIndex]) items[modalNavIndex].click();
            return true;
        }
        return false;
    }

    function showToast(msg) {
        let toast = document.getElementById('cleanyourtv-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cleanyourtv-toast';
            toast.className = 'cleanyourtv-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
    }

    return {
        init: init,
        open: open,
        close: close,
        testRumble: testRumble,
        handleKeyDown: handleKeyDown,
        cleanGamepadName: cleanGamepadName,
        get isOpen() { return isOpen; }
    };
})();

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', GamepadManager.init);
} else {
    GamepadManager.init();
}
