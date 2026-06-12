import { Truck, BadgeCheck, Scissors, Headphones, Gift, Ruler } from 'lucide-react'

const items = [
  {
    icon: Truck,
    title: 'Доставка по России',
    desc: 'Почта России, СДЭК, Boxberry. Бесплатно от 5 000 ₽',
  },
  {
    icon: BadgeCheck,
    title: 'Гарантия качества',
    desc: 'Только проверенные ткани и фурнитура от надёжных поставщиков',
  },
  {
    icon: Ruler,
    title: 'Отрез нужной длины',
    desc: 'Закажите ровно столько ткани, сколько необходимо для проекта',
  },
  {
    icon: Gift,
    title: 'Бонусная программа',
    desc: 'Копите баллы с каждой покупки и оплачивайте до 30% заказа',
  },
  {
    icon: Headphones,
    title: 'Персональный подход',
    desc: 'Поможем подобрать материалы и ответим на любые вопросы',
  },
  {
    icon: Scissors,
    title: 'Для всех мастеров',
    desc: 'Рукодельницам, швеям и дизайнерам одежды по всей стране',
  },
]

export function Advantages() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">
          Почему выбирают «МАТРЁШКУ»
        </h2>
        <p className="mt-2 text-muted-foreground">
          Качественные материалы из Читы с заботой о каждом клиенте
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-lg border border-border bg-card p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
