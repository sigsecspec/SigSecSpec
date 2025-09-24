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
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 50000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 120 + 40, // Different sizes from 40-160 pixels
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
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed;
            
            // Update pulse
            particle.pulse += 0.01;
            
            // Collision detection with other particles
            for (let i = index + 1; i < this.particles.length; i++) {
                const otherParticle = this.particles[i];
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (particle.size + otherParticle.size) / 2;
                
                if (distance < minDistance && distance > 0) {
                    // Calculate collision normal (unit vector from other to current particle)
                    const nx = dx / distance;
                    const ny = dy / distance;
                    
                    // Separate particles to prevent overlap
                    const overlap = minDistance - distance;
                    const separationX = nx * overlap * 0.5;
                    const separationY = ny * overlap * 0.5;
                    
                    particle.x += separationX;
                    particle.y += separationY;
                    otherParticle.x -= separationX;
                    otherParticle.y -= separationY;
                    
                    // Calculate relative velocity
                    const relativeVx = particle.vx - otherParticle.vx;
                    const relativeVy = particle.vy - otherParticle.vy;
                    
                    // Calculate relative velocity in collision normal direction
                    const speed = relativeVx * nx + relativeVy * ny;
                    
                    // Do not resolve if velocities are separating
                    if (speed > 0) continue;
                    
                    // Calculate restitution (bounce factor)
                    const restitution = 0.8;
                    
                    // Calculate impulse scalar
                    const impulse = -(1 + restitution) * speed;
                    
                    // Apply impulse to velocities
                    const impulseX = impulse * nx;
                    const impulseY = impulse * ny;
                    
                    particle.vx += impulseX;
                    particle.vy += impulseY;
                    otherParticle.vx -= impulseX;
                    otherParticle.vy -= impulseY;
                }
            }
            
            // Bounce off edges with energy loss
            const edgeRestitution = 0.9;
            
            if (particle.x < particle.size / 2) {
                particle.x = particle.size / 2;
                particle.vx = Math.abs(particle.vx) * edgeRestitution;
            } else if (particle.x > this.canvas.width - particle.size / 2) {
                particle.x = this.canvas.width - particle.size / 2;
                particle.vx = -Math.abs(particle.vx) * edgeRestitution;
            }
            
            if (particle.y < particle.size / 2) {
                particle.y = particle.size / 2;
                particle.vy = Math.abs(particle.vy) * edgeRestitution;
            } else if (particle.y > this.canvas.height - particle.size / 2) {
                particle.y = this.canvas.height - particle.size / 2;
                particle.vy = -Math.abs(particle.vy) * edgeRestitution;
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += (dx / distance) * force * 0.005;
                particle.vy += (dy / distance) * force * 0.005;
            }
            
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw only patch particles - no connections
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            
            const currentSize = particle.size + Math.sin(particle.pulse) * 6;
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
