/**
 * NEON TERRITORIES - Complete Game Engine
 * Trivia-based Strategy Game
 * Features: Hex Map, AI Opponents, Local Multiplayer, Streak System
 */

// =========================================
// GAME CONSTANTS
// =========================================

const GAME_CONFIG = {
    QUESTION_TIME: 15, // seconds
    TURN_DELAY: 500,   // ms between actions
    AI_THINK_TIME: { easy: 2000, medium: 1500, hard: 800 },
    AI_ACCURACY: { easy: 0.4, medium: 0.65, hard: 0.85 },
    STREAK_BONUS_THRESHOLD: 3,
    MAP_SIZES: {
        small: 7,
        medium: 12,
        large: 19
    }
};

const PLAYER_COLORS = ['player-1', 'player-2', 'player-3', 'player-4'];
const PLAYER_NAMES = ['Oyuncu 1', 'AI', 'Oyuncu 3', 'Oyuncu 4'];

// =========================================
// GAME STATE
// =========================================

let gameState = {
    mode: 'ai', // 'ai' or 'local'
    mapSize: 'medium',
    aiDifficulty: 'medium',
    playerCount: 2,
    categories: ['general', 'science', 'sports', 'entertainment', 'geography', 'history'],

    players: [],
    currentPlayerIndex: 0,
    regions: [],

    selectedRegion: null,
    targetRegion: null,

    phase: 'select', // 'select', 'attack', 'question', 'result'

    usedQuestions: [],
    currentQuestion: null,

    stats: {
        correct: 0,
        wrong: 0,
        streak: 0,
        maxStreak: 0
    },

    gameOver: false,
    winner: null
};

// =========================================
// HEX MAP GENERATION
// =========================================

/**
 * Generate hexagonal grid positions
 * Uses axial coordinates converted to pixel positions
 */
function generateHexGrid(size) {
    const hexSize = 38;
    const hexWidth = hexSize * 2;
    const hexHeight = Math.sqrt(3) * hexSize;

    const regions = [];
    let regionId = 0;

    // Different layouts based on size
    const layouts = {
        small: [
            [0, 0], [1, 0], [2, 0],
            [0, 1], [1, 1], [2, 1],
            [1, 2]
        ],
        medium: [
            [1, 0], [2, 0], [3, 0],
            [0, 1], [1, 1], [2, 1], [3, 1],
            [0, 2], [1, 2], [2, 2], [3, 2],
            [1, 3]
        ],
        large: [
            [2, 0], [3, 0], [4, 0],
            [1, 1], [2, 1], [3, 1], [4, 1],
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
            [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
            [1, 4], [2, 4]
        ]
    };

    const layout = layouts[size] || layouts.medium;

    layout.forEach(([q, r]) => {
        const x = hexSize * (3 / 2 * q) + 100;
        const y = hexSize * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r) + 60;

        regions.push({
            id: regionId++,
            q: q,
            r: r,
            x: x,
            y: y,
            owner: null,
            neighbors: []
        });
    });

    // Calculate neighbors (adjacent hexes)
    regions.forEach(region => {
        const directions = [
            [1, 0], [1, -1], [0, -1],
            [-1, 0], [-1, 1], [0, 1]
        ];

        directions.forEach(([dq, dr]) => {
            const neighbor = regions.find(r =>
                r.q === region.q + dq && r.r === region.r + dr
            );
            if (neighbor) {
                region.neighbors.push(neighbor.id);
            }
        });
    });

    return regions;
}

/**
 * Generate SVG hexagon points string
 */
function getHexPoints(centerX, centerY, size = 35) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (60 * i - 30) * Math.PI / 180;
        const x = centerX + size * Math.cos(angle);
        const y = centerY + size * Math.sin(angle);
        points.push(`${x},${y}`);
    }
    return points.join(' ');
}

/**
 * Render hex map to SVG
 */
