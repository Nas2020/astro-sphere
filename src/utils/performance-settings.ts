// src/utils/performance-settings.ts

interface PerformanceSettings {
    hasReducedMotion: boolean;
    deviceTier: 'low' | 'medium' | 'high';
    isLowPowerMode: boolean;
  }
  
  // Initialize default performance settings
  export const initPerformanceSettings = (): void => {
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Simple device tier detection (could be enhanced with more sophisticated detection)
      let deviceTier: 'low' | 'medium' | 'high' = 'high';
      
      // Simple low power mode detection
      // In a real app, you might check battery status API or other indicators
      const isLowPowerMode = false;
      
      // Extend window object with performance settings
      window.performanceSettings = {
        hasReducedMotion: prefersReducedMotion,
        deviceTier,
        isLowPowerMode
      };
    }
  };
  
  // Type declaration to make TypeScript happy
  declare global {
    interface Window {
      performanceSettings: PerformanceSettings;
    }
  }