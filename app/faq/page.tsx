import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Вопросы и возврат — Матрёшка",
  description: "Частые вопросы, условия возврата и обмена тканей и фурнитуры.",
}

const faq = [
  {
    q: "Как рассчитать, сколько ткани мне нужно?",
    a: "Расход зависит от модели, размера и ширины ткани. В карточке каждого товара указана ширина рулона. Если сомневаетесь — напишите нам, и мы поможем с расчётом.",
  },
  {
    q: "Можно ли заказать отрез меньше метра?",
    a: "Да, мы отрезаем ткань от 0,1 метра с шагом 0,1 м. Минимальный заказ по большинству тканей — 0,5 метра.",
  },
  {
    q: "Соответствует ли цвет на фото реальному?",
    a: "Мы стараемся передать цвет максимально точно, но оттенок может незначительно отличаться из-за настроек экрана. По запросу пришлём дополнительные фото при дневном свете.",
  },
  {
    q: "Подлежит ли ткань возврату?",
    a: "Отрезанная по вашему запросу ткань возврату и обмену не подлежит (п. 4 Перечня непродовольственных товаров надлежащего качества). Фурнитура и аксессуары надлежащего качества можно вернуть в течение 14 дней при сохранении товарного вида.",
  },
  {
    q: "Что делать, если пришёл бракованный товар?",
    a: "Свяжитесь с нами в течение 7 дней с момента получения, приложите фото брака. Мы заменим товар или вернём деньги, а расходы на пересылку возьмём на себя.",
  },
  {
    q: "Как отслеживать заказ?",
    a: "После отправки мы пришлём трек-номер по SMS и email. Статус также отображается в личном кабинете в разделе «Заказы».",
  },
]

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Вопросы и возврат"
        description="Собрали ответы на частые вопросы о заказе, доставке и возврате товаров."
      />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
