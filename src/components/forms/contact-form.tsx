"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[+\d\s-]{10,}$/, "Please enter a valid phone number"),
  city: z.string().min(2, "Please enter your city"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subject: z.enum(["sherwani", "prince_coat", "waistcoat", "general"]).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "WEB" }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-emerald-50 p-8 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-emerald-500 mb-4" aria-hidden="true" />
        <h3 className="text-base font-semibold text-gray-900">Message received!</h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ll get back to you via WhatsApp shortly. For faster response,
          you can also message us directly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-[#c9a227] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      aria-label="Contact form"
    >
      {/* Name */}
      <Field label="Full Name" error={errors.name?.message}>
        <input
          {...register("name")}
          type="text"
          id="name"
          autoComplete="name"
          placeholder="Ali Khan"
          className={inputClass(!!errors.name)}
        />
      </Field>

      {/* Phone */}
      <Field label="Phone / WhatsApp" error={errors.phone?.message}>
        <input
          {...register("phone")}
          type="tel"
          id="phone"
          autoComplete="tel"
          placeholder="+92 300 0000000"
          className={inputClass(!!errors.phone)}
        />
      </Field>

      {/* City */}
      <Field label="City" error={errors.city?.message}>
        <input
          {...register("city")}
          type="text"
          id="city"
          autoComplete="address-level2"
          placeholder="Rawalpindi / Islamabad"
          className={inputClass(!!errors.city)}
        />
      </Field>

      {/* Subject */}
      <Field label="I need…" error={errors.subject?.message}>
        <select
          {...register("subject")}
          id="subject"
          defaultValue=""
          className={inputClass(!!errors.subject)}
        >
          <option value="" disabled>
            Select a subject
          </option>
          <option value="sherwani">Sherwani</option>
          <option value="prince_coat">Prince Coat</option>
          <option value="waistcoat">Waistcoat</option>
          <option value="general">General Enquiry</option>
        </select>
      </Field>

      {/* Message */}
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          placeholder="Tell us about your occasion, date, or any specific requirements…"
          className={inputClass(!!errors.message)}
        />
      </Field>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" role="alert">
          Something went wrong. Please try WhatsApp for a faster response.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === "loading"}
        className="w-full"
      >
        Send Message
      </Button>
    </form>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent",
    "transition-colors",
    hasError
      ? "border-red-300 bg-red-50"
      : "border-gray-200 bg-white hover:border-gray-300",
  ].join(" ");
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={(children as React.ReactElement<{ id: string }>).props?.id}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
