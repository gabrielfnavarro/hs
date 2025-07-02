import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      life: number;
      maxLife: number;
    }> = [];

    const magicalOrbs: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
      hue: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 60 + 200,
          life: 0,
          maxLife: Math.random() * 200 + 100
        });
      }
    };

    const createMagicalOrbs = () => {
      for (let i = 0; i < 10; i++) {
        magicalOrbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 25 + 10,
          speed: Math.random() * 0.3 + 0.1,
          angle: Math.random() * Math.PI * 2,
          hue: Math.random() * 360,
          opacity: Math.random() * 0.2 + 0.05
        });
      }
    };

    const updateParticles = () => {
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life++;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Gentle pulsing effect
        particle.opacity = 0.3 + 0.2 * Math.sin(particle.life * 0.01);

        // Reset particle if it's too old
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 0;
        }
      });
    };

    const updateMagicalOrbs = () => {
      magicalOrbs.forEach(orb => {
        orb.angle += orb.speed * 0.005;
        orb.x += Math.cos(orb.angle) * orb.speed * 0.5;
        orb.y += Math.sin(orb.angle) * orb.speed * 0.5;

        // Wrap around screen
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Gentle pulsing opacity
        orb.opacity = 0.05 + 0.1 * Math.sin(Date.now() * 0.0005 + orb.x * 0.005);
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw magical orbs first (background)
      magicalOrbs.forEach(orb => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 60%, ${orb.opacity})`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 70%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Add subtle glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections between nearby particles (reduced distance)
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(220, 70%, 60%, ${0.1 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      updateMagicalOrbs();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    createMagicalOrbs();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default BackgroundAnimation;