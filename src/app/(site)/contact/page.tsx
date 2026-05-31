import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with ${SITE.name}. Visit us in Saddar, Rawalpindi, call us, or send a WhatsApp message to enquire about groom wear, measurements, and appointments.`,
  slug: "contact",
});

export const revalidate = 86400;

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Address",
    value: `${SITE.address.line1}, ${SITE.address.area}, ${SITE.address.city}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(`${SITE.name}, Saddar, Rawalpindi`)}`,
    linkLabel: "Get directions →",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
    linkLabel: "Call now →",
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    linkLabel: "Send email →",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: SITE.openingHours,
    href: null,
    linkLabel: null,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Contact", href: "/contact" }]} />

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Info */}
          <div>
            <h1
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Get in Touch
            </h1>
            <p className="mt-4 text-gray-500 leading-7">
              Whether you want to discuss a custom sherwani, book a consultation, or
              simply have questions — we&apos;re here. WhatsApp is the fastest way
              to reach us.
            </p>

            {/* WhatsApp primary */}
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Assalam o Alaikum! I have an enquiry about groom wear.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
            >
              <WhatsAppIcon />
              Message us on WhatsApp
            </a>

            {/* Contact items */}
            <dl className="mt-10 space-y-6">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, linkLabel }) => (
                <div key={label} className="flex gap-4">
                  <dt className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jewel/8">
                    <Icon className="h-5 w-5 text-jewel" aria-hidden="true" />
                  </dt>
                  <dd>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-700">{value}</p>
                    {href && linkLabel && (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-0.5 text-xs font-medium text-jewel hover:underline"
                      >
                        {linkLabel}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
    </svg>
  );
}
