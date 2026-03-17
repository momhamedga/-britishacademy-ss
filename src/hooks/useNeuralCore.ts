"use client"
import { useEffect } from "react";
import { NEURAL_CONFIG } from "@/lib/constants";

export function useNeuralCore(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // تحسين الأداء: استخدام contextAttributes لتقليل استهلاك الذاكرة
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;
    
    // الأوبتمايزر العبقري الخاص بك (مُعدل ليناسب شاشات 2026)
    const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
    const optimizedCount = cores > 8 
      ? NEURAL_CONFIG.particleCount 
      : Math.floor(NEURAL_CONFIG.particleCount * (cores / 10));
    
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const particles = Array.from({ length: optimizedCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * NEURAL_CONFIG.velocity * 0.5,
      vy: (Math.random() - 0.5) * NEURAL_CONFIG.velocity * 0.5,
      size: Math.random() * 1.5 + 0.5,
      flickerOffset: Math.random() * 100, // لإعطاء كل نقطة إيقاع وميض مختلف
    }));

    const draw = () => {
      // 1. خلفية سينمائية مع تأثير Trail خفيف
      ctx.fillStyle = "#000B21"; // Academy Deep Navy
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // 2. إضافة Tech-Grid (اختياري لكنه سينيماي جداً)
      drawTechGrid(ctx);

      tick += 0.01;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // تفاعل الموتس مع الجزيئات (تأثير مغناطيسي ناعم)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.hypot(dx, dy);

        if (distToMouse < 250) {
          const force = (250 - distToMouse) / 250;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }

        // حدود الشاشة
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        // 3. رسم النقاط بوميض (Flicker) يحاكي الأجهزة الإلكترونية
        const flicker = Math.sin(tick * 5 + p.flickerOffset) > 0 ? 1 : 0.3;
        ctx.fillStyle = `rgba(212, 175, 55, ${0.4 * flicker})`; // Academy Gold
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // 4. رسم الروابط العصبية بذكاء
        const step = cores < 6 ? 2 : 1; 
        for (let j = i + step; j < particles.length; j += step) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // 5. إضافة Scanlines لتحقيق المظهر السينمائي (CRT Effect)
      drawScanlines(ctx);

      animationFrameId = requestAnimationFrame(draw);
    };

    // وظيفة رسم شبكة تقنية خفيفة
    const drawTechGrid = (context: CanvasRenderingContext2D) => {
        context.strokeStyle = "rgba(212, 175, 55, 0.03)";
        context.lineWidth = 0.5;
        const spacing = 50;
        for (let x = 0; x < window.innerWidth; x += spacing) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, window.innerHeight);
            context.stroke();
        }
        for (let y = 0; y < window.innerHeight; y += spacing) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(window.innerWidth, y);
            context.stroke();
        }
    };

    // وظيفة رسم خطوط المسح السينمائية
    const drawScanlines = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "rgba(0, 11, 33, 0.1)";
        for (let y = 0; y < window.innerHeight; y += 4) {
            context.fillRect(0, y, window.innerWidth, 1);
        }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
}