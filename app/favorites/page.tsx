import type { Metadata } from "next"
import { FavoritesView } from "@/components/favorites/favorites-view"

export const metadata: Metadata = {
  title: "Избранное — Матрёшка",
}

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4">
      <FavoritesView />
    </div>
  )
}
