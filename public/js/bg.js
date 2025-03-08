// Updated bg.js with performance optimizations

function generateParticles(n) {
  let value = `${getRandom(2560)}px ${getRandom(2560)}px #000`;
  // Limit particle count based on performance settings
  const count = Math.min(n, window.performanceSettings?.deviceTier === 'low' ? n/4 : 
                           window.performanceSettings?.deviceTier === 'medium' ? n/2 : n);
  
  for (let i = 2; i <= count; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px #000`;
  }
  return value;
}

function generateStars(n) {
  let value = `${getRandom(2560)}px ${getRandom(2560)}px #fff`;
  // Limit star count based on performance settings
  const count = Math.min(n, window.performanceSettings?.deviceTier === 'low' ? n/4 : 
                           window.performanceSettings?.deviceTier === 'medium' ? n/2 : n);
  
  for (let i = 2; i <= count; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px #fff`;
  }
  return value;
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function initBG() {
  // Check if animations should be reduced
  const reduceAnimations = document.documentElement.classList.contains('reduce-animations');
  
  // Determine particle counts based on performance settings
  const settings = window.animationSettings || {
    particleCountSmall: 1000,
    particleCountMedium: 500,
    particleCountLarge: 250
  };
  
  // Generate particles with appropriate counts
  const particlesSmall = reduceAnimations ? generateParticles(settings.particleCountSmall / 5) : 
                                           generateParticles(settings.particleCountSmall);
  const particlesMedium = reduceAnimations ? generateParticles(settings.particleCountMedium / 5) : 
                                            generateParticles(settings.particleCountMedium);
  const particlesLarge = reduceAnimations ? generateParticles(settings.particleCountLarge / 5) : 
                                           generateParticles(settings.particleCountLarge);
  
  // Apply particles to DOM elements if they exist
  const particles1 = document.getElementById('particles1');
  const particles2 = document.getElementById('particles2');
  const particles3 = document.getElementById('particles3');

  if (particles1) {
    particles1.style.cssText = `
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: ${particlesSmall};
    animation: ${reduceAnimations ? 'none' : 'animStar 50s linear infinite'};
    `;
  }

  if (particles2) {
    particles2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${particlesMedium};
    animation: ${reduceAnimations ? 'none' : 'animateParticle 100s linear infinite'};
    `;
  }

  if (particles3) {
    particles3.style.cssText = `
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: ${particlesLarge};
    animation: ${reduceAnimations ? 'none' : 'animateParticle 150s linear infinite'};
    `;
  }

  // Generate stars with performance-optimized counts
  const starsSmall = reduceAnimations ? generateStars(settings.particleCountSmall / 5) : 
                                        generateStars(settings.particleCountSmall);
  const starsMedium = reduceAnimations ? generateStars(settings.particleCountMedium / 5) : 
                                         generateStars(settings.particleCountMedium);
  const starsLarge = reduceAnimations ? generateStars(settings.particleCountLarge / 5) : 
                                        generateStars(settings.particleCountLarge);
  
  // Apply stars to DOM elements if they exist
  const stars1 = document.getElementById('stars1');
  const stars2 = document.getElementById('stars2');
  const stars3 = document.getElementById('stars3');

  if (stars1) {
    stars1.style.cssText = `
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: ${starsSmall};
    `;
  }

  if (stars2) {
    stars2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${starsMedium};
    `;
  }

  if (stars3) {
    stars3.style.cssText = `
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: ${starsLarge};
    `;
  }
}

// Initialize background on Astro page changes
document.addEventListener('astro:after-swap', initBG);

// Initialize background on initial page load
// Wait for performance manager to be initialized
document.addEventListener('DOMContentLoaded', () => {
  // Delay slightly to ensure performance settings are available
  setTimeout(initBG, 100);
});