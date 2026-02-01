// ===== LANDING PAGE ANIMATION LOGIC =====

// Get canvas context
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation state
let animationPhase = 'flower'; // flower, warp, blackhole, fade
let isAnimating = true;

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== FLOWER ANIMATION =====
class Flower {
    constructor() {
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height * 0.7;
        this.progress = 0;
        this.maxProgress = 1;
        this.petals = 8;
        this.petalLength = 80;
        this.color = this.getColor();
    }

    getColor() {
        // Transition from white → pink → valentine red
        if (this.progress < 0.33) {
            // White to pink
            const t = this.progress / 0.33;
            const r = 255;
            const g = Math.floor(255 - (255 - 192) * t);
            const b = Math.floor(255 - (255 - 203) * t);
            return `rgb(${r}, ${g}, ${b})`;
        } else if (this.progress < 0.66) {
            // Pink to deeper pink
            const t = (this.progress - 0.33) / 0.33;
            const r = 255;
            const g = Math.floor(192 - (192 - 20) * t);
            const b = Math.floor(203 - (203 - 147) * t);
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            // To valentine red
            const t = (this.progress - 0.66) / 0.34;
            const r = 255;
            const g = Math.floor(20 - 20 * t);
            const b = Math.floor(147 - 147 * t);
            return `rgb(${r}, ${g}, ${b})`;
        }
    }

    drawPetal(angle, scale) {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(angle);
        
        // Draw petal
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, -this.petalLength * scale, 25 * scale, this.petalLength * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    drawStem() {
        ctx.strokeStyle = `rgba(34, 139, 34, ${0.7 + 0.3 * this.progress})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.lineTo(this.centerX, canvas.height * (0.7 + 0.2 * this.progress));
        ctx.stroke();
    }

    drawCenter() {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, 20 * this.progress, 0, Math.PI * 2);
        ctx.fill();
    }

    draw() {
        // Draw stem
        this.drawStem();

        // Draw petals
        for (let i = 0; i < this.petals; i++) {
            const angle = (i / this.petals) * Math.PI * 2;
            const scale = Math.sin(this.progress * Math.PI) * this.progress;
            this.drawPetal(angle, scale);
        }

        // Draw center
        this.drawCenter();
    }

    update(dt) {
        this.progress = Math.min(this.progress + dt, this.maxProgress);
        this.color = this.getColor();
    }
}

const flower = new Flower();
let lastTime = Date.now();

function animateFlower() {
    const now = Date.now();
    const dt = (now - lastTime) / 1000 / 8; // 8 second duration
    lastTime = now;

    // Clear canvas
    ctx.fillStyle = 'rgba(26, 0, 51, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    flower.update(dt);
    flower.draw();

    if (flower.progress < flower.maxProgress) {
        requestAnimationFrame(animateFlower);
    } else {
        // Flower animation complete, move to warp phase
        setTimeout(startWarpPhase, 500);
    }
}

// ===== WARP ANIMATION =====
function startWarpPhase() {
    animationPhase = 'warp';
    const flowerSection = document.querySelector('.flower-section');
    const warpSection = document.querySelector('.warp-section');

    // Hide flower, show warp
    flowerSection.classList.add('hidden');
    warpSection.classList.remove('hidden');

    // Create warp lines
    createWarpLines();

    // After warp animation, move to black hole
    setTimeout(startBlackHolePhase, 3000);
}

function createWarpLines() {
    const warpLines = document.querySelector('.warp-lines');
    const lineCount = 30;

    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'warp-line';
        
        const width = Math.random() * 200 + 100;
        const height = Math.random() * 4 + 2;
        const angle = (i / lineCount) * Math.PI * 2;
        const radius = 100 + Math.random() * 200;
        
        const startX = canvas.width / 2 + Math.cos(angle) * radius;
        const startY = canvas.height / 2 + Math.sin(angle) * radius;

        line.style.width = width + 'px';
        line.style.height = height + 'px';
        line.style.left = startX + 'px';
        line.style.top = startY + 'px';
        line.style.transform = `rotate(${angle}rad)`;
        line.style.animationDelay = (i * 50) + 'ms';

        warpLines.appendChild(line);
    }
}

// ===== BLACK HOLE ANIMATION =====
function startBlackHolePhase() {
    animationPhase = 'blackhole';
    const warpSection = document.querySelector('.warp-section');
    const blackHoleSection = document.querySelector('.black-hole-section');

    // Hide warp, show black hole
    warpSection.classList.add('hidden');
    blackHoleSection.classList.remove('hidden');

    // After black hole animation, fade to valentine
    setTimeout(fadeToValentine, 3000);
}

// ===== FADE TO VALENTINE =====
function fadeToValentine() {
    animationPhase = 'fade';
    const fadeOverlay = document.querySelector('.fade-to-valentine');

    fadeOverlay.style.opacity = '1';
    fadeOverlay.style.animation = 'fade-out 1s ease-out forwards';

    // Redirect to Valentine page
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, 1000);
}

// ===== START ANIMATION =====
function startAnimation() {
    // Ensure all sections start hidden except flower
    document.querySelector('.flower-section').classList.remove('hidden');
    document.querySelector('.warp-section').classList.add('hidden');
    document.querySelector('.black-hole-section').classList.add('hidden');
    document.querySelector('.fade-to-valentine').classList.add('hidden');

    // Start flower animation
    animateFlower();
}

// Start animation when page loads
window.addEventListener('load', startAnimation);

// Fallback in case load event doesn't fire
document.addEventListener('DOMContentLoaded', () => {
    if (animationPhase === 'flower' && flower.progress === 0) {
        startAnimation();
    }
});
