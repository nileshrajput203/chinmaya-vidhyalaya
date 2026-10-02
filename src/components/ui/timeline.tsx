// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

export type Month = keyof typeof monthOrder | (string & {});

export type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  content: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  topData?: JourneyItem[];
  bottomData?: JourneyItem[];
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "2020-march",
    year: "2020",
    month: "March",
    content: "Signal research turns scattered notes into a clear product thesis",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    content: "Founding release ships with the first live customer journeys",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    content: "Automation layer connects insight, publishing, and sales motion",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    content: "New markets open with localized launches and faster onboarding",
  },
];

const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    content: "Prototype sprint validates the experience with real operators",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    content: "Community feedback reshapes the roadmap into sharper releases",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    content: "Companion mobile workflows make the timeline travel-ready",
  },
];

export default function Timeline({
  title = "Product Storyline",
  periodLabel = "2020 — 2026",
  textColor = "var(--color-foreground, #0f172a)",
  mutedTextColor = "var(--color-muted-foreground, #64748b)",
  activeColor = "#ff5f00",
  backgroundColor = "var(--color-background, #ffffff)",
  imageUrl = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "School Historic Campus",
  topData,
  bottomData,
}: TimelineProps) {
  const topJourneyData = topData ?? defaultTopJourneyData;
  const bottomJourneyData = bottomData ?? defaultBottomJourneyData;

  const allJourneyItems: JourneyItem[] = [
    ...topJourneyData,
    ...bottomJourneyData,
  ].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (!isNaN(yearDiff) && yearDiff !== 0) return yearDiff;
    const mA = (monthOrder as Record<string, number>)[a.month] || 0;
    const mB = (monthOrder as Record<string, number>)[b.month] || 0;
    return mA - mB;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;
    const wholeSlider = wholeSliderRef.current;
    const lineContainer = lineContainerRef.current;

    if (!section || !wholeSlider || !lineContainer) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -66 : -72;
    const totalDuration = 100;
    // The line finishes drawing at 82% of total scrub — giving 18% "dwell" time
    // where everything stays pinned and visible before unpinning.
    const lineTravelDuration = 82;

    // 1. Reduced Motion handling
    if (reducedMotion) {
      gsap.set(".journey-line", { width: "98%" });
      allJourneyItems.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, y: 0 });
        gsap.set(`.description-${item.id}`, { opacity: 1, y: 0 });
      });
      return;
    }

    // 2. Strict initial setup: hide all stems, dots, and text
    topJourneyData.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(`.jd-${item.id}`, { scale: 0, transformOrigin: "center center" });
      gsap.set(`.title-${item.id}`, { opacity: 0, y: 18 });
      gsap.set(`.description-${item.id}`, { opacity: 0, y: 18 });
    });

    bottomJourneyData.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(`.jd-${item.id}`, { scale: 0, transformOrigin: "center center" });
      gsap.set(`.title-${item.id}`, { opacity: 0, y: -18 });
      gsap.set(`.description-${item.id}`, { opacity: 0, y: -18 });
    });

    gsap.set(".journey-line", { width: "0%" });

    // 3. Single synchronized Master GSAP Timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isMobile ? "85% bottom" : "90% bottom",
        scrub: 1,
      },
      defaults: {
        ease: "none",
      },
    });

    // A. Track translates sideways horizontally
    masterTl.fromTo(
      wholeSlider,
      { xPercent: 0 },
      { xPercent: slidePercent, duration: totalDuration, ease: "none" },
      0
    );

    // B. Horizontal orange line draws from left to right
    masterTl.fromTo(
      ".journey-line",
      { width: "0%" },
      { width: "98%", duration: lineTravelDuration, ease: "none" },
      0
    );

    // C. Calculate ACCURATE milestone positions from layout geometry.
    //    The track consists of: [image 26vw] [gap 5vw] [lineContainer fills rest].
    //    Top row: [title column 18vw] then items at gap-x-[26vw] with w-[26vw] each.
    //    Bottom row: [period column 18vw] then ml-[13vw] then items at gap-x-[26vw].
    //    Each stem is at the left edge of its item div.
    //    We compute the ratio of each stem's X position within the lineContainer width.
    const topCount = topJourneyData.length;
    const bottomCount = bottomJourneyData.length;

    // Approximate the lineContainer total content width in vw units:
    // Top row: 18 (title) + topCount * 26 (item widths) + (topCount - 1) * 26 (gaps) = 18 + topCount*52 - 26
    // But items are absolutely positioned within the flex, so the stem left edge of item i is at:
    //   topStemX(i) = 18 + i * (26 + 26)   [title width + i * (item width + gap)]
    // For bottom row, stems start further right:
    //   bottomStemX(i) = 18 + 13 + i * (26 + 26)   [title + ml offset + i * (item width + gap)]
    // The total visual width of the lineContainer track is roughly:
    const topLastStem = 18 + (topCount - 1) * 52;
    const bottomLastStem = 18 + 13 + (bottomCount - 1) * 52;
    const trackExtent = Math.max(topLastStem, bottomLastStem) + 26; // Add one more item width

    // D. For each milestone, compute its arrival ratio and schedule animations
    allJourneyItems.forEach((item) => {
      const isTop = topJourneyData.some((t) => t.id === item.id);
      let stemX: number;

      if (isTop) {
        const idx = topJourneyData.findIndex((t) => t.id === item.id);
        stemX = 18 + idx * 52;
      } else {
        const idx = bottomJourneyData.findIndex((b) => b.id === item.id);
        stemX = 18 + 13 + idx * 52;
      }

      // Ratio along the track where this stem sits (0 → 1)
      const ratio = Math.max(0.05, Math.min(0.95, stemX / trackExtent));

      // The exact playhead time when the horizontal line tip reaches this stem:
      const arrivalTime = ratio * lineTravelDuration;

      // 1. Stem grows from the horizontal line
      masterTl.to(
        `.jl-${item.id}`,
        { scaleY: 1, duration: 3, ease: "power2.out" },
        arrivalTime
      );

      // 2. Dot pops at the tip
      masterTl.to(
        `.jd-${item.id}`,
        { scale: 1, duration: 2.5, ease: "back.out(2)" },
        arrivalTime + 1
      );

      // 3. Title fades in
      masterTl.to(
        `.title-${item.id}`,
        { opacity: 1, y: 0, duration: 3, ease: "power2.out" },
        arrivalTime + 1.4
      );

      // 4. Description fades in
      masterTl.to(
        `.description-${item.id}`,
        { opacity: 1, y: 0, duration: 3, ease: "power2.out" },
        arrivalTime + 2
      );
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [reducedMotion, topJourneyData, bottomJourneyData], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[280vw] max-[600px]:h-[450vh] w-full relative"
      style={sectionStyle}
    >
      <div className="h-screen w-full sticky top-0 overflow-hidden flex items-center max-[600px]:items-start max-[600px]:pt-[8vh]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[34vw] w-[260vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[850vw] max-[600px]:px-[7vw]"
        >
          {/* Leading Campus Image */}
          <div className="h-full w-[26vw] overflow-hidden rounded-[1.2vw] max-[600px]:h-[60vw] max-[600px]:w-[80vw] max-[600px]:rounded-[4vw] shadow-md border border-slate-200/60 shrink-0">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Timeline Track Container */}
          <div ref={lineContainerRef} className="relative h-full w-full">
            {/* The Horizontal Line with Traveling Tip Dot */}
            <div className="w-full absolute left-0 top-[50%] -translate-y-1/2 flex items-center h-fit pointer-events-none z-10">
              <div
                className="size-[0.85vw] max-[600px]:size-[2.2vw] rounded-full shrink-0"
                style={activeStyle}
              />
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shrink-0"
                style={activeStyle}
              />
              <div
                className="size-[0.85vw] max-[600px]:size-[2.2vw] rounded-full shrink-0 -ml-[0.425vw] max-[600px]:-ml-[1.1vw]"
                style={activeStyle}
              />
            </div>

            {/* TOP ROW MILESTONES */}
            <div className="flex h-1/2 w-full items-end justify-start">
              <div className="h-full w-[18vw] max-[600px]:w-[50vw] flex flex-col justify-end pb-[4.3vw] shrink-0">
                <h2
                  className="w-[85%] font-sans font-semibold text-[2.5vw] leading-[1.08] tracking-tight max-[600px]:text-[7vw]"
                  style={{ color: textColor }}
                >
                  {title}
                </h2>
              </div>

              <div className="flex h-full gap-x-[26vw] max-[600px]:gap-x-[45vw]">
                {topJourneyData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[26vw] px-[2vw] flex flex-col justify-end pb-[1.8vw] max-[600px]:w-[70vw] max-[600px]:px-[6vw] shrink-0"
                  >
                    {/* Stem & Dot */}
                    <div className="w-full absolute left-0 bottom-0 top-0 pointer-events-none">
                      <div
                        className={`size-[0.9vw] max-[600px]:size-[2.5vw] -translate-x-1/2 absolute top-0 left-0 rounded-full jd-${item.id}`}
                        style={activeStyle}
                      />
                      <div
                        className={`w-[2px] absolute left-0 top-[0.45vw] max-[600px]:top-[1.25vw] bottom-0 -translate-x-1/2 origin-bottom jl-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    {/* Milestone Text */}
                    <div className="space-y-[0.5vw] pb-[0.8vw] max-[600px]:space-y-[1.5vw]">
                      <h4
                        className={`title-${item.id} font-sans font-semibold text-[1.9vw] leading-none max-[600px]:text-[5.5vw] tracking-tight uppercase`}
                        style={{ color: textColor }}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[95%] font-sans text-[1.05vw] leading-[1.4] max-[600px]:w-[90%] max-[600px]:text-[3.8vw] font-normal`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW MILESTONES */}
            <div className="flex h-1/2 w-full items-start justify-start">
              <div className="h-full w-[18vw] max-[600px]:w-[50vw] pt-[4.3vw] shrink-0">
                <p
                  className="font-mono text-[1.3vw] leading-none max-[600px]:text-[3.8vw] tracking-wider font-medium"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="flex h-full gap-x-[26vw] ml-[13vw] max-[600px]:gap-x-[45vw] max-[600px]:ml-[22vw]">
                {bottomJourneyData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[26vw] px-[2vw] flex flex-col justify-start pt-[1.8vw] max-[600px]:w-[70vw] max-[600px]:px-[6vw] shrink-0"
                  >
                    {/* Stem & Dot */}
                    <div className="w-full absolute left-0 top-0 bottom-0 pointer-events-none">
                      <div
                        className={`w-[2px] absolute left-0 top-0 bottom-[0.45vw] max-[600px]:bottom-[1.25vw] -translate-x-1/2 origin-top jl-${item.id}`}
                        style={activeStyle}
                      />
                      <div
                        className={`size-[0.9vw] max-[600px]:size-[2.5vw] -translate-x-1/2 absolute bottom-0 left-0 rounded-full jd-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    {/* Milestone Text */}
                    <div className="space-y-[0.5vw] pt-[0.8vw] max-[600px]:space-y-[1.5vw]">
                      <h4
                        className={`title-${item.id} font-sans font-semibold text-[1.9vw] leading-none max-[600px]:text-[5.5vw] tracking-tight uppercase`}
                        style={{ color: textColor }}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[95%] font-sans text-[1.05vw] leading-[1.4] max-[600px]:w-[90%] max-[600px]:text-[3.8vw] font-normal`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
