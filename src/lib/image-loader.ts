type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudflareImageLoader({
  src,
  width,
  quality = 80,
}: ImageLoaderProps): string {
  const baseUrl = process.env.NEXT_PUBLIC_CF_IMAGES_URL;

  if (!baseUrl || process.env.NODE_ENV === "development") {
    const params = new URLSearchParams({ w: String(width), q: String(quality) });
    return src.includes("?") ? `${src}&${params}` : `${src}?${params}`;
  }

  const r2Key = src.startsWith("/") ? src.slice(1) : src;
  return `${baseUrl}/${r2Key}/w=${width},q=${quality},format=auto`;
}
