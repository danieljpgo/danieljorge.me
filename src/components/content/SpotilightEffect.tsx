"use client";
import { useRef } from "react";

type SpotlightEffectProps = {};

export default function SpotlightEffect(props: SpotlightEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--x", String(event.clientX - x));
    ref.current.style.setProperty("--y", String(event.clientY - y));
  }

  return (
    <div
      ref={ref}
      className="craft-spotilight"
      // className="border-gray-100 bg-black relative after:content-[''] after:absolute after:inset-0 after:z-10 after:opacity-0 af"
      onMouseMove={handleMouseMove}
    >
      SpotlightEffect Demo
      {/* <div /> */}
    </div>
  );
}
