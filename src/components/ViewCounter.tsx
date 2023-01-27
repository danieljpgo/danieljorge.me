"use client";
import { useEffect, useState } from "react";

type ViewCounterProps = {
  slug: string;
};

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number>(1);
  console.log(process.env.NODE_ENV);
  console.log(slug);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    setViews(120);
    console.log("teste 1");
    // console.log();
    // const registerView = () =>
    //   fetch(`/api/views/${slug}`, {
    //     method: 'POST'
    //   });
    // registerView();
  }, []);

  return <span>{`${views ? views.toLocaleString() : "–––"}`}</span>;
}
