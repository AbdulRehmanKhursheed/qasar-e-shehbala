export const SITE = {
  name: "Qasar-e-Shehbala",
  tagline: "Premium Groom Wear Since 1999",
  description:
    "Rawalpindi's finest made-to-measure groom wear — sherwani, prince coats, waistcoats, and premium eastern menswear. Tailored by master karigars in Saddar since 1999. Rated 5.0 by over 138 happy grooms.",
  rating: { value: 5.0, count: 138 },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  logo: "/logos/q-s-logo.jpeg",
  ogImage: "/logos/q-s-logo.jpeg",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+92 336 5424143",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923045919454",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "malik.ali5560@gmail.com",
  address: {
    line1: "Shop M 26, Mezzanine Floor, Bank Road",
    area: "Saddar",
    city: "Rawalpindi",
    province: "Punjab",
    country: "Pakistan",
    postalCode: "46000",
    full: "Shop M 26, Mezzanine Floor, Bank Road, Saddar, Rawalpindi, 46000",
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
  { label: "Groom Wear", href: "/collections/groom-wear" },
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
