import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  UserPlus,
  Users,
  Eye,
  Heart,
  TrendingUp,
  Sparkles,
  Lock,
  Check,
} from "lucide-react";
import { generateReport, formatNumber, type ActivityItem } from "@/lib/fake-report";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/report/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} — Report — The Ick` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { username } = Route.useParams();
  const data = generateReport(username);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-soft text-lg">
              😏
            </div>
            <span className="font-display text-lg font-black">
              The Ick<span className="text-pink-deep">.io</span>
            </span>
          </Link>
          <Link
            to="/"
            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white"
          >
            New Search
          </Link>
        </div>
      </header>

      {/* Profile hero */}
      <section className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:items-end">
          <div className="h-28 w-28 rounded-full bg-pill-gradient p-1.5 shadow-pink">
            <div
              className="flex h-full w-full items-center justify-center rounded-full border-4 border-white font-display text-4xl font-black text-white drop-shadow"
              style={{ background: data.avatar }}
            >
              {data.initial}
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <h1 className="font-display text-3xl font-black">@{data.username}</h1>
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
                Verified data
              </span>
            </div>
            <p className="mt-1 text-lg font-semibold text-foreground/80">{data.displayName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{data.bio}</p>
            <div className="mt-4 flex justify-center gap-6 md:justify-start">
              <Stat label="Posts" value={formatNumber(data.posts)} />
              <Stat label="Followers" value={formatNumber(data.followers)} />
              <Stat label="Following" value={formatNumber(data.following)} />
            </div>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-pink-soft px-3 py-1.5 text-xs font-semibold text-pink-deep">
              <Lock className="mr-1 inline h-3 w-3" />
              Anonymous
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        {/* KPI grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPI
            icon={UserPlus}
            label="New follows (7d)"
            value={data.newFollows}
            accent="pink"
            delta={`+${data.newFollows} this week`}
          />
          <KPI
            icon={Users}
            label="New followers (7d)"
            value={data.newFollowers}
            accent="success"
            delta={`+${data.growth}% growth`}
          />
          <KPI
            icon={Eye}
            label="Profile views"
            value={data.profileViews}
            accent="violet"
            delta="last 7 days"
          />
          <KPI
            icon={Heart}
            label="Recent likes given"
            value={data.recentLikes}
            accent="pink"
            delta="last 24 hours"
          />
        </div>

        {/* Two columns: Recent follows + Recent followers */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityCard
            title="Recently followed"
            subtitle="Accounts they started following"
            icon={UserPlus}
            items={data.recentFollows}
            verb="started following"
          />
          <ActivityCard
            title="Recent followers"
            subtitle="Who started following them"
            icon={Users}
            items={data.recentFollowers}
            verb="followed them"
          />
        </div>

        {/* Profile viewers + Recent likers */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityCard
            title="Recent profile viewers"
            subtitle="Accounts that viewed their profile"
            icon={Eye}
            items={data.profileViewers}
            verb="viewed profile"
          />
          <ActivityCard
            title="Recently liked posts of"
            subtitle="Whose content they engaged with"
            icon={Heart}
            items={data.recentLikers}
            verb="liked a post"
          />
        </div>

        {/* Insights row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardTitle icon={Sparkles} title="Audience gender" subtitle="Estimated breakdown" />
            <div className="mt-6 space-y-4">
              <GenderBar label="Female" value={data.genderBreakdown.female} color="bg-pink-deep" />
              <GenderBar label="Male" value={data.genderBreakdown.male} color="bg-foreground" />
              <GenderBar label="Other" value={data.genderBreakdown.other} color="bg-muted-foreground" />
            </div>
          </Card>

          <Card className="lg:col-span-1">
            <CardTitle icon={TrendingUp} title="Engagement" subtitle="Last 30 days" />
            <div className="mt-6">
              <div className="flex items-baseline gap-2">
                <div className="font-display text-5xl font-black">{data.engagement}%</div>
                <span className="text-sm font-semibold text-success">+{data.growth}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">avg. engagement rate</p>

              <div className="mt-6 flex h-24 items-end gap-1">
                {data.hourlyActivity.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-pill-gradient opacity-80"
                    style={{ height: `${v}%` }}
                    title={`${i}:00`}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>00h</span>
                <span>12h</span>
                <span>23h</span>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-1">
            <CardTitle icon={Users} title="Top locations" subtitle="Where their audience lives" />
            <div className="mt-6 space-y-3">
              {data.topLocations.map((loc) => (
                <div key={loc.city}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{loc.city}</span>
                    <span className="text-muted-foreground">{loc.pct}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-pill-gradient"
                      style={{ width: `${Math.max(5, loc.pct * 2.5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Footer disclaimer */}
        <div className="rounded-2xl border border-pink/30 bg-pink-soft/30 p-5 text-center text-xs text-muted-foreground">
          <Lock className="mr-1 inline h-3 w-3 text-pink-deep" />
          Report generated anonymously · AES-256 encrypted · @{data.username} was not notified
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------- atoms ---------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-xl font-black">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-card p-6 shadow-card-soft ${className}`}>{children}</div>
  );
}

function CardTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-display text-lg font-black">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-soft text-pink-deep">
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  delta,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  delta: string;
  accent: "pink" | "success" | "violet";
}) {
  const accentMap = {
    pink: "bg-pink-soft text-pink-deep",
    success: "bg-success/15 text-success",
    violet: "bg-accent text-foreground",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-card p-5 shadow-card-soft"
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${accentMap[accent]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-4 font-display text-3xl font-black">{formatNumber(value)}</div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{delta}</div>
    </motion.div>
  );
}

function GenderBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ActivityCard({
  title,
  subtitle,
  icon: Icon,
  items,
  verb,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ActivityItem[];
  verb: string;
}) {
  return (
    <Card>
      <CardTitle icon={Icon} title={title} subtitle={subtitle} />
      <ul className="mt-4 divide-y">
        {items.map((it, i) => (
          <motion.li
            key={`${it.username}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 py-3"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white"
              style={{ background: it.avatar }}
            >
              {it.initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-bold">@{it.username}</span>
                {it.verified && (
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-pink-deep text-white">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
                {it.isPrivate && (
                  <Lock className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {it.fullName} · {verb}
              </div>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{it.time}</span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
