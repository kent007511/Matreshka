"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useStore } from "@/components/store/store-context"
import { formatPrice } from "@/lib/products"
import { DELIVERY_METHODS, estimateDelivery, freeShippingThreshold } from "@/lib/delivery"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Truck } from "lucide-react"
import { toast } from "sonner"

export function CheckoutView() {
  const { cart, cartTotal, clearCart, user, placeOrder } = useStore()
  const router = useRouter()
  const subtotal = cartTotal

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    city: "",
    address: "",
    comment: "",
  })
  const [deliveryId, setDeliveryId] = useState(DELIVERY_METHODS[0].id)
  const [payment, setPayment] = useState("card")
  const [placedOrder, setPlacedOrder] = useState<string | null>(null)

  const selectedDelivery = DELIVERY_METHODS.find((d) => d.id === deliveryId) ?? DELIVERY_METHODS[0]
  const freeShip = subtotal >= freeShippingThreshold && selectedDelivery.id !== "pickup"
  const deliveryCost = useMemo(
    () => (freeShip ? 0 : estimateDelivery(selectedDelivery, subtotal)),
    [freeShip, selectedDelivery, subtotal],
  )
  const total = subtotal + deliveryCost

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || (selectedDelivery.id !== "pickup" && (!form.city || !form.address))) {
      toast.error("Заполните обязательные поля")
      return
    }
    const orderNumber = "MTR-" + Math.floor(100000 + Math.random() * 900000)
    placeOrder({
      id: orderNumber,
      date: new Date().toLocaleDateString("ru-RU"),
      items: cart.map(({ product, quantity }) => ({
        name: product.name,
        quantity,
        unit: product.unit,
        price: product.price,
      })),
      total,
      status: "Оформлен",
      delivery: selectedDelivery.name,
      address: selectedDelivery.id === "pickup" ? "Самовывоз (Чита)" : `${form.city}, ${form.address}`,
    })
    clearCart()
    setPlacedOrder(orderNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (placedOrder) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 className="size-16 text-primary" aria-hidden />
        <h1 className="font-serif text-3xl font-bold">Заказ оформлен!</h1>
        <p className="text-muted-foreground">
          Номер вашего заказа{" "}
          <span className="font-semibold text-foreground">{placedOrder}</span>. Мы свяжемся с вами по телефону для
          подтверждения. Спасибо, что выбрали Матрёшку!
        </p>
        <div className="mt-4 flex gap-3">
          <Button asChild>
            <Link href="/catalog">Продолжить покупки</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/account">Мои заказы</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 text-muted-foreground">Добавьте товары, чтобы оформить заказ.</p>
        <Button asChild className="mt-6">
          <Link href="/catalog">В каталог</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 className="font-serif text-3xl font-bold md:text-4xl">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          {/* Контактные данные */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Контактные данные</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Имя и фамилия *</Label>
                <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Доставка */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Способ доставки</h2>
            <RadioGroup
              value={deliveryId}
              onValueChange={setDeliveryId}
              className="mt-4 grid gap-3"
            >
              {DELIVERY_METHODS.map((method) => {
                const cost =
                  subtotal >= freeShippingThreshold && method.id !== "pickup"
                    ? 0
                    : estimateDelivery(method, subtotal)
                return (
                  <Label
                    key={method.id}
                    htmlFor={`d-${method.id}`}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem id={`d-${method.id}`} value={method.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{method.name}</span>
                        <span className="text-sm font-semibold">
                          {cost === 0 ? "Бесплатно" : formatPrice(cost)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{method.description}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Срок: {method.term}</p>
                    </div>
                  </Label>
                )
              })}
            </RadioGroup>

            {selectedDelivery.id !== "pickup" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="city">Город *</Label>
                  <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Адрес / ПВЗ *</Label>
                  <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} />
                </div>
              </div>
            )}
          </section>

          {/* Оплата */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Способ оплаты</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-4 grid gap-3">
              {[
                { id: "card", label: "Банковской картой онлайн", desc: "Visa, Mastercard, МИР" },
                { id: "sbp", label: "СБП (по QR-коду)", desc: "Система быстрых платежей" },
                { id: "cash", label: "При получении", desc: "Наличными или картой курьеру / в пункте выдачи" },
              ].map((p) => (
                <Label
                  key={p.id}
                  htmlFor={`p-${p.id}`}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem id={`p-${p.id}`} value={p.id} className="mt-1" />
                  <div>
                    <span className="font-medium">{p.label}</span>
                    <p className="mt-0.5 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </section>

          {/* Комментарий */}
          <section className="rounded-xl border border-border bg-card p-6">
            <Label htmlFor="comment" className="font-serif text-xl font-semibold">
              Комментарий к заказу
            </Label>
            <Textarea
              id="comment"
              className="mt-4"
              rows={3}
              placeholder="Пожелания по раскрою, времени доставки и т.д."
              value={form.comment}
              onChange={(e) => update("comment", e.target.value)}
            />
          </section>
        </div>

        {/* Итог */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-lg font-semibold">Ваш заказ</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-border">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {quantity} {product.unit} × {formatPrice(product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(product.price * quantity)}</span>
                </li>
              ))}
            </ul>

            <Separator className="my-4" />

            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Товары</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Доставка</dt>
                <dd>{deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost)}</dd>
              </div>
            </dl>

            {freeShip && (
              <p className="mt-3 flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-xs text-primary">
                <Truck className="size-4" aria-hidden /> Бесплатная доставка применена
              </p>
            )}

            <Separator className="my-4" />

            <div className="flex items-baseline justify-between">
              <span className="font-medium">Итого</span>
              <span className="font-serif text-2xl font-bold text-primary">{formatPrice(total)}</span>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full">
              Подтвердить заказ
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с условиями оферты и политикой конфиденциальности.
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}
