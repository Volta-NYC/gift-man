import collectionsData from "@/data/collections.json";
import productsData from "@/data/products.json";
import type { Collection, Product } from "@/lib/types";

export const products = productsData as Product[];
export const collections = collectionsData as Collection[];

export function getProduct(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionProducts(collection: Collection) {
  const handles = new Set(collection.productHandles);
  return products.filter((product) => handles.has(product.handle));
}

export function getRelatedProducts(product: Product, limit = 4) {
  const collection = product.collections[0];
  const related = products.filter(
    (candidate) => candidate.handle !== product.handle && candidate.collections.includes(collection)
  );

  if (related.length >= limit) return related.slice(0, limit);

  return [
    ...related,
    ...products.filter((candidate) => candidate.handle !== product.handle && !related.includes(candidate)),
  ].slice(0, limit);
}

export function getFeaturedProducts(limit = 12) {
  const keywords = /(tote|t-shirt|snapback|cap|bridge|mug|onesie|hoodie|gift card|park slope)/i;
  return products
    .filter((product) => keywords.test(`${product.title} ${product.tags.join(" ")} ${product.productType}`))
    .slice(0, limit);
}

export function getHeroProducts() {
  const picks = [
    "brooklyn-embroided-snapback",
    "park-slope-brooklyn-t-shirt",
    "brooklyn-tote",
    "brooklyn-map-black-tote",
    "brooklyn-blue-jean-denim-tote",
  ];

  return picks
    .map((handle) => getProduct(handle))
    .filter((product): product is Product => Boolean(product));
}

export function getGiftCardProduct() {
  return products.find((product) => /gift card/i.test(product.title));
}

export function getSearchIndexText(product: Product) {
  return [
    product.title,
    product.description,
    product.productType,
    product.markdownType,
    product.tags.join(" "),
    product.collections.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}
