import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/server/leads/mutations";

const leadSchema = z.object({
  name: z.string().min(2).max(128),
  phone: z.string().min(10).max(20).regex(/^[+\d\s-]+$/),
  city: z.string().min(2).max(64),
  message: z.string().min(10).max(2000).optional(),
  subject: z.enum(["sherwani", "prince_coat", "waistcoat", "general"]).optional(),
  source: z
    .enum(["WEB", "DIRECT_WHATSAPP", "INSTAGRAM", "REFERRAL", "PHONE", "WALK_IN"])
    .default("WEB"),
  productId: z.string().optional(),
  sizeNote: z.string().max(256).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const result = leadSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: result.error.flatten() },
      { status: 422 }
    );
  }

  try {
    const { subject, message, sizeNote, ...rest } = result.data;
    const enquiryNote = sizeNote ?? ([subject, message].filter(Boolean).join(": ") || undefined);
    const lead = await createLead({ ...rest, sizeNote: enquiryNote });
    return NextResponse.json({ success: true, ref: lead.ref }, { status: 201 });
  } catch (error) {
    console.error("[leads]", error);
    return NextResponse.json({ success: false, error: "Could not save your enquiry" }, { status: 503 });
  }
}
