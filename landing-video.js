// Landing Page - Video Version Controller
// Handles video playback and transitions to Valentine page

class VideoLandingController {
    constructor() {
        this.videoElement = document.getElementById('soraVideo');
        this.audioElement = document.getElementById('backgroundMusic');
        this.fadeOverlay = document.querySelector('.fade-overlay');
        this.videoFallback = document.querySelector('.video-fallback');
        this.audioPlayed = false;
        this.videoDuration = 16000; // 16 seconds for the video
        this.redirectDelay = 18000; // 2 seconds after video ends for fade
        
        this.init();
    }
    
    init() {
        console.log('VideoLandingController initialized');
        console.log('Audio element:', this.audioElement);
        console.log('Video element:', this.videoElement);
        
        // Check if video element exists
        if (!this.videoElement) {
            console.warn('Video element not found');
            this.showFallback();
            return;
        }
        
        // Aggressive audio play attempts
        setTimeout(() => this.playAudio(), 100);
        setTimeout(() => this.playAudio(), 500);
        setTimeout(() => this.playAudio(), 1000);
        
        // Allow user interaction to play audio
        const interactionHandler = () => {
            console.log('User interaction detected');
            this.playAudio();
            document.removeEventListener('click', interactionHandler);
            document.removeEventListener('touchstart', interactionHandler);
            document.removeEventListener('keydown', interactionHandler);
        };
        
        document.addEventListener('click', interactionHandler);
        document.addEventListener('touchstart', interactionHandler);
        document.addEventListener('keydown', interactionHandler);
        
        // Handle video ended event
        this.videoElement.addEventListener('ended', () => this.handleVideoEnd());
        
        // Handle video errors
        this.videoElement.addEventListener('error', () => this.handleVideoError());
        
        // Handle load start
        this.videoElement.addEventListener('loadstart', () => console.log('Video loading...'));
        
        // Handle canplay (video is ready to play)
        this.videoElement.addEventListener('canplay', () => {
            console.log('Video ready to play');
            // Try to play audio when video is ready
            this.playAudio();
        });
        
        // Log video duration
        this.videoElement.addEventListener('loadedmetadata', () => {
            console.log(`Video duration: ${this.videoElement.duration}s`);
            // Try to play audio when video metadata is loaded
            this.playAudio();
        });
        
        // Try to play audio when it can play
        if (this.audioElement) {
            this.audioElement.addEventListener('canplay', () => {
                console.log('Audio ready to play');
                this.playAudio();
            });
        }
    }
    
    playAudio() {
        if (!this.audioElement) {
            console.warn('Audio element not found');
            return;
        }
        
        if (this.audioPlayed) {
            console.log('Audio already attempted to play');
            return;
        }
        
        console.log('Attempting to play audio...');
        console.log('Audio paused:', this.audioElement.paused);
        console.log('Audio muted:', this.audioElement.muted);
        
        try {
            // Unmute the audio
            this.audioElement.muted = false;
            
            // Play the audio
            const playPromise = this.audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✓ Audio is now playing!');
                        this.audioPlayed = true;
                    })
                    .catch(error => {
                        console.log('✗ Audio play failed:', error.message);
                        console.log('This is normal - user interaction may be needed');
                    });
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
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
    
    handleVideoError() {
        console.error('Video playback error');
        this.showFallback();
        
        // Still redirect after timeout
        setTimeout(() => {
            console.log('Fallback timeout, redirecting...');
            this.redirectToValentine();
        }, 3000);
    }
    
    showFallback() {
        if (this.videoFallback) {
            this.videoFallback.classList.add('show');
        }
        if (this.videoElement) {
            this.videoElement.style.display = 'none';
        }
    }
    
    redirectToValentine() {
        console.log('Redirecting to Valentine page...');
        // Replace current page with valentine page
        window.location.href = './valentine.html';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VideoLandingController();
});