function renderMap() {
    const svg = document.getElementById('hex-map');
    svg.innerHTML = '';

    // Create region groups
    gameState.regions.forEach(region => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'hex-region neutral');
        group.setAttribute('data-id', region.id);

        // Hexagon
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', getHexPoints(region.x, region.y));
        group.appendChild(polygon);

        // Region label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('class', 'hex-label');
        text.setAttribute('x', region.x);
        text.setAttribute('y', region.y);
        text.textContent = String.fromCharCode(65 + region.id); // A, B, C...
        group.appendChild(text);

        // Click handler
        group.addEventListener('click', () => onRegionClick(region.id));

        svg.appendChild(group);
    });

    updateMapDisplay();
}

/**
 * Update region colors based on ownership
 */
function updateMapDisplay() {
    gameState.regions.forEach(region => {
        const element = document.querySelector(`.hex-region[data-id="${region.id}"]`);
        if (!element) return;

        // Reset classes
        element.className = 'hex-region';

        // Set owner color
        if (region.owner !== null) {
            element.classList.add(PLAYER_COLORS[region.owner]);
        } else {
            element.classList.add('neutral');
        }

        // Highlight selectable/attackable
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];

        if (gameState.phase === 'select' && region.owner === gameState.currentPlayerIndex) {
            element.classList.add('selectable');
        }

        if (gameState.phase === 'attack' && gameState.selectedRegion !== null) {
            const selectedRegion = gameState.regions[gameState.selectedRegion];
            if (selectedRegion.neighbors.includes(region.id) && region.owner !== gameState.currentPlayerIndex) {
                element.classList.add('attackable');
            }
        }

        if (region.id === gameState.selectedRegion) {
            element.classList.add('selected');
        }
    });
}

// =========================================
// PLAYER MANAGEMENT
// =========================================

function initializePlayers() {
    gameState.players = [];

    if (gameState.mode === 'ai') {
        gameState.players.push({
            id: 0,
            name: 'Sen',
            isAI: false,
            regions: 0
        });
        gameState.players.push({
            id: 1,
            name: 'AI',
            isAI: true,
            difficulty: gameState.aiDifficulty,
            regions: 0
        });
    } else {
        for (let i = 0; i < gameState.playerCount; i++) {
            gameState.players.push({
                id: i,
                name: `Oyuncu ${i + 1}`,
                isAI: false,
                regions: 0
            });
        }
    }

    // Distribute starting regions
    distributeStartingRegions();
}

function distributeStartingRegions() {
    const totalRegions = gameState.regions.length;
    const regionsPerPlayer = Math.floor(totalRegions / gameState.players.length);

    // Shuffle region indices
    const shuffledIndices = [...Array(totalRegions).keys()];
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    // Assign regions
    let regionIndex = 0;
    gameState.players.forEach((player, playerIndex) => {
        const startCount = Math.min(2, regionsPerPlayer);
        for (let i = 0; i < startCount && regionIndex < totalRegions; i++) {
            gameState.regions[shuffledIndices[regionIndex]].owner = playerIndex;
            regionIndex++;
        }
    });

    updatePlayerStats();
}

function updatePlayerStats() {
    gameState.players.forEach((player, index) => {
        player.regions = gameState.regions.filter(r => r.owner === index).length;
    });

    // Update HUD
    document.getElementById('p1-name').textContent = gameState.players[0]?.name || 'Oyuncu 1';
    document.getElementById('p1-regions').textContent = `${gameState.players[0]?.regions || 0} Bölge`;

    document.getElementById('p2-name').textContent = gameState.players[1]?.name || 'AI';
    document.getElementById('p2-regions').textContent = `${gameState.players[1]?.regions || 0} Bölge`;
}

// =========================================
// TURN MANAGEMENT
// =========================================

function startTurn() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    gameState.phase = 'select';
    gameState.selectedRegion = null;
    gameState.targetRegion = null;

    updateTurnDisplay();
    updateMapDisplay();

    // Check if current player has any regions
    if (currentPlayer.regions === 0) {
        nextPlayer();
        return;
    }

    // Check for AI turn
    if (currentPlayer.isAI) {
        document.getElementById('btn-end-turn').disabled = true;
        setTimeout(() => executeAITurn(), GAME_CONFIG.TURN_DELAY);
    } else {
        document.getElementById('btn-end-turn').disabled = false;
    }
}

