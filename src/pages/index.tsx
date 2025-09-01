import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import OrderBy from "@/components/OrderBy";
import Pagination from "@/components/Pagination";
import { listProducts, Product, searchProducts, type SearchResult } from "@/lib/api";
import ProductCard from "@/components/product-card";


export default function Home() {
  const router = useRouter();
  const q = typeof router.query.q === "string" ? router.query.q : "";
  const page = useMemo(() => {
    const p = Number(router.query.page ?? 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [router.query.page]);

  const take = 12;
  const [items, setItems] = useState<Product[]>([]);
  const [pal, setPal] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const ctrl = useRef<AbortController | null>(null);

  const skip = useMemo(() => (page - 1) * take, [page, take]);

  useEffect(() => {
    const ac = new AbortController();
    ctrl.current?.abort();
    ctrl.current = ac;

    async function run() {
      setLoading(true);
      try {
        let r: SearchResult;
        if (q && q.trim()) {
          r = await searchProducts(q.trim(), skip, take);
        } else {
          r = await listProducts(skip, take);
        }
        if (ac.signal.aborted) return;
        setItems(r.items as Product[]);
        setPal(!!r.palindrome);
        setTotal(r.total);
      } catch {
        if (ac.signal.aborted) return;
        setItems([]);
        setPal(false);
        setTotal(0);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    }

    run();
    return () => ac.abort();
  }, [q, skip, take]);

  const onSearch = (term: string) => {
    const usp = new URLSearchParams();
    if (term?.trim()) usp.set("q", term.trim());
    usp.set("page", "1"); // reinicia paginación
    router.push(`/?${usp.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={onSearch} initial={q} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg">
            {q ? <>Resultados para <span className="font-semibold">{q}</span>:</> : "Todos los productos"}
          </p>
          <div className="ml-auto">
            <OrderBy onChange={() => { /* ordenar en cliente si quieres */ }} />
          </div>
        </div>

        {q && pal && (
          <p className="text-sm text-red-600 mb-4">
            50% de descuento aplicado por búsqueda palíndroma.
          </p>
        )}

        {loading ? (
          <p>Cargando…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>

            <div className="mt-6">
              <Pagination page={page} take={take} total={total} q={q || undefined} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
