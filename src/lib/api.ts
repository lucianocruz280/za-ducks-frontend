
export type Product = {
  id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  originalPrice?: number;
  discountApplied?: boolean;
};

export type SearchResult = {
  items: Product[];
  palindrome: boolean;
  total: number;
};

const BASE = process.env.NEXT_PUBLIC_API_URL!;
export async function listProducts(skip = 0, take = 12): Promise<SearchResult> {
  const res = await fetch(`${BASE}/api/products?skip=${skip}&take=${take}`);
  if (!res.ok) throw new Error(`List products failed: ${res.status}`);
  return res.json();
}

export async function searchProducts(q: string, skip = 0, take = 12): Promise<SearchResult> {
  const url = `${BASE}/api/products/search?q=${encodeURIComponent(q)}&skip=${skip}&take=${take}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}