function updateTurnDisplay() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('turn-text').textContent = `Sıra: ${currentPlayer.name}`;

    const phaseTexts = {
        'select': 'Bölge Seç',
        'attack': 'Saldırı Hedefi Seç',
        'question': 'Soruyu Cevapla',
        'result': 'Sonuç...'
    };
    document.getElementById('turn-phase').textContent = phaseTexts[gameState.phase] || '';
}

function nextPlayer() {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

    // Check win condition
    if (checkWinCondition()) {
        endGame();
        return;
    }

    startTurn();
}

function endTurn() {
    nextPlayer();
}

// =========================================
// REGION INTERACTION
// =========================================

function onRegionClick(regionId) {
    const region = gameState.regions[regionId];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    // Ignore if AI turn or game over
    if (currentPlayer.isAI || gameState.gameOver) return;

    // Ignore if in question phase
    if (gameState.phase === 'question' || gameState.phase === 'result') return;

    if (gameState.phase === 'select') {
        // Select own region
        if (region.owner === gameState.currentPlayerIndex) {
            gameState.selectedRegion = regionId;
            gameState.phase = 'attack';
            updateTurnDisplay();
            updateMapDisplay();
        }
    } else if (gameState.phase === 'attack') {
        // Click on selected region to deselect
        if (regionId === gameState.selectedRegion) {
            gameState.selectedRegion = null;
            gameState.phase = 'select';
            updateTurnDisplay();
            updateMapDisplay();
            return;
        }

        const selectedRegion = gameState.regions[gameState.selectedRegion];

        // Attack neighboring region
        if (selectedRegion.neighbors.includes(regionId) && region.owner !== gameState.currentPlayerIndex) {
            gameState.targetRegion = regionId;
            initiateAttack();
        }
    }
}

function initiateAttack() {
    gameState.phase = 'question';
    updateTurnDisplay();

    // Get question
    const question = getRandomQuestion(gameState.categories, gameState.usedQuestions);
    gameState.currentQuestion = shuffleOptions(question);
    gameState.usedQuestions.push(question.uniqueId);

    showQuestionModal();
}

// =========================================
// QUESTION MODAL
// =========================================

let questionTimer = null;
let timeRemaining = 0;

function showQuestionModal() {
    const modal = document.getElementById('question-modal');
    const question = gameState.currentQuestion;

    // Set category
    document.getElementById('q-category').textContent = question.categoryInfo.name;
    document.getElementById('q-category').style.borderColor = question.categoryInfo.color;
    document.getElementById('q-category').style.color = question.categoryInfo.color;

    // Set question text
    document.getElementById('q-text').textContent = question.question;

    // Set options
    const optionsContainer = document.getElementById('answer-options');
    const optionButtons = optionsContainer.querySelectorAll('.answer-btn');
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.className = 'answer-btn';
        btn.disabled = false;
        btn.onclick = () => selectAnswer(index);
    });

    // Hide result
    document.getElementById('q-result').className = 'question-result';

    // Start timer
    timeRemaining = GAME_CONFIG.QUESTION_TIME;
    updateTimerDisplay();
    startTimer();

    // Show modal
    modal.classList.add('active');
}

