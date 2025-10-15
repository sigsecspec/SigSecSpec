// Modern Particle System for SigSec Website
class ModernParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
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

        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.4';
        this.canvas.id = 'particle-canvas';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 12000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                color: this.getRandomColor(),
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                trail: []
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(14, 165, 233, 0.7)',   // Primary blue
            'rgba(16, 185, 129, 0.7)',   // Accent green
            'rgba(99, 102, 241, 0.6)',   // Purple
            'rgba(6, 182, 212, 0.6)',    // Cyan
            'rgba(139, 92, 246, 0.5)'    // Violet
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Pause animation when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            } else if (this.isEnabled) {
                this.animate();
            }
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Update pulse
            particle.pulse += particle.pulseSpeed;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const force = (120 - distance) / 120;
                const angle = Math.atan2(dy, dx);
                particle.vx += Math.cos(angle) * force * 0.02;
                particle.vy += Math.sin(angle) * force * 0.02;
            }
            
            // Limit velocity
            const maxVelocity = 2;
            const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (velocity > maxVelocity) {
                particle.vx = (particle.vx / velocity) * maxVelocity;
                particle.vy = (particle.vy / velocity) * maxVelocity;
            }
            
            // Add to trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 5) {
                particle.trail.shift();
            }
        });
    }

    findConnections() {
        this.connections = [];
        const maxDistance = 120;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        particleA: this.particles[i],
                        particleB: this.particles[j],
                        distance: distance,
                        opacity: (maxDistance - distance) / maxDistance
                    });
                }
            }
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.connections.forEach(connection => {
            const opacity = connection.opacity * 0.3;
            this.ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(connection.particleA.x, connection.particleA.y);
            this.ctx.lineTo(connection.particleB.x, connection.particleB.y);
            this.ctx.stroke();
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            const currentSize = particle.size + Math.sin(particle.pulse) * 0.5;
            const currentOpacity = particle.opacity + Math.sin(particle.pulse) * 0.1;
            
            // Draw particle trail
            particle.trail.forEach((point, index) => {
                const trailOpacity = (index / particle.trail.length) * currentOpacity * 0.3;
                const trailSize = currentSize * (index / particle.trail.length) * 0.5;
                
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, `${trailOpacity})`);
                this.ctx.fill();
            });
            
            // Draw main particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, `${currentOpacity})`);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    animate() {
        if (!this.isEnabled) return;
        
        this.updateParticles();
        this.findConnections();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize particle system when DOM is loaded
let particleSystem;

function initParticles() {
    // Only create particles on larger screens
    if (window.innerWidth > 768) {
        particleSystem = new ModernParticleSystem();
    }
}

function destroyParticles() {
    if (particleSystem) {
        particleSystem.destroy();
        particleSystem = null;
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && particleSystem) {
        destroyParticles();
    } else if (window.innerWidth > 768 && !particleSystem) {
        initParticles();
    }
});

// Export for potential cleanup
window.particleSystem = particleSystem;