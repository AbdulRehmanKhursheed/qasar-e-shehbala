import { Star } from "lucide-react";
import { SITE, GOOGLE_REVIEWS } from "@/lib/constants";

function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < value ? "h-4 w-4 fill-brass text-brass" : "h-4 w-4 text-sand"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const hasQuotes = GOOGLE_REVIEWS.length > 0;

  return (
    <section className="bg-parchment py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta">
            Loved by grooms
          </p>
          <h2 id="reviews-heading" className="font-display text-[2.6rem] font-light leading-tight text-charcoal">
            Rated <em className="not-italic text-terracotta">{SITE.rating.value.toFixed(1)}</em> by{" "}
            {SITE.rating.count} grooms
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Stars />
            <a
              href={SITE.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-terracotta hover:underline"
            >
              Read our reviews on Google →
            </a>
          </div>
        </div>

        {hasQuotes ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {GOOGLE_REVIEWS.slice(0, 3).map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-sand bg-cream p-6 shadow-sm"
              >
                <Stars />
                <blockquote className="mt-4 flex-1 text-[14px] leading-7 text-slate">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-sand pt-4">
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-[12px] text-mist">{t.occasion}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-sand bg-cream p-8 text-center shadow-sm sm:p-10">
            <p className="font-display text-5xl font-light text-charcoal">
              {SITE.rating.value.toFixed(1)}
              <span className="align-top text-2xl text-brass"> ★</span>
            </p>
            <p className="mt-2 text-[14px] text-slate">
              A perfect rating across <span className="font-semibold text-charcoal">{SITE.rating.count}</span> Google
              reviews — from grooms across Rawalpindi, Islamabad and beyond who trusted us with the
              biggest day of their lives.
            </p>
            <a
              href={SITE.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-[13px] font-semibold text-cream transition-colors hover:bg-terracotta-light"
            >
              See all {SITE.rating.count} reviews on Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
