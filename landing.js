// ===== LANDING PAGE ANIMATION LOGIC =====
console.log('Landing page loaded');

// Timing for animation phases
const FLOWER_DURATION = 4500; // 4.5 seconds
const WARP_DURATION = 3500;   // 3.5 seconds
const BLACKHOLE_DURATION = 3500; // 3.5 seconds
const FADE_DURATION = 1000;   // 1 second

// Start animation when page loads
window.addEventListener('load', startAnimation);

function startAnimation() {
    console.log('Starting animation sequence');
    
    // Remove "not-loaded" class to start animations
    document.body.classList.remove('not-loaded');
    
    // Phase 1: Flower blooms
    setTimeout(transitionToWarp, FLOWER_DURATION);
}

function transitionToWarp() {
    console.log('Transitioning to warp phase');
    
    // Hide flower, show warp
    const flowerWrapper = document.querySelector('.flower-wrapper');
    const warpSection = document.querySelector('.warp-section');
    
    flowerWrapper.classList.add('hidden');
    warpSection.classList.remove('hidden');
    
    // Phase 2: Warp effect
    setTimeout(transitionToBlackhole, WARP_DURATION);
}

function transitionToBlackhole() {
    console.log('Transitioning to black hole phase');
    
    // Hide warp, show black hole
    const warpSection = document.querySelector('.warp-section');
    const blackholeSection = document.querySelector('.blackhole-section');
    
    warpSection.classList.add('hidden');
    blackholeSection.classList.remove('hidden');
    
    // Phase 3: Black hole
    setTimeout(transitionToValentine, BLACKHOLE_DURATION);
}

function transitionToValentine() {
    console.log('Transitioning to Valentine page');
    
    // Show fade overlay
    const fadeOverlay = document.querySelector('.fade-overlay');
    fadeOverlay.classList.remove('hidden');
    
    // Redirect after fade
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, FADE_DURATION);
}
