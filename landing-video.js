// Landing Page - Video Version Controller
// Handles video playback and transitions to Valentine page

class VideoLandingController {
    constructor() {
        this.videoElement = document.getElementById('soraVideo');
        this.fadeOverlay = document.querySelector('.fade-overlay');
        this.videoFallback = document.querySelector('.video-fallback');
        this.videoDuration = 16000; // 16 seconds for the video
        this.redirectDelay = 18000; // 2 seconds after video ends for fade
        
        this.init();
    }
    
    init() {
        // Check if video element exists
        if (!this.videoElement) {
            console.warn('Video element not found');
            this.showFallback();
            return;
        }
        
        // Handle video ended event
        this.videoElement.addEventListener('ended', () => this.handleVideoEnd());
        
        // Handle video errors
        this.videoElement.addEventListener('error', () => this.handleVideoError());
        
        // Handle load start
        this.videoElement.addEventListener('loadstart', () => console.log('Video loading...'));
        
        // Handle canplay (video is ready to play)
        this.videoElement.addEventListener('canplay', () => console.log('Video ready to play'));
        
        // Log video duration
        this.videoElement.addEventListener('loadedmetadata', () => {
            console.log(`Video duration: ${this.videoElement.duration}s`);
        });
    }
    
    handleVideoEnd() {
        console.log('Video ended, initiating transition...');
        
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
