"use client";

import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "var(--color-foreground, #181C20)",
  mutedTextColor: "var(--color-muted-foreground, #555555)",
  activeColor: "#DF711B",
  backgroundColor: "var(--color-background, #FFFFFF)",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <main className="bg-background text-foreground">
      {/* Lead-in so the pinned timeline has somewhere to scroll in from. */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Institutional Heritage
        </p>
        <h1 className="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight sm:text-6xl font-cinzel">
          Three Decades, One Journey of Excellence.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Scroll through the timeline — the section pins, the track slides sideways, and each
          milestone draws its stem and reveals its story.
        </p>
        <span className="mt-2 animate-bounce text-muted-foreground">&darr;</span>
      </section>

      {/* Realistic usage: custom copy, branded accent, tuned reveal speed. */}
      <Timeline
        title="School Storyline"
        periodLabel="1993 — 2026"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl="/images/history2.jpeg"
        imageAlt="Chinmaya Vidyalaya Historic Campus"
        duration={s.duration}
      />

      <section className="flex h-screen items-center justify-center px-6 text-center text-sm text-muted-foreground">
        From a humble beginning of 72 students in 1995 to over 1,600 learners today.
      </section>
    </main>
  );
}
