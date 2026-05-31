import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { Clock, MapPin, Scissors } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment",
  description: `Book a fitting consultation or measurement session at Qasr-e-Shehbala in Saddar, Rawalpindi. Meet our master karigars and discuss your groom wear.`,
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
    icon: Scissors,
    title: "Measurement Session",
    description:
      "Our karigar takes your full measurements for a made-to-measure garment.",
    duration: "30–45 minutes",
  },
  {
    icon: Scissors,
    title: "Fitting Appointment",
    description:
      "Try on your garment after tailoring and approve the final fit.",
    duration: "20–30 minutes",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Book Appointment", href: "/appointments" }]} />

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Info side */}
          <div>
            <h1
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Book a Consultation
            </h1>
            <p className="mt-4 text-gray-500 leading-7">
              Visit us in Saddar and meet our master karigars. We&apos;ll discuss
              fabrics, cut, embroidery, and occasion — and take your measurements
              so we can create the perfect garment.
            </p>

            {/* Appointment types */}
            <div className="mt-8 space-y-4">
              {APPOINTMENT_TYPES.map(({ icon: Icon, title, description, duration }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-gray-100 p-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-jewel/8">
                    <Icon className="h-4 w-4 text-jewel" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                    <p className="text-xs text-jewel mt-1 font-medium">
                      {duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visit info */}
            <div className="mt-8 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-jewel shrink-0" aria-hidden="true" />
                <span>
                  {SITE.address.line1}, {SITE.address.area},{" "}
                  {SITE.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-jewel shrink-0" aria-hidden="true" />
                <span>{SITE.openingHours}</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500">
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
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Request an Appointment
            </h2>
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
