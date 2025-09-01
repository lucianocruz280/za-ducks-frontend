import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Store } from "lucide-react";
import { useState } from "react";

type Props = { onSearch: (q: string) => void; initial?: string };
export default function Header({ onSearch, initial = "" }: Props) {
  const [q, setQ] = useState(initial);

  return (
    <header className="w-full bg-[#0071ce] text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">Líder</span>
          </div>

          <Button variant="ghost" className="text-white hover:bg-[#0061b0]">
            <Menu className="h-5 w-5 mr-2" /> Categorías
          </Button>

          <div className="flex-1">
            <div className="flex rounded-full bg-white px-3 py-1">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch(q)}
                placeholder="¿Qué estás buscando?"
                className="border-0 shadow-none focus-visible:ring-0 text-black"
              />
              <Button onClick={() => onSearch(q)} className="rounded-full">
                Buscar
              </Button>
            </div>
          </div>

          <Button variant="ghost" className="text-white hover:bg-[#0061b0]">
            <ShoppingCart className="h-5 w-5 mr-2" /> 0
          </Button>
          <Button className="bg-[#29a544] hover:bg-[#238b3a]">
            <Store className="h-5 w-5 mr-2" /> Supermercado
          </Button>
        </div>
      </div>
    </header>
  );
}
