"use client";

import { useSyncExternalStore } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import DesktopNavbar from "./nav/DesktopNavbar";
import MobileNavbar from "./nav/MobileNavbar";

// ✅ دالات الـ Sync الاحترافية لضمان ثبات الـ UI
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Navbar({ user, isGuest }: any) {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isMounted) return null;

  return isDesktop ? (
    <DesktopNavbar user={user} isGuest={isGuest} />
  ) : (
    <MobileNavbar user={user} isGuest={isGuest} />
  );
}