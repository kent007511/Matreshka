import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Блог — Матрёшка",
  description: "Статьи о тканях, шитье и рукоделии от магазина Матрёшка.",
}

const posts = [
  {
    title: "Как выбрать ткань для летнего платья",
    excerpt: "Разбираемся, чем отличаются хлопок, лён и штапель и какие ткани лучше держат форму в жару.",
    tag: "Ткани",
    image: "/images/cat-fabrics.png",
    date: "5 июня 2026",
  },
  {
    title: "Гид по молниям и застёжкам",
    excerpt: "Потайные, тракторные, спиральные — рассказываем, какую молнию выбрать для каждого изделия.",
    tag: "Фурнитура",
    image: "/images/cat-notions.png",
    date: "28 мая 2026",
  },
  {
    title: "Базовый набор инструментов для начинающей швеи",
    excerpt: "Что действительно нужно купить в начале пути, а на чём можно сэкономить.",
    tag: "Советы",
    image: "/images/cat-accessories.png",
    date: "14 мая 2026",
  },
  {
    title: "Уход за натуральными тканями",
    excerpt: "Как стирать и гладить хлопок, лён и шёлк, чтобы вещи служили долго и не теряли вид.",
    tag: "Уход",
    image: "/images/hero-fabrics.png",
    date: "2 мая 2026",
  },
]

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Блог о шитье и тканях"
        description="Полезные статьи, советы по выбору материалов и вдохновение для ваших проектов."
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3">{post.tag}</Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <h2 className="mt-2 font-serif text-lg font-semibold text-balance group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-primary">Читать статью →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
