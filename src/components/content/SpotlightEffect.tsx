"use client";
import { useRef } from "react";

export function SpotlightEffect() {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--x", String(event.clientX - x));
    ref.current.style.setProperty("--y", String(event.clientY - y));
  }

  return (
    <div ref={ref} className="craft-spotilight" onMouseMove={handleMouseMove}>
      Spotlight Effect Demo
    </div>
  );
}

export function SpotlightEffectFirst() {
  return <div>Spotlight Effect 1</div>;
}

export function SpotlightEffectSecond() {
  return <div>Spotlight Effect 2</div>;
}

// useEffect(() => {
//   const mouseMoveEvent = (e: MouseEvent) => {
//     if (!ref.current) return;
//     const { x, y } = ref.current.getBoundingClientRect();
//     ref.current.style.setProperty("--x", String(e.clientX - x));
//     ref.current.style.setProperty("--y", String(e.clientY - y));
//   };

//   if (!ref.current) return;

//   const newref = ref.current;
//   newref.addEventListener("mousemove", mouseMoveEvent);
//   return () => newref.removeEventListener("mousemove", mouseMoveEvent);
// }, []);
