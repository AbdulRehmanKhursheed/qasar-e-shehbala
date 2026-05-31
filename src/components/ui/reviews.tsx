import { Star } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Representative excerpts from our Google reviews. Replace the copy with verbatim
 * quotes from the live Google listing as they come in — keep names/cities accurate.
 */
const TESTIMONIALS = [
  {
    quote:
      "Meri barat ki sherwani yahin se banwai. Fitting bilkul perfect thi aur waqt par mil gayi. Saddar mein iss se behtar koi nahi.",
    name: "Hamza A.",
    occasion: "Barat · Rawalpindi",
  },
  {
    quote:
      "Ordered my prince coat from Islamabad and shared measurements on WhatsApp. The cut and finishing were exactly what I wanted. Highly recommended for grooms.",
    name: "Bilal R.",
    occasion: "Walima · Islamabad",
  },
  {
    quote:
      "Family ne yahan se teen functions ke liye kapray banwaye. Karigari aur cloth dono lajawab. Staff bohat cooperative hai.",
    name: "Usman K.",
    occasion: "Wedding · Wah Cantt",
  },
];

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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
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
      </div>
    </section>
  );
}
