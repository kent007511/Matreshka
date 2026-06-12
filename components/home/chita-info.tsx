import Link from 'next/link'
import { MapPin, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChitaInfo() {
  return (
    <section className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Магазин в Чите
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold">
            Нас можно найти в самом сердце Забайкалья
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-background/80">
            «МАТРЁШКА» — это уютный магазин тканей и фурнитуры в Чите. Уже более
            12 лет мы помогаем рукодельницам и швеям воплощать идеи в жизнь, а
            теперь доставляем заказы во все регионы России.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/about">Подробнее о нас</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
            >
              <Link href="/contacts">Контакты и карта</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: MapPin,
              title: 'Адрес',
              value: 'г. Чита, ул. Ленина, 50',
            },
            {
              icon: Phone,
              title: 'Телефон',
              value: '+7 (3022) 00-00-00',
            },
            {
              icon: Clock,
              title: 'Режим работы',
              value: 'Ежедневно 9:00–20:00',
            },
            {
              icon: MapPin,
              title: 'Доставка',
              value: 'По всей России',
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-background/15 bg-background/5 p-5"
            >
              <b.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm text-background/60">{b.title}</h3>
              <p className="mt-1 font-medium">{b.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