function startTimer() {
    const timerCircle = document.getElementById('timer-circle');
    const circumference = 2 * Math.PI * 45;
    timerCircle.style.strokeDasharray = circumference;

    questionTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        // Update circle
        const offset = circumference * (1 - timeRemaining / GAME_CONFIG.QUESTION_TIME);
        timerCircle.style.strokeDashoffset = offset;

        // Color changes
        timerCircle.classList.remove('warning', 'danger');
        if (timeRemaining <= 5) {
            timerCircle.classList.add('danger');
        } else if (timeRemaining <= 10) {
            timerCircle.classList.add('warning');
        }

        if (timeRemaining <= 0) {
            clearInterval(questionTimer);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer-text').textContent = timeRemaining;
}

function selectAnswer(index) {
    clearInterval(questionTimer);

    const optionButtons = document.querySelectorAll('.answer-btn');
    optionButtons.forEach(btn => btn.disabled = true);

    const selectedBtn = optionButtons[index];
    selectedBtn.classList.add('selected');

    const isCorrect = index === gameState.currentQuestion.correct;

    setTimeout(() => {
        showResult(isCorrect, index);
    }, 300);
}

function handleTimeout() {
    const optionButtons = document.querySelectorAll('.answer-btn');
    optionButtons.forEach(btn => btn.disabled = true);

    showResult(false, -1);
}

function showResult(isCorrect, selectedIndex) {
    const optionButtons = document.querySelectorAll('.answer-btn');
    const resultDiv = document.getElementById('q-result');

    // Highlight correct answer
    optionButtons[gameState.currentQuestion.correct].classList.add('correct');

    // Highlight wrong answer if selected
    if (selectedIndex >= 0 && selectedIndex !== gameState.currentQuestion.correct) {
        optionButtons[selectedIndex].classList.add('wrong');
    }

    // Update stats
    if (isCorrect) {
        gameState.stats.correct++;
        gameState.stats.streak++;
        if (gameState.stats.streak > gameState.stats.maxStreak) {
            gameState.stats.maxStreak = gameState.stats.streak;
        }
        updateStreakDisplay();
    } else {
        gameState.stats.wrong++;
        gameState.stats.streak = 0;
        updateStreakDisplay();
    }

    // Show result message
    resultDiv.className = `question-result visible ${isCorrect ? 'correct' : 'wrong'}`;
    resultDiv.querySelector('.result-icon').textContent = isCorrect ? '✅' : '❌';
    resultDiv.querySelector('.result-text').textContent = isCorrect
        ? 'Doğru! Bölge senin!'
        : 'Yanlış! Saldırı başarısız.';

    // Process attack result
    setTimeout(() => {
        processAttackResult(isCorrect);
    }, 1500);
}

function processAttackResult(isCorrect) {
    // Hide modal
    document.getElementById('question-modal').classList.remove('active');

    if (isCorrect) {
        // Capture region
        gameState.regions[gameState.targetRegion].owner = gameState.currentPlayerIndex;
        updatePlayerStats();
    }

    updateMapDisplay();

    // Check win condition
    if (checkWinCondition()) {
        endGame();
        return;
    }

    // Next player
    setTimeout(() => {
        nextPlayer();
    }, GAME_CONFIG.TURN_DELAY);
}

function updateStreakDisplay() {
    const indicator = document.getElementById('streak-indicator');
    const count = document.getElementById('streak-count');

    if (gameState.stats.streak >= 2) {
        indicator.classList.add('visible');
        count.textContent = gameState.stats.streak;
    } else {
        indicator.classList.remove('visible');
    }
}

// =========================================
// AI LOGIC
// =========================================

function executeAITurn() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const difficulty = currentPlayer.difficulty || 'medium';

    // Find AI's regions
    const ownRegions = gameState.regions.filter(r => r.owner === gameState.currentPlayerIndex);

    if (ownRegions.length === 0) {
        nextPlayer();
        return;
    }

    // Find possible attacks (own region -> neighbor not owned)
    const possibleAttacks = [];
    ownRegions.forEach(region => {
        region.neighbors.forEach(neighborId => {
            const neighbor = gameState.regions[neighborId];
            if (neighbor.owner !== gameState.currentPlayerIndex) {
                possibleAttacks.push({
                    from: region.id,
                    to: neighborId,
                    priority: calculateAttackPriority(region, neighbor, difficulty)
                });
            }
        });
    });

    if (possibleAttacks.length === 0) {
        nextPlayer();
        return;
    }

    // Sort by priority and pick
    possibleAttacks.sort((a, b) => b.priority - a.priority);
    const attack = difficulty === 'easy'
        ? possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)]
        : possibleAttacks[0];

    // Execute attack
    gameState.selectedRegion = attack.from;
    gameState.targetRegion = attack.to;

    updateMapDisplay();

    setTimeout(() => {
        // AI "answers" question
        const thinkTime = GAME_CONFIG.AI_THINK_TIME[difficulty];
        const accuracy = GAME_CONFIG.AI_ACCURACY[difficulty];

        // Simulate question
        const question = getRandomQuestion(gameState.categories, gameState.usedQuestions);
        gameState.currentQuestion = shuffleOptions(question);
        gameState.usedQuestions.push(question.uniqueId);

        const isCorrect = Math.random() < accuracy;

        setTimeout(() => {
            processAIAttackResult(isCorrect);
        }, thinkTime);

    }, 500);
}

