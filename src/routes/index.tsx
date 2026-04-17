import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Bell, UserPlus, ChevronDown, Star } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SearchBar, InstagramIcon } from "@/components/search-bar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Ick — Track Recent Instagram Follows & Followers" },
      {
        name: "description",
        content:
          "See exactly who they've been following and who followed them. Anonymous, no login, instant results.",
      },
      { property: "og:title", content: "The Ick — Track Instagram Follows" },
      {
        property: "og:description",
        content: "Anonymous Instagram follow tracker. Get notified when they follow someone new.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Stats />
      <HowItWorks />
      <Comparison />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-32">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-pink"
        >
          <span>🎵</span> #1 Trending App on TikTok
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-5xl font-black leading-[1.05] text-white drop-shadow-sm md:text-7xl"
        >
          Track their Recent
          <br />
          Follows &amp; Followers <span className="inline-block">😏</span>
        </motion.h1>

        <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
          See exactly who they've been following and who followed them lately. Get notified when
          they follow someone new.
        </p>

        <div className="mt-10 w-full">
          <div className="mx-auto flex justify-center">
            <SearchBar />
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white">
            <Check className="h-4 w-4 rounded-full bg-success p-0.5 text-white" />
            Try it now. No instagram login required.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-card-soft">
          <div className="flex -space-x-2">
            {["a", "b", "c", "d"].map((k, i) => (
              <div
                key={k}
                className="h-7 w-7 rounded-full border-2 border-white"
                style={{
                  background: `hsl(${i * 60 + 320} 70% 70%)`,
                }}
              />
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink text-[10px] font-bold text-white">
              1M
            </div>
          </div>
          <span className="text-sm font-semibold">1M+ accounts searched</span>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-pink-soft/80 px-4 py-1.5 text-xs text-pink-deep">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <LiveCount /> are currently searching anonymously...
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-white/90">
          <Pill>Anonymous</Pill>
          <Pill>Secure</Pill>
          <Pill>Sorted by Recent</Pill>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Check className="h-4 w-4 rounded-full bg-success p-0.5 text-white" />
      {children}
    </span>
  );
}

function LiveCount() {
  const [n] = useState(() => Math.floor(150 + Math.random() * 80));
  return <span className="font-semibold">{n}</span>;
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { value: "1M+", label: "Accounts Analyzed" },
    { value: "110K+", label: "App Store Reviews" },
    { value: "4.6/5", label: "Average Rating" },
    { value: "50+", label: "Countries" },
  ];
  return (
    <section className="border-b bg-background py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-black md:text-5xl">
              {s.value.split(/(\+|\/5)/).map((part, i) =>
                part === "+" || part === "/5" ? (
                  <span key={i} className="text-pink-deep">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      title: "Enter a username",
      desc: "Just type their public instagram handle. No password or login needed.",
      visual: <Step1Visual />,
    },
    {
      title: "See recent follows",
      desc: "View who they recently followed, sorted chronologically with timestamps.",
      visual: <Step2Visual />,
    },
    {
      title: "Get notified",
      desc: "Receive instant alerts whenever they follow or get followed by someone new.",
      visual: <Step3Visual />,
    },
  ];
  return (
    <section className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-pink-label">— How it works</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Simple process, powerful results
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-card p-8 shadow-card-soft"
            >
              <div className="flex h-44 items-center justify-center rounded-2xl bg-muted/60">
                {s.visual}
              </div>
              <p className="mt-6 text-pink-label">Step {i + 1}</p>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Step1Visual() {
  return (
    <div className="relative w-48 rounded-xl bg-white p-4 shadow-soft">
      <div className="mx-auto h-14 w-14 rounded-full bg-pill-gradient p-0.5">
        <div className="h-full w-full rounded-full border-2 border-white bg-pink-soft" />
      </div>
      <div className="mt-3 rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        @ <span className="border-r border-foreground/60 pr-px">t</span>
      </div>
    </div>
  );
}
function Step2Visual() {
  return (
    <div className="relative">
      <div className="absolute -top-1 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-pink-deep" />
      <div className="h-24 w-24 rounded-full bg-pill-gradient p-1">
        <div className="h-full w-full rounded-full border-2 border-white bg-gradient-to-br from-pink-soft to-pink" />
      </div>
    </div>
  );
}
function Step3Visual() {
  return (
    <div className="space-y-2">
      <NotifCard text="Started following" subject="@sofia.martinez" />
      <NotifCard text="Got followed by" subject="@nina.styles" />
    </div>
  );
}
function NotifCard({ text, subject }: { text: string; subject: string }) {
  return (
    <div className="flex w-56 items-center gap-3 rounded-xl bg-white p-2.5 shadow-soft">
      <div className="h-8 w-8 rounded-full bg-pink-soft" />
      <div className="text-left text-xs leading-tight">
        <div className="text-muted-foreground">Yesterday</div>
        <div className="font-semibold">
          {text} <span className="text-pink-deep">{subject}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPARISON ---------------- */
function Comparison() {
  const rows: [string, string, string][] = [
    ["Completely Anonymous", "Yes, Always", "No"],
    ["Instagram Login", "Not Required", "Required"],
    ["Follow Tracking", "Sorted by Recent", "Random Order"],
    ["Follow History", "Full Timeline", "Not Available"],
    ["Gender Breakdown", "Included", "Not Available"],
    ["Updates", "Every Hour", "Manual Refresh"],
    ["Notifications", "Instant Push", "None"],
    ["Profiles", "Up to 5", "1 at a time"],
    ["Ads", "✓", "Ads Everywhere"],
    ["Devices", "All Devices", "PC Only"],
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-black md:text-5xl">Why 1M+ users choose The Ick</h2>
          <p className="mt-3 text-muted-foreground">Built for privacy. Built for results.</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-card shadow-card-soft">
          <div className="grid grid-cols-3 bg-muted px-6 py-4 text-pink-label">
            <div>Feature</div>
            <div className="text-center text-foreground">
              <span className="font-display font-black">The Ick</span>
              <span className="text-pink-deep">.io</span>
            </div>
            <div className="text-center">Others</div>
          </div>
          {rows.map(([feature, ick, other], i) => (
            <div
              key={feature}
              className={`grid grid-cols-3 items-center px-6 py-4 ${
                i % 2 === 0 ? "bg-card" : "bg-muted/30"
              }`}
            >
              <div className="font-semibold">{feature}</div>
              <div className="flex justify-center">
                {ick === "✓" ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-white">
                    <Check className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="rounded-full bg-pink-soft/70 px-3 py-1 text-xs font-medium text-pink-deep">
                    {ick}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <span className="rounded-full bg-pink-soft/40 px-3 py-1 text-xs font-medium text-pink-deep/70">
                  {other}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- REVIEWS ---------------- */
function Reviews() {
  const reviews = [
    { name: "Mike R.", text: "The profile analysis is genius. Love tracking my ex's activity.", pro: true },
    { name: "Emma L.", text: "Best follow tracker out there. The notifications are instant and super accurate.", pro: false },
    { name: "Alex T.", text: "I was skeptical at first but this actually works. Caught some interesting follows.", pro: true },
    { name: "Zoe H.", text: "Clean design, easy to use, and completely anonymous. Exactly what I needed.", pro: false },
    { name: "Sarah M.", text: "This app helped me discover my boyfriend was cheating. Literally saved my life!", pro: true },
    { name: "Ryan K.", text: "The gender breakdown feature is wild. 10/10 recommend to anyone curious.", pro: true },
    { name: "Nina P.", text: "Hourly updates are a game changer. I know the second something changes.", pro: false },
    { name: "Marcus J.", text: "Tracking 5 profiles at once is incredible. Way better than any other app.", pro: true },
    { name: "Lily C.", text: "No instagram login needed? Sign me up. Privacy first, always.", pro: false },
    { name: "Omar S.", text: "The notification system is flawless. Got alerted instantly when he followed someone new.", pro: true },
  ];
  return (
    <section className="overflow-hidden bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-pink-label">— Reviews</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Trusted by thousands</h2>
        </div>

        <div className="mx-auto mt-10 flex max-w-md items-center gap-6 rounded-2xl bg-card p-6 shadow-card-soft">
          <div className="text-center">
            <div className="font-display text-5xl font-black">4.6</div>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex h-5 w-5 items-center justify-center ${
                    i <= 4 ? "bg-success" : "bg-success/40"
                  }`}
                >
                  <Star className="h-3 w-3 fill-white text-white" />
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">110K+ reviews</div>
          </div>
          <div className="flex-1 space-y-1.5 text-xs">
            {[[5, 82], [4, 11], [3, 4], [2, 2], [1, 1]].map(([star, pct]) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-3">{star}</span>
                <Star className="h-3 w-3 fill-success text-success" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-success" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <ReviewRow reviews={reviews} direction="left" />
        <ReviewRow reviews={reviews.slice().reverse()} direction="right" />
      </div>
    </section>
  );
}

function ReviewRow({
  reviews,
  direction,
}: {
  reviews: { name: string; text: string; pro: boolean }[];
  direction: "left" | "right";
}) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            className="w-72 shrink-0 rounded-2xl bg-card p-4 shadow-soft"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-pink-soft" />
              <div className="flex items-center gap-1.5 text-sm font-bold">
                {r.name}
                {r.pro && (
                  <span className="rounded-md bg-pink-soft px-1.5 py-0.5 text-[9px] font-bold text-pink-deep">
                    PRO
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3 w-3 fill-success text-success" />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">"{r.text}"</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    {
      q: "How many Instagram profiles can I track?",
      a: "With our free plan you can track up to 1 profile. PRO users get up to 5 profiles tracked simultaneously with hourly updates.",
    },
    {
      q: "Is The Ick free to use?",
      a: "Yes. Basic search and tracking is completely free. PRO unlocks notifications, multi-profile tracking and full history.",
    },
    {
      q: "Can I see who someone recently followed on Instagram?",
      a: "Absolutely — that's the core of what we do. Just enter a public username and we'll show their most recent follows in chronological order.",
    },
    {
      q: "Does The Ick work with private Instagram accounts?",
      a: "We can only access publicly available information. Private accounts have limited data available.",
    },
    {
      q: "Will the person know I'm tracking them?",
      a: "No. We never log into Instagram and never interact with their account. Your search is 100% anonymous.",
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-pink-label">— FAQ</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Frequently asked</h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} highlighted={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, highlighted }: { q: string; a: string; highlighted?: boolean }) {
  const [open, setOpen] = useState(highlighted ?? false);
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className={`font-semibold ${highlighted ? "text-pink-deep" : ""}`}>{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t px-5 py-4 text-sm text-muted-foreground">{a}</div>
      )}
    </div>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="bg-cta-gradient py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h2 className="text-4xl font-black text-white drop-shadow md:text-5xl">
          Ready to find out?
        </h2>
        <p className="mt-3 text-white/90">
          Enter any public Instagram username and see who they've been following.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <SearchBar variant="dark" placeholder="your crush" cta="Search" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-white">
          <Pill>Anonymous</Pill>
          <Pill>No Login Required</Pill>
          <Pill>Instant Results</Pill>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/80">
          🔒 AES-256 Encrypted
        </div>
      </div>
    </section>
  );
}

// silence unused warnings
void Bell;
void UserPlus;
void InstagramIcon;
