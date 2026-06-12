import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { PopularProducts } from '@/components/home/popular-products'
import { Advantages } from '@/components/home/advantages'
import { ChitaInfo } from '@/components/home/chita-info'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <PopularProducts />
      <Advantages />
      <ChitaInfo />
    </>
  )
}
