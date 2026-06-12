'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Ruler,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useStore } from '@/components/store/store-context'
import { ProductCard } from '@/components/product/product-card'
import { formatPrice, type Product } from '@/lib/products'

export function ProductDetail({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const isFabric = product.unit === 'м'
  const [qty, setQty] = useState(isFabric ? 1 : 1)
  const fav = isFavorite(product.id)
  const step = isFabric ? 0.5 : 1

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Главная
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-primary">
          Каталог
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1">
              {product.isNew && <Badge>Новинка</Badge>}
              {product.oldPrice && (
                <Badge
                  variant="secondary"
                  className="bg-foreground text-background"
                >
                  Скидка
                </Badge>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
              >
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={`${product.name} — образец ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          {product.fabricType && (
            <span className="text-sm uppercase tracking-wide text-muted-foreground">
              {product.fabricType}
            </span>
          )}
          <h1 className="mt-1 font-heading text-2xl font-bold md:text-3xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {product.rating}
            </span>
            <span className="text-muted-foreground">
              · {product.reviews} отзывов
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span
              className={cn(
                'font-medium',
                product.inStock ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
              <span className="text-base font-normal text-muted-foreground">
                {' '}
                / {product.unit}
              </span>
            </span>
            {product.oldPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* color swatches */}
          <div className="mt-5">
            <span className="text-sm font-medium">Цвет: </span>
            <span className="text-sm text-muted-foreground">
              {product.colors.join(', ')}
            </span>
            <div className="mt-2 flex gap-2">
              {product.colorHex.map((hex, i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-primary ring-2 ring-primary/20"
                  style={{ backgroundColor: hex }}
                  title={product.colors[i]}
                />
              ))}
            </div>
          </div>

          {/* quantity selector */}
          <div className="mt-6">
            <span className="text-sm font-medium">
              {isFabric ? 'Длина отреза, м' : 'Количество, шт'}
            </span>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQty((q) => Math.max(step, q - step))}
                  aria-label="Уменьшить"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center font-medium">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQty((q) => q + step)}
                  aria-label="Увеличить"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                Итого:{' '}
                <span className="font-semibold text-foreground">
                  {formatPrice(Math.round(product.price * qty))}
                </span>
              </span>
            </div>
            {isFabric && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Ruler className="h-3.5 w-3.5" />
                Отрез отмеряется кратно 0,5 м единым полотном
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={!product.inStock}
              onClick={() => addToCart(product, qty)}
            >
              <ShoppingBag className="h-5 w-5" />
              В корзину
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleFavorite(product.id)}
              aria-label="В избранное"
            >
              <Heart
                className={cn('h-5 w-5', fav && 'fill-primary text-primary')}
              />
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm">
              <Truck className="h-5 w-5 shrink-0 text-primary" />
              Доставка по России от 2 дней
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              Гарантия качества материалов
            </div>
          </div>
        </div>
      </div>

      {/* tabs: specs, care, delivery */}
      <Tabs defaultValue="specs" className="mt-12">
        <TabsList>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="care">Уход</TabsTrigger>
          <TabsTrigger value="delivery">Доставка</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="mt-5">
          <dl className="max-w-xl divide-y divide-border rounded-lg border border-border">
            {product.composition && (
              <Row label="Состав" value={product.composition} />
            )}
            {product.fabricType && (
              <Row label="Тип ткани" value={product.fabricType} />
            )}
            {product.width && (
              <Row label="Ширина" value={`${product.width} см`} />
            )}
            {product.density && (
              <Row label="Плотность" value={`${product.density} г/м²`} />
            )}
            <Row label="Цвет" value={product.colors.join(', ')} />
            <Row
              label="Единица измерения"
              value={isFabric ? 'метр погонный' : 'штука'}
            />
          </dl>
        </TabsContent>
        <TabsContent value="care" className="mt-5">
          {product.care && product.care.length > 0 ? (
            <ul className="max-w-xl space-y-2">
              {product.care.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Особых рекомендаций по уходу не требуется. Храните в сухом месте.
            </p>
          )}
        </TabsContent>
        <TabsContent value="delivery" className="mt-5">
          <div className="max-w-xl space-y-3 text-sm text-muted-foreground">
            <p>
              Доставляем по всей России: Почта России, СДЭК, Boxberry. Срок — от
              2 до 10 дней в зависимости от региона.
            </p>
            <p>
              Бесплатная доставка при заказе от 5 000 ₽. Точную стоимость можно
              рассчитать в корзине при оформлении заказа.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-heading text-2xl font-bold">
            Похожие товары
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  )
}
