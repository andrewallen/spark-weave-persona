
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
}

const ParticleGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasSizeRef.current = { width: window.innerWidth, height: window.innerHeight };
      initParticles();
    };

    const initParticles = () => {
      const gridSize = 30;
      const numColumns = Math.ceil(canvasSizeRef.current.width / gridSize);
      const numRows = Math.ceil(canvasSizeRef.current.height / gridSize);
      
      const particles: Particle[] = [];
      
      for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          const brightness = Math.random() * 0.5 + 0.5; // 0.5 to 1
          const colorValue = Math.floor(brightness * 255);
          const size = Math.random() * 2 + 1; // 1 to 3
          
          particles.push({
            x,
            y,
            size,
            color: `rgba(79, 255, 192, ${brightness * 0.5})`,
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
            force: 0,
            angle: 0,
            distance: 0
          });
        }
      }
      
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;
      
      particlesRef.current.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 8;
          const angle = Math.atan2(dy, dx);
          
          particle.vx += -Math.cos(angle) * force;
          particle.vy += -Math.sin(angle) * force;
        }
        
        // Spring force to bring particles back to original position
        particle.vx += (particle.originalX - particle.x) * 0.03;
        particle.vy += (particle.originalY - particle.y) * 0.03;
        
        // Friction
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default ParticleGrid;
