export type DeliveryMethod = {
  id: string
  name: string
  description: string
  term: string
  basePrice: number
}

export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "post",
    name: "Почта России",
    description: "Доставка в любое отделение по всей стране.",
    term: "5–10 дней",
    basePrice: 250,
  },
  {
    id: "cdek",
    name: "СДЭК",
    description: "Доставка до пункта выдачи или курьером до двери.",
    term: "3–7 дней",
    basePrice: 350,
  },
  {
    id: "boxberry",
    name: "Boxberry",
    description: "Выдача заказа в удобном пункте Boxberry.",
    term: "4–8 дней",
    basePrice: 320,
  },
  {
    id: "pickup",
    name: "Самовывоз (Чита)",
    description: "Заберите заказ в нашем магазине в день оформления.",
    term: "Сегодня",
    basePrice: 0,
  },
]

export const FREE_DELIVERY_THRESHOLD = 5000
// Псевдоним для компонентов, использующих camelCase-имя
export const freeShippingThreshold = FREE_DELIVERY_THRESHOLD

/**
 * Оценивает стоимость доставки для выбранного способа.
 * При сумме заказа от порога бесплатной доставки — 0 (кроме самовывоза, он всегда 0).
 */
export function estimateDelivery(method: DeliveryMethod, orderTotal: number): number {
  if (method.id === "pickup") return 0
  if (orderTotal >= FREE_DELIVERY_THRESHOLD) return 0
  return method.basePrice
}
