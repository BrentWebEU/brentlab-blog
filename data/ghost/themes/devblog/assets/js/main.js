/**
 * Main JavaScript - Core functionality for DevBlog theme
 */

(function() {
    'use strict';
    
    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!menuToggle || !mobileMenu) return;
        
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            
            // Toggle hamburger animation
            menuToggle.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-open');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                menuToggle.click();
            }
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                menuToggle.click();
            }
        });
    }
    
    /**
     * Back to Top Button
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) return;
        
        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        }
        
        // Scroll to top smoothly
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Listen for scroll events (with throttling)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    toggleBackToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial check
        toggleBackToTop();
    }
    
    /**
     * Reading Progress Bar (for posts)
     */
    function initReadingProgress() {
        const progressBar = document.querySelector('.reading-progress-bar');
        
        if (!progressBar) return;
        
        function updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
        
        // Listen for scroll events (with throttling)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial update
        updateProgress();
    }
    
    /**
     * Header Scroll Effect
     */
    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        
        if (!header) return;
        
        let lastScrollTop = 0;
        
        function updateHeader() {
            const scrollTop = window.scrollY;
            
            // Add shadow when scrolled
            if (scrollTop > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.classList.add('is-hidden');
            } else {
                header.classList.remove('is-hidden');
            }
            
            lastScrollTop = scrollTop;
        }
        
        // Listen for scroll events (with throttling)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    /**
     * Copy Link to Clipboard
     */
    function initCopyLink() {
        const copyButtons = document.querySelectorAll('.social-share-copy');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const url = button.getAttribute('data-url');
                
                try {
                    await navigator.clipboard.writeText(url);
                    
                    // Show success feedback
                    const originalText = button.querySelector('span').textContent;
                    button.querySelector('span').textContent = 'Copied!';
                    button.classList.add('is-copied');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        button.querySelector('span').textContent = originalText;
                        button.classList.remove('is-copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    // Fallback for older browsers
                    fallbackCopyToClipboard(url, button);
                }
            });
        });
    }
    
    /**
     * Fallback copy method for older browsers
     */
    function fallbackCopyToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            const originalText = button.querySelector('span').textContent;
            button.querySelector('span').textContent = 'Copied!';
            button.classList.add('is-copied');
            
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
                button.classList.remove('is-copied');
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    /**
     * Coffee Toggle Easter Egg
     */
    function initCoffeeToggle() {
        const coffeeToggle = document.querySelector('.coffee-toggle');
        
        if (!coffeeToggle) return;
        
        const emojis = ['☕', '🐧', '💻', '🚀', '🔥', '⚡', '🎯', '🌟'];
        let currentIndex = 0;
        
        coffeeToggle.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % emojis.length;
            coffeeToggle.textContent = emojis[currentIndex];
            
            // Add bounce animation
            coffeeToggle.style.animation = 'none';
            setTimeout(() => {
                coffeeToggle.style.animation = 'bounce 0.5s ease';
            }, 10);
        });
    }
    
    /**
     * External Links - Open in new tab
     */
    function initExternalLinks() {
        const links = document.querySelectorAll('.post-content a');
        
        links.forEach(link => {
            // Check if link is external
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    
    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just '#'
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 100;
                    const targetPosition = target.offsetTop - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    /**
     * Konami Code Easter Egg
     */
    function initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    function activateEasterEgg() {
        // Create penguin cursor
        document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><text y=\'24\' font-size=\'24\'>🐧</text></svg>") 16 16, auto';
        
        // Add confetti effect
        const colors = ['#2563EB', '#F59E0B', '#10B981', '#60A5FA', '#FBBF24'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = '0.8';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        // Add animation keyframes
        if (!document.getElementById('confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show message
        const message = document.createElement('div');
        message.textContent = '🎉 Konami Code Activated! 🐧';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'var(--color-primary)';
        message.style.color = 'white';
        message.style.padding = 'var(--space-6) var(--space-8)';
        message.style.borderRadius = 'var(--radius-lg)';
        message.style.fontSize = 'var(--font-size-xl)';
        message.style.fontWeight = 'var(--font-weight-bold)';
        message.style.zIndex = '10000';
        message.style.boxShadow = 'var(--shadow-2xl)';
        message.style.animation = 'fadeIn 0.5s ease-out';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.style.cursor = '';
        }, 5000);
    }
    
    /**
     * Initialize all features
     */
    function init() {
        initMobileMenu();
        initBackToTop();
        initReadingProgress();
        initHeaderScroll();
        initCopyLink();
        initCoffeeToggle();
        initExternalLinks();
        initSmoothScroll();
        initKonamiCode();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
