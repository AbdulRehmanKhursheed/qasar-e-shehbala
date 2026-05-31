export const SITE = {
  name: "Qasar-e-Shehbala",
  /** Exact name on the Google Business listing — used in structured data so Google links site ↔ listing. */
  legalName: "Qasar E Shehbala And Groom House Attires",
  tagline: "Premium Groom Wear Since 1999",
  description:
    "Rawalpindi's finest made-to-measure groom wear — sherwani, prince coats, waistcoats, and premium eastern menswear. Tailored by master karigars in Saddar since 1999. Rated 5.0 by over 138 happy grooms.",
  rating: { value: 5.0, count: 138 },
  /** Precise coordinates from the Google Business listing. */
  geo: { lat: 33.5984375, lng: 73.0485625 },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  logo: "/logos/q-s-logo.jpeg",
  ogImage: "/logos/q-s-logo.jpeg",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+92 336 5424143",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923045919454",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "malik.ali5560@gmail.com",
  address: {
    line1: "Shop M 26, Mezzanine Floor, City Centre, Bank Road",
    area: "Saddar",
    city: "Rawalpindi",
    province: "Punjab",
    country: "Pakistan",
    postalCode: "46000",
    full: "Shop M 26, Mezzanine Floor, City Centre, Bank Road, Saddar, Rawalpindi, 46000",
    googleMapsUrl: "https://maps.app.goo.gl/DRAcbHSR37YzFCpe9",
  },
  social: {
    instagram: "https://instagram.com/qasarshehbala",
    facebook: "https://facebook.com/qasarshehbala",
    youtube: "https://youtube.com/@qasarshehbala",
  },
  openingHours: "Mon–Sun 10:00–23:00 PKT",
  established: 1999,
  /** Default lead time for made-to-order (working days). Updated manually during peak. */
  defaultLeadTimeDays: 15,
};

