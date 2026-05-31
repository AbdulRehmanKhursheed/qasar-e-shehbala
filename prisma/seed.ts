import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const PKR = (rupees: number): bigint => BigInt(rupees * 100);

async function main() {
  const branch = await prisma.branch.upsert({
    where: { id: "branch-saddar" },
    update: {},
    create: {
      id: "branch-saddar",
      name: "Saddar Flagship",
      city: "Rawalpindi",
      address: "Main Saddar Road, Saddar, Rawalpindi",
      phone: "+92 300 0000000",
    },
  });

  const ownerPassword = await hash("changeme123", 10);
  await prisma.staff.upsert({
    where: { email: "owner@qasarshehbala.pk" },
    update: {},
    create: {
      name: "Shop Owner",
      email: "owner@qasarshehbala.pk",
      passwordHash: ownerPassword,
      role: "OWNER",
      branchId: branch.id,
    },
  });

  const categories = [
    { slug: "groom-wear", name: "Groom Wear", introCopy: "Complete made-to-measure groom packages, crafted in Saddar since 1999." },
    { slug: "sherwani", name: "Sherwani", introCopy: "Hand-finished sherwanis in jamawar, velvet and banarsi — the centrepiece of every barat." },
    { slug: "prince-coat", name: "Prince Coat", introCopy: "Sharp, structured prince coats for the walima and semi-formal functions." },
    { slug: "waistcoat", name: "Waistcoats", introCopy: "Fine waistcoats to layer over a kurta for the nikah and mehndi." },
  ];

  const categoryMap = new Map<string, string>();
  for (const category of categories) {
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { introCopy: category.introCopy },
      create: category,
    });
    categoryMap.set(category.slug, record.id);
  }

  const fabrics = [
    { code: "JAM-01", name: "Jamawar", composition: "Silk-cotton blend", color: "Ivory" },
    { code: "VEL-01", name: "Velvet", composition: "Cotton velvet", color: "Bottle Green" },
    { code: "VEL-02", name: "Velvet", composition: "Cotton velvet", color: "Oxblood Maroon" },
    { code: "BAN-01", name: "Banarsi", composition: "Silk with zari", color: "Gold" },
  ];

  const fabricMap = new Map<string, string>();
  for (const fabric of fabrics) {
    const record = await prisma.fabric.upsert({
      where: { code: fabric.code },
      update: {},
      create: fabric,
    });
    fabricMap.set(fabric.code, record.id);
  }

  const products: {
    slug: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    fabrics: string[];
    images: { alt: string }[];
  }[] = [
    {
      slug: "black-velvet-embroidered-sherwani",
      name: "Black Velvet Embroidered Sherwani",
      description:
        "A deep black velvet sherwani with tonal dabka work on the collar and placket. Cut for the barat, finished by hand. The most photographed look of the season.",
      category: "sherwani",
      basePrice: 165000,
      fabrics: ["VEL-01", "VEL-02"],
      images: [{ alt: "Black velvet embroidered groom sherwani with churidar" }],
    },
    {
      slug: "ivory-jamawar-sherwani",
      name: "Ivory Jamawar Sherwani",
      description:
        "An ivory jamawar sherwani with a self-woven paisley pattern and restrained tilla embroidery. A timeless, structured choice for the groom who prefers classic over loud.",
      category: "sherwani",
      basePrice: 145000,
      fabrics: ["JAM-01"],
      images: [{ alt: "Ivory jamawar groom sherwani with self paisley pattern" }],
    },
    {
      slug: "bottle-green-velvet-sherwani",
      name: "Bottle Green Velvet Sherwani",
      description:
        "Bottle green velvet with gold zardozi on the collar and cuffs. Rich under indoor lighting and unbeatable for a winter barat.",
      category: "sherwani",
      basePrice: 175000,
      fabrics: ["VEL-01"],
      images: [{ alt: "Bottle green velvet groom sherwani with gold zardozi" }],
    },
    {
      slug: "navy-prince-coat",
      name: "Navy Prince Coat",
      description:
        "A sharply tailored navy prince coat in a fine wool-blend. Minimal, semi-formal, and easy to wear again — the walima favourite.",
      category: "prince-coat",
      basePrice: 58000,
      fabrics: [],
      images: [{ alt: "Navy blue prince coat for groom walima" }],
    },
    {
      slug: "charcoal-prince-coat",
      name: "Charcoal Prince Coat",
      description:
        "A charcoal prince coat with a structured shoulder and clean lines. Flattering on every build and endlessly re-wearable.",
      category: "prince-coat",
      basePrice: 56000,
      fabrics: [],
      images: [{ alt: "Charcoal grey prince coat for groom" }],
    },
    {
      slug: "ivory-embroidered-waistcoat",
      name: "Ivory Embroidered Waistcoat",
      description:
        "A fine ivory waistcoat with subtle thread work, made to layer over a kurta for the nikah or mehndi.",
      category: "waistcoat",
      basePrice: 18000,
      fabrics: ["BAN-01"],
      images: [{ alt: "Ivory embroidered groom waistcoat for nikah" }],
    },
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: { description: product.description, basePriceMinor: PKR(product.basePrice) },
      create: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        productType: product.category === "waistcoat" ? "BOTH" : "MADE_TO_ORDER",
        categoryId: categoryMap.get(product.category),
        basePriceMinor: PKR(product.basePrice),
        isPublished: true,
        romanUrduKeywords: "dulha ki sherwani, prince coat banwana, shaadi ka joora",
        images: {
          create: product.images.map((image, index) => ({
            r2Key: `seed/${product.slug}-${index + 1}.jpg`,
            alt: image.alt,
            sortOrder: index,
          })),
        },
        variants: {
          create: [
            {
              sku: `${product.slug.toUpperCase().replace(/-/g, "").slice(0, 12)}-STD`,
              attributes: { size: "Custom" } as Prisma.InputJsonValue,
              isStockTracked: product.category === "waistcoat",
            },
          ],
        },
      },
    });

    for (const fabricCode of product.fabrics) {
      const fabricId = fabricMap.get(fabricCode);
      if (!fabricId) continue;
      await prisma.productFabricOption.upsert({
        where: { productId_fabricId: { productId: created.id, fabricId } },
        update: {},
        create: { productId: created.id, fabricId },
      });
    }
  }

  console.log("Seed complete: 1 branch, 1 owner, 4 categories, 4 fabrics, 6 products.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
