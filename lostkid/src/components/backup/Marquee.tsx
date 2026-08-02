"use client";

interface MarqueeItem {
  text: string;
  icon?: string;
}

interface MarqueeProps {
  items: MarqueeItem[];
  speed?: number; // seconds for one full pass
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  dotClassName?: string;
}

export default function Marquee({
  items,
  speed = 28,
  reverse = false,
  className = "bg-brand-brown text-brand-cream",
  itemClassName = "text-sm font-medium tracking-widest uppercase",
  dotClassName = "bg-brand-cream/40",
}: MarqueeProps) {
  // Triple the items so the seamless -50% translateX loop always stays full-width
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`py-3 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-track${reverse ? " marquee-track--reverse" : ""}`}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-3 px-5 shrink-0 whitespace-nowrap ${itemClassName}`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${dotClassName}`}
            />
            {item.icon && <span>{item.icon}</span>}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
