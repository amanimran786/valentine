// Landing page animation controller
console.log('🎀 Valentine landing page initialized');

// Phase durations
const WARP_TIME = 5000;
const BLACKHOLE_TIME = 5000;
const FLOWER_TIME = 5000;
const FADE_TIME = 1500;

let currentPhase = 'start';

// Wait for page to load
window.addEventListener('load', initAnimation);

function initAnimation() {
    console.log('🚀 Starting animation sequence');
    
    // Remove the pause class
    document.body.classList.remove('not-loaded');
    
    // Start with warp section visible
    const warpSection = document.querySelector('.warp-section');
    if (warpSection) {
        warpSection.classList.remove('hidden');
    }
    
    currentPhase = 'warp';
    
    // After warp ends, go to black hole
    setTimeout(goToBlackhole, WARP_TIME);
}

function goToBlackhole() {
    if (currentPhase !== 'warp') return;
    
    console.log('🕳️ Black hole forming');
    currentPhase = 'blackhole';
    
    const warp = document.querySelector('.warp-section');
    const blackhole = document.querySelector('.blackhole-section');
    
    if (warp) warp.classList.add('hidden');
    if (blackhole) blackhole.classList.remove('hidden');
    
    setTimeout(goToFlower, BLACKHOLE_TIME);
}

function goToFlower() {
    if (currentPhase !== 'blackhole') return;
    
    console.log('🌹 Flower blooming');
    currentPhase = 'flower';
    
    const blackhole = document.querySelector('.blackhole-section');
    const flower = document.querySelector('.flower-wrapper');
    
    if (blackhole) blackhole.classList.add('hidden');
    if (flower) flower.classList.remove('hidden');
    
    setTimeout(goToValentine, FLOWER_TIME);
}

function goToValentine() {
    if (currentPhase !== 'flower') return;
    
    console.log('💕 Transitioning to Valentine');
    currentPhase = 'valentine';
    
    const fade = document.querySelector('.fade-overlay');
    if (fade) fade.classList.remove('hidden');
    
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, FADE_TIME);
}
