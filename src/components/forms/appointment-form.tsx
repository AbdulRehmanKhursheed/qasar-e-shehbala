"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  city: z.string().min(2, "City is required"),
  appointmentType: z.enum(["consultation", "measurement", "fitting"]),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  notes: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { appointmentType: "consultation", preferredTime: "afternoon" },
  });

  async function onSubmit(data: Values) {
    setStatus("loading");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
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
        <h3 className="font-semibold text-gray-900">Request submitted!</h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ll confirm your appointment via WhatsApp within a few hours.
        </p>
      </div>
    );
  }

  // Build min date = tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label="Full Name" id="appt-name" error={errors.name?.message}>
        <input
          {...register("name")}
          id="appt-name"
          type="text"
          autoComplete="name"
          placeholder="Ali Khan"
          className={ic(!!errors.name)}
        />
      </Field>

      <Field label="Phone / WhatsApp" id="appt-phone" error={errors.phone?.message}>
        <input
          {...register("phone")}
          id="appt-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+92 300 0000000"
          className={ic(!!errors.phone)}
        />
      </Field>

      <Field label="City" id="appt-city" error={errors.city?.message}>
        <input
          {...register("city")}
          id="appt-city"
          type="text"
          placeholder="Rawalpindi / Islamabad"
          className={ic(!!errors.city)}
        />
      </Field>

      <Field label="Appointment Type" id="appt-type" error={errors.appointmentType?.message}>
        <select {...register("appointmentType")} id="appt-type" className={ic(!!errors.appointmentType)}>
          <option value="consultation">Initial Consultation</option>
          <option value="measurement">Measurement Session</option>
          <option value="fitting">Fitting Appointment</option>
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Preferred Date" id="appt-date" error={errors.preferredDate?.message}>
          <input
            {...register("preferredDate")}
            id="appt-date"
            type="date"
            min={minDateStr}
            className={ic(!!errors.preferredDate)}
          />
        </Field>

        <Field label="Preferred Time" id="appt-time" error={errors.preferredTime?.message}>
          <select {...register("preferredTime")} id="appt-time" className={ic(!!errors.preferredTime)}>
            <option value="morning">Morning (10–1pm)</option>
            <option value="afternoon">Afternoon (1–5pm)</option>
            <option value="evening">Evening (5–9pm)</option>
          </select>
        </Field>
      </div>

      <Field label="Additional Notes" id="appt-notes" error={undefined}>
        <textarea
          {...register("notes")}
          id="appt-notes"
          rows={3}
          placeholder="Event date, garment type, special requests…"
          className={ic(false)}
        />
      </Field>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" role="alert">
          Failed to submit. Please WhatsApp us directly.
        </p>
      )}

      <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
        Request Appointment
      </Button>
    </form>
  );
}

const ic = (err: boolean) =>
  [
    "w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition-colors",
    err ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300",
  ].join(" ");

function Field({
  label, id, error, children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600" role="alert">{error}</p>}
    </div>
  );
}
