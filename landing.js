// ===== LANDING PAGE ANIMATION LOGIC =====
console.log('🎀 Landing page loaded');

// Timing for animation phases (in milliseconds)
const FLOWER_DURATION = 4500; // 4.5 seconds - Flower blooms with particles
const WARP_DURATION = 3500;   // 3.5 seconds - Light speed tunnel
const BLACKHOLE_DURATION = 3500; // 3.5 seconds - Black hole forms
const FADE_DURATION = 1000;   // 1 second - Fade to Valentine page

// Start animation when page fully loads
window.addEventListener('load', startAnimation);

function startAnimation() {
    console.log('✨ Starting the most beautiful animation sequence...');
    
    // Remove "not-loaded" class to trigger all CSS animations
    document.body.classList.remove('not-loaded');
    
    // Create a magical moment with visual feedback
    createFlowerAura();
    
    // Schedule next phase
    setTimeout(transitionToWarp, FLOWER_DURATION);
}

function createFlowerAura() {
    // Add a subtle glow effect during bloom
    const container = document.querySelector('.landing-container');
    const aura = document.createElement('div');
    aura.classList.add('aura-effect');
    container.appendChild(aura);
    
    setTimeout(() => aura.remove(), 3000);
}

function transitionToWarp() {
    console.log('⚡ WARP SPEED ENGAGED! Entering hyperspace...');
    
    // Hide flower, show warp
    const flowerWrapper = document.querySelector('.flower-wrapper');
    const warpSection = document.querySelector('.warp-section');
    
    flowerWrapper.classList.add('hidden');
    warpSection.classList.remove('hidden');
    
    // Add visual shake effect for impact
    warpSection.style.animation = 'none';
    setTimeout(() => {
        warpSection.style.animation = '';
    }, 10);
    
    // Schedule next phase
    setTimeout(transitionToBlackhole, WARP_DURATION);
}

function transitionToBlackhole() {
    console.log('🕳️ BLACK HOLE FORMING... Reality bending...');
    
    // Hide warp, show black hole
    const warpSection = document.querySelector('.warp-section');
    const blackholeSection = document.querySelector('.blackhole-section');
    
    warpSection.classList.add('hidden');
    blackholeSection.classList.remove('hidden');
    
    // Add screen pulsing effect
    document.body.style.boxShadow = 'inset 0 0 100px rgba(255, 20, 147, 0.3)';
    
    // Schedule final transition
    setTimeout(transitionToValentine, BLACKHOLE_DURATION);
}

function transitionToValentine() {
    console.log('💕 LOVE CONQUERS ALL! Taking you to the Valentine...');
    
    // Remove pulse effect
    document.body.style.boxShadow = 'none';
    
    // Show fade overlay
    const fadeOverlay = document.querySelector('.fade-overlay');
    fadeOverlay.classList.remove('hidden');
    
    // Redirect after fade completes
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, FADE_DURATION);
}
