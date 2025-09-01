import Link from "next/link";

type Props = {
  page: number;
  take: number;
  total: number;
  q?: string;
};

export default function Pagination({ page, take, total, q }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / take));
  const mkHref = (p: number) => {
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    usp.set("page", String(p));
    return `/?${usp.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <Link
        href={mkHref(Math.max(1, page - 1))}
        className={`px-3 py-1 rounded border ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
      >
        ← Anterior
      </Link>
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      <Link
        href={mkHref(Math.min(totalPages, page + 1))}
        className={`px-3 py-1 rounded border ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
      >
        Siguiente →
      </Link>
    </div>
  );
}
