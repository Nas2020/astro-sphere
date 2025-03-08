// Enhanced scroll.js
function enhancedScroll() {
  const header = document.getElementById("header");
  const scrollElements = document.querySelectorAll('.scroll-animate');
  const scrollY = window.scrollY;
  
  // Handle header
  if (scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  
  // Handle scroll animations only on capable devices
  if (!document.documentElement.classList.contains('reduce-animations')) {
    scrollElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      
      if (elementTop < viewportHeight * 0.8) {
        el.classList.add('in-view');
      }
    });
  }
}