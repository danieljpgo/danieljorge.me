"use client";
import { useEffect, useState } from "react";

type ViewCounterProps = {
  slug: string;
};

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0);

  console.log("ViewCounter render");

  useEffect(() => {
    async function getView() {
      console.log("getView");
      const response = await fetch(`/api/views/${slug}`, { method: "GET" });
      if (!response.ok) return;

      console.log("getView done");

      const data = await response.json();
      setViews(data.count);
    }

    getView();
  }, [slug]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    async function registerView() {
      const response = await fetch(`/api/views/${slug}`, { method: "POST" });
      console.log("registerView");
      if (!response.ok) return;

      console.log("done");
      const data = await response.json();
      setViews(data.count);
    }

    registerView();
  }, [slug]);

  return <span>{`${views ? views.toLocaleString() : "–––"}`}</span>;
}

export function View({ slug }: ViewCounterProps) {
  console.log("View render");

  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    async function getView() {
      console.log("getView");
      const response = await fetch(`/api/views/${slug}`, { method: "GET" });
      if (!response.ok) return;

      console.log("getView sucesso");
      const data = await response.json();
      setViews(data.count);
    }

    getView();
  }, [slug]);

  return <span>{`${views ? views.toLocaleString() : "–––"}`}</span>;
}
