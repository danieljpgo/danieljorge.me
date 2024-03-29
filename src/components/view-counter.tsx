"use client";
import { useEffect, useState } from "react";

type ViewCounterProps = {
  type: "counter" | "view";
  slug: string;
  initialValue?: number;
};

export function ViewCounter({
  slug,
  type = "view",
  initialValue = 0,
}: ViewCounterProps) {
  const [views, setViews] = useState<number>(initialValue);

  useEffect(() => {
    async function getView() {
      const response = await fetch(`/api/views/${slug}`, { method: "GET" });
      if (!response.ok) return;
      const data = await response.json();
      setViews(data.count);
    }
    async function registerView() {
      if (process.env.NODE_ENV !== "production") return;
      const response = await fetch(`/api/views/${slug}`, { method: "POST" });
      if (!response.ok) return;
      const data = await response.json();
      setViews(data.count);
    }

    if (type === "counter") {
      registerView();
      return;
    }
    if (type === "view") {
      getView();
      return;
    }
  }, [slug, type]);

  return (
    <>
      <span
        className="number-animation tabular-nums"
        style={{
          // @ts-expect-error:
          "--number": views ? views : 0,
        }}
      />
      <span className="sr-only">{views ? views.toLocaleString() : 0}</span>
    </>
  );
}
