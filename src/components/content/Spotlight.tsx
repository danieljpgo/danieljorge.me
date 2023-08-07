"use client";
import { useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--_x", String(event.clientX - x));
    ref.current.style.setProperty("--_y", String(event.clientY - y));
  }

  return (
    <div ref={ref} className="craft-spotilight" onMouseMove={handleMouseMove} />
  );
}

export function SpotlightFirst() {
  return <div className="craft-spotilight-first" />;
}

export function SpotlightSecond() {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--_x", String(event.clientX - x));
    ref.current.style.setProperty("--_y", String(event.clientY - y));
  }

  return (
    <div
      ref={ref}
      className="craft-spotilight-second"
      onMouseMove={handleMouseMove}
    />
  );
}

export function SpotlightThird() {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { x, y } = event.currentTarget.getBoundingClientRect();

    ref.current.style.setProperty("--_x", String(event.clientX - x));
    ref.current.style.setProperty("--_y", String(event.clientY - y));
  }

  return (
    <div
      ref={ref}
      className="craft-spotilight-third"
      onMouseMove={handleMouseMove}
    />
  );
}
