// ===== LANDING PAGE ANIMATION LOGIC =====
console.log('🎀 Landing page loaded');

// NEW ORDER: Warp → Black Hole → Flower → Valentine
const WARP_DURATION = 5000;        // Phase 1: Light speed warp effect (5s)
const BLACKHOLE_DURATION = 5000;   // Phase 2: Black hole forms (5s)
const FLOWER_DURATION = 5000;      // Phase 3: Flower blooms (5s)
const FADE_DURATION = 1500;        // Phase 4: Fade transition (1.5s)

let currentPhase = 'start';

// Start animation when page fully loads
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        startAnimation();
    });
});

if (document.readyState === 'complete') {
    startAnimation();
}

function startAnimation() {
    console.log('🚀 PHASE 1: Light speed warp begins...');
    currentPhase = 'warp';
    
    // Remove "not-loaded" to start warp animations
    document.body.classList.remove('not-loaded');
    
    // Warp section is already visible by default
    const warpSection = document.querySelector('.warp-section');
    if (warpSection) {
        warpSection.classList.remove('hidden');
    }
    
    // Schedule transition to black hole
    setTimeout(() => {
        transitionToBlackhole();
    }, WARP_DURATION);
}

function transitionToBlackhole() {
    if (currentPhase !== 'warp') return;
    
    console.log('🕳️ PHASE 2: Black hole forming...');
    currentPhase = 'blackhole';
    
    const warpSection = document.querySelector('.warp-section');
    const blackholeSection = document.querySelector('.blackhole-section');
    
    if (warpSection && blackholeSection) {
        // Fade out warp, fade in black hole
        warpSection.style.opacity = '0';
        warpSection.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            warpSection.classList.add('hidden');
            blackholeSection.classList.remove('hidden');
            blackholeSection.style.opacity = '0';
            blackholeSection.style.transition = 'opacity 1s ease-in';
            
            // Trigger reflow and start animation
            void blackholeSection.offsetWidth;
            blackholeSection.style.opacity = '1';
        }, 300);
    }
    
    // Schedule transition to flower
    setTimeout(() => {
        transitionToFlower();
    }, BLACKHOLE_DURATION);
}

function transitionToFlower() {
    if (currentPhase !== 'blackhole') return;
    
    console.log('🌹 PHASE 3: Flower blooming from the darkness...');
    currentPhase = 'flower';
    
    const blackholeSection = document.querySelector('.blackhole-section');
    const flowerWrapper = document.querySelector('.flower-wrapper');
    
    if (blackholeSection && flowerWrapper) {
        // Fade out black hole, fade in flower
        blackholeSection.style.opacity = '0';
        blackholeSection.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            blackholeSection.classList.add('hidden');
            flowerWrapper.classList.remove('hidden');
            flowerWrapper.style.opacity = '0';
            flowerWrapper.style.transition = 'opacity 1s ease-in';
            
            // Trigger reflow and start flower animations
            void flowerWrapper.offsetWidth;
            flowerWrapper.style.opacity = '1';
            
            // Start flower bloom animations from this point
            startFlowerAnimations();
        }, 300);
    }
    
    // Schedule transition to valentine
    setTimeout(() => {
        transitionToValentine();
    }, FLOWER_DURATION);
}

function startFlowerAnimations() {
    // Remove not-loaded from flower elements to start their animations
    const flowerElements = document.querySelectorAll('.flower-wrapper *');
    flowerElements.forEach(el => {
        if (el.classList.contains('not-loaded')) {
            el.classList.remove('not-loaded');
        }
    });
}

function transitionToValentine() {
    if (currentPhase !== 'flower') return;
    
    console.log('💕 PHASE 4: Transitioning to Valentine...');
    currentPhase = 'valentine';
    
    const fadeOverlay = document.querySelector('.fade-overlay');
    if (fadeOverlay) {
        fadeOverlay.classList.remove('hidden');
        fadeOverlay.style.opacity = '0';
        fadeOverlay.style.transition = 'opacity ' + FADE_DURATION + 'ms ease-out';
        
        // Trigger reflow
        void fadeOverlay.offsetWidth;
        fadeOverlay.style.opacity = '1';
    }
    
    // Redirect after fade
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, FADE_DURATION);
}
