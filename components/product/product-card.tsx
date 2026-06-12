'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useStore } from '@/components/store/store-context'
import { formatPrice, type Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const fav = isFavorite(product.id)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && <Badge>Новинка</Badge>}
          {product.oldPrice && (
            <Badge variant="secondary" className="bg-foreground text-background">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="outline" className="bg-background">
              Нет в наличии
            </Badge>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:text-primary"
        >
          <Heart
            className={cn('h-4 w-4', fav && 'fill-primary text-primary')}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3">
        {product.fabricType && (
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {product.fabricType}
          </span>
        )}
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-medium leading-snug transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          {product.rating}
          <span>·</span>
          <span>{product.reviews} отз.</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-base font-bold">
              {formatPrice(product.price)}
              <span className="text-xs font-normal text-muted-foreground">
                {' '}
                / {product.unit}
              </span>
            </span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            disabled={!product.inStock}
            onClick={() => addToCart(product, product.unit === 'м' ? 1 : 1)}
            aria-label="В корзину"
            className="h-9 w-9 shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
