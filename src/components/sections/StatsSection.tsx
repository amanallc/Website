'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '★', label: 'Average Rating' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const duration = 1800;
        const step = value / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-gold md:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-charcoal py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
