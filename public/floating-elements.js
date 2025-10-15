// Modern Floating Elements System for SigSec Website
class ModernFloatingElements {
    constructor() {
        this.elements = [];
        this.container = null;
        this.isEnabled = true;
        this.animationId = null;
        this.init();
    }

    init() {
        // Only initialize if user prefers motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isEnabled = false;
            return;
        }

        this.createContainer();
        this.createFloatingElements();
        this.bindEvents();
        this.animate();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'floating-elements-container';
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none';
        this.container.style.zIndex = '0';
        this.container.style.overflow = 'hidden';
        this.container.style.opacity = '0.6';
        
        document.body.appendChild(this.container);
    }

    createFloatingElements() {
        const elementCount = Math.min(12, Math.floor(window.innerWidth / 150));
        
        for (let i = 0; i < elementCount; i++) {
            this.createElement(i);
        }

        this.addAnimationStyles();
    }

    createElement(index) {
        const element = document.createElement('div');
        const size = Math.random() * 80 + 30;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const shape = Math.random();
        
        element.className = 'floating-element';
        element.style.position = 'absolute';
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        
        // Different shapes and styles
        if (shape < 0.3) {
            // Circle
            element.style.borderRadius = '50%';
            element.style.background = this.getGradient('circle');
        } else if (shape < 0.6) {
            // Square with rounded corners
            element.style.borderRadius = '20%';
            element.style.background = this.getGradient('square');
        } else if (shape < 0.8) {
            // Triangle (using CSS clip-path)
            element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            element.style.background = this.getGradient('triangle');
        } else {
            // Hexagon
            element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
            element.style.background = this.getGradient('hexagon');
        }
        
        // Add blur and animation
        element.style.filter = `blur(${Math.random() * 2 + 1}px)`;
        element.style.animation = `modernFloat${index % 4} ${Math.random() * 25 + 20}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 10}s`;
        
        // Store element data for potential interactions
        this.elements.push({
            element: element,
            originalX: x,
            originalY: y,
            size: size,
            speed: Math.random() * 0.5 + 0.2
        });
        
        this.container.appendChild(element);
    }

    getGradient(shape) {
        const gradients = {
            circle: [
                'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.05) 70%, transparent 100%)',
                'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 70%, transparent 100%)',
                'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 70%, transparent 100%)'
            ],
            square: [
                'linear-gradient(45deg, rgba(14, 165, 233, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
                'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
                'linear-gradient(225deg, rgba(16, 185, 129, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)'
            ],
            triangle: [
                'linear-gradient(60deg, rgba(14, 165, 233, 0.12) 0%, transparent 100%)',
                'linear-gradient(120deg, rgba(16, 185, 129, 0.12) 0%, transparent 100%)',
                'linear-gradient(180deg, rgba(99, 102, 241, 0.12) 0%, transparent 100%)'
            ],
            hexagon: [
                'conic-gradient(from 0deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1))',
                'conic-gradient(from 60deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1))',
                'conic-gradient(from 120deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1))'
            ]
        };
        
        const shapeGradients = gradients[shape];
        return shapeGradients[Math.floor(Math.random() * shapeGradients.length)];
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.id = 'floating-elements-styles';
        style.textContent = `
            @keyframes modernFloat0 {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
                }
                25% { 
                    transform: translateY(-30px) translateX(20px) rotate(90deg) scale(1.1);
                }
                50% { 
                    transform: translateY(-60px) translateX(0px) rotate(180deg) scale(0.9);
                }
                75% { 
                    transform: translateY(-30px) translateX(-20px) rotate(270deg) scale(1.1);
                }
            }
            
            @keyframes modernFloat1 {
                0%, 100% { 
                    transform: translateX(0px) translateY(0px) rotate(0deg) scale(1);
                }
                33% { 
                    transform: translateX(40px) translateY(-40px) rotate(120deg) scale(1.2);
                }
                66% { 
                    transform: translateX(-30px) translateY(-70px) rotate(240deg) scale(0.8);
                }
            }
            
            @keyframes modernFloat2 {
                0%, 100% { 
                    transform: translateY(0px) scale(1) rotate(0deg);
                }
                20% { 
                    transform: translateY(-20px) scale(1.1) rotate(72deg);
                }
                40% { 
                    transform: translateY(-50px) scale(0.9) rotate(144deg);
                }
                60% { 
                    transform: translateY(-80px) scale(1.2) rotate(216deg);
                }
                80% { 
                    transform: translateY(-40px) scale(0.95) rotate(288deg);
                }
            }
            
            @keyframes modernFloat3 {
                0%, 100% { 
                    transform: rotate(0deg) translateX(0px) translateY(0px) scale(1);
                }
                25% { 
                    transform: rotate(90deg) translateX(25px) translateY(-25px) scale(1.05);
                }
                50% { 
                    transform: rotate(180deg) translateX(0px) translateY(-50px) scale(0.95);
                }
                75% { 
                    transform: rotate(270deg) translateX(-25px) translateY(-25px) scale(1.05);
                }
            }
            
            .floating-element {
                transition: all 0.3s ease;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .floating-element {
                    animation: none !important;
                }
            }
        `;
        
        // Remove existing styles if any
        const existingStyles = document.getElementById('floating-elements-styles');
        if (existingStyles) {
            existingStyles.remove();
        }
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle scroll for parallax effect
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleResize() {
        if (this.container) {
            // Update container size
            this.container.style.width = '100%';
            this.container.style.height = '100%';
            
            // Reposition elements that are out of bounds
            this.elements.forEach(item => {
                const rect = item.element.getBoundingClientRect();
                if (rect.left > window.innerWidth || rect.top > window.innerHeight) {
                    item.element.style.left = Math.random() * window.innerWidth + 'px';
                    item.element.style.top = Math.random() * window.innerHeight + 'px';
                }
            });
        }
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollY / maxScroll;
        
        // Apply parallax effect to elements
        this.elements.forEach((item, index) => {
            const parallaxSpeed = (index % 3 + 1) * 0.5;
            const translateY = scrollY * parallaxSpeed;
            
            item.element.style.transform = `translateY(${translateY}px)`;
        });
    }

    pauseAnimations() {
        this.elements.forEach(item => {
            item.element.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        if (this.isEnabled) {
            this.elements.forEach(item => {
                item.element.style.animationPlayState = 'running';
            });
        }
    }

    animate() {
        if (!this.isEnabled) return;
        
        // This can be used for additional real-time animations
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        const styles = document.getElementById('floating-elements-styles');
        if (styles) {
            styles.remove();
        }
        
        this.elements = [];
    }
}

// Initialize floating elements system
let floatingElements;

function initFloatingElements() {
    // Only create on larger screens and if motion is preferred
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        floatingElements = new ModernFloatingElements();
    }
}

function destroyFloatingElements() {
    if (floatingElements) {
        floatingElements.destroy();
        floatingElements = null;
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingElements);
} else {
    initFloatingElements();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && floatingElements) {
        destroyFloatingElements();
    } else if (window.innerWidth > 768 && !floatingElements) {
        initFloatingElements();
    }
});

// Export for potential cleanup
window.floatingElements = floatingElements;