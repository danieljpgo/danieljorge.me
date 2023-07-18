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
    <div ref={ref} className="craft-spotilight" onMouseMove={handleMouseMove}>
      Spotlight Effect Demo
    </div>
  );
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
