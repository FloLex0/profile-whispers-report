import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchBar({
  variant = "light",
  placeholder = "you",
  cta = "Search Now",
}: {
  variant?: "light" | "dark";
  placeholder?: string;
  cta?: string;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = value.replace(/^@/, "").trim() || "demo.user";
    navigate({ to: "/analyzing/$username", params: { username: clean } });
  };

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={submit}
      className={`flex w-full max-w-xl items-center gap-2 rounded-full p-2 pl-5 shadow-card-soft ${
        isDark ? "bg-white/95 backdrop-blur" : "bg-white"
      }`}
    >
      <InstagramIcon className="h-5 w-5 text-pink-deep" />
      <span className="text-base text-muted-foreground">@</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-pill-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        {cta}
      </button>
    </form>
  );
}

export { InstagramIcon };
