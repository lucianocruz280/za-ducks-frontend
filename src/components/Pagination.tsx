import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type Props = { page: number; totalPages: number; onPage: (p: number) => void };
export default function Pager({ page, totalPages, onPage }: Props) {
  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious onClick={() => onPage(Math.max(1, page - 1))} /></PaginationItem>
          <PaginationItem><span className="px-3 py-2 border rounded">{page}</span></PaginationItem>
          <PaginationItem><PaginationNext onClick={() => onPage(Math.min(totalPages, page + 1))} /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
