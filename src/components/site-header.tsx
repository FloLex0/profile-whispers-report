import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-soft text-lg">
            😏
          </div>
          <span className="font-display text-xl font-black">
            The Ick<span className="text-pink-deep">.io</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <button className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground sm:flex">
            🇬🇧 English <ChevronDown className="h-3 w-3" />
          </button>
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Login
          </Link>
          <Link
            to="/"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
