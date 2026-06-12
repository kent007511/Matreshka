import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'

export function PopularProducts() {
  const popular = [...products]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8)

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Популярные товары
            </h2>
            <p className="mt-2 text-muted-foreground">
              Выбор наших покупателей
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/catalog">
              Весь каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
