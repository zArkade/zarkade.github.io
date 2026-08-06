"use client";

import { useEffect, useState } from "react";

const WORKER_URL = "https://zarkade-visitor-counter.zarkade.workers.dev/";

export function VisitorCounter({ label }: { label: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${WORKER_URL}/total`)
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-xs text-muted">
      {label}: {count.toLocaleString()}
    </span>
  );
}