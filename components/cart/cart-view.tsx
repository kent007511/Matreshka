'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/components/store/store-context'
import { formatPrice } from '@/lib/products'
import { FREE_DELIVERY_THRESHOLD } from '@/lib/delivery'

export function CartView() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore()

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-bold">
          Корзина пуста
        </h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Добавьте товары из каталога, чтобы оформить заказ.
        </p>
        <Button asChild className="mt-6">
          <Link href="/catalog">Перейти в каталог</Link>
        </Button>
      </div>
    )
  }

  const remaining = FREE_DELIVERY_THRESHOLD - cartTotal

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-heading text-3xl font-bold">Корзина</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {remaining > 0 && (
            <div className="rounded-lg border border-border bg-accent/50 p-4 text-sm">
              Добавьте товаров ещё на{' '}
              <span className="font-semibold text-primary">
                {formatPrice(remaining)}
              </span>{' '}
              для бесплатной доставки
            </div>
          )}
          {cart.map(({ product, quantity }) => {
            const step = product.unit === 'м' ? 0.5 : 1
            return (
              <div
                key={product.id}
                className="flex gap-4 rounded-lg border border-border bg-card p-4"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-medium leading-snug hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <span className="mt-0.5 text-sm text-muted-foreground">
                    {formatPrice(product.price)} / {product.unit}
                  </span>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-lg border border-border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(product.id, quantity - step)
                        }
                        aria-label="Уменьшить"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-12 text-center text-sm font-medium">
                        {quantity}
                        {product.unit === 'м' ? ' м' : ''}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(product.id, quantity + step)
                        }
                        aria-label="Увеличить"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">
                        {formatPrice(Math.round(product.price * quantity))}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => removeFromCart(product.id)}
                        aria-label="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <aside>
          <div className="sticky top-28 rounded-lg border border-border bg-card p-5">
            <h2 className="font-heading text-lg font-bold">Итого</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Товары</span>
                <span>{formatPrice(Math.round(cartTotal))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>
                <span className="text-muted-foreground">
                  рассчитается при оформлении
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>К оплате</span>
              <span>{formatPrice(Math.round(cartTotal))}</span>
            </div>
            <Button asChild size="lg" className="mt-5 w-full">
              <Link href="/checkout">
                Оформить заказ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link href="/catalog">Продолжить покупки</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
