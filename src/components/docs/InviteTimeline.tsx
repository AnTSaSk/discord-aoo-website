import { useEffect, useRef, useState } from "react";

interface Step {
  label: string;
}

interface InviteTimelineProps {
  steps: Step[];
}

export default function InviteTimeline({ steps }: InviteTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-8">
      {/* Horizontal layout (sm+) */}
      <div className="hidden sm:block">
        <div className="relative flex items-start justify-between">
          {/* Background line */}
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-muted" />
          {/* Animated progress line */}
          <div
            className="absolute left-0 top-4 h-0.5 bg-primary transition-all duration-1000 ease-out"
            style={{ width: visible ? "100%" : "0%" }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center"
              style={{
                width: `${100 / steps.length}%`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.4s ease ${0.2 + i * 0.15}s, transform 0.4s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                {i + 1}
              </div>
              <p className="mt-2 max-w-[140px] text-xs text-muted-foreground">{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical layout (mobile) */}
      <div className="block sm:hidden">
        <ol className="relative ml-4 list-none space-y-4 border-l-2 border-primary/20 pl-6">
          {steps.map((step, i) => (
            <li
              key={i}
              className="relative"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-8px)",
                transition: `opacity 0.4s ease ${0.2 + i * 0.15}s, transform 0.4s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="absolute -left-9 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{step.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
