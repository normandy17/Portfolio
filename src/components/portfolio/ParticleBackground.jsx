import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const mouse = { x: null, y: null };

    const getColor = () =>
      document.documentElement.classList.contains("dark")
        ? "251, 191, 36" // amber for dark
        : "120, 113, 108"; // warm gray for light

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.6,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getColor();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // gentle attraction toward the cursor when nearby
        if (mouse.x !== null) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160 && mdist > 0) {
            p.x += (mdx / mdist) * 0.4;
            p.y += (mdy / mdist) * 0.4;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a})`;
        ctx.fill();
      });

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // lines from cursor to nearby particles
        if (mouse.x !== null) {
          const cdx = particles[i].x - mouse.x;
          const cdy = particles[i].y - mouse.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${0.25 * (1 - cdist / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}