import type { Metadata } from "next"
import { CheckoutView } from "@/components/checkout/checkout-view"

export const metadata: Metadata = {
  title: "Оформление заказа — Матрёшка",
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4">
      <CheckoutView />
    </div>
  )
}
