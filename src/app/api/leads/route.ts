import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateRef } from "@/lib/utils";

const leadSchema = z.object({
  name: z.string().min(2).max(128),
  phone: z.string().min(10).max(20).regex(/^[+\d\s-]+$/),
  city: z.string().min(2).max(64),
  message: z.string().min(10).max(2000).optional(),
  subject: z.enum(["sherwani", "prince_coat", "waistcoat", "general"]).optional(),
  source: z.enum(["WEB", "WHATSAPP", "INSTAGRAM", "REFERRAL", "PHONE"]).default("WEB"),
  productId: z.string().optional(),
  sizeNote: z.string().max(256).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const result = leadSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: result.error.flatten() },
        { status: 422 }
      );
    }

    const ref = generateRef();

    // TODO: persist to Lead via Prisma (stage: ENQUIRY)
    if (process.env.NODE_ENV === "development") {
      console.log("[lead]", { ref, ...result.data });
    }

    return NextResponse.json({ success: true, ref }, { status: 201 });
  } catch (error) {
    console.error("[leads]", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
