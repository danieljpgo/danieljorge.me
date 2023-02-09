"use client";
import { useEffect, useState } from "react";

type ViewsProps = {
  type: "counter" | "view";
  slug: string;
};

export default function Views({ slug, type = "view" }: ViewsProps) {
  const [views, setViews] = useState<number>(0);

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

  return <>{views ? views.toLocaleString() : "–––"}</>;
}
