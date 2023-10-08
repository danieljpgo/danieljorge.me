"use client";
import { ElementRef, useRef } from "react";

export function Spotlight() {
  const ref = useRef<ElementRef<"div">>(null);

  function handleMouseMove(event: React.MouseEvent<ElementRef<"div">>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--x", String(event.clientX - x));
    ref.current.style.setProperty("--y", String(event.clientY - y));
  }

  return (
    <div ref={ref} className="spotlight" onMouseMove={handleMouseMove}>
      <h2 className="text-base font-semibold leading-7 text-sky-500">
        Lorem ipsum
      </h2>
      <p className="flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          $79
        </span>
        <span className="text-sm text-gray-400 md:text-base">lorem ipsum</span>
      </p>
      <p className="pt-2 text-base leading-7 text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id
        vehicula sapien.
      </p>
    </div>
  );
}

export function SpotlightFirst() {
  return <div className="spotlight-first" />;
}

export function SpotlightSecond() {
  return <div className="spotlight-first spotlight-second" />;
}

export function SpotlightThird() {
  const ref = useRef<ElementRef<"div">>(null);

  function handleMouseMove(event: React.MouseEvent<ElementRef<"div">>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--x", String(event.clientX - x));
    ref.current.style.setProperty("--y", String(event.clientY - y));
  }

  return (
    <div
      ref={ref}
      className="spotlight-first spotlight-second spotlight-third"
      onMouseMove={handleMouseMove}
    />
  );
}

export function SpotlightFourth() {
  const ref = useRef<ElementRef<"div">>(null);

  function handleMouseMove(event: React.MouseEvent<ElementRef<"div">>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--x", String(event.clientX - x));
    ref.current.style.setProperty("--y", String(event.clientY - y));
  }

  return (
    <div
      ref={ref}
      className="spotlight-first spotlight-second spotlight-third spotlight-fourth"
      onMouseMove={handleMouseMove}
    />
  );
}

/* <div
      ref={ref}
      className={cn(
        "group relative z-[1] grid max-w-sm gap-1 rounded-xl border border-white/10 bg-[#181E33] px-8 py-10 shadow-2xl md:py-12",
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[-1] rounded-xl opacity-0 transition-[background-color,opacity] duration-[0.3s] ease-in-out content-[''] group-hover:opacity-100"
        style={{
          background: `radial-gradient(
          550px circle at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
          rgba(130, 147, 248, 0.25),
          transparent 80%
        );`,
        }}
      /> */
