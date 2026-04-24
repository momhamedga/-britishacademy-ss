"use client";

import { useSyncExternalStore, Suspense } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileHero from "./hero/MobileHero";
import DesktopHero from "./hero/DesktopHero";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HeroSection() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isMounted) {
    return <div className="h-dvh w-full bg-navy" />;
  }

  return (
    <Suspense fallback={<div className="h-dvh w-full bg-navy" />}>
      {isDesktop ? <DesktopHero /> : <MobileHero />}
    </Suspense>
  );
}