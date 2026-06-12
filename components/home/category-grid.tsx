import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const categories = [
  {
    label: 'Ткани',
    desc: 'Хлопок, лён, шёлк, трикотаж и другие',
    href: '/catalog?category=fabrics',
    image: '/images/cat-fabrics.png',
  },
  {
    label: 'Фурнитура',
    desc: 'Пуговицы, молнии, нитки, ленты',
    href: '/catalog?category=notions',
    image: '/images/cat-notions.png',
  },
  {
    label: 'Аксессуары',
    desc: 'Ножницы, иглы, инструменты для шитья',
    href: '/catalog?category=accessories',
    image: '/images/cat-accessories.png',
  },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Категории товаров
          </h2>
          <p className="mt-2 text-muted-foreground">
            Всё для рукоделия и шитья в одном месте
          </p>
        </div>
        <Link
          href="/catalog"
          className="hidden text-sm font-medium text-primary hover:underline md:block"
        >
          Все товары
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative overflow-hidden rounded-xl border border-border"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={cat.image || '/placeholder.svg'}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-background">
              <div>
                <h3 className="font-heading text-xl font-bold">{cat.label}</h3>
                <p className="text-sm text-background/80">{cat.desc}</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
