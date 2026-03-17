"use client"
import { useNeuralCore } from "@/hooks/useNeuralCore";
import { useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // استدعاء الهوك العبقري بتاعك
  useNeuralCore(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 w-full h-full pointer-events-none"
      style={{ background: "#020617" }} // لون أساسي لضمان عدم حدوث وميض أبيض
    />
  );
}