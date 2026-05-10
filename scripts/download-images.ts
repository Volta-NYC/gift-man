import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

type ShopifyImage = {
  src: string;
  width?: number;
  height?: number;
};

type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  images?: ShopifyImage[];
};

type ShopifyResponse = {
  products: ShopifyProduct[];
};

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const PRODUCT_IMAGE_DIR = path.join(PUBLIC_DIR, "images", "products");
const DATA_DIR = path.join(ROOT, "src", "data");
const RAW_PRODUCTS_PATH = path.join(DATA_DIR, "shopify-products.raw.json");
const MEDIA_MANIFEST_PATH = path.join(DATA_DIR, "media-manifest.json");
const STORE_MEDIA_PATH = path.join(DATA_DIR, "store-media.json");
const SHOP_URL = "https://giftmangifts.com";
const PRODUCT_URLS = [
  `${SHOP_URL}/products.json?limit=250`,
  `${SHOP_URL}/products.json?limit=250&page=2`,
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeHandle(handle: string) {
  return handle
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function absoluteUrl(rawUrl: string) {
  if (rawUrl.startsWith("//")) return `https:${rawUrl}`;
  if (rawUrl.startsWith("/")) return `${SHOP_URL}${rawUrl}`;
  return rawUrl;
}

function extensionFromUrl(rawUrl: string) {
  const url = new URL(absoluteUrl(rawUrl));
  const ext = path.extname(url.pathname).replace(".", "").toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return ext === "jpeg" ? "jpg" : ext;
  return "jpg";
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed ${url}: ${response.status} ${response.statusText}`);
  return response.json() as Promise<T>;
}

async function fetchBufferWithRetry(url: string, label: string, attempts = 3): Promise<Buffer | null> {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(absoluteUrl(url), {
        headers: {
          "user-agent": "GiftMan local media archiver",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`  attempt ${attempt}/${attempts} failed for ${label}: ${message}`);
      if (attempt < attempts) await sleep(1000);
    }
  }

  return null;
}

async function writeProductPlaceholder(filePath: string, productTitle: string) {
  const safeTitle = productTitle
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="${safeTitle}">
  <rect width="1200" height="900" fill="#fffaf4"/>
  <rect x="36" y="36" width="1128" height="828" rx="28" fill="#ffffff" stroke="#161313" stroke-width="10"/>
  <path d="M132 245h936" stroke="#d74735" stroke-width="18" stroke-linecap="round"/>
  <text x="600" y="392" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800" fill="#161313">GIFT MAN</text>
  <text x="600" y="486" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#d74735">BROOKLYN SINCE 1982</text>
  <text x="600" y="590" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#5e5550">${safeTitle.slice(0, 42)}</text>
</svg>`;

  await fs.writeFile(filePath, svg);
}

async function writeBrandFallbacks() {
  const imagesDir = path.join(PUBLIC_DIR, "images");
  await ensureDir(imagesDir);

  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="124" viewBox="0 0 420 124" role="img" aria-label="Gift Man">
  <rect width="420" height="124" rx="14" fill="#161313"/>
  <path d="M24 24h76v76H24z" fill="#d74735"/>
  <path d="M38 49h48M62 35v55" stroke="#fffaf4" stroke-width="10" stroke-linecap="round"/>
  <text x="120" y="59" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" letter-spacing="1" fill="#fffaf4">GIFT MAN</text>
  <text x="121" y="89" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="2.5" fill="#f6b4a9">BROOKLYN GIFTS</text>
</svg>`;

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#161313"/>
  <rect x="12" y="12" width="40" height="40" rx="4" fill="#d74735"/>
  <path d="M20 31h24M32 18v30" stroke="#fffaf4" stroke-width="7" stroke-linecap="round"/>
</svg>`;

  await fs.writeFile(path.join(imagesDir, "logo.svg"), logoSvg);
  await fs.writeFile(path.join(PUBLIC_DIR, "favicon.svg"), faviconSvg);
  return {
    logo: "/images/logo.svg",
    favicon: "/favicon.svg",
  };
}

function extractAttribute(tag: string, attribute: string) {
  const match = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
  return match?.[1];
}

async function downloadStoreMedia() {
  const storeMedia = await writeBrandFallbacks();

  try {
    const response = await fetch(SHOP_URL);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const html = await response.text();
    const imagesDir = path.join(PUBLIC_DIR, "images");

    const iconMatch = html.match(/<link[^>]+rel=["'][^"']*(?:icon|shortcut icon)[^"']*["'][^>]*>/i);
    const iconHref = iconMatch ? extractAttribute(iconMatch[0], "href") : undefined;
    if (iconHref) {
      const iconBuffer = await fetchBufferWithRetry(iconHref, "store favicon");
      if (iconBuffer) {
        const faviconPath = path.join(PUBLIC_DIR, "favicon.png");
        await sharp(iconBuffer).resize(64, 64, { fit: "contain", background: "#fffaf4" }).png().toFile(faviconPath);
        storeMedia.favicon = "/favicon.png";
      }
    }

    const imageTags = Array.from(html.matchAll(/<img[^>]+>/gi)).map((match) => match[0]);
    const logoTag =
      imageTags.find((tag) => /logo|gift\s*man|gift-man|giftman/i.test(tag)) ??
      imageTags.find((tag) => /header|site/i.test(tag));
    const logoSrc = logoTag ? extractAttribute(logoTag, "src") || extractAttribute(logoTag, "data-src") : undefined;
    if (logoSrc) {
      const logoBuffer = await fetchBufferWithRetry(logoSrc, "store logo");
      if (logoBuffer) {
        const logoPath = path.join(imagesDir, "logo.webp");
        await sharp(logoBuffer).resize({ width: 520, withoutEnlargement: true }).webp({ quality: 86 }).toFile(logoPath);
        storeMedia.logo = "/images/logo.webp";
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Store media fallback used: ${message}`);
  }

  await fs.writeFile(STORE_MEDIA_PATH, `${JSON.stringify(storeMedia, null, 2)}\n`);
  return storeMedia;
}

async function writeImageSet(buffer: Buffer, outputDir: string, index: number, originalExtension: string) {
  const originalPath = path.join(outputDir, `${index}.${originalExtension}`);
  const fullPath = path.join(outputDir, `${index}.webp`);
  const thumbPath = path.join(outputDir, `${index}-640.webp`);

  await fs.writeFile(originalPath, buffer);

  const image = sharp(buffer, { animated: true }).rotate();
  await image
    .clone()
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(fullPath);
  await image
    .clone()
    .resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbPath);

  return `/images/products/${path.basename(outputDir)}/${index}.webp`;
}

async function main() {
  await ensureDir(PRODUCT_IMAGE_DIR);
  await ensureDir(DATA_DIR);
  await ensureDir(path.join(PUBLIC_DIR, "images"));
  await writeProductPlaceholder(path.join(PRODUCT_IMAGE_DIR, "placeholder.svg"), "Gift Man product image");

  console.log("Fetching Shopify product JSON...");
  const responses = await Promise.all(PRODUCT_URLS.map((url) => fetchJson<ShopifyResponse>(url)));
  const products = responses.flatMap((response) => response.products);
  await fs.writeFile(RAW_PRODUCTS_PATH, `${JSON.stringify(products, null, 2)}\n`);
  console.log(`Fetched ${products.length} products.`);

  const totalImages = products.reduce((count, product) => count + Math.max(product.images?.length ?? 0, 1), 0);
  const manifest: Record<string, string[]> = {};
  let completed = 0;

  for (const product of products) {
    const handle = normalizeHandle(product.handle);
    const outputDir = path.join(PRODUCT_IMAGE_DIR, handle);
    await ensureDir(outputDir);

    const imagePaths: string[] = [];
    const images = product.images?.length ? product.images : [{ src: "" }];

    for (const [index, image] of images.entries()) {
      completed += 1;
      const label = `${product.title} (${completed}/${totalImages})`;

      if (!image.src) {
        const placeholderPath = path.join(outputDir, `${index}.svg`);
        await writeProductPlaceholder(placeholderPath, product.title);
        imagePaths.push(`/images/products/${handle}/${index}.svg`);
        console.log(`placeholder ${label}`);
        continue;
      }

      console.log(`download ${label}`);
      const buffer = await fetchBufferWithRetry(image.src, label);

      if (!buffer) {
        const placeholderPath = path.join(outputDir, `${index}.svg`);
        await writeProductPlaceholder(placeholderPath, product.title);
        imagePaths.push(`/images/products/${handle}/${index}.svg`);
        console.log(`  placeholder saved for ${label}`);
      } else {
        try {
          const localPath = await writeImageSet(buffer, outputDir, index, extensionFromUrl(image.src));
          imagePaths.push(localPath);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.warn(`  conversion failed for ${label}: ${message}`);
          const placeholderPath = path.join(outputDir, `${index}.svg`);
          await writeProductPlaceholder(placeholderPath, product.title);
          imagePaths.push(`/images/products/${handle}/${index}.svg`);
        }
      }

      await sleep(200);
    }

    manifest[handle] = imagePaths;
  }

  await downloadStoreMedia();
  await fs.writeFile(MEDIA_MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Saved ${Object.values(manifest).flat().length} product media references.`);
  console.log(`Media manifest: ${path.relative(ROOT, MEDIA_MANIFEST_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
