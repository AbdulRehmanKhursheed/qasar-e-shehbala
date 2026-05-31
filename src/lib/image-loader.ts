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
  // Full external URL (Unsplash, Pexels, etc.) — pass through with size params
  if (src.startsWith("https://") || src.startsWith("http://")) {
    if (src.includes("unsplash.com")) {
      const params = new URLSearchParams({
        w: String(width),
        q: String(quality),
        auto: "format",
        fit: "crop",
      });
      return src.includes("?") ? `${src}&${params}` : `${src}?${params}`;
    }
    return src;
  }

  const baseUrl = process.env.NEXT_PUBLIC_CF_IMAGES_URL;
  if (!baseUrl) {
    const params = new URLSearchParams({ w: String(width), q: String(quality) });
    return src.includes("?") ? `${src}&${params}` : `${src}?${params}`;
  }

  const r2Key = src.startsWith("/") ? src.slice(1) : src;
  return `${baseUrl}/${r2Key}/w=${width},q=${quality},format=auto`;
}
