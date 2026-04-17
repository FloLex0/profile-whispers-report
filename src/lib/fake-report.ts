/**
 * Generates deterministic fake report data based on the username.
 * Always returns the same data for the same username so the experience feels real.
 */

const FIRST_NAMES = [
  "sofia", "ana", "maria", "emma", "alex", "nina", "ryan", "marcus",
  "lily", "omar", "zoe", "mike", "sarah", "luca", "ines", "leo",
  "carla", "diego", "raluca", "andrei", "isabela", "matei", "iulia",
  "florin", "vlad", "elena", "stefan", "miruna", "tudor", "alina",
];
const LAST = [
  "styles", "official", "ldn", "vibes", "x", "rose", "wild", "art",
  "studio", "gram", "world", "daily", "club", "_", "mood", "core",
];

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function makeUsername(rng: () => number) {
  const f = pick(rng, FIRST_NAMES);
  const l = pick(rng, LAST);
  const sep = rng() > 0.5 ? "." : "_";
  return `${f}${sep}${l}`;
}

function relativeTime(rng: () => number, idx: number) {
  if (idx < 3) {
    const m = Math.floor(rng() * 50) + 5;
    return `${m}m ago`;
  }
  if (idx < 8) {
    const h = Math.floor(rng() * 23) + 1;
    return `${h}h ago`;
  }
  const d = Math.floor(rng() * 14) + 1;
  return `${d}d ago`;
}

function avatarColor(seed: number) {
  const hue = seed % 360;
  return `linear-gradient(135deg, hsl(${hue} 75% 70%), hsl(${(hue + 40) % 360} 75% 60%))`;
}

export type ActivityItem = {
  username: string;
  fullName: string;
  time: string;
  verified: boolean;
  isPrivate: boolean;
  avatar: string;
  initial: string;
};

export type ReportData = {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  initial: string;
  followers: number;
  following: number;
  posts: number;
  newFollows: number;
  newFollowers: number;
  profileViews: number;
  recentLikes: number;
  growth: number;
  engagement: number;
  recentFollows: ActivityItem[];
  recentFollowers: ActivityItem[];
  profileViewers: ActivityItem[];
  recentLikers: ActivityItem[];
  genderBreakdown: { male: number; female: number; other: number };
  topLocations: { city: string; pct: number }[];
  hourlyActivity: number[];
};

const CITIES = [
  "London", "Bucharest", "Paris", "Milan", "New York", "Berlin",
  "Madrid", "Lisbon", "Amsterdam", "Vienna",
];

function genActivity(rng: () => number, count: number): ActivityItem[] {
  const out: ActivityItem[] = [];
  for (let i = 0; i < count; i++) {
    const username = makeUsername(rng);
    const first = username.split(/[._]/)[0];
    const fullName = first.charAt(0).toUpperCase() + first.slice(1);
    out.push({
      username,
      fullName,
      time: relativeTime(rng, i),
      verified: rng() > 0.85,
      isPrivate: rng() > 0.7,
      avatar: avatarColor(Math.floor(rng() * 1000)),
      initial: first.charAt(0).toUpperCase(),
    });
  }
  return out;
}

export function generateReport(rawUsername: string): ReportData {
  const username = rawUsername.replace(/^@/, "").toLowerCase();
  const seed = hashStr(username);
  const rng = makeRng(seed);

  const followers = Math.floor(rng() * 50000) + 800;
  const following = Math.floor(rng() * 1500) + 200;

  const male = Math.floor(rng() * 60) + 20;
  const female = 100 - male - 3;

  return {
    username,
    displayName: username.split(/[._]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" "),
    bio: pick(rng, [
      "✨ living my best life",
      "📍 wherever the wifi takes me",
      "coffee · books · sunsets 🌅",
      "just here for the vibes",
      "DM for collabs 💌",
    ]),
    avatar: avatarColor(seed % 1000),
    initial: username.charAt(0).toUpperCase(),
    followers,
    following,
    posts: Math.floor(rng() * 800) + 30,
    newFollows: Math.floor(rng() * 18) + 3,
    newFollowers: Math.floor(rng() * 120) + 12,
    profileViews: Math.floor(rng() * 800) + 80,
    recentLikes: Math.floor(rng() * 240) + 30,
    growth: Math.round((rng() * 18 - 2) * 10) / 10,
    engagement: Math.round((rng() * 8 + 2) * 10) / 10,
    recentFollows: genActivity(rng, 10),
    recentFollowers: genActivity(rng, 10),
    profileViewers: genActivity(rng, 8),
    recentLikers: genActivity(rng, 8),
    genderBreakdown: { male, female, other: 3 },
    topLocations: CITIES.slice(0, 5).map((city, i) => ({
      city,
      pct: Math.max(5, Math.floor(rng() * 35) - i * 4),
    })).sort((a, b) => b.pct - a.pct),
    hourlyActivity: Array.from({ length: 24 }, () => Math.floor(rng() * 100)),
  };
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}
