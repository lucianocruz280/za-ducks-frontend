import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";

import OrderBy from "@/components/OrderBy";
import Pager from "@/components/Pagination";
import { searchProducts } from "@/lib/api";
import ProductCard, { ProductItem } from "@/components/product-card";

export default function Home() {
  const [q, setQ] = useState("Abba");
  const [items, setItems] = useState<ProductItem[]>([]);
  const [pal, setPal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const take = 12;
  const ctrl = useRef<AbortController | null>(null);
  const [total, setTotal] = useState(0);

  const skip = useMemo(() => (page - 1) * take, [page]);
  async function runSearch(query: string, p = 1) {
    setQ(query);
    setPage(p);
    ctrl.current?.abort();
    ctrl.current = new AbortController();
    setLoading(true);
    try {
      const r = await searchProducts(query, (p - 1) * take, take);
      setItems(r.items);
      setPal(r.palindrome);
      setTotal(r.total);
    } catch {
      setItems([]); setPal(false); setTotal(0);
    } finally { setLoading(false); }
  }

  useEffect(() => { runSearch(q, 1); }, []); // carga demo

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={(s) => runSearch(s, 1)} initial={q} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg">Resultados para <span className="font-semibold">{q}</span>:</p>
          <div className="ml-auto"><OrderBy onChange={() => { /* opcional ordenar en cliente */ }} /></div>
        </div>

        {pal && <p className="text-sm text-red-600 mb-4">50% de descuento aplicado por búsqueda palíndroma.</p>}

        {loading ? (
          <p>Cargando…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            <div className="mt-6">
              <Pager
                page={page}
                totalPages={Math.ceil(total / take) || 1}
                onPage={(p) => runSearch(q, p)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
