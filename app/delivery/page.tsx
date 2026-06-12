import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { DELIVERY_METHODS, freeShippingThreshold } from "@/lib/delivery"
import { formatPrice } from "@/lib/products"
import { Truck, MapPin, Clock, PackageCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Доставка и оплата — Матрёшка",
  description: "Доставка тканей и фурнитуры по всей России. Способы оплаты и сроки.",
}

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        title="Доставка и оплата"
        description={`Отправляем заказы по всей России. При заказе от ${formatPrice(freeShippingThreshold)} доставка бесплатно.`}
      />
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-serif text-2xl font-bold">Способы доставки</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {DELIVERY_METHODS.map((m) => (
            <div key={m.id} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Truck className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-4" aria-hidden /> {m.term}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    {m.basePrice === 0 ? "Бесплатно" : `от ${formatPrice(m.basePrice)}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-2xl font-bold">Способы оплаты</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: PackageCheck, title: "Картой онлайн", text: "Visa, Mastercard, МИР. Оплата при оформлении заказа." },
            { icon: PackageCheck, title: "СБП", text: "Оплата по QR-коду через Систему быстрых платежей." },
            { icon: PackageCheck, title: "При получении", text: "Наличными или картой курьеру либо в пункте выдачи." },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-6">
              <p.icon className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 font-serif text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex gap-4 rounded-xl border border-border bg-secondary/40 p-6">
          <MapPin className="size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="font-serif text-lg font-semibold">Самовывоз в Чите</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              г. Чита, ул. Ленина, 100. Ежедневно с 10:00 до 19:00. Заказ можно забрать в день оформления.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