function calculateAttackPriority(fromRegion, toRegion, difficulty) {
    let priority = 1;

    // Prefer neutral regions
    if (toRegion.owner === null) priority += 2;

    // Strategic: prefer regions with more neighbors
    priority += toRegion.neighbors.length * 0.5;

    // Hard AI: prefer regions that would connect territories
    if (difficulty === 'hard') {
        const wouldConnect = toRegion.neighbors.some(nId =>
            gameState.regions[nId].owner === fromRegion.owner && nId !== fromRegion.id
        );
        if (wouldConnect) priority += 3;
    }

    return priority;
}

function processAIAttackResult(isCorrect) {
    if (isCorrect) {
        gameState.regions[gameState.targetRegion].owner = gameState.currentPlayerIndex;
        updatePlayerStats();

        // Show brief notification
        showNotification('AI bölge aldı!', 'warning');
    } else {
        showNotification('AI saldırısı başarısız!', 'success');
    }

    updateMapDisplay();

    // Check win
    if (checkWinCondition()) {
        endGame();
        return;
    }

    setTimeout(() => {
        nextPlayer();
    }, GAME_CONFIG.TURN_DELAY);
}

// =========================================
// WIN CONDITION
// =========================================

function checkWinCondition() {
    // Check if any player owns all regions
    const totalRegions = gameState.regions.length;

    for (let i = 0; i < gameState.players.length; i++) {
        const playerRegions = gameState.regions.filter(r => r.owner === i).length;
        if (playerRegions === totalRegions) {
            gameState.winner = i;
            return true;
        }
        // Or if only one player has regions left
        if (playerRegions === 0) {
            // This player is eliminated
        }
    }

    // Check if only one player has regions
    const playersWithRegions = gameState.players.filter((p, i) =>
        gameState.regions.some(r => r.owner === i)
    );

    if (playersWithRegions.length === 1) {
        gameState.winner = gameState.players.indexOf(playersWithRegions[0]);
        return true;
    }

    return false;
}

function endGame() {
    gameState.gameOver = true;

    const modal = document.getElementById('gameover-modal');
    const winnerPlayer = gameState.players[gameState.winner];
    const isPlayerWinner = !winnerPlayer.isAI && gameState.winner === 0;

    document.getElementById('gameover-icon').textContent = isPlayerWinner ? '🏆' : '😔';
    document.getElementById('gameover-title').textContent = isPlayerWinner ? 'Zafer!' : 'Yenilgi!';
    document.getElementById('gameover-subtitle').textContent = isPlayerWinner
        ? 'Tüm bölgeleri fethettiniz!'
        : `${winnerPlayer.name} kazandı!`;

    document.getElementById('stat-correct').textContent = gameState.stats.correct;
    document.getElementById('stat-wrong').textContent = gameState.stats.wrong;
    document.getElementById('stat-streak').textContent = gameState.stats.maxStreak;

    modal.classList.add('active');
}

// =========================================
// NOTIFICATIONS
// =========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `game-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        background: ${type === 'success' ? 'rgba(0,255,136,0.3)' : 'rgba(255,107,53,0.3)'};
        border: 1px solid ${type === 'success' ? '#00ff88' : '#ff6b35'};
        border-radius: 20px;
        color: white;
        font-family: var(--font-body);
        z-index: 50;
        animation: fadeInOut 2s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 2000);
}

