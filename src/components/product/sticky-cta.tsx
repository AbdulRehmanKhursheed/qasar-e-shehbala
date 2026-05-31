"use client";

import { useCallback } from "react";
import { generateRef, buildWhatsAppUrl, formatPKR } from "@/lib/utils";
import { fireWhatsAppBeacon } from "@/lib/analytics";

interface StickyCtaProps {
  productName: string;
  sku?: string;
  productUrl: string;
  productId: string;
  variantId?: string;
  priceMinor: string;
  isMTO: boolean;
}

export function StickyCta({
  productName,
  sku,
  productUrl,
  productId,
  variantId,
  priceMinor,
  isMTO,
}: StickyCtaProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const ref = generateRef();
      const waUrl = buildWhatsAppUrl({ ref, productName, sku, productUrl });
      const url = fireWhatsAppBeacon({ whatsappUrl: waUrl, referenceId: ref, productId, variantId });
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [productName, sku, productUrl, productId, variantId]
  );

  const fallbackUrl = buildWhatsAppUrl({ ref: "QES", productName, sku, productUrl });
  const price = Number(priceMinor);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-parchment/95 px-4 py-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="leading-tight">
          {price > 0 && <p className="font-display text-xl text-charcoal">{formatPKR(price)}</p>}
          <p className="text-[11px] text-mist">{isMTO ? "Made to measure" : "Ready to wear"}</p>
        </div>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
          aria-label={`Order ${productName} on WhatsApp`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
