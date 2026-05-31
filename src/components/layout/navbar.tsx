"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 16), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-ink-deep text-ivory/70">
        <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:flex lg:px-8">
          <span className="tracking-wide">Premium Groom Wear Since 1999 · Saddar, Rawalpindi</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-ivory">
              <Phone className="h-3 w-3" aria-hidden="true" />
              {SITE.phone}
            </a>
            <span className="text-ivory/30">·</span>
            <span>{SITE.openingHours}</span>
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-ivory-line/70 bg-ivory/90 backdrop-blur-md"
            : "border-transparent bg-ivory"
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} — Home`}>
              <Image
                src={SITE.logo}
                alt=""
                width={44}
                height={44}
                unoptimized
                className="h-11 w-11 rounded-full object-cover ring-1 ring-ink/10"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-tight text-ink">Qasr-e-Shehbala</span>
                <span className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-jewel">Since 1999</span>
              </span>
            </Link>

            <div className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 text-sm tracking-wide transition-colors hover:text-jewel",
                      active ? "text-jewel" : "text-ink/75"
                    )}
                  >
                    {link.label}
                    {active && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-jewel" />}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/search"
                aria-label="Search products"
                className="rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Link>

              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1ebe5d] sm:inline-flex"
                aria-label="Contact us on WhatsApp"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                WhatsApp
              </a>

              <button
                type="button"
                className="rounded-full p-2 text-ink/70 transition-colors hover:bg-ink/5 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="border-t border-ivory-line bg-ivory lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm tracking-wide transition-colors",
                    pathname === link.href ? "bg-jewel/10 text-jewel" : "text-ink/75 hover:bg-ink/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 border-t border-ivory-line px-3 py-3 text-sm text-ink/60"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
    </svg>
  );
}
