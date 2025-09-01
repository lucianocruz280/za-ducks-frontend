// src/pages/index.tsx
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header"; // <-- usa tu Header existente
import { listProducts, searchProducts, SearchResult } from "@/lib/api";
import ProductCard from "@/components/product-card";


type Props = {
  data: SearchResult;
  q: string | null;
  page: number;
  take: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const q = (ctx.query.q as string) ?? null;
  const page = Math.max(1, Number(ctx.query.page ?? 1));
  const take = 12;
  const skip = (page - 1) * take;

  const data = q && q.trim()
    ? await searchProducts(q.trim(), skip, take)
    : await listProducts(skip, take);

  return { props: { data, q, page, take } };
};

export default function Home({ data, q, page, take }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const onSearch = (term: string) => {
    const next = new URLSearchParams();
    if (term?.trim()) next.set("q", term.trim());
    next.set("page", "1"); // reinicia paginación al buscar
    router.push(`/?${next.toString()}`);
  };

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / take));
  const goTo = (p: number) => {
    const usp = new URLSearchParams();
    if (q?.trim()) usp.set("q", q.trim());
    usp.set("page", String(p));
    router.push(`/?${usp.toString()}`);
  };

  return (
    <>
      <Head>
        <title>ZA Ducks — Productos</title>
      </Head>

      {/* Tu header existente con onSearch + valor inicial */}
      <Header onSearch={onSearch} initial={q ?? ""} />

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <h1 className="text-xl font-semibold">
          {q?.trim() ? `Resultados para “${q}”` : "Todos los productos"}
        </h1>

        {q?.trim() && (
          <p className="text-sm text-muted-foreground">
            {data.palindrome ? "Consulta palíndroma: se aplicó 50% de descuento." : "Consulta regular."}
          </p>
        )}

        {data.items.length === 0 ? (
          <p className="text-muted-foreground">No hay resultados.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {/* paginación simple sin tocar estilos globales */}
        <div className="flex items-center justify-center gap-4 py-6">
          <button
            onClick={() => goTo(Math.max(1, page - 1))}
            className="px-3 py-1 rounded border disabled:opacity-50"
            disabled={page <= 1}
          >
            ← Anterior
          </button>
          <span className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => goTo(Math.min(totalPages, page + 1))}
            className="px-3 py-1 rounded border disabled:opacity-50"
            disabled={page >= totalPages}
          >
            Siguiente →
          </button>
        </div>
      </main>
    </>
  );
}
