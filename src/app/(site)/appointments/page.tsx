import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { Clock, MapPin, Scissors, Ruler, Shirt } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment",
  description: `Book a fitting consultation or measurement session at Qasar-e-Shehbala in Saddar, Rawalpindi. Meet our master karigars and discuss your groom wear.`,
  slug: "appointments",
});

export const revalidate = 86400;

const APPOINTMENT_TYPES = [
  {
    icon: Scissors,
    title: "Initial Consultation",
    description:
      "Meet the team, view fabrics, and discuss your groom wear requirements.",
    duration: "45–60 minutes",
  },
  {
    icon: Ruler,
    title: "Measurement Session",
    description:
      "Our karigar takes your full measurements for a made-to-measure garment.",
    duration: "30–45 minutes",
  },
  {
    icon: Shirt,
    title: "Fitting Appointment",
    description:
      "Try on your garment after tailoring and approve the final fit.",
    duration: "20–30 minutes",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Book Appointment", href: "/appointments" }]} />

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Info side */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
              Visit our atelier
            </p>
            <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
              Book a Consultation
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-mist">
              Visit us in Saddar and meet our master karigars. We&apos;ll discuss
              fabrics, cut, embroidery, and occasion — and take your measurements
              so we can create the perfect garment.
            </p>

            {/* Appointment types */}
            <div className="mt-8 space-y-4">
              {APPOINTMENT_TYPES.map(({ icon: Icon, title, description, duration }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-sand bg-cream p-4 transition-colors hover:border-terracotta/30"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta-pale">
                    <Icon className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-mist">{description}</p>
                    <p className="mt-1 text-xs font-medium text-terracotta">
                      {duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visit info */}
            <div className="mt-8 space-y-3 text-sm text-slate">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                <span>
                  {SITE.address.line1}, {SITE.address.area},{" "}
                  {SITE.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                <span>{SITE.openingHours}</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-mist">
              Prefer to start on WhatsApp?{" "}
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Assalam o Alaikum! I'd like to book a consultation appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#25D366] hover:underline"
              >
                Message us directly →
              </a>
            </p>
          </div>

          {/* Form side */}
          <div className="rounded-2xl border border-sand bg-cream p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 font-display text-2xl font-normal text-charcoal">
              Request an Appointment
            </h2>
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
