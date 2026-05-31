import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation. The merchant portal calls this after publishing or
 * editing a product so the public pages update within seconds instead of
 * waiting for the ISR window. Guarded by a shared secret.
 *
 * POST /api/revalidate
 *   header: x-revalidate-secret: <REVALIDATE_SECRET>
 *   body:   { paths?: string[], slug?: string }
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { paths?: string[]; slug?: string } = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine — fall back to the default set below
  }

  const paths = new Set<string>(body.paths ?? []);
  // Always refresh the surfaces a catalog change affects.
  paths.add("/");
  paths.add("/collections");
  paths.add("/lookbook");
  paths.add("/sitemap.xml");
  if (body.slug) paths.add(`/products/${body.slug}`);

  for (const path of paths) revalidatePath(path);

  return NextResponse.json({ revalidated: true, paths: [...paths] });
}
