import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Cloud, User, Shield, Check } from "lucide-react";
import { generateReport } from "@/lib/fake-report";

export const Route = createFileRoute("/analyzing/$username")({
  head: () => ({
    meta: [{ title: "Analyzing… — The Ick" }],
  }),
  component: AnalyzingPage,
});

const STEPS = [
  { label: "Connecting to Instagram servers...", Icon: Cloud },
  { label: "Searching user profile...", Icon: Search },
  { label: "Fetching profile data anonymously...", Icon: Cloud },
  { label: "Analyzing recent follows...", Icon: User },
  { label: "Finalizing & securing data...", Icon: Shield },
];

function AnalyzingPage() {
  const { username } = Route.useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const data = generateReport(username);

  useEffect(() => {
    const start = Date.now();
    const total = 4500;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / total) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => {
          navigate({ to: "/report/$username", params: { username } });
        }, 400);
      }
    }, 60);
    return () => clearInterval(id);
  }, [username, navigate]);

  const activeStep = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display text-3xl font-black">Analyzing Follows</h1>
        <p className="mt-1 text-muted-foreground">@{username}</p>

        <div className="mx-auto mt-6 h-28 w-28 rounded-full bg-pill-gradient p-1.5">
          <div
            className="h-full w-full rounded-full border-4 border-white"
            style={{ background: data.avatar }}
          >
            <div className="flex h-full items-center justify-center font-display text-3xl font-black text-white drop-shadow">
              {data.initial}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold">{Math.floor(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-pill-gradient transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-2 text-left">
          {STEPS.map((s, i) => {
            const isActive = i === activeStep;
            const isDone = i < activeStep;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  isActive
                    ? "border-pink/40 bg-pink-soft/40"
                    : isDone
                      ? "border-success/30 bg-success/5"
                      : "border-border bg-card"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    isActive
                      ? "bg-pink-deep text-white"
                      : isDone
                        ? "bg-success text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-4 w-4" />
                  ) : isActive ? (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <s.Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-foreground" : isDone ? "text-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
