import { ProductItem } from "@/components/product-card";

export type SearchResponse = { 
    items: ProductItem[]; 
    palindrome: boolean;
    total: number 
};

const BASE = process.env.NEXT_PUBLIC_API_URL!;
export async function searchProducts(q: string, skip = 0, take = 12): Promise<SearchResponse> {
  const url = new URL("/api/search", BASE);
  url.searchParams.set("q", q);
  url.searchParams.set("skip", String(skip));
  url.searchParams.set("take", String(take));
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}
