import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Truck className="h-3.5 w-3.5 text-primary" />
            Доставка по всей России из Читы
          </span>
          <h1 className="text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Ткани и фурнитура для{' '}
            <span className="text-primary">вашего творчества</span>
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Магазин «МАТРЁШКА» — качественные ткани, фурнитура и аксессуары для
            рукоделия, шитья и дизайна одежды. Отрез нужной длины и удобная
            доставка в любой город.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/catalog">
                Перейти в каталог
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/catalog?category=fabrics">Смотреть ткани</Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            <div>
              <dt className="text-2xl font-bold text-primary">5000+</dt>
              <dd className="text-xs text-muted-foreground">товаров</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">12 лет</dt>
              <dd className="text-xs text-muted-foreground">на рынке</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">85</dt>
              <dd className="text-xs text-muted-foreground">регионов</dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-xl border border-border md:aspect-[4/3]">
          <Image
            src="/images/hero-fabrics.png"
            alt="Ассортимент тканей и фурнитуры магазина МАТРЁШКА"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