export const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Occasions", href: "/occasions" },
  { label: "Sherwani", href: "/collections/sherwani" },
  { label: "Prince Coat", href: "/collections/prince-coat" },
  { label: "Waistcoats", href: "/collections/waistcoat" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PRODUCT_TYPES = ["STOCK", "MADE_TO_ORDER", "BOTH"] as const;

export const GROOM_CATEGORIES = [
  { slug: "sherwani", label: "Sherwani", romanUrdu: "Sherwani" },
  { slug: "prince-coat", label: "Prince Coat", romanUrdu: "Prince Coat" },
  { slug: "waistcoat", label: "Waistcoat", romanUrdu: "Waistcoat" },
  { slug: "kurta-shalwar", label: "Kurta Shalwar", romanUrdu: "Kurta Shalwar" },
] as const;

/**
 * Standard groom-wear size chart (inches). Reference sizing only — every garment
 * is cut to the customer's own measurements, so these are a starting point.
 */
export const SIZE_CHART = {
  units: "inches",
  columns: ["Size", "Chest", "Waist", "Shoulder", "Sleeve", "Length"],
  rows: [
    { size: "S", chest: "38", waist: "32", shoulder: "17", sleeve: "23", length: "42" },
    { size: "M", chest: "40", waist: "34", shoulder: "17.5", sleeve: "23.5", length: "43" },
    { size: "L", chest: "42", waist: "36", shoulder: "18", sleeve: "24", length: "44" },
    { size: "XL", chest: "44", waist: "38", shoulder: "18.5", sleeve: "24.5", length: "45" },
    { size: "XXL", chest: "46", waist: "40", shoulder: "19", sleeve: "25", length: "46" },
  ],
} as const;

interface CategorySpec {
  fit: string;
  includes: string[];
  occasion: string;
  lining: string;
  care: string;
}

/**
 * Per-category product specifications shown on every product page. These are
 * house standards; the per-product description carries the unique detail.
 */
export const CATEGORY_SPECS: Record<string, CategorySpec> = {
  sherwani: {
    fit: "Tailored, made-to-measure",
    includes: ["Sherwani", "Inner kurta", "Shalwar or churidar pajama"],
    occasion: "Barat · Wedding · Formal",
    lining: "Fully lined",
    care: "Dry clean only",
  },
  "prince-coat": {
    fit: "Slim tailored, made-to-measure",
    includes: ["Prince coat", "Matching trouser"],
    occasion: "Walima · Reception · Formal events",
    lining: "Fully lined",
    care: "Dry clean only",
  },
  waistcoat: {
    fit: "Tailored over kurta, made-to-measure",
    includes: ["Waistcoat"],
    occasion: "Mehndi · Nikah · Semi-formal",
    lining: "Lined",
    care: "Dry clean recommended",
  },
  "kurta-shalwar": {
    fit: "Relaxed tailored, made-to-measure",
    includes: ["Kurta", "Shalwar"],
    occasion: "Mehndi · Nikah · Festive",
    lining: "Unlined",
    care: "Dry clean or gentle hand wash",
  },
};

export const DEFAULT_CATEGORY_SPEC: CategorySpec = {
  fit: "Tailored, made-to-measure",
  includes: ["The garment as shown"],
  occasion: "Wedding · Formal",
  lining: "Lined",
  care: "Dry clean only",
};

/** Cross-cutting promises shown as a trust row across the storefront. */
export const TRUST_POINTS = [
  { label: "Rated 5.0", detail: "by 138 grooms" },
  { label: "Since 1999", detail: "Saddar, Rawalpindi" },
  { label: "Master karigars", detail: "hand-finished" },
  { label: "Nationwide delivery", detail: "measurements by WhatsApp" },
] as const;

/**
 * How grooms actually shop — by function. Each occasion curates the relevant
 * categories and doubles as a high-intent SEO landing page.
 */
export const OCCASIONS = [
  {
    slug: "barat",
    label: "Barat",
    romanUrdu: "Barat ki Sherwani",
    tagline: "The showpiece. The grandest look of the wedding.",
    categories: ["sherwani"],
    intro:
      "The barat is the groom's grandest entrance, and the sherwani is its centrepiece. These are our heaviest, most ornate pieces — velvet, jamawar and banarsi with hand zardozi, dabka and tilla — cut to measure for the man of the day.",
    seo:
      "For the barat, grooms in Rawalpindi and Islamabad come to Qasar-e-Shehbala for a sherwani that carries weight — literally and on camera. We have dressed barat grooms from our City Centre, Saddar workshop since 1999, working in rich velvets, structured jamawar and lustrous banarsi, finished with the hand embroidery a barat deserves. Every piece is made to your own naap, so the shoulder line, collar and chest sit exactly as they should in the photographs you will keep for life.",
  },
  {
    slug: "walima",
    label: "Walima",
    romanUrdu: "Walima ka Libas",
    tagline: "Sharper, refined — the reception look.",
    categories: ["prince-coat", "sherwani"],
    intro:
      "The walima calls for something sharper and more refined than the barat. A tailored prince coat — clean lines, structured shoulder, easy to wear again — is the favourite, with a lighter sherwani as the dressier alternative.",
    seo:
      "Walima dressing is about restraint and polish. A made-to-measure prince coat in fine wool or suiting gives the groom a sharp, modern silhouette that works at the reception and long after the wedding. We cut every prince coat and walima sherwani to measure at our Saddar workshop, balancing a structured shoulder with a comfortable, re-wearable fit — the look grooms across Rawalpindi and Islamabad ask for season after season.",
  },
  {
    slug: "mehndi",
    label: "Mehndi",
    romanUrdu: "Mehndi ka JoRa",
    tagline: "Lighter, playful, full of colour.",
    categories: ["kurta-shalwar", "waistcoat"],
    intro:
      "Mehndi is where colour and comfort win. Think a crisp kurta shalwar layered with an embroidered waistcoat — light enough to dance in, bright enough for the occasion.",
    seo:
      "The mehndi is the one function where a groom can have fun with colour. We make kurta shalwar and waistcoat sets that move well through a long night of dhol and dance, in mint, ivory, gold and deeper festive tones. Each set is tailored to measure at City Centre, Saddar — light, breathable and finished with the embroidery that makes a mehndi look feel special without weighing the groom down.",
  },
  {
    slug: "nikah",
    label: "Nikah",
    romanUrdu: "Nikah ka Libas",
    tagline: "Understated, elegant, off-white classics.",
    categories: ["waistcoat", "kurta-shalwar", "prince-coat"],
    intro:
      "The nikah favours quiet elegance — an off-white or ivory kurta with a fine waistcoat, or a subtle prince coat. Refined, photographed close-up, and never loud.",
    seo:
      "Nikah dressing is understated by design. Grooms choose a crisp ivory or off-white kurta with a tailored waistcoat, or a clean prince coat, for a look that reads elegant in the intimate, close-up photographs of the ceremony. We tailor every nikah look to measure at our Saddar workshop, with the precise collar and fit that close photography demands.",
  },
] as const;

/**
 * Long-form, locally-relevant copy shown at the foot of each category page.
 * Written for grooms and for search — mentions place, craft and occasion.
 */
export const CATEGORY_SEO_COPY: Record<string, string> = {
  sherwani:
    "A sherwani is the heart of Pakistani groom wear, and for the barat there is nothing that comes close. At Qasar-e-Shehbala we have been cutting made-to-measure sherwani at City Centre, Saddar in Rawalpindi since 1999 — for grooms from Pindi, Islamabad, and increasingly from across the country and abroad who send their measurements on WhatsApp. We work in velvet, jamawar and banarsi, finished by hand with zardozi, dabka and tilla. Because every sherwani is cut to your own naap, the shoulder, collar and chest sit exactly right — the difference between a sherwani that merely looks expensive and one that fits like it was made for you, because it was.",
  "prince-coat":
    "The prince coat is the modern groom's most versatile piece — sharp enough for the walima, refined enough to wear long after the wedding. Our prince coats are tailored to measure in fine wool blends and suiting at our Saddar workshop, with a structured shoulder and clean lines that flatter every build. Navy, charcoal and black remain the favourites for grooms in Rawalpindi and Islamabad, but we cut to your colour, your cloth and your exact measurements.",
  waistcoat:
    "A well-cut waistcoat lifts a simple kurta into a complete look — the go-to for mehndi, nikah and semi-formal functions. We make embroidered and plain waistcoats to measure at City Centre, Saddar, in banarsi, jamawar and fine suiting. Layered over a crisp kurta, a tailored waistcoat gives the groom and his close family a put-together, photograph-ready look without the weight of a full sherwani.",
  "kurta-shalwar":
    "Kurta shalwar is the most comfortable thing a groom can wear through a long function, and the easiest to dress up or down. Our made-to-measure kurta shalwar — crisp cottons for summer, richer fabrics for the cooler months — is cut at our Saddar workshop to sit cleanly and move well. Pair it with one of our embroidered waistcoats for mehndi or nikah, or wear it on its own for the festive days around the wedding.",
};

/**
 * Real customer reviews, pasted verbatim from the Google listing. Left empty on
 * purpose — fill with actual review excerpts (quote + first name + city) so the
 * site never shows invented testimonials. Until then the home page shows only the
 * real aggregate rating and a link to the live Google reviews.
 */
export const GOOGLE_REVIEWS: { quote: string; name: string; occasion: string }[] = [];

/** Swatch hex for known fabric colours; falls back to a neutral dot otherwise. */
export const COLOR_SWATCHES: Record<string, string> = {
  Black: "#1A1410",
  "Bottle Green": "#1B3A2A",
  Charcoal: "#36454F",
  Gold: "#C9A227",
  Ivory: "#F3ECDD",
  Mint: "#BFD8C5",
  Navy: "#1F2A44",
  "Oxblood Maroon": "#5C1A24",
  White: "#FBFAF6",
};

/** Price filter buckets (PKR rupees). maxPrice null = no upper bound. */
export const PRICE_BUCKETS = [
  { label: "Under ₨50,000", minPrice: undefined, maxPrice: 50000 },
  { label: "₨50,000 – ₨100,000", minPrice: 50000, maxPrice: 100000 },
  { label: "₨100,000 – ₨150,000", minPrice: 100000, maxPrice: 150000 },
  { label: "Over ₨150,000", minPrice: 150000, maxPrice: undefined },
] as const;

/** Event types for whatsapp_click analytics beacon. */
export const ANALYTICS_EVENTS = {
  WHATSAPP_CLICK: "whatsapp_click",
  VIEW_PRODUCT: "view_product",
  PHONE_CLICK: "phone_click",
  DIRECTIONS_CLICK: "directions_click",
  LEAD_FORM_SUBMIT: "lead_form_submit",
  BLOG_READ: "blog_read",
} as const;

/** COD is blocked above this amount (PKR rupees). Enforced in service layer. */
export const COD_THRESHOLD_PKR = 10_000;

export const DEPOSIT_PERCENT_DEFAULT = 30; // minimum 30% for made-to-order
