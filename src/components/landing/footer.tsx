import Link from "next/link";

import { MargaLogo } from "@/components/brand/marga-logo";
import { margaLinkStyles } from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/#modules", label: "Framework" },
  { href: "/#stages", label: "Stages" },
  { href: "/#archetypes", label: "Archetypes" },
  { href: "/#vision", label: "Vision" },
];

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white text-black shadow-[inset_0_3px_0_0_var(--marga-yellow)]">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <MargaLogo />
            <p className="max-w-xs font-serif text-sm leading-relaxed text-[#525252]">
              Deep career self-knowledge for everyone.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-label text-xs uppercase tracking-widest text-[#525252]",
                  margaLinkStyles,
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-black pt-6">
          <p className="font-label text-[10px] uppercase tracking-widest text-[#525252]">
            © {new Date().getFullYear()} Marga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
