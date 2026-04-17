import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-soft text-lg">
              😏
            </div>
            <span className="font-display text-xl font-black">
              The Ick<span className="text-pink-deep">.io</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Built for privacy. Built for results. The most reliable Instagram follow tracker on the
            market.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="#">
              <span className="text-sm">𝕏</span>
            </a>
            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="#">
              <span className="text-sm">📷</span>
            </a>
          </div>
        </div>

        <FooterCol title="Product" links={["Features", "FAQ", "Blog"]} />
        <FooterCol title="Company" links={["Contact Support"]} />
        <FooterCol title="Legal" links={["Privacy Policy", "Terms of Service", "Pricing", "Refund Policy"]} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/50 md:flex-row">
          <p>© 2026 The Ick. All rights reserved. This service is not affiliated with Instagram.</p>
          <div className="flex gap-2">
            {["Visa", "MC", "Amex", "Apple"].map((p) => (
              <span key={p} className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-pink-label">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-white/80">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
