/**
 * Cosmic Curiosity - Principal Script File
 * Vanilla JS implementations for premium UI interactions, responsive behaviors,
 * and high-performance entrance animations on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Navigation Header Scroll States
  initHeaderScroll();

  // 2. Initialize Responsive Navigation Menu (Hamburger)
  initMobileMenu();

  // 3. Keep Navigation Links Synchronized with Current Page Status
  syncActiveNavbarLinks();

  // 4. Register Multi-Observer Scroll Fade-Ins (IntersectionObserver)
  initScrollAnimations();

  // 5. Trigger Progress Bar Animation whenever they are scrolled into view
  initProgressBarAnimations();
});

/**
 * Adds '.scrolled' class to navbar when user scrolls down.
 * Creating a modern, smaller border layout with glassmorphic effects.
 */
function initHeaderScroll() {
  const header = document.querySelector('.nav-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on mount in case page is loaded mid-scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Simple Hamburger menu toggler for mobile viewport drawers.
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent screen wiggle behind menu
  });

  // Close menu and body lock if user clicks a navigation link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

/**
 * Automates marking active navigation page in header links.
 * Normalizes comparison across local development, nested folders, or GitHub Pages subdirectories.
 */
function syncActiveNavbarLinks() {
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if the current page filename matches the nav link href
    if (pageName === href || (pageName === 'index.html' && href === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Fade-in-on-scroll implementation utilizing the fast native browser Intersection Observer.
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up');
  if (animatedElements.length === 0) return;

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger only once for performance
      }
    });
  }, {
    threshold: 0.1,    // Starts animation when 10% of element is on screen
    rootMargin: '0px 0px -40px 0px' // Slightly offset trigger point
  });

  animatedElements.forEach(el => animationObserver.observe(el));
}

/**
 * Performs custom width sliding progress animations for the Dark Matter rules density bar.
 * Runs instantly when step-two card is brought in focus.
 */
function initProgressBarAnimations() {
  const ruleCard = document.querySelector('.key-finding-card');
  const normalBar = document.querySelector('.density-normal');
  const dmBar = document.querySelector('.density-darkmatter');

  if (!ruleCard || !normalBar || !dmBar) return;

  // Initialize bars to 0% width first for animated entrance
  normalBar.style.width = '0%';
  dmBar.style.width = '0%';
  
  // Create smooth transition timing
  normalBar.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
  dmBar.style.transition = 'width 1.4s cubic-bezier(0.25, 1, 0.5, 1)';

  const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Expand to original metrics
        normalBar.style.width = '5%';
        dmBar.style.width = '27%';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  barObserver.observe(ruleCard);
}
