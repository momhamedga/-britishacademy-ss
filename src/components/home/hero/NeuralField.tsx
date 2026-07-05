"use client";

import { useEffect, useRef } from "react";
import { NEURAL_CONFIG } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let frameId = 0;
    let paused = document.hidden;

    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const rect = canvasEl.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = (width * height) / 14000;
      const count = Math.min(NEURAL_CONFIG.particleCount, Math.round(density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * NEURAL_CONFIG.velocity,
        vy: (Math.random() - 0.5) * NEURAL_CONFIG.velocity,
      }));
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }
    function onVisibility() {
      paused = document.hidden;
      if (!paused) frameId = requestAnimationFrame(tick);
    }

    function tick() {
      if (paused) return;
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        // انجذاب خفيف نحو المؤشر + دفع بسيط لمنع التكدس فوقه تمامًا
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < NEURAL_CONFIG.mouseRadius && dist > 0.01) {
            const force = (1 - dist / NEURAL_CONFIG.mouseRadius) * 0.03;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      ctx!.fillStyle = NEURAL_CONFIG.colors.node;
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, NEURAL_CONFIG.particleSize, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < NEURAL_CONFIG.connectionDistance) {
            const alpha = (1 - dist / NEURAL_CONFIG.connectionDistance) * 0.35;
            ctx!.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        if (pointer.active) {
          const dist = Math.hypot(nodes[i].x - pointer.x, nodes[i].y - pointer.y);
          if (dist < NEURAL_CONFIG.mouseRadius) {
            const alpha = (1 - dist / NEURAL_CONFIG.mouseRadius) * 0.5;
            ctx!.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(pointer.x, pointer.y);
            ctx!.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(tick);
    }

    resize();

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      frameId = requestAnimationFrame(tick);
    } else {
      // إطار ثابت واحد فقط بدون أنيميشن لمن يفضل تقليل الحركة
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = NEURAL_CONFIG.colors.node;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, NEURAL_CONFIG.particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
      aria-hidden="true"
    />
  );
}
