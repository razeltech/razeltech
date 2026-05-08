import { useEffect, useRef, memo } from 'react';
import './DotField.css';

const DotField = memo(({
  dotRadius = 1.0,
  dotSpacing = 16,
  cursorRadius = 400,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 60,
  glowRadius = 250,
  glowColor = '#00f3ff',
  mouseX: externalMouseX,
  mouseY: externalMouseY,
  waveAmplitude = 0,
  waveFrequency = 0,
  sparkle = false,
  sparkleSpeed = 1,
  className = ''
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const glowRef = useRef(null);
  const glowIdRef = useRef(`glow-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const initDots = () => {
      const { width, height } = canvas;
      const dots = [];
      for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
      dotsRef.current = dots;
    };

    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initDots();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouseX = externalMouseX !== undefined ? externalMouseX : mouseRef.current.x;
      const mouseY = externalMouseY !== undefined ? externalMouseY : mouseRef.current.y;

      dotsRef.current.forEach(dot => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorRadius) {
          const force = (cursorRadius - distance) / cursorRadius;
          const angle = Math.atan2(dy, dx);
          
          if (bulgeOnly) {
            const bulge = Math.sin(force * Math.PI) * bulgeStrength;
            dot.x = dot.baseX - Math.cos(angle) * bulge;
            dot.y = dot.baseY - Math.sin(angle) * bulge;
          } else {
            const moveX = Math.cos(angle) * force * cursorForce * 10;
            const moveY = Math.sin(angle) * force * cursorForce * 10;
            dot.vx += moveX;
            dot.vy += moveY;
          }
        }

        if (!bulgeOnly) {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
          dot.x += dot.vx + (dot.baseX - dot.x) * 0.1;
          dot.y += dot.vy + (dot.baseY - dot.y) * 0.1;
        }

        if (waveAmplitude > 0) {
          dot.y += Math.sin(time / 1000 * waveFrequency + dot.x / 100) * waveAmplitude;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f3ff';
        
        if (sparkle) {
          ctx.globalAlpha = 0.5 + Math.sin(time / 200 * sparkleSpeed + dot.phase) * 0.5;
        } else {
          ctx.globalAlpha = 1;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, waveAmplitude, waveFrequency, sparkle, sparkleSpeed]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = externalMouseX !== undefined ? externalMouseX : e.clientX - rect.left;
    const y = externalMouseY !== undefined ? externalMouseY : e.clientY - rect.top;
    mouseRef.current = { x, y };
    
    if (glowRef.current) {
      glowRef.current.setAttribute('cx', x);
      glowRef.current.setAttribute('cy', y);
      glowRef.current.style.opacity = 0.4;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    if (glowRef.current) {
      glowRef.current.style.opacity = 0;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`dot-field-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} />
      <svg className="dot-field-glow-svg">
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
