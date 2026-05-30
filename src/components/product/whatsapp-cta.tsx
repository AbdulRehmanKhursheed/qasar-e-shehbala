"use client";

import { useCallback } from "react";
import { generateRef, buildWhatsAppUrl } from "@/lib/utils";
import { fireWhatsAppBeacon } from "@/lib/analytics";
import type { WhatsAppCTAProps } from "@/types";
import { cn } from "@/lib/utils";

export function WhatsAppCTA({
  productName,
  sku,
  fabricName,
  sizeName,
  productUrl,
  productId,
  variantId,
  className,
}: WhatsAppCTAProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const ref = generateRef();
      const waUrl = buildWhatsAppUrl({
        ref,
        productName,
        sku,
        fabric: fabricName,
        size: sizeName,
        productUrl,
      });

      const url = fireWhatsAppBeacon({ whatsappUrl: waUrl, referenceId: ref, productId, variantId });
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [productName, sku, fabricName, sizeName, productUrl, productId, variantId]
  );

  const fallbackUrl = buildWhatsAppUrl({
    ref: "QES",
    productName,
    sku,
    fabric: fabricName,
    size: sizeName,
    productUrl,
  });

  return (
    <a
      href={fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-center gap-2.5 rounded-xl",
        "bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white",
        "hover:bg-[#1ebe5d] active:bg-[#18a851]",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        className
      )}
      aria-label={`Order ${productName} on WhatsApp`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
      </svg>
      <span>Order on WhatsApp</span>
    </a>
  );
}
