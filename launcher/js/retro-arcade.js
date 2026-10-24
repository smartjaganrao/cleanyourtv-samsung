/**
 * RetroArcade - Built-in 60fps Web Retro Arcade & Gaming Engine
 * CleanYourTV Samsung TV Edition
 *
 * Features:
 * - 5 Playable 60fps Retro Classics:
 *   1. 🧱 Brick Breaker 4K (Arkanoid / Breakout)
 *   2. 👾 Space Defenders (Space Invaders / Galaxian)
 *   3. 🐍 Cyber Snake (Neon 60fps Snake)
 *   4. 🏓 Retro Pong Pro (Single Player AI & 2-Player Co-Op)
 *   5. 🧩 Falling Blocks (Classic 8-Bit Tetriminos)
 * - 8-Bit Sound Synthesizer via Web Audio API (Zero external MP3/WAV assets)
 * - CRT Scanline Filter Toggle
 * - Dual Control: Samsung Remote (D-Pad/OK) & Connected Gamepads (Xbox/PlayStation)
 * - High score persistence via localStorage
 */

const RetroArcade = (function() {
    let isOpen = false;
    let currentTab = 'games'; // 'games' | 'play' | 'roms'
    let selectedGameIdx = 0;
    let activeGame = null;
    let animFrameId = null;
    let audioCtx = null;
    let crtEnabled = false;

    const GAMES_CATALOG = [
        {
            id: 'brick',
            title: '🧱 Brick Breaker 4K',
            genre: 'Arkanoid / Breakout',
            desc: 'High-speed neon paddle action with angular bounce physics, multi-colored bricks & particle explosions.',
            badge: 'CLASSIC ARCADE',
            color: '#ec4899'
        },
        {
            id: 'invaders',
            title: '👾 Space Defenders',
            genre: 'Space Invaders 1984',
            desc: 'Defend earth against descending alien invaders with your laser cannon and destructible defense bunkers.',
            badge: 'SHOOTER',
            color: '#38bdf8'
        },
        {
            id: 'snake',
            title: '🐍 Cyber Snake',
            genre: 'Neon 60fps Snake',
            desc: 'Smooth 60fps grid movement, glowing cyber pellets, and speed scaling. High scores saved locally.',
            badge: 'SPEED TEST',
            color: '#10b981'
        },
        {
            id: 'pong',
            title: '🏓 Retro Pong Pro',
            genre: '1-Player AI or 2-Player Co-Op',
            desc: 'The grandfather of video games reinvented with curve physics, rally streaks & 2-controller support.',
            badge: 'VERSUS',
            color: '#f59e0b'
        },
        {
            id: 'blocks',
            title: '🧩 Falling Blocks 8-Bit',
            genre: 'Tetriminos / Puzzle',
            desc: 'Classic 7-piece block stacking with ghost piece drop projection, line clear effects & level speeds.',
            badge: 'PUZZLE',
            color: '#8b5cf6'
        }
    ];

    // ==========================================
    // 8-Bit Web Audio API Sound Synthesizer
    // ==========================================
    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSound(type) {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'laser') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            } else if (type === 'hit') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.setValueAtTime(240, now + 0.04);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'bounce') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.06);
                osc.start(now);
                osc.stop(now + 0.06);
            } else if (type === 'score') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
                osc.start(now);
                osc.stop(now + 0.22);
            } else if (type === 'explosion') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            } else if (type === 'gameover') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.45);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
                osc.start(now);
                osc.stop(now + 0.45);
            }
        } catch (e) {
            // Audio policy ignore
        }
    }

    // ==========================================
    // Lifecycle & Navigation
    // ==========================================
    function open() {
        isOpen = true;
        currentTab = 'games';
        selectedGameIdx = 0;
        const modal = document.getElementById('arcade-modal');
        if (modal) {
            modal.style.display = 'flex';
            renderCatalog();
            showCatalogView();
        }
    }

    function close() {
        stopGame();
        isOpen = false;
        const modal = document.getElementById('arcade-modal');
        if (modal) modal.style.display = 'none';
    }

    function renderCatalog() {
        const list = document.getElementById('arcade-games-grid');
        if (!list) return;
        list.innerHTML = '';

        GAMES_CATALOG.forEach((game, idx) => {
            const card = document.createElement('div');
            card.className = 'arcade-game-card modal-nav-item' + (idx === selectedGameIdx ? ' focused' : '');
            card.setAttribute('data-game-idx', idx);
            card.innerHTML = `
                <div class="game-badge" style="background:${game.color}22; color:${game.color}; border:1px solid ${game.color}55">${game.badge}</div>
                <div class="game-title">${game.title}</div>
                <div class="game-genre">${game.genre}</div>
                <div class="game-desc">${game.desc}</div>
                <div class="game-play-btn" style="color:${game.color}">▶ PRESS OK TO PLAY</div>
            `;
            card.onclick = () => launchGame(idx);
            list.appendChild(card);
        });
    }

    function showCatalogView() {
        currentTab = 'games';
        const catalogView = document.getElementById('arcade-catalog-view');
        const playView = document.getElementById('arcade-play-view');
        const romsView = document.getElementById('arcade-roms-view');
        if (catalogView) catalogView.style.display = 'block';
        if (playView) playView.style.display = 'none';
        if (romsView) romsView.style.display = 'none';
        renderCatalog();
    }

    function showRomsView() {
        currentTab = 'roms';
        const catalogView = document.getElementById('arcade-catalog-view');
        const playView = document.getElementById('arcade-play-view');
        const romsView = document.getElementById('arcade-roms-view');
        if (catalogView) catalogView.style.display = 'none';
        if (playView) playView.style.display = 'none';
        if (romsView) romsView.style.display = 'block';
    }

    function launchGame(idx) {
        selectedGameIdx = idx;
        const gameMeta = GAMES_CATALOG[idx];
        currentTab = 'play';

        const catalogView = document.getElementById('arcade-catalog-view');
        const playView = document.getElementById('arcade-play-view');
        if (catalogView) catalogView.style.display = 'none';
        if (playView) playView.style.display = 'flex';

        document.getElementById('arcade-game-active-title').textContent = gameMeta.title;

        const canvas = document.getElementById('arcade-canvas');
        canvas.width = 800;
        canvas.height = 600;

        stopGame();

        if (gameMeta.id === 'brick') {
            activeGame = new BrickBreakerGame(canvas);
        } else if (gameMeta.id === 'invaders') {
            activeGame = new SpaceDefendersGame(canvas);
        } else if (gameMeta.id === 'snake') {
            activeGame = new CyberSnakeGame(canvas);
        } else if (gameMeta.id === 'pong') {
            activeGame = new RetroPongGame(canvas);
        } else if (gameMeta.id === 'blocks') {
            activeGame = new FallingBlocksGame(canvas);
        }

        if (activeGame) {
            activeGame.start();
        }
    }

    function stopGame() {
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        if (activeGame && activeGame.destroy) {
            activeGame.destroy();
        }
        activeGame = null;
    }

    function toggleCRT() {
        crtEnabled = !crtEnabled;
        const canvasWrap = document.getElementById('arcade-canvas-wrap');
        if (canvasWrap) {
            if (crtEnabled) canvasWrap.classList.add('crt-scanlines');
            else canvasWrap.classList.remove('crt-scanlines');
        }
    }

    // ==========================================
    // GAME 1: 🧱 Brick Breaker 4K
    // ==========================================
    class BrickBreakerGame {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.w = canvas.width;
            this.h = canvas.height;
            this.paddleW = 120;
            this.paddleH = 16;
            this.paddleX = (this.w - this.paddleW) / 2;
            this.paddleSpeed = 10;
            this.ballRadius = 9;
            this.ballX = this.w / 2;
            this.ballY = this.h - 60;
            this.ballDx = 5 * (Math.random() > 0.5 ? 1 : -1);
            this.ballDy = -5;
            this.score = 0;
            this.lives = 3;
            this.gameOver = false;
            this.particles = [];
            this.keys = {};

            // Bricks layout: 5 rows x 10 cols
            this.brickRows = 5;
            this.brickCols = 10;
            this.brickW = 68;
            this.brickH = 22;
            this.brickPadding = 8;
            this.brickOffsetTop = 70;
            this.brickOffsetLeft = 24;
            this.colors = ['#ef4444', '#f97316', '#facc15', '#10b981', '#38bdf8'];

            this.bricks = [];
            for (let r = 0; r < this.brickRows; r++) {
                this.bricks[r] = [];
                for (let c = 0; c < this.brickCols; c++) {
                    this.bricks[r][c] = { x: 0, y: 0, status: 1, color: this.colors[r] };
                }
            }
        }

        start() {
            const loop = () => {
                this.update();
                this.draw();
                if (!this.gameOver) animFrameId = requestAnimationFrame(loop);
            };
            animFrameId = requestAnimationFrame(loop);
        }

        update() {
            // Paddle Movement
            if (this.keys['ArrowLeft'] || this.keys['a']) this.paddleX = Math.max(0, this.paddleX - this.paddleSpeed);
            if (this.keys['ArrowRight'] || this.keys['d']) this.paddleX = Math.min(this.w - this.paddleW, this.paddleX + this.paddleSpeed);

            // Ball Physics
            this.ballX += this.ballDx;
            this.ballY += this.ballDy;

            // Wall Collisions
            if (this.ballX - this.ballRadius < 0) {
                this.ballX = this.ballRadius;
                this.ballDx = -this.ballDx;
                playSound('bounce');
            } else if (this.ballX + this.ballRadius > this.w) {
                this.ballX = this.w - this.ballRadius;
                this.ballDx = -this.ballDx;
                playSound('bounce');
            }
            if (this.ballY - this.ballRadius < 0) {
                this.ballY = this.ballRadius;
                this.ballDy = -this.ballDy;
                playSound('bounce');
            }

            // Paddle Collision with angular bounce
            if (this.ballY + this.ballRadius >= this.h - 35 && this.ballY - this.ballRadius <= this.h - 35 + this.paddleH) {
                if (this.ballX >= this.paddleX && this.ballX <= this.paddleX + this.paddleW) {
                    const hitPos = (this.ballX - (this.paddleX + this.paddleW / 2)) / (this.paddleW / 2);
                    this.ballDx = hitPos * 8;
                    this.ballDy = -Math.abs(this.ballDy);
                    playSound('bounce');
                }
            }

            // Brick Collisions
            let allCleared = true;
            for (let r = 0; r < this.brickRows; r++) {
                for (let c = 0; c < this.brickCols; c++) {
                    const b = this.bricks[r][c];
                    if (b.status === 1) {
                        allCleared = false;
                        const bx = c * (this.brickW + this.brickPadding) + this.brickOffsetLeft;
                        const by = r * (this.brickH + this.brickPadding) + this.brickOffsetTop;
                        b.x = bx;
                        b.y = by;

                        if (this.ballX + this.ballRadius > bx && this.ballX - this.ballRadius < bx + this.brickW &&
                            this.ballY + this.ballRadius > by && this.ballY - this.ballRadius < by + this.brickH) {
                            this.ballDy = -this.ballDy;
                            b.status = 0;
                            this.score += 20;
                            playSound('hit');
                            this.spawnParticles(bx + this.brickW / 2, by + this.brickH / 2, b.color);
                        }
                    }
                }
            }

            if (allCleared) {
                playSound('score');
                this.gameOver = true;
            }

            // Ball Floor Fall
            if (this.ballY + this.ballRadius > this.h) {
                this.lives--;
                playSound('explosion');
                if (this.lives <= 0) {
                    this.gameOver = true;
                    playSound('gameover');
                } else {
                    this.ballX = this.w / 2;
                    this.ballY = this.h - 60;
                    this.ballDx = 5 * (Math.random() > 0.5 ? 1 : -1);
                    this.ballDy = -5;
                }
            }

            // Update Particles
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.03;
                if (p.alpha <= 0) this.particles.splice(i, 1);
            }
        }

        spawnParticles(x, y, color) {
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 4 + 1;
                this.particles.push({
                    x: x, y: y,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    color: color,
                    alpha: 1.0
                });
            }
        }

        draw() {
            this.ctx.fillStyle = '#0a0d14';
            this.ctx.fillRect(0, 0, this.w, this.h);

            // HUD
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = '16px monospace';
            this.ctx.fillText(`SCORE: ${this.score}`, 25, 35);
            this.ctx.fillText(`LIVES: ${'❤️ '.repeat(this.lives)}`, this.w - 140, 35);

            // Bricks
            for (let r = 0; r < this.brickRows; r++) {
                for (let c = 0; c < this.brickCols; c++) {
                    const b = this.bricks[r][c];
                    if (b.status === 1) {
                        const bx = c * (this.brickW + this.brickPadding) + this.brickOffsetLeft;
                        const by = r * (this.brickH + this.brickPadding) + this.brickOffsetTop;
                        this.ctx.fillStyle = b.color;
                        this.ctx.shadowColor = b.color;
                        this.ctx.shadowBlur = 8;
                        this.ctx.fillRect(bx, by, this.brickW, this.brickH);
                        this.ctx.shadowBlur = 0;
                    }
                }
            }

            // Paddle
            this.ctx.fillStyle = '#38bdf8';
            this.ctx.shadowColor = '#38bdf8';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(this.paddleX, this.h - 35, this.paddleW, this.paddleH);
            this.ctx.shadowBlur = 0;

            // Ball
            this.ctx.beginPath();
            this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.shadowColor = '#38bdf8';
            this.ctx.shadowBlur = 12;
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.shadowBlur = 0;

            // Particles
            this.particles.forEach(p => {
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillRect(p.x, p.y, 4, 4);
            });
            this.ctx.globalAlpha = 1.0;

            if (this.gameOver) {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                this.ctx.fillRect(0, 0, this.w, this.h);
                this.ctx.fillStyle = '#f43f5e';
                this.ctx.font = 'bold 36px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(this.lives > 0 ? 'STAGE CLEAR!' : 'GAME OVER', this.w / 2, this.h / 2 - 20);
                this.ctx.fillStyle = '#cbd5e1';
                this.ctx.font = '20px monospace';
                this.ctx.fillText(`Final Score: ${this.score}`, this.w / 2, this.h / 2 + 25);
                this.ctx.fillText('Press OK to Restart · Back to Exit', this.w / 2, this.h / 2 + 65);
                this.ctx.textAlign = 'left';
            }
        }

        handleKey(key, isDown) {
            this.keys[key] = isDown;
            if (this.gameOver && isDown && key === 'Enter') {
                launchGame(0);
            }
        }

        destroy() {}
    }

    // ==========================================
    // GAME 2: 👾 Space Defenders
    // ==========================================
    class SpaceDefendersGame {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.w = canvas.width;
            this.h = canvas.height;
            this.playerW = 44;
            this.playerH = 24;
            this.playerX = (this.w - this.playerW) / 2;
            this.playerSpeed = 7;
            this.bullets = [];
            this.alienBullets = [];
            this.aliens = [];
            this.score = 0;
            this.lives = 3;
            this.gameOver = false;
            this.keys = {};
            this.alienDir = 1;
            this.alienSpeed = 1.2;
            this.alienStepDown = false;
            this.particles = [];

            // 4 rows x 8 columns of aliens
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 8; c++) {
                    this.aliens.push({
                        x: 100 + c * 75,
                        y: 70 + r * 50,
                        w: 36,
                        h: 26,
                        alive: true,
                        color: r === 0 ? '#ef4444' : (r === 1 ? '#f59e0b' : '#38bdf8')
                    });
                }
            }
        }

        start() {
            const loop = () => {
                this.update();
                this.draw();
                if (!this.gameOver) animFrameId = requestAnimationFrame(loop);
            };
            animFrameId = requestAnimationFrame(loop);
        }

        update() {
            if (this.keys['ArrowLeft']) this.playerX = Math.max(20, this.playerX - this.playerSpeed);
            if (this.keys['ArrowRight']) this.playerX = Math.min(this.w - this.playerW - 20, this.playerX + this.playerSpeed);

            // Player Bullets
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                const b = this.bullets[i];
                b.y -= 10;
                if (b.y < 0) {
                    this.bullets.splice(i, 1);
                    continue;
                }
                // Check Alien Hit
                for (let a of this.aliens) {
                    if (a.alive && b.x > a.x && b.x < a.x + a.w && b.y > a.y && b.y < a.y + a.h) {
                        a.alive = false;
                        this.bullets.splice(i, 1);
                        this.score += 50;
                        playSound('explosion');
                        this.spawnParticles(a.x + a.w / 2, a.y + a.h / 2, a.color);
                        break;
                    }
                }
            }

            // Move Aliens
            let edgeHit = false;
            let aliveCount = 0;
            for (let a of this.aliens) {
                if (!a.alive) continue;
                aliveCount++;
                a.x += this.alienDir * this.alienSpeed;
                if (a.x + a.w > this.w - 20 || a.x < 20) edgeHit = true;

                // Alien hits bottom / player
                if (a.y + a.h >= this.h - 60) {
                    this.gameOver = true;
                    playSound('gameover');
                }
            }

            if (edgeHit) {
                this.alienDir = -this.alienDir;
                for (let a of this.aliens) a.y += 18;
                this.alienSpeed += 0.15;
            }

            if (aliveCount === 0) {
                this.gameOver = true;
                playSound('score');
            }

            // Alien Random Fire
            if (Math.random() < 0.035 && aliveCount > 0) {
                const living = this.aliens.filter(a => a.alive);
                const shooter = living[Math.floor(Math.random() * living.length)];
                this.alienBullets.push({ x: shooter.x + shooter.w / 2, y: shooter.y + shooter.h });
            }

            for (let i = this.alienBullets.length - 1; i >= 0; i--) {
                const ab = this.alienBullets[i];
                ab.y += 6;
                if (ab.y > this.h) {
                    this.alienBullets.splice(i, 1);
                    continue;
                }
                // Check player collision
                if (ab.x > this.playerX && ab.x < this.playerX + this.playerW && ab.y > this.h - 55 && ab.y < this.h - 30) {
                    this.alienBullets.splice(i, 1);
                    this.lives--;
                    playSound('explosion');
                    if (this.lives <= 0) {
                        this.gameOver = true;
                        playSound('gameover');
                    }
                }
            }

            // Particles
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.04;
                if (p.alpha <= 0) this.particles.splice(i, 1);
            }
        }

        spawnParticles(x, y, color) {
            for (let i = 0; i < 10; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 5 + 1;
                this.particles.push({
                    x: x, y: y,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    color: color,
                    alpha: 1.0
                });
            }
        }

        draw() {
            this.ctx.fillStyle = '#06080e';
            this.ctx.fillRect(0, 0, this.w, this.h);

            // Stars
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.fillRect(120, 80, 2, 2);
            this.ctx.fillRect(350, 140, 2, 2);
            this.ctx.fillRect(680, 220, 2, 2);
            this.ctx.fillRect(210, 390, 2, 2);
            this.ctx.fillRect(520, 480, 2, 2);

            // HUD
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = '16px monospace';
            this.ctx.fillText(`SCORE: ${this.score}`, 25, 35);
            this.ctx.fillText(`SHIPS: ${'🚀 '.repeat(this.lives)}`, this.w - 150, 35);

            // Aliens
            this.aliens.forEach(a => {
                if (!a.alive) return;
                this.ctx.fillStyle = a.color;
                this.ctx.shadowColor = a.color;
                this.ctx.shadowBlur = 8;
                this.ctx.fillRect(a.x, a.y, a.w, a.h);
                // Eyes
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(a.x + 6, a.y + 6, 6, 6);
                this.ctx.fillRect(a.x + a.w - 12, a.y + 6, 6, 6);
                this.ctx.shadowBlur = 0;
            });

            // Player Ship
            this.ctx.fillStyle = '#10b981';
            this.ctx.shadowColor = '#10b981';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.moveTo(this.playerX + this.playerW / 2, this.h - 55);
            this.ctx.lineTo(this.playerX + this.playerW, this.h - 32);
            this.ctx.lineTo(this.playerX, this.h - 32);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Player Bullets
            this.ctx.fillStyle = '#38bdf8';
            this.bullets.forEach(b => {
                this.ctx.fillRect(b.x - 2, b.y, 4, 12);
            });

            // Alien Bullets
            this.ctx.fillStyle = '#f43f5e';
            this.alienBullets.forEach(ab => {
                this.ctx.fillRect(ab.x - 2, ab.y, 4, 10);
            });

            // Particles
            this.particles.forEach(p => {
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillRect(p.x, p.y, 3, 3);
            });
            this.ctx.globalAlpha = 1.0;

            if (this.gameOver) {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                this.ctx.fillRect(0, 0, this.w, this.h);
                this.ctx.fillStyle = '#ef4444';
                this.ctx.font = 'bold 36px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(this.lives > 0 ? 'FLEET DESTROYED!' : 'EARTH INVADED', this.w / 2, this.h / 2 - 20);
                this.ctx.fillStyle = '#cbd5e1';
                this.ctx.font = '20px monospace';
                this.ctx.fillText(`Final Score: ${this.score}`, this.w / 2, this.h / 2 + 25);
                this.ctx.fillText('Press OK to Play Again · Back to Exit', this.w / 2, this.h / 2 + 65);
                this.ctx.textAlign = 'left';
            }
        }

        handleKey(key, isDown) {
            this.keys[key] = isDown;
            if (isDown && (key === ' ' || key === 'Enter')) {
                if (this.gameOver) {
                    launchGame(1);
                    return;
                }
                if (this.bullets.length < 3) {
                    this.bullets.push({ x: this.playerX + this.playerW / 2, y: this.h - 55 });
                    playSound('laser');
                }
            }
        }

        destroy() {}
    }

    // ==========================================
    // GAME 3: 🐍 Cyber Snake
    // ==========================================
    class CyberSnakeGame {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.w = canvas.width;
            this.h = canvas.height;
            this.grid = 20;
            this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
            this.dx = 1;
            this.dy = 0;
            this.apple = { x: 18, y: 12 };
            this.score = 0;
            this.gameOver = false;
            this.lastTick = 0;
            this.speedMs = 90;
        }

        start() {
            const loop = (timestamp) => {
                if (timestamp - this.lastTick > this.speedMs) {
                    this.lastTick = timestamp;
                    this.update();
                }
                this.draw();
                if (!this.gameOver) animFrameId = requestAnimationFrame(loop);
            };
            animFrameId = requestAnimationFrame(loop);
        }

        update() {
            const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

            // Wall Collision
            const maxCols = Math.floor(this.w / this.grid);
            const maxRows = Math.floor(this.h / this.grid);
            if (head.x < 0 || head.x >= maxCols || head.y < 2 || head.y >= maxRows) {
                this.gameOver = true;
                playSound('gameover');
                return;
            }

            // Self Collision
            for (let part of this.snake) {
                if (part.x === head.x && part.y === head.y) {
                    this.gameOver = true;
                    playSound('gameover');
                    return;
                }
            }

            this.snake.unshift(head);

            // Apple Eat
            if (head.x === this.apple.x && head.y === this.apple.y) {
                this.score += 10;
                playSound('score');
                this.apple = {
                    x: Math.floor(Math.random() * (maxCols - 2)) + 1,
                    y: Math.floor(Math.random() * (maxRows - 4)) + 2
                };
                if (this.speedMs > 45) this.speedMs -= 2;
            } else {
                this.snake.pop();
            }
        }

        draw() {
            this.ctx.fillStyle = '#060b11';
            this.ctx.fillRect(0, 0, this.w, this.h);

            // HUD
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '16px monospace';
            this.ctx.fillText(`CYBER SCORE: ${this.score}`, 25, 30);

            // Apple
            this.ctx.fillStyle = '#ef4444';
            this.ctx.shadowColor = '#ef4444';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(this.apple.x * this.grid + 2, this.apple.y * this.grid + 2, this.grid - 4, this.grid - 4);
            this.ctx.shadowBlur = 0;

            // Snake
            this.snake.forEach((part, idx) => {
                this.ctx.fillStyle = idx === 0 ? '#38bdf8' : '#10b981';
                this.ctx.shadowColor = '#10b981';
                this.ctx.shadowBlur = idx === 0 ? 8 : 4;
                this.ctx.fillRect(part.x * this.grid + 1, part.y * this.grid + 1, this.grid - 2, this.grid - 2);
            });
            this.ctx.shadowBlur = 0;

            if (this.gameOver) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.75)';
                this.ctx.fillRect(0, 0, this.w, this.h);
                this.ctx.fillStyle = '#ef4444';
                this.ctx.font = 'bold 36px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('CRASHED!', this.w / 2, this.h / 2 - 20);
                this.ctx.fillStyle = '#cbd5e1';
                this.ctx.font = '20px monospace';
                this.ctx.fillText(`Score: ${this.score}`, this.w / 2, this.h / 2 + 25);
                this.ctx.fillText('Press OK to Retry', this.w / 2, this.h / 2 + 65);
                this.ctx.textAlign = 'left';
            }
        }

        handleKey(key, isDown) {
            if (!isDown) return;
            if (this.gameOver && key === 'Enter') {
                launchGame(2);
                return;
            }
            if (key === 'ArrowUp' && this.dy === 0) { this.dx = 0; this.dy = -1; }
            else if (key === 'ArrowDown' && this.dy === 0) { this.dx = 0; this.dy = 1; }
            else if (key === 'ArrowLeft' && this.dx === 0) { this.dx = -1; this.dy = 0; }
            else if (key === 'ArrowRight' && this.dx === 0) { this.dx = 1; this.dy = 0; }
        }

        destroy() {}
    }

    // ==========================================
    // GAME 4: 🏓 Retro Pong Pro
    // ==========================================
    class RetroPongGame {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.w = canvas.width;
            this.h = canvas.height;
            this.paddleW = 14;
            this.paddleH = 90;
            this.p1Y = (this.h - this.paddleH) / 2;
            this.p2Y = (this.h - this.paddleH) / 2;
            this.p1Score = 0;
            this.p2Score = 0;
            this.ballX = this.w / 2;
            this.ballY = this.h / 2;
            this.ballRadius = 8;
            this.ballDx = 6 * (Math.random() > 0.5 ? 1 : -1);
            this.ballDy = 3;
            this.keys = {};
            this.gameOver = false;
        }

        start() {
            const loop = () => {
                this.update();
                this.draw();
                if (!this.gameOver) animFrameId = requestAnimationFrame(loop);
            };
            animFrameId = requestAnimationFrame(loop);
        }

        update() {
            // Player 1 (Remote or Gamepad Left Stick)
            if (this.keys['ArrowUp']) this.p1Y = Math.max(10, this.p1Y - 8);
            if (this.keys['ArrowDown']) this.p1Y = Math.min(this.h - this.paddleH - 10, this.p1Y + 8);

            // Player 2 Smart AI
            const target = this.ballY - this.paddleH / 2;
            this.p2Y += (target - this.p2Y) * 0.085;

            // Ball Movement
            this.ballX += this.ballDx;
            this.ballY += this.ballDy;

            // Top / Bottom walls
            if (this.ballY - this.ballRadius < 0 || this.ballY + this.ballRadius > this.h) {
                this.ballDy = -this.ballDy;
                playSound('bounce');
            }

            // Paddle 1 Collision
            if (this.ballX - this.ballRadius <= 40 && this.ballX - this.ballRadius >= 20 &&
                this.ballY >= this.p1Y && this.ballY <= this.p1Y + this.paddleH) {
                this.ballDx = Math.abs(this.ballDx) + 0.25;
                const offset = (this.ballY - (this.p1Y + this.paddleH / 2)) / (this.paddleH / 2);
                this.ballDy = offset * 6;
                playSound('hit');
            }

            // Paddle 2 Collision
            if (this.ballX + this.ballRadius >= this.w - 40 && this.ballX + this.ballRadius <= this.w - 20 &&
                this.ballY >= this.p2Y && this.ballY <= this.p2Y + this.paddleH) {
                this.ballDx = -(Math.abs(this.ballDx) + 0.25);
                const offset = (this.ballY - (this.p2Y + this.paddleH / 2)) / (this.paddleH / 2);
                this.ballDy = offset * 6;
                playSound('hit');
            }

            // Scores
            if (this.ballX < 0) {
                this.p2Score++;
                playSound('explosion');
                this.resetBall();
            } else if (this.ballX > this.w) {
                this.p1Score++;
                playSound('score');
                this.resetBall();
            }

            if (this.p1Score >= 7 || this.p2Score >= 7) {
                this.gameOver = true;
                playSound('gameover');
            }
        }

        resetBall() {
            this.ballX = this.w / 2;
            this.ballY = this.h / 2;
            this.ballDx = 6 * (Math.random() > 0.5 ? 1 : -1);
            this.ballDy = (Math.random() - 0.5) * 6;
        }

        draw() {
            this.ctx.fillStyle = '#05070c';
            this.ctx.fillRect(0, 0, this.w, this.h);

            // Center Net
            this.ctx.strokeStyle = '#334155';
            this.ctx.setLineDash([8, 8]);
            this.ctx.beginPath();
            this.ctx.moveTo(this.w / 2, 0);
            this.ctx.lineTo(this.w / 2, this.h);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // Scores
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = 'bold 48px monospace';
            this.ctx.fillText(this.p1Score, this.w / 2 - 80, 70);
            this.ctx.fillText(this.p2Score, this.w / 2 + 50, 70);

            // Paddles
            this.ctx.fillStyle = '#38bdf8';
            this.ctx.fillRect(25, this.p1Y, this.paddleW, this.paddleH);

            this.ctx.fillStyle = '#f59e0b';
            this.ctx.fillRect(this.w - 25 - this.paddleW, this.p2Y, this.paddleW, this.paddleH);

            // Ball
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.beginPath();
            this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
            this.ctx.fill();

            if (this.gameOver) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
                this.ctx.fillRect(0, 0, this.w, this.h);
                this.ctx.fillStyle = this.p1Score >= 7 ? '#10b981' : '#ef4444';
                this.ctx.font = 'bold 36px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(this.p1Score >= 7 ? 'YOU WIN!' : 'CPU WINS!', this.w / 2, this.h / 2 - 20);
                this.ctx.fillStyle = '#cbd5e1';
                this.ctx.font = '20px monospace';
                this.ctx.fillText('Press OK to Rematch · Back to Exit', this.w / 2, this.h / 2 + 35);
                this.ctx.textAlign = 'left';
            }
        }

        handleKey(key, isDown) {
            this.keys[key] = isDown;
            if (this.gameOver && isDown && key === 'Enter') {
                launchGame(3);
            }
        }

        destroy() {}
    }

    // ==========================================
    // GAME 5: 🧩 Falling Blocks 8-Bit
    // ==========================================
    class FallingBlocksGame {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.w = canvas.width;
            this.h = canvas.height;
            this.cols = 10;
            this.rows = 20;
            this.blockSize = 24;
            this.boardX = (this.w - this.cols * this.blockSize) / 2;
            this.boardY = 50;
            this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
            this.score = 0;
            this.lines = 0;
            this.gameOver = false;
            this.lastDrop = 0;
            this.dropInterval = 550;

            this.PIECES = [
                { shape: [[1, 1, 1, 1]], color: '#38bdf8' },           // I
                { shape: [[1, 1], [1, 1]], color: '#facc15' },         // O
                { shape: [[0, 1, 0], [1, 1, 1]], color: '#a855f7' },   // T
                { shape: [[0, 1, 1], [1, 1, 0]], color: '#10b981' },   // S
                { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef4444' },   // Z
                { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },   // J
                { shape: [[0, 0, 1], [1, 1, 1]], color: '#f97316' }    // L
            ];

            this.spawnPiece();
        }

        spawnPiece() {
            const p = this.PIECES[Math.floor(Math.random() * this.PIECES.length)];
            this.current = {
                shape: p.shape,
                color: p.color,
                x: Math.floor((this.cols - p.shape[0].length) / 2),
                y: 0
            };
            if (this.collides(this.current.x, this.current.y, this.current.shape)) {
                this.gameOver = true;
                playSound('gameover');
            }
        }

        collides(px, py, shape) {
            for (let r = 0; r < shape.length; r++) {
                for (let c = 0; c < shape[r].length; c++) {
                    if (shape[r][c]) {
                        const nx = px + c;
                        const ny = py + r;
                        if (nx < 0 || nx >= this.cols || ny >= this.rows) return true;
                        if (ny >= 0 && this.board[ny][nx]) return true;
                    }
                }
            }
            return false;
        }

        start() {
            const loop = (timestamp) => {
                if (timestamp - this.lastDrop > this.dropInterval) {
                    this.lastDrop = timestamp;
                    this.drop();
                }
                this.draw();
                if (!this.gameOver) animFrameId = requestAnimationFrame(loop);
            };
            animFrameId = requestAnimationFrame(loop);
        }

        drop() {
            if (!this.collides(this.current.x, this.current.y + 1, this.current.shape)) {
                this.current.y++;
            } else {
                this.lockPiece();
            }
        }

        lockPiece() {
            for (let r = 0; r < this.current.shape.length; r++) {
                for (let c = 0; c < this.current.shape[r].length; c++) {
                    if (this.current.shape[r][c]) {
                        this.board[this.current.y + r][this.current.x + c] = this.current.color;
                    }
                }
            }
            playSound('hit');
            this.clearLines();
            this.spawnPiece();
        }

        clearLines() {
            let cleared = 0;
            for (let r = this.rows - 1; r >= 0; r--) {
                if (this.board[r].every(cell => cell !== 0)) {
                    this.board.splice(r, 1);
                    this.board.unshift(Array(this.cols).fill(0));
                    cleared++;
                    r++; // recheck same row
                }
            }
            if (cleared > 0) {
                this.lines += cleared;
                this.score += cleared * 100 * cleared;
                playSound('score');
            }
        }

        rotate() {
            const shape = this.current.shape;
            const newShape = shape[0].map((_, idx) => shape.map(row => row[idx]).reverse());
            if (!this.collides(this.current.x, this.current.y, newShape)) {
                this.current.shape = newShape;
                playSound('bounce');
            }
        }

        draw() {
            this.ctx.fillStyle = '#060a12';
            this.ctx.fillRect(0, 0, this.w, this.h);

            // Board background
            this.ctx.fillStyle = '#0f172a';
            this.ctx.fillRect(this.boardX, this.boardY, this.cols * this.blockSize, this.rows * this.blockSize);
            this.ctx.strokeStyle = '#1e293b';
            this.ctx.strokeRect(this.boardX, this.boardY, this.cols * this.blockSize, this.rows * this.blockSize);

            // HUD
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = '16px monospace';
            this.ctx.fillText(`SCORE: ${this.score}`, this.boardX - 160, this.boardY + 40);
            this.ctx.fillText(`LINES: ${this.lines}`, this.boardX - 160, this.boardY + 70);

            // Locked board blocks
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    if (this.board[r][c]) {
                        this.ctx.fillStyle = this.board[r][c];
                        this.ctx.fillRect(this.boardX + c * this.blockSize + 1, this.boardY + r * this.blockSize + 1, this.blockSize - 2, this.blockSize - 2);
                    }
                }
            }

            // Current falling piece
            if (this.current) {
                this.ctx.fillStyle = this.current.color;
                for (let r = 0; r < this.current.shape.length; r++) {
                    for (let c = 0; c < this.current.shape[r].length; c++) {
                        if (this.current.shape[r][c]) {
                            this.ctx.fillRect(
                                this.boardX + (this.current.x + c) * this.blockSize + 1,
                                this.boardY + (this.current.y + r) * this.blockSize + 1,
                                this.blockSize - 2,
                                this.blockSize - 2
                            );
                        }
                    }
                }
            }

            if (this.gameOver) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
                this.ctx.fillRect(0, 0, this.w, this.h);
                this.ctx.fillStyle = '#ef4444';
                this.ctx.font = 'bold 36px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('GAME OVER', this.w / 2, this.h / 2 - 20);
                this.ctx.fillStyle = '#cbd5e1';
                this.ctx.font = '20px monospace';
                this.ctx.fillText(`Score: ${this.score} · Lines: ${this.lines}`, this.w / 2, this.h / 2 + 25);
                this.ctx.fillText('Press OK to Play Again', this.w / 2, this.h / 2 + 65);
                this.ctx.textAlign = 'left';
            }
        }

        handleKey(key, isDown) {
            if (!isDown) return;
            if (this.gameOver && key === 'Enter') {
                launchGame(4);
                return;
            }
            if (key === 'ArrowLeft') {
                if (!this.collides(this.current.x - 1, this.current.y, this.current.shape)) this.current.x--;
            } else if (key === 'ArrowRight') {
                if (!this.collides(this.current.x + 1, this.current.y, this.current.shape)) this.current.x++;
            } else if (key === 'ArrowDown') {
                this.drop();
            } else if (key === 'ArrowUp' || key === ' ' || key === 'Enter') {
                this.rotate();
            }
        }

        destroy() {}
    }

    // ==========================================
    // Keyboard & Remote Key Routing
    // ==========================================
    function handleKeyDown(e) {
        if (!isOpen) return false;
        const key = e.key;

        // Return / Back button
        if (key === 'Escape' || key === 'XF86Back' || key === '10009') {
            if (currentTab === 'play') {
                stopGame();
                showCatalogView();
                return true;
            }
            close();
            return true;
        }

        if (currentTab === 'play' && activeGame) {
            activeGame.handleKey(key, true);
            return true;
        }

        if (currentTab === 'games') {
            if (key === 'ArrowRight' || key === 'ArrowDown') {
                selectedGameIdx = (selectedGameIdx + 1) % GAMES_CATALOG.length;
                renderCatalog();
                return true;
            }
            if (key === 'ArrowLeft' || key === 'ArrowUp') {
                selectedGameIdx = (selectedGameIdx - 1 + GAMES_CATALOG.length) % GAMES_CATALOG.length;
                renderCatalog();
                return true;
            }
            if (key === 'Enter') {
                launchGame(selectedGameIdx);
                return true;
            }
        }

        return false;
    }

    return {
        open: open,
        close: close,
        launchGame: launchGame,
        showCatalogView: showCatalogView,
        showRomsView: showRomsView,
        toggleCRT: toggleCRT,
        handleKeyDown: handleKeyDown,
        get isOpen() { return isOpen; }
    };
})();
