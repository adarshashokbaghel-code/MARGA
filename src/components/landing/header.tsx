"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { MargaLogo } from "@/components/brand/marga-logo";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { margaLinkStyles, margaPrimaryButtonStyles } from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#modules", label: "Framework" },
  { href: "/#stages", label: "Stages" },
  { href: "/#archetypes", label: "Archetypes" },
  { href: "/#vision", label: "Vision" },
];

const mainNavLinkStyles = cn(
  "font-label text-xs uppercase tracking-widest text-[#525252]",
  margaLinkStyles,
);

const navLinkStyles = cn(
  "font-label text-xs uppercase tracking-widest text-[#525252]",
  margaLinkStyles,
);

const ctaStyles = cn(margaPrimaryButtonStyles, "inline-flex h-10 gap-2 px-5");

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black bg-white shadow-[inset_0_-3px_0_0_var(--marga-yellow)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-3"
          onClick={() => setMobileOpen(false)}
        >
          <MargaLogo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={mainNavLinkStyles}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/about" className={navLinkStyles}>
            Learn more
          </Link>
          <GetStartedButton size="sm" className={ctaStyles}>
            Get started
            <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </GetStartedButton>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-black bg-white text-black transition-colors duration-100 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-3 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-4" strokeWidth={1.5} />
          ) : (
            <Menu className="size-4" strokeWidth={1.5} />
          )}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[#E5E5E5] bg-white transition-all duration-100 md:hidden",
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 border-t-transparent opacity-0",
        )}
      >
        <nav className="flex flex-col px-6 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                mainNavLinkStyles,
                "border-b border-[#E5E5E5] py-4 last:border-b-0",
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 border-t border-black py-4">
            <Link
              href="/about"
              className={cn(navLinkStyles, "py-1")}
              onClick={() => setMobileOpen(false)}
            >
              Learn more
            </Link>
            <GetStartedButton
              size="sm"
              className={ctaStyles}
              onClick={() => setMobileOpen(false)}
            >
              Get started
              <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </GetStartedButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
