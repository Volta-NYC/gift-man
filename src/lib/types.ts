export type ProductOption = {
  name: string;
  position: number;
  values: string[];
};

export type ProductVariant = {
  id: number;
  title: string;
  options: Record<string, string>;
  sku: string;
  available: boolean;
  price: number;
  compareAtPrice: number | null;
};

export type Product = {
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
  options: ProductOption[];
  variants: ProductVariant[];
  available: boolean;
  isOnSale: boolean;
  images: string[];
  featuredImage: string;
  collections: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Collection = {
  name: string;
  slug: string;
  description: string;
  productHandles: string[];
  count: number;
  image: string;
};
