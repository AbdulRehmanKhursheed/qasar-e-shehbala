"use client";

import { ANALYTICS_EVENTS } from "@/lib/constants";

export type EventType = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export interface AnalyticsPayload {
  eventType: EventType;
  referenceId?: string;
  productId?: string;
  variantId?: string;
  source?: string;
  utmCampaign?: string;
  pageUrl?: string;
  payload?: Record<string, unknown>;
}

export function fireBeacon(data: AnalyticsPayload): void {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    ...data,
    pageUrl: data.pageUrl ?? window.location.href,
  });

  const sent = navigator.sendBeacon?.("/api/beacon", body);
  if (!sent) {
    fetch("/api/beacon", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  }
}

export function fireWhatsAppBeacon(params: {
  whatsappUrl: string;
  referenceId: string;
  productId?: string;
  variantId?: string;
}): string {
  fireBeacon({
    eventType: ANALYTICS_EVENTS.WHATSAPP_CLICK,
    referenceId: params.referenceId,
    productId: params.productId,
    variantId: params.variantId,
    source: "whatsapp_cta",
  });
  return params.whatsappUrl;
}
