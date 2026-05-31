import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordEvent } from "@/server/analytics/mutations";

const beaconSchema = z.object({
  eventType: z.string().max(64),
  referenceId: z.string().max(64).optional(),
  productId: z.string().max(64).optional(),
  variantId: z.string().max(64).optional(),
  source: z.string().max(64).optional(),
  utmCampaign: z.string().max(128).optional(),
  pageUrl: z.string().url().max(2048).optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const result = beaconSchema.safeParse(await request.json());
    if (!result.success) {
      return new NextResponse(null, { status: 400 });
    }

    await recordEvent(result.data);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL ?? "*",
      "Access-Control-Allow-Methods": "POST",
    },
  });
}
