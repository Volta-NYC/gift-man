import fs from "fs/promises";
import path from "path";

type ShopifyOption = {
  name: string;
  position: number;
  values: string[];
};

type ShopifyVariant = {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  available: boolean;
  price: string;
  compare_at_price: string | null;
};

type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  published_at: string;
  options: ShopifyOption[];
  variants: ShopifyVariant[];
};

type MarkdownProduct = {
  index: number;
  title: string;
  price: string;
  type?: string;
  options?: string;
  description: string;
};

type Product = {
  id: number;
  index: number;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  markdownType: string;
  tags: string[];
  description: string;
  bodyHtml: string;
  price: {
    min: number;
    max: number;
    display: string;
    markdown: string;
  };
  options: ShopifyOption[];
  variants: Array<{
    id: number;
    title: string;
    options: Record<string, string>;
    sku: string;
    available: boolean;
    price: number;
    compareAtPrice: number | null;
  }>;
  available: boolean;
  isOnSale: boolean;
  images: string[];
  featuredImage: string;
  collections: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Collection = {
  name: string;
  slug: string;
  description: string;
  productHandles: string[];
  count: number;
  image: string;
};

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "data");
const RAW_PRODUCTS_PATH = path.join(DATA_DIR, "shopify-products.raw.json");
const MEDIA_MANIFEST_PATH = path.join(DATA_DIR, "media-manifest.json");
const PRODUCTS_OUT = path.join(DATA_DIR, "products.json");
const COLLECTIONS_OUT = path.join(DATA_DIR, "collections.json");
const SCRAPE_CANDIDATES = [
  path.join(ROOT, "giftmangifts_COMPLETE_SCRAPE.md"),
  path.join(ROOT, "files", "giftmangifts_COMPLETE_SCRAPE.md"),
];

const FALLBACK_IMAGE = "/images/products/placeholder.svg";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function readScrape() {
  for (const candidate of SCRAPE_CANDIDATES) {
    try {
      return await fs.readFile(candidate, "utf8");
    } catch {
      // Try the next known location.
    }
  }
  throw new Error("Could not find giftmangifts_COMPLETE_SCRAPE.md");
}

