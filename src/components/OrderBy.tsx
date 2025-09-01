import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const OPTIONS = [
  { key: "featured", label: "Destacados" },
  { key: "price-asc", label: "Precio: menor a mayor" },
  { key: "price-desc", label: "Precio: mayor a menor" },
];

export default function OrderBy({ onChange }: { onChange: (k: string) => void }) {
  const [sel, setSel] = useState(OPTIONS[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">Ordenar por: {sel.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(o => (
          <DropdownMenuItem key={o.key} onClick={() => { setSel(o); onChange(o.key); }}>
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
