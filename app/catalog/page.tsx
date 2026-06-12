import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CatalogView } from '@/components/catalog/catalog-view'

export const metadata: Metadata = {
  title: 'Каталог тканей и фурнитуры — МАТРЁШКА',
  description:
    'Каталог тканей, фурнитуры и аксессуаров для рукоделия. Фильтры по категории, цене, цвету и типу ткани. Доставка по всей России.',
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20">Загрузка…</div>}>
      <CatalogView />
    </Suspense>
  )
}
