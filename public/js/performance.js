// File: /public/js/performance.js

/**
 * LimogiAI Performance Optimization
 * Detects device capabilities and adjusts animation complexity
 */

class PerformanceManager {
    constructor() {
      this.deviceTier = this.detectDeviceTier();
      this.hasReducedMotion = this.checkReducedMotion();
      this.isLowPowerMode = false; // Will be determined later
      
      // Make settings available globally
      window.performanceSettings = {
        deviceTier: this.deviceTier,
        hasReducedMotion: this.hasReducedMotion,
        isLowPowerMode: this.isLowPowerMode,
        shouldShowFullAnimations: this.shouldShowFullAnimations()
      };
      
      this.init();
    }
    
    /**
     * Detects device performance tier
     * @returns {'high'|'medium'|'low'} Device performance tier
     */
    detectDeviceTier() {
      // Check for navigator properties commonly associated with mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Use hardware concurrency (CPU cores) as a rough performance indicator
      const cores = navigator.hardwareConcurrency || 1;
      
      // Use device memory API if available (Chrome only)
      const memory = navigator.deviceMemory || 4; // Default to mid-range if not available
      
      // Check for touchscreen (another mobile indicator)
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Basic determination based on available signals
      if (!isMobile && cores >= 8 && memory >= 8) {
        return 'high';
      } else if ((isMobile && cores >= 6) || (!isMobile && cores >= 4)) {
        return 'medium';
      } else {
        return 'low';
      }
    }
    
    /**
     * Checks if user has requested reduced motion
     * @returns {boolean} Whether reduced motion is preferred
     */
    checkReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    /**
     * Determines if device should show full animations
     * @returns {boolean} Whether to show full animations
     */
    shouldShowFullAnimations() {
      // Don't show full animations if user prefers reduced motion
      if (this.hasReducedMotion) return false;
      
      // Adjust based on device tier
      switch (this.deviceTier) {
        case 'high':
          return true;
        case 'medium':
          return true; // Still show animations but will reduce particle count
        case 'low':
          return false; // Show minimal animations
        default:
          return false;
      }
    }
    
    /**
     * Initialize performance optimizations
     */
    init() {
      this.applyOptimizations();
      this.setupEventListeners();
      this.detectLowPowerMode();
    }
    
    /**
     * Apply performance optimizations based on detected capabilities
     */
    applyOptimizations() {
      const html = document.documentElement;
      
      // Add data attributes for CSS targeting
      html.dataset.performanceTier = this.deviceTier;
      html.dataset.reducedMotion = this.hasReducedMotion;
      
      // Handle animations visibility
      if (!this.shouldShowFullAnimations()) {
        html.classList.add('reduce-animations');
      }
      
      // Adjust particle/star count based on device tier
      window.animationSettings = {
        particleCountSmall: this.getParticleCount('small'),
        particleCountMedium: this.getParticleCount('medium'),
        particleCountLarge: this.getParticleCount('large'),
        meteorCount: this.getMeteorCount()
      };
    }
    
    /**
     * Get appropriate particle count based on device tier
     * @param {string} size - Particle size category
     * @returns {number} Number of particles to show
     */
    getParticleCount(size) {
      const counts = {
        small: { high: 1000, medium: 500, low: 200 },
        medium: { high: 500, medium: 250, low: 100 },
        large: { high: 250, medium: 125, low: 50 }
      };
      
      return counts[size][this.deviceTier];
    }
    
    /**
     * Get appropriate meteor count based on device tier
     * @returns {number} Number of meteors to show
     */
    getMeteorCount() {
      const counts = { high: 10, medium: 5, low: 2 };
      return counts[this.deviceTier];
    }
    
    /**
     * Set up event listeners for runtime performance adjustments
     */
    setupEventListeners() {
      // Listen for reduced motion preference changes
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.hasReducedMotion = e.matches;
        window.performanceSettings.hasReducedMotion = e.matches;
        this.applyOptimizations();
        
        // Re-initialize animations if applicable
        if (typeof initBG === 'function') {
          initBG();
        }
      });
      
      // Listen for visibility changes to pause animations when tab is not visible
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          document.documentElement.classList.add('animations-paused');
        } else {
          document.documentElement.classList.remove('animations-paused');
        }
      });
      
      // Monitor for performance issues during runtime
      this.setupPerformanceMonitoring();
    }
    
    /**
     * Attempts to detect low power mode (indirect methods)
     */
    detectLowPowerMode() {
      // Battery API - if available
      if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
          // Consider low power mode if battery level is below 20% and not charging
          if (battery.level < 0.2 && !battery.charging) {
            this.isLowPowerMode = true;
            window.performanceSettings.isLowPowerMode = true;
            document.documentElement.classList.add('reduce-animations');
          }
          
          // Set up listeners for battery changes
          battery.addEventListener('levelchange', () => {
            if (battery.level < 0.2 && !battery.charging) {
              this.isLowPowerMode = true;
              window.performanceSettings.isLowPowerMode = true;
              document.documentElement.classList.add('reduce-animations');
            } else if (this.isLowPowerMode && (battery.level > 0.3 || battery.charging)) {
              this.isLowPowerMode = false;
              window.performanceSettings.isLowPowerMode = false;
              if (!this.hasReducedMotion && this.deviceTier !== 'low') {
                document.documentElement.classList.remove('reduce-animations');
              }
            }
          });
        });
      }
    }
    
    /**
     * Sets up monitoring for runtime performance issues
     */
    setupPerformanceMonitoring() {
      if (!window.requestAnimationFrame) return;
      
      let lastTime = performance.now();
      let frameTimes = [];
      let frameTimeIndex = 0;
      const FRAME_SAMPLE_SIZE = 60; // Track one second of frames at 60fps
      
      // Initialize frame time array
      for (let i = 0; i < FRAME_SAMPLE_SIZE; i++) {
        frameTimes.push(16.7); // Default to 60fps (16.7ms per frame)
      }
      
      // Monitor frame times to detect performance issues
      const checkFrameRate = () => {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Store frame time in circular buffer
        frameTimes[frameTimeIndex] = deltaTime;
        frameTimeIndex = (frameTimeIndex + 1) % FRAME_SAMPLE_SIZE;
        
        // Calculate average frame time after collecting enough samples
        if (frameTimeIndex === 0) {
          const averageFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / FRAME_SAMPLE_SIZE;
          const estimatedFPS = 1000 / averageFrameTime;
          
          // If frame rate drops below threshold, reduce animations
          if (estimatedFPS < 30 && !document.documentElement.classList.contains('reduce-animations')) {
            document.documentElement.classList.add('reduce-animations');
            console.log('Performance optimization: Reducing animations due to low frame rate');
          }
        }
        
        window.requestAnimationFrame(checkFrameRate);
      };
      
      // Start monitoring after a short delay to let initial page load complete
      setTimeout(() => {
        window.requestAnimationFrame(checkFrameRate);
      }, 3000);
    }
  }
  
  // Initialize performance manager
  document.addEventListener('DOMContentLoaded', () => {
    window.performanceManager = new PerformanceManager();
  });
  
  // Re-initialize on page navigation (for Astro)
  document.addEventListener('astro:after-swap', () => {
    window.performanceManager = new PerformanceManager();
  });