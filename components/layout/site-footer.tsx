import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Logo } from './logo'

const columns = [
  {
    title: 'Каталог',
    links: [
      { href: '/catalog?category=fabrics', label: 'Ткани' },
      { href: '/catalog?category=notions', label: 'Фурнитура' },
      { href: '/catalog?category=accessories', label: 'Аксессуары' },
      { href: '/catalog', label: 'Все товары' },
    ],
  },
  {
    title: 'Покупателям',
    links: [
      { href: '/delivery', label: 'Доставка и оплата' },
      { href: '/returns', label: 'Возврат и обмен' },
      { href: '/faq', label: 'Вопросы и ответы' },
      { href: '/account', label: 'Личный кабинет' },
    ],
  },
  {
    title: 'Магазин',
    links: [
      { href: '/about', label: 'О нас' },
      { href: '/blog', label: 'Блог и советы' },
      { href: '/contacts', label: 'Контакты' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Качественные ткани и фурнитура из Читы с удобной доставкой по всей
            России. Персональный подход к каждому клиенту.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              г. Чита, ул. Ленина, 50
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              +7 (3022) 00-00-00
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              info@matryoshka-chita.ru
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Ежедневно с 9:00 до 20:00
            </p>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} МАТРЁШКА. Все права защищены.</p>
          <p>Магазин тканей и фурнитуры · г. Чита</p>
        </div>
      </div>
    </footer>
  )
}
