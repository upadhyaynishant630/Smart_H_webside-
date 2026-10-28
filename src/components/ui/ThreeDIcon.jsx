import { cn } from "@/lib/utils";

const glyphs = {
  cloud: <path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.1 4.5 4.5 0 0 0 7 18Z" />,
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  ai: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      <path d="M10 2.8v3.7M14 2.8v3.7M10 17.5v3.7M14 17.5v3.7M2.8 10h3.7M2.8 14h3.7M17.5 10h3.7M17.5 14h3.7" />
      <path d="M10 14.5 12 9.5l2 5M10.7 13h2.6" />
    </>
  ),
  automation: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M11 7 6 16M13 7l5 9M7.2 18h9.6" />
    </>
  ),
  consult: (
    <>
      <path d="M4 5.5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.5v-3.5H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
      <path d="M7 10.5h6M7 13h3.5" />
      <path d="M20 9.5h.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H20v2.5L17 17.5" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6M5 12v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-6" />
    </>
  ),
  solar: (
    <>
      <circle cx="17.5" cy="5.5" r="2.6" />
      <path d="M17.5 1.4v1.1M17.5 8.5v1.1M13.4 5.5h-1.1M21.6 5.5h1M14.6 2.6l-.8-.8M20.4 8.4l.8.8" />
      <path d="m3.2 13.2 12.1 0 2.1 7H1.2l2-7Z" />
      <path d="m7 13.2-1.1 7M11 13.2l.2 7M2.1 16.7h14.2" />
    </>
  ),
  ev: (
    <>
      <path d="m4 14 1.7-4.5A2.5 2.5 0 0 1 8 8h6.8a2.5 2.5 0 0 1 2.3 1.5L19 14" />
      <path d="M3.5 14h16A1.5 1.5 0 0 1 21 15.5V18h-2.5M5.5 18H3v-2.5A1.5 1.5 0 0 1 4.5 14" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="16.5" cy="18" r="1.8" />
      <path d="m11.8 10.4-1.4 3h2l-1.1 2.6 3-3.8h-2l1-1.8Z" />
    </>
  ),
  infrastructure: (
    <>
      <rect x="4" y="3.5" width="16" height="6" rx="1.5" />
      <rect x="4" y="14.5" width="16" height="6" rx="1.5" />
      <path d="M7.5 6.5h.01M7.5 17.5h.01M11 6.5h5M11 17.5h5M12 9.5v5" />
    </>
  ),
};

/** Dimensional brand icon: sculpted block + light sweep + red signal node. */
export function ThreeDIcon({
  type,
  variant = "cobalt",
  size = 64,
  animated = false,
  className,
  ariaLabel,
}) {
  return (
    <span
      className={cn("icon3d shrink-0", animated && "animate-drift", className)}
      style={{ width: size, height: size }}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <span className={cn("icon3d-block", variant === "night" && "icon3d-night")}>
        <svg
          viewBox="0 0 24 24"
          width={size * 0.5}
          height={size * 0.5}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 text-primary-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]"
        >
          {glyphs[type]}
        </svg>
        <span className="absolute right-[16%] top-[16%] h-[9%] w-[9%] rounded-full bg-signal shadow-[0_0_10px_var(--signal)]" />
      </span>
    </span>
  );
}
