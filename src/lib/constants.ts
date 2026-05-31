export const SITE = {
  name: "Qasar-e-Shehbala",
  tagline: "Premium Groom Wear Since 1999",
  description:
    "Rawalpindi's finest made-to-measure groom wear — sherwani, prince coats, waistcoats, and premium eastern menswear. Tailored by master karigars in Saddar since 1999.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  logo: "/logos/q-s-logo.jpeg",
  ogImage: "/logos/q-s-logo.jpeg",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+92 300 0000000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923000000000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@qasarshehbala.pk",
  address: {
    line1: "Main Saddar Road",
    area: "Saddar",
    city: "Rawalpindi",
    province: "Punjab",
    country: "Pakistan",
    postalCode: "46000",
  },
  social: {
    instagram: "https://instagram.com/qasarshehbala",
    facebook: "https://facebook.com/qasarshehbala",
    youtube: "https://youtube.com/@qasarshehbala",
  },
  openingHours: "Mon–Sat 10:00–21:00 PKT",
  established: 1999,
  /** Default lead time for made-to-order (working days). Updated manually during peak. */
  defaultLeadTimeDays: 15,
};

export const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Groom Wear", href: "/collections/groom-wear" },
  { label: "Sherwani", href: "/collections/sherwani" },
  { label: "Prince Coat", href: "/collections/prince-coat" },
  { label: "Waistcoats", href: "/collections/waistcoats" },
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
