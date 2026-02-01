// ===== LANDING PAGE ANIMATION LOGIC =====
console.log('🎀 Landing page loaded');

// Timing for animation phases (in milliseconds)
const FLOWER_DURATION = 5000;      // Flower blooms - enough time to see it
const WARP_DURATION = 4000;        // Light speed tunnel effect
const BLACKHOLE_DURATION = 4000;   // Black hole forms and consumes
const FADE_DURATION = 1500;        // Fade transition

// Animation state
let currentPhase = 'flower';

// Start animation when page fully loads
window.addEventListener('load', () => {
    // Ensure DOM is ready
    requestAnimationFrame(() => {
        startAnimation();
    });
});

// Also start if document is already loaded
if (document.readyState === 'complete') {
    startAnimation();
}

function startAnimation() {
    console.log('✨ PHASE 1: Flower blooming...');
    currentPhase = 'flower';
    
    // Remove "not-loaded" class to trigger animations
    document.body.classList.remove('not-loaded');
    
    // Create aura effect
    createFlowerAura();
    
    // Schedule transition to warp
    setTimeout(() => {
        transitionToWarp();
    }, FLOWER_DURATION);
}

function createFlowerAura() {
    const container = document.querySelector('.landing-container');
    if (container) {
        const aura = document.createElement('div');
        aura.classList.add('aura-effect');
        container.appendChild(aura);
        
        setTimeout(() => {
            if (aura && aura.parentNode) {
                aura.parentNode.removeChild(aura);
            }
        }, 3500);
    }
}

function transitionToWarp() {
    if (currentPhase !== 'flower') return;
    
    console.log('⚡ PHASE 2: Entering warp speed...');
    currentPhase = 'warp';
    
    const flowerWrapper = document.querySelector('.flower-wrapper');
    const warpSection = document.querySelector('.warp-section');
    
    if (flowerWrapper && warpSection) {
        // Smooth transition: fade out flower, fade in warp
        flowerWrapper.style.opacity = '0';
        flowerWrapper.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            flowerWrapper.classList.add('hidden');
            warpSection.classList.remove('hidden');
            warpSection.style.opacity = '1';
            warpSection.style.transition = 'opacity 0.5s ease-in';
        }, 300);
    }
    
    // Schedule next phase
    setTimeout(() => {
        transitionToBlackhole();
    }, WARP_DURATION);
}

function transitionToBlackhole() {
    if (currentPhase !== 'warp') return;
    
    console.log('🕳️ PHASE 3: Black hole forming...');
    currentPhase = 'blackhole';
    
    const warpSection = document.querySelector('.warp-section');
    const blackholeSection = document.querySelector('.blackhole-section');
    
    if (warpSection && blackholeSection) {
        // Smooth transition: fade out warp, fade in blackhole
        warpSection.style.opacity = '0';
        warpSection.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            warpSection.classList.add('hidden');
            blackholeSection.classList.remove('hidden');
            blackholeSection.style.opacity = '1';
            blackholeSection.style.transition = 'opacity 0.5s ease-in';
        }, 300);
    }
    
    // Add subtle pulse effect to body
    document.body.style.boxShadow = 'inset 0 0 60px rgba(255, 20, 147, 0.2)';
    
    // Schedule final phase
    setTimeout(() => {
        transitionToValentine();
    }, BLACKHOLE_DURATION);
}

function transitionToValentine() {
    if (currentPhase !== 'blackhole') return;
    
    console.log('💕 PHASE 4: Transitioning to Valentine...');
    currentPhase = 'valentine';
    
    // Remove pulse effect
    document.body.style.boxShadow = 'none';
    
    const fadeOverlay = document.querySelector('.fade-overlay');
    if (fadeOverlay) {
        fadeOverlay.classList.remove('hidden');
        fadeOverlay.style.animation = 'none';
        
        // Force reflow to restart animation
        void fadeOverlay.offsetWidth;
        fadeOverlay.style.animation = '';
    }
    
    // Redirect after fade
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, FADE_DURATION);
}
