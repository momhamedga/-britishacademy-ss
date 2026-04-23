"use client"
import { useState, useEffect, Suspense } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileHero from "./hero/MobileHero";
import DesktopHero from "./hero/DesktopHero";


export default function HeroSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  // ده بيضمن إن الكود مش هيشتغل إلا بعد ما الـ Component يحصل له Mount في المتصفح
  useEffect(() => {
    setMounted(true);
  }, []);

  // بنعرض Skeleton أو Loading بسيط لحد ما الجهاز يتحدد
  if (!mounted) {
    return <div className="h-dvh w-full bg-navy" />;
  }

  return (
    <Suspense fallback={<div className="h-dvh w-full " />}>
      {isDesktop ? <DesktopHero /> : <MobileHero />}
    </Suspense>
  );
}