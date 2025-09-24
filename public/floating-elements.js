// Floating Elements System for SigSec Operations Portal
class FloatingElements {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.createFloatingShapes();
        this.animate();
    }

    createFloatingShapes() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '-1';
        container.style.overflow = 'hidden';
        
        document.body.appendChild(container);

        // Create floating geometric shapes
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 60 + 20;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            shape.style.position = 'absolute';
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.left = x + 'px';
            shape.style.top = y + 'px';
            shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            shape.style.background = `linear-gradient(45deg, 
                rgba(16, 185, 129, ${Math.random() * 0.1 + 0.05}), 
                rgba(107, 114, 128, ${Math.random() * 0.1 + 0.05}))`;
            shape.style.filter = 'blur(1px)';
            shape.style.animation = `float${i % 3} ${Math.random() * 20 + 15}s ease-in-out infinite`;
            
            container.appendChild(shape);
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float0 {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-20px) rotate(90deg); }
                50% { transform: translateY(-40px) rotate(180deg); }
                75% { transform: translateY(-20px) rotate(270deg); }
            }
            
            @keyframes float1 {
                0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
                33% { transform: translateX(30px) translateY(-30px) rotate(120deg); }
                66% { transform: translateX(-20px) translateY(-50px) rotate(240deg); }
            }
            
            @keyframes float2 {
                0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
                50% { transform: translateY(-60px) scale(1.2) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }

    animate() {
        // This method can be expanded for more complex animations
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize floating elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FloatingElements();
});
