import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export const metadata: Metadata = {
  title: "Контакты — Матрёшка",
  description: "Контакты магазина тканей и фурнитуры Матрёшка в Чите.",
}

const contacts = [
  { icon: MapPin, title: "Адрес", lines: ["г. Чита, ул. Ленина, 100", "Забайкальский край"] },
  { icon: Phone, title: "Телефон", lines: ["+7 (3022) 00-00-00", "+7 (914) 000-00-00"] },
  { icon: Mail, title: "Почта", lines: ["info@matreshka-tkani.ru", "order@matreshka-tkani.ru"] },
  { icon: Clock, title: "Режим работы", lines: ["Пн–Сб: 10:00 – 19:00", "Вс: 10:00 – 17:00"] },
]

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        title="Контакты"
        description="Свяжитесь с нами любым удобным способом — поможем с выбором ткани и оформлением заказа."
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{c.title}</h3>
              {c.lines.map((line) => (
                <p key={line} className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-secondary/40 p-6">
          <Send className="size-6 text-primary" aria-hidden />
          <div>
            <h3 className="font-serif text-lg font-semibold">Мы в мессенджерах</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Пишите в Telegram и WhatsApp: +7 (914) 000-00-00. Отвечаем в течение часа в рабочее время.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border">
          <iframe
            title="Карта проезда"
            src="https://yandex.ru/map-widget/v1/?ll=113.500%2C52.033&z=13"
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </div>
    </>
  )
}
