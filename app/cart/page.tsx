import type { Metadata } from 'next'
import { CartView } from '@/components/cart/cart-view'

export const metadata: Metadata = {
  title: 'Корзина — МАТРЁШКА',
  description: 'Ваша корзина в магазине тканей и фурнитуры МАТРЁШКА.',
}

export default function CartPage() {
  return <CartView />
}
