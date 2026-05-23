"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { MargaLogo } from "@/components/brand/marga-logo";
import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#modules", label: "Framework" },
  { href: "/#stages", label: "Stages" },
  { href: "/#archetypes", label: "Archetypes" },
  { href: "/#vision", label: "Vision" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex h-14 items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/75 px-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] md:h-16 md:rounded-full md:pl-5 md:pr-3">
          <Link
            href="/"
            className="group shrink-0 transition-opacity hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <MargaLogo />
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-muted/60 p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/about">Learn more</Link>
            </Button>
            <GetStartedButton
              size="sm"
              className="rounded-full bg-teal px-5 text-white hover:bg-teal/90"
            >
              Get started
            </GetStartedButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-lg backdrop-blur-xl transition-all duration-200 md:hidden",
            mobileOpen
              ? "max-h-96 opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0",
          )}
        >
          <nav className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/about" onClick={() => setMobileOpen(false)}>
                  Learn more
                </Link>
              </Button>
              <GetStartedButton
                size="sm"
                className="bg-teal text-white hover:bg-teal/90"
                onClick={() => setMobileOpen(false)}
              >
                Get started
              </GetStartedButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
