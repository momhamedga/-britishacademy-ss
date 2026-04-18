"use client"
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import DesktopNavbar from "./nav/DesktopNavbar";
import MobileNavbar from "./nav/MobileNavbar";


export default function Navbar({ user, isGuest }: any) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null; // تجنب الـ Hydration error

  return isDesktop ? (
    <DesktopNavbar user={user} isGuest={isGuest} />
  ) : (
    <MobileNavbar user={user} isGuest={isGuest} />
  );
}