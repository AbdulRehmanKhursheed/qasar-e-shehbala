import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Sherwani Measurement Guide",
  description:
    "How to take your sherwani measurements at home for a perfect made-to-measure fit. Step-by-step guide by the karigars at Qasr-e-Shehbala, Rawalpindi.",
  slug: "measurement-guide",
});

export const revalidate = 86400;

const MEASUREMENTS = [
  {
    name: "Chest",
    urdu: "Seena",
    instruction:
      "Measure around the fullest part of your chest, keeping the tape horizontal. Keep two fingers of slack.",
  },
  {
    name: "Waist",
    urdu: "Kamar",
    instruction:
      "Measure around the narrowest part of your torso, usually just above the navel.",
  },
  {
    name: "Shoulder",
    urdu: "Kandha",
    instruction:
      "Measure from the edge of one shoulder to the edge of the other, across the back.",
  },
  {
    name: "Sleeve Length",
    urdu: "Bazu",
    instruction:
      "Measure from the shoulder seam to the wrist bone, with arm slightly bent.",
  },
  {
    name: "Sherwani Length",
    urdu: "Lamba'i",
    instruction:
      "Measure from the top of your shoulder to your desired hem length (usually mid-thigh for sherwani, knee for prince coat).",
  },
  {
    name: "Neck",
    urdu: "Gardan",
    instruction:
      "Measure around the base of your neck, adding one finger of ease.",
  },
  {
    name: "Hip",
    urdu: "Koolay",
    instruction:
      "Measure around the fullest part of your hips, usually 7–8 inches below the waistline.",
  },
];

export default function MeasurementGuidePage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ name: "Measurement Guide", href: "/measurement-guide" }]}
        />

        <div className="mt-10">
          <p className="text-sm font-medium uppercase tracking-wider text-jewel mb-3">
            Made-to-Measure
          </p>
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Sherwani Measurement Guide
          </h1>
          <p className="mt-4 text-gray-500 leading-7">
            If you&apos;re outside Rawalpindi, you can take your own measurements
            at home and send them to us on WhatsApp. Follow this guide carefully
            for the best fit. When in doubt, always size up — our karigars will
            adjust during the fitting.
          </p>
        </div>

        {/* What you need */}
        <div className="mt-10 rounded-2xl bg-jewel/8 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            What you need
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ A soft measuring tape (kapray ka mapa)</li>
            <li>✓ A helper — measurements are much more accurate with someone else measuring</li>
            <li>✓ Wear fitted clothes (not a thick jacket) when measuring</li>
            <li>✓ Stand straight with arms slightly relaxed</li>
          </ul>
        </div>

        {/* Measurement list */}
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Required Measurements
          </h2>

          {MEASUREMENTS.map((m, i) => (
            <div
              key={m.name}
              className="flex gap-4 rounded-xl border border-gray-100 p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{m.name}</h3>
                  <span className="text-xs text-gray-400">({m.urdu})</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 leading-6">{m.instruction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Measurement table template */}
        <div className="mt-10 rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-ink px-5 py-3">
            <h2 className="text-sm font-semibold text-white">Measurement Template</h2>
            <p className="text-xs text-gray-400">Copy this and fill it in before sending to us on WhatsApp</p>
          </div>
          <div className="p-5 font-mono text-xs text-gray-700 bg-gray-50 leading-7 whitespace-pre">
            {`Chest (Seena):     ______ inches
Waist (Kamar):     ______ inches
Shoulder (Kandha): ______ inches
Sleeve (Bazu):     ______ inches
Length (Lamba'i):  ______ inches
Neck (Gardan):     ______ inches
Hip (Koolay):      ______ inches`}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Have your measurements ready? Send them on WhatsApp to start your order.
          </p>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
              `Assalam o Alaikum! I have taken my measurements and would like to order a sherwani/prince coat.\n\nChest:     ___ inches\nWaist:     ___ inches\nShoulder:  ___ inches\nSleeve:    ___ inches\nLength:    ___ inches\nNeck:      ___ inches\nHip:       ___ inches`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
          >
            <WhatsAppIcon />
            Send Measurements on WhatsApp
          </a>
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
