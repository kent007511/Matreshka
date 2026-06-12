import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/layout/page-header"
import { Scissors, Heart, Award, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "О магазине — Матрёшка",
  description: "Магазин тканей и фурнитуры Матрёшка из Читы. Доставка по всей России.",
}

const values = [
  { icon: Award, title: "Качество", text: "Работаем напрямую с проверенными фабриками и поставщиками." },
  { icon: Heart, title: "Любовь к делу", text: "Сами шьём и понимаем, что важно для рукодельниц." },
  { icon: Users, title: "Забота о клиентах", text: "Поможем подобрать ткань и рассчитать расход материала." },
  { icon: Scissors, title: "Точный раскрой", text: "Отрезаем ровно столько, сколько нужно, от 0,1 метра." },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="О магазине «Матрёшка»"
        description="Мы — семейный магазин тканей и фурнитуры из Читы. С 2015 года помогаем швеям, дизайнерам и любителям рукоделия воплощать идеи в жизнь."
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image src="/images/hero-fabrics.png" alt="Ткани в магазине Матрёшка" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            <p>
              Всё началось с небольшого отдела тканей на рынке Читы. Сегодня «Матрёшка» — это просторный магазин с
              тысячами наименований тканей, фурнитуры и аксессуаров для шитья и творчества.
            </p>
            <p>
              Мы тщательно отбираем каждый материал: от натурального хлопка и льна до благородного шёлка и плотных
              пальтовых тканей. В нашем ассортименте есть всё для пошива одежды, домашнего текстиля и рукоделия.
            </p>
            <p>
              Мы отправляем заказы транспортными компаниями и Почтой России во все регионы страны — от Калининграда до
              Владивостока. Для жителей Читы доступна доставка курьером и самовывоз.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
