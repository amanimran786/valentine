// Landing Page - Video Version Controller
// Handles video playback and transitions to Valentine page

class VideoLandingController {
    constructor() {
        this.videoElement = document.getElementById('soraVideo');
        this.audioElement = document.getElementById('backgroundMusic');
        this.startOverlay = document.getElementById('startOverlay');
        this.fadeOverlay = document.querySelector('.fade-overlay');
        this.started = false;
        
        this.init();
    }
    
    init() {
        console.log('VideoLandingController initialized');
        
        if (!this.videoElement || !this.audioElement) {
            console.error('Video or audio element not found');
            return;
        }
        
        // Get the play button
        const playButton = document.getElementById('playButton');
        
        // Handle start overlay click
        if (this.startOverlay) {
            this.startOverlay.addEventListener('click', (e) => {
                // Only trigger if clicking the overlay itself, not the button
                if (e.target === this.startOverlay) {
                    e.stopPropagation();
                    console.log('Overlay clicked!');
                    this.startAnimation();
                }
            });
        }
        
        // Handle button click
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Play button clicked!');
                this.startAnimation();
            });
        }
        
        // Also allow spacebar or Enter to start
        document.addEventListener('keydown', (e) => {
            if ((e.key === ' ' || e.key === 'Enter') && !this.started) {
                e.preventDefault();
                this.startAnimation();
            }
        });
        
        // Handle video ended event
        this.videoElement.addEventListener('ended', () => this.handleVideoEnd());
        this.videoElement.addEventListener('error', () => this.handleVideoError());
    }
    
    startAnimation() {
        if (this.started) return;
        this.started = true;
        
        console.log('Starting animation and music...');
        
        // Hide the start overlay
        if (this.startOverlay) {
            this.startOverlay.style.opacity = '0';
            this.startOverlay.style.pointerEvents = 'none';
            this.startOverlay.style.transition = 'opacity 0.5s ease-out';
        }
        
        // Play video
        const videoPromise = this.videoElement.play();
        if (videoPromise !== undefined) {
            videoPromise.catch(error => {
                console.error('Video play failed:', error);
            });
        }
        
        // Play audio with a slight delay to sync
        setTimeout(() => {
            this.audioElement.muted = false;
            this.audioElement.volume = 0.7;
            
            const audioPromise = this.audioElement.play();
            if (audioPromise !== undefined) {
                audioPromise
                    .then(() => {
                        console.log('✓ Music and video are now playing!');
                    })
                    .catch(error => {
                        console.error('✗ Audio play failed:', error.message);
                    });
            }
        }, 50);
    }
    
    handleVideoEnd() {
        console.log('Video ended, initiating transition...');
        
        // Fade out music over 1 second
        if (this.audioElement) {
            this.fadeOutAudio(1000);
        }
        
        // Show fade overlay
        if (this.fadeOverlay) {
            this.fadeOverlay.classList.add('active');
        }
        
        // Redirect after fade animation completes
        setTimeout(() => {
            this.redirectToValentine();
        }, 1000);
    }
    
    handleVideoError() {
        console.error('Video playback error');
        // Still redirect after timeout
        setTimeout(() => {
            console.log('Video error, redirecting...');
            this.redirectToValentine();
        }, 3000);
    }
    
    fadeOutAudio(duration) {
        if (!this.audioElement) return;
        
        const steps = 50;
        const stepDuration = duration / steps;
        const startVolume = this.audioElement.volume;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            this.audioElement.volume = startVolume * (1 - progress);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.audioElement.pause();
                this.audioElement.volume = startVolume; // Reset for next time
            }
        }, stepDuration);
    }
    
    redirectToValentine() {
        console.log('Redirecting to Valentine page...');
        window.location.href = './valentine.html';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VideoLandingController();
});
