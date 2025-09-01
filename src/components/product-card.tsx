import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "@/lib/api";

const fmt = (cents: number, ccy = "MXN") =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: ccy, maximumFractionDigits: 0 }).format(cents / 100);

export default function ProductCard({ p }: { p: Product }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition">
            <div className="relative aspect-[4/3] bg-gray-100">
                <Image src="/placeholder.webp" alt={p.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4 space-y-2">
                <p className="text-sm">
                    <span className="font-semibold">{p.brand}</span>{" "}
                    <span className="text-muted-foreground">{p.title}</span>
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{fmt(p.price, p.currency)}</span>
                    {p.discountApplied && <Badge variant="destructive">50%</Badge>}
                </div>
                {p.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">{fmt(p.originalPrice, p.currency)}</p>
                )}
            </CardContent>
        </Card>
    );
}
