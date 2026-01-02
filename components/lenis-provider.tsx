"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ✅ Slower, smoother scroll configuration
    const lenis = new Lenis({
      duration: 4.0, // increase for slower scrolling (default ~1.2)
      easing: (t) => 1 - Math.pow(1 - t, 3), // softer, more natural easing
      direction: "vertical",
      gestureDirection: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2.0, // reduce sensitivity a bit
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
