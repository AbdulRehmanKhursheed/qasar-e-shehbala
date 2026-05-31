"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const onScroll = useCallback(() => setScrolled(window.scrollY > 10), []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "bg-parchment/95 backdrop-blur-md shadow-[0_1px_0_var(--sand)]"
        : "bg-parchment shadow-[0_1px_0_var(--linen)]"
    )}>
      {/* Thin top strip */}
      <div className="bg-charcoal text-parchment/60 text-[10px] tracking-[0.22em] uppercase">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <span>Master Tailors · Saddar, Rawalpindi</span>
          <span className="hidden sm:block">{SITE.openingHours}</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-[68px] items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={SITE.name}>
            <Image
              src={SITE.logo}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 rounded-full object-cover ring-1 ring-sand"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-[1.25rem] font-semibold tracking-tight text-charcoal" style={{ fontStyle: "normal" }}>
                Qasar-e-Shehbala
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-terracotta mt-0.5">
                Est. {SITE.established}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors",
                    active ? "text-terracotta" : "text-slate hover:text-charcoal"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-terracotta" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/search"
              aria-label="Search"
              className="rounded-full p-2 text-slate transition-colors hover:bg-linen hover:text-charcoal"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1da851] hover:shadow-md sm:inline-flex"
              aria-label="Chat on WhatsApp"
            >
              <WaIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-full p-2 text-slate transition-colors hover:bg-linen lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand bg-parchment lg:hidden">
          <div className="mx-auto max-w-7xl space-y-0.5 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href ? "bg-terracotta-pale text-terracotta" : "text-slate hover:bg-linen"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 rounded-lg border border-sand px-3 py-2.5 text-sm font-medium text-slate"
            >
              <WaIcon className="h-4 w-4 text-[#25D366]" />
              {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
    </svg>
  );
}