function parseMarkdownProducts(markdown: string): MarkdownProduct[] {
  const productBlocks = markdown.split(/\n(?=####\s+\d+\.\s+)/g).filter((block) => block.startsWith("#### "));

  return productBlocks.map((block) => {
    const heading = block.match(/^####\s+(\d+)\.\s+(.+)$/m);
    if (!heading) throw new Error(`Product heading not found in block: ${block.slice(0, 80)}`);

    const fields = new Map<string, string>();
    for (const match of block.matchAll(/^\*\*([^:*]+):\*\*\s*(.+)$/gm)) {
      fields.set(match[1].trim().toLowerCase(), match[2].trim());
    }

    return {
      index: Number(heading[1]),
      title: heading[2].trim(),
      price: fields.get("price") ?? "",
      type: fields.get("type"),
      options: fields.get("options"),
      description: fields.get("description") ?? "",
    };
  });
}

function parseCollectionNames(markdown: string) {
  const section = markdown.match(/## Collections[\s\S]+?---/);
  if (!section) return [];
  return Array.from(section[0].matchAll(/^\d+\.\s+(.+)$/gm)).map((match) => match[1].trim());
}

function parsePriceFallback(price: string) {
  const values = Array.from(price.matchAll(/\$([0-9]+(?:\.[0-9]{1,2})?)/g)).map((match) => Number(match[1]));
  if (!values.length) return { min: 0, max: 0 };
  return { min: Math.min(...values), max: Math.max(...values) };
}

function formatPrice(min: number, max: number) {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (min === max) return currency.format(min);
  return `${currency.format(min)} - ${currency.format(max)}`;
}

function productText(product: ShopifyProduct, markdown: MarkdownProduct) {
  return normalize(
    [
      product.title,
      product.product_type,
      markdown.type,
      product.tags.join(" "),
      markdown.description,
      stripHtml(product.body_html),
    ].join(" ")
  );
}

function isAdultTee(text: string) {
  return /(adult|men|women|shirt|t shirt|tshirt|tee)/.test(text) && !/(kids|kid|youth|toddler|baby|onesie)/.test(text);
}

function isKidTee(text: string) {
  return /(kids|kid|youth|toddler|children|baby)/.test(text) && /(shirt|t shirt|tshirt|tee|onesie)/.test(text);
}

function inferCollections(product: ShopifyProduct, markdown: MarkdownProduct, collectionNames: string[]) {
  const text = productText(product, markdown);
  const collections = new Set<string>();

  const add = (name: string, condition: boolean) => {
    if (condition && collectionNames.includes(name)) collections.add(name);
  };

  add("Baby", /(baby|onesie|toddler|infant|6months|12months|18months|sock monkey)/.test(text));
  add("Books", /(book|guide|novel|pocket guide|postcard booklet|children s book|preschoolers)/.test(text));
  add("Brooklyn Adult T-shirts", /brooklyn/.test(text) && isAdultTee(text));
  add("Brooklyn Baseball Caps", /brooklyn/.test(text) && /(cap|caps|hat|hats|snapback|baseball cap)/.test(text));
  add("Brooklyn Bridge Souvenir Gifts", /brooklyn bridge/.test(text));
  add("Brooklyn Signs", /brooklyn/.test(text) && /(sign|wall decor|plaque)/.test(text));
  add("Brooklyn Souvenirs", /brooklyn/.test(text));
  add("Brooklyn T-shirts (Kids)", /brooklyn/.test(text) && isKidTee(text));
  add("Brooklyn Themed Adult T-Shirts", /brooklyn/.test(text) && isAdultTee(text));
  add("Disappearing Mugs", /(disappearing mug|heat changing|changes from|hot liquid)/.test(text));
  add("I Heart NY Products", /(i heart ny|i love ny|i love new york)/.test(text));
  add("Kitchen and Dining", /(kitchen|dining|apron|potholder|mitten|coaster|cutting board|dish towel|tea towel|recipe|cookbook)/.test(text));
  add("Mugs", /\bmug\b|\bmugs\b|coffee mug|ceramic mug/.test(text));
  add("New York City Souvenirs", /(new york|nyc|manhattan|statue of liberty|subway|mta|times square|broadway|metrocard|metro card|transit)/.test(text));
  add("New York City T-Shirts", /(new york|nyc|i love ny|i heart ny)/.test(text) && isAdultTee(text));
  add("Shot Glasses", /(shot glass|shot glasses)/.test(text));
  add("Zodiac Magnets", /(zodiac|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces)/.test(text));

  if (collections.size === 0) {
    if (/magnet/.test(text)) {
      if (/brooklyn/.test(text)) collections.add("Brooklyn Souvenirs");
      if (/new york|nyc|statue|subway|mta/.test(text)) collections.add("New York City Souvenirs");
    }
    if (/gift card/.test(text)) collections.add("New York City Souvenirs");
  }

  return Array.from(collections);
}

function collectionDescription(name: string) {
  const descriptions: Record<string, string> = {
    Baby: "Brooklyn keepsakes for the smallest neighborhood regulars: onesies, toddler tees, and soft local gifts.",
    Books: "Guides, maps, city stories, and giftable reads with a strong New York point of view.",
    "Brooklyn Adult T-shirts": "Local tees with Park Slope, bridge, subway, and Brooklyn attitude.",
    "Brooklyn Baseball Caps": "Embroidered caps, snapbacks, and everyday Brooklyn headwear.",
    "Brooklyn Bridge Souvenir Gifts": "Bridge magnets, totes, plaques, puzzles, mugs, and keepsakes.",
    "Brooklyn Signs": "Handmade signs and wall pieces with neighborhood character.",
    "Brooklyn Souvenirs": "A broad mix of Brooklyn gifts, apparel, magnets, totes, mugs, and mementos.",
    "Brooklyn T-shirts (Kids)": "Brooklyn tees and local graphics sized for kids and toddlers.",
    "Brooklyn Themed Adult T-Shirts": "Artist tees, borough slogans, and graphic shirts for grown-up Brooklyn fans.",
    "Disappearing Mugs": "Heat-changing mugs with a little reveal when the coffee goes in.",
    "I Heart NY Products": "Classic I Heart NY apparel and souvenirs.",
    "Kitchen and Dining": "Aprons, coasters, potholders, mugs, and practical gifts for home.",
    Mugs: "Ceramic mugs for coffee, tea, desks, and souvenir shelves.",
    "New York City Souvenirs": "Statue of Liberty, subway, skyline, Times Square, and NYC gift staples.",
    "New York City T-Shirts": "NYC and I Heart NY shirts for visitors, locals, and easy gifting.",
    "Shot Glasses": "Compact New York and Brooklyn shot glasses for classic souvenir collectors.",
    "Zodiac Magnets": "Astrology magnets and small celestial gifts.",
  };

  return descriptions[name] ?? `Gift Man picks from the ${name} collection.`;
}

async function main() {
  const [markdown, rawProductsText, mediaManifestText] = await Promise.all([
    readScrape(),
    fs.readFile(RAW_PRODUCTS_PATH, "utf8"),
    fs.readFile(MEDIA_MANIFEST_PATH, "utf8"),
  ]);

  const markdownProducts = parseMarkdownProducts(markdown);
  const collectionNames = parseCollectionNames(markdown);
  const shopifyProducts = JSON.parse(rawProductsText) as ShopifyProduct[];
  const mediaManifest = JSON.parse(mediaManifestText) as Record<string, string[]>;

  const markdownByTitle = new Map(markdownProducts.map((product) => [normalize(product.title), product]));

  const products: Product[] = shopifyProducts.map((shopifyProduct, index) => {
    const markdownProduct =
      markdownByTitle.get(normalize(shopifyProduct.title)) ??
      markdownProducts[index] ?? {
        index: index + 1,
        title: shopifyProduct.title,
        price: "",
        description: stripHtml(shopifyProduct.body_html),
      };

    const variantPrices = shopifyProduct.variants.map((variant) => Number(variant.price)).filter(Number.isFinite);
    const fallbackPrice = parsePriceFallback(markdownProduct.price);
    const min = variantPrices.length ? Math.min(...variantPrices) : fallbackPrice.min;
    const max = variantPrices.length ? Math.max(...variantPrices) : fallbackPrice.max;
    const options = shopifyProduct.options.filter(
      (option) => option.name !== "Title" && !option.values.every((value) => value === "Default Title")
    );
    const collections = inferCollections(shopifyProduct, markdownProduct, collectionNames);
    const images = mediaManifest[shopifyProduct.handle] ?? mediaManifest[slugify(shopifyProduct.handle)] ?? [FALLBACK_IMAGE];

    return {
      id: shopifyProduct.id,
      index: markdownProduct.index,
      title: shopifyProduct.title,
      handle: shopifyProduct.handle,
      vendor: shopifyProduct.vendor,
      productType: shopifyProduct.product_type || markdownProduct.type || "",
      markdownType: markdownProduct.type ?? "",
      tags: shopifyProduct.tags ?? [],
      description:
        markdownProduct.description && markdownProduct.description !== "(No description provided on site.)"
          ? markdownProduct.description
          : stripHtml(shopifyProduct.body_html),
      bodyHtml: shopifyProduct.body_html || `<p>${markdownProduct.description}</p>`,
      price: {
        min,
        max,
        display: formatPrice(min, max),
        markdown: markdownProduct.price,
      },
      options,
      variants: shopifyProduct.variants.map((variant) => {
        const optionValues: Record<string, string> = {};
        shopifyProduct.options.forEach((option, optionIndex) => {
          const value = [variant.option1, variant.option2, variant.option3][optionIndex];
          if (value && value !== "Default Title") optionValues[option.name] = value;
        });

        return {
          id: variant.id,
          title: variant.title,
          options: optionValues,
          sku: variant.sku,
          available: variant.available,
          price: Number(variant.price),
          compareAtPrice: variant.compare_at_price ? Number(variant.compare_at_price) : null,
        };
      }),
      available: shopifyProduct.variants.some((variant) => variant.available),
      isOnSale: shopifyProduct.variants.some(
        (variant) => variant.compare_at_price && Number(variant.compare_at_price) > Number(variant.price)
      ),
      images,
      featuredImage: images[0] ?? FALLBACK_IMAGE,
      collections,
      createdAt: shopifyProduct.created_at,
      updatedAt: shopifyProduct.updated_at,
      publishedAt: shopifyProduct.published_at,
    };
  });

  const collectionRecords: Collection[] = collectionNames.map((name) => {
    const productHandles = products
      .filter((product) => product.collections.includes(name))
      .map((product) => product.handle);
    const heroProduct = products.find((product) => product.collections.includes(name) && product.featuredImage);

    return {
      name,
      slug: slugify(name),
      description: collectionDescription(name),
      productHandles,
      count: productHandles.length,
      image: heroProduct?.featuredImage ?? products[0]?.featuredImage ?? FALLBACK_IMAGE,
    };
  });

  await fs.writeFile(PRODUCTS_OUT, `${JSON.stringify(products, null, 2)}\n`);
  await fs.writeFile(COLLECTIONS_OUT, `${JSON.stringify(collectionRecords, null, 2)}\n`);

  const missingMedia = products.filter((product) => !product.featuredImage).length;
  const emptyCollections = collectionRecords.filter((collection) => collection.count === 0).map((collection) => collection.name);

  console.log(`Processed ${products.length} products.`);
  console.log(`Generated ${collectionRecords.length} collections.`);
  console.log(`Products missing media: ${missingMedia}`);
  if (emptyCollections.length) console.warn(`Empty collections: ${emptyCollections.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
