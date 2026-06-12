import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductDetail } from '@/components/product/product-detail'
import { getProductBySlug, getRelated, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Товар не найден — МАТРЁШКА' }
  return {
    title: `${product.name} — купить в МАТРЁШКА`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  const related = getRelated(product)
  return <ProductDetail product={product} related={related} />
}
