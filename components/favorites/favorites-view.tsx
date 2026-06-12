"use client"

import Link from "next/link"
import { useStore } from "@/components/store/store-context"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function FavoritesView() {
  const { favorites } = useStore()
  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="py-8">
      <h1 className="font-serif text-3xl font-bold md:text-4xl">Избранное</h1>
      <p className="mt-2 text-muted-foreground">
        {favoriteProducts.length > 0
          ? `Товаров в избранном: ${favoriteProducts.length}`
          : "Сохраняйте понравившиеся ткани и фурнитуру, чтобы вернуться к ним позже."}
      </p>

      {favoriteProducts.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <Heart className="mx-auto size-10 text-muted-foreground" aria-hidden />
          <h2 className="mt-4 font-serif text-lg font-semibold">Здесь пока пусто</h2>
          <p className="mt-1 text-sm text-muted-foreground">Нажмите на сердечко у любого товара в каталоге.</p>
          <Button asChild className="mt-4">
            <Link href="/catalog">В каталог</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