// =========================================
// SCREEN NAVIGATION
// =========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// =========================================
// GAME INITIALIZATION
// =========================================

function initGame() {
    // Reset state
    gameState.regions = generateHexGrid(gameState.mapSize);
    gameState.currentPlayerIndex = 0;
    gameState.selectedRegion = null;
    gameState.targetRegion = null;
    gameState.phase = 'select';
    gameState.usedQuestions = [];
    gameState.currentQuestion = null;
    gameState.stats = { correct: 0, wrong: 0, streak: 0, maxStreak: 0 };
    gameState.gameOver = false;
    gameState.winner = null;

    initializePlayers();
    renderMap();

    showScreen('game-screen');
    startTurn();
}

// =========================================
// EVENT LISTENERS
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Menu buttons
    document.getElementById('btn-vs-ai').addEventListener('click', () => {
        gameState.mode = 'ai';
        document.getElementById('ai-difficulty-section').style.display = 'block';
        document.getElementById('player-count-section').style.display = 'none';
        showScreen('setup-screen');
    });

    document.getElementById('btn-local-multi').addEventListener('click', () => {
        gameState.mode = 'local';
        document.getElementById('ai-difficulty-section').style.display = 'none';
        document.getElementById('player-count-section').style.display = 'block';
        showScreen('setup-screen');
    });

    // Setup options
    document.querySelectorAll('#map-size-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#map-size-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.mapSize = btn.dataset.value;
        });
    });

    document.querySelectorAll('#ai-difficulty-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#ai-difficulty-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.aiDifficulty = btn.dataset.value;
        });
    });

    document.querySelectorAll('#player-count-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#player-count-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gameState.playerCount = parseInt(btn.dataset.value);
        });
    });

    // Category toggles
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const category = btn.dataset.category;

            if (btn.classList.contains('active')) {
                if (!gameState.categories.includes(category)) {
                    gameState.categories.push(category);
                }
            } else {
                gameState.categories = gameState.categories.filter(c => c !== category);
                // Ensure at least one category
                if (gameState.categories.length === 0) {
                    gameState.categories.push('general');
                    document.querySelector('[data-category="general"]').classList.add('active');
                }
            }
        });
    });

    // Navigation
    document.getElementById('btn-back-menu').addEventListener('click', () => {
        showScreen('menu-screen');
    });

    document.getElementById('btn-start-game').addEventListener('click', () => {
        initGame();
    });

    // Game controls
    document.getElementById('btn-end-turn').addEventListener('click', () => {
        endTurn();
    });

    document.getElementById('btn-surrender').addEventListener('click', () => {
        if (confirm('Teslim olmak istediğinize emin misiniz?')) {
            gameState.winner = gameState.mode === 'ai' ? 1 : (gameState.currentPlayerIndex + 1) % gameState.players.length;
            endGame();
        }
    });

    // Game over buttons
    document.getElementById('btn-play-again').addEventListener('click', () => {
        hideModal('gameover-modal');
        initGame();
    });

    document.getElementById('btn-main-menu').addEventListener('click', () => {
        hideModal('gameover-modal');
        showScreen('menu-screen');
    });

    // Help modal
    document.getElementById('btn-help').addEventListener('click', () => {
        showModal('help-modal');
    });

    document.getElementById('btn-close-help').addEventListener('click', () => {
        hideModal('help-modal');
    });

    // Settings (placeholder)
    document.getElementById('btn-settings').addEventListener('click', () => {
        showNotification('Ayarlar yakında!', 'info');
    });

    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal && modal.id !== 'question-modal' && modal.id !== 'gameover-modal') {
                modal.classList.remove('active');
            }
        });
    });
});

// Add fadeInOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -10px); }
        20% { opacity: 1; transform: translate(-50%, 0); }
        80% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -10px); }
    }
`;
document.head.appendChild(style);

// Export for debugging
window.gameState = gameState;
