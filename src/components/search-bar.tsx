import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";

export function SearchBar({
  variant = "light",
  placeholder = "you",
}: {
  variant?: "light" | "dark";
  placeholder?: string;
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
      <Instagram className="h-5 w-5 text-pink-deep" />
      <span className="text-base text-muted-foreground">@</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="rounded-full bg-pill-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        Search Now
      </button>
    </form>
  );
}
