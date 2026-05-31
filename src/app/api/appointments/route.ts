import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAppointment } from "@/server/appointments/mutations";

const appointmentSchema = z.object({
  name: z.string().min(2).max(128),
  phone: z.string().min(10).max(20),
  city: z.string().min(2).max(64),
  appointmentType: z.enum(["consultation", "measurement", "fitting"]),
  preferredDate: z.string().min(1),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  notes: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const result = appointmentSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return NextResponse.json({ success: false, error: "Validation failed" }, { status: 422 });
  }

  try {
    await createAppointment(result.data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[appointments]", error);
    return NextResponse.json({ success: false, error: "Could not book the appointment" }, { status: 503 });
  }
}
