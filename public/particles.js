// Particle System for SigSec Operations Portal
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.patchImage = null;
        this.init();
    }

    init() {
        this.loadPatchImage();
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    loadPatchImage() {
        this.patchImage = new Image();
        this.patchImage.onload = () => {
            console.log('Patch image loaded for particles');
        };
        this.patchImage.onerror = () => {
            console.log('Patch image failed to load, using fallback');
        };
        this.patchImage.src = 'public/images/hero-bg.jpg';
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.6';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 100000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 360 + 120, // Different sizes from 120-480 pixels
                opacity: Math.random() * 0.4 + 0.1,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed;
            
            // Update pulse
            particle.pulse += 0.01;
            
            // Bounce off edges
            if (particle.x < -particle.size || particle.x > this.canvas.width + particle.size) particle.vx *= -1;
            if (particle.y < -particle.size || particle.y > this.canvas.height + particle.size) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += (dx / distance) * force * 0.005;
                particle.vy += (dy / distance) * force * 0.005;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(-particle.size, Math.min(this.canvas.width + particle.size, particle.x));
            particle.y = Math.max(-particle.size, Math.min(this.canvas.height + particle.size, particle.y));
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw only patch particles - no connections
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            
            const currentSize = particle.size + Math.sin(particle.pulse) * 18;
            const currentOpacity = particle.opacity + Math.sin(particle.pulse) * 0.05;
            
            if (this.patchImage && this.patchImage.complete) {
                // Draw patch image
                this.ctx.globalAlpha = currentOpacity;
                this.ctx.drawImage(
                    this.patchImage,
                    -currentSize / 2,
                    -currentSize / 2,
                    currentSize,
                    currentSize
                );
            } else {
                // Fallback to circle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, currentSize / 2, 0, Math.PI * 2);
                this.ctx.fillStyle = '#aeae5a';
                this.ctx.globalAlpha = currentOpacity;
                this.ctx.fill();
                
                // Add glow effect
                this.ctx.shadowColor = '#aeae5a';
                this.ctx.shadowBlur = 10;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
            
            this.ctx.restore();
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
