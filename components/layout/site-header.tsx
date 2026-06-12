'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Truck,
  User,
} from 'lucide-react'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useStore } from '@/components/store/store-context'
import { CATEGORY_LABELS } from '@/lib/products'

const nav = [
  { href: '/catalog?category=fabrics', label: CATEGORY_LABELS.fabrics },
  { href: '/catalog?category=notions', label: CATEGORY_LABELS.notions },
  { href: '/catalog?category=accessories', label: CATEGORY_LABELS.accessories },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/blog', label: 'Блог' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

export function SiteHeader() {
  const router = useRouter()
  const params = useSearchParams()
  const { cartCount, favorites } = useStore()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [open, setOpen] = useState(false)

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/catalog?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* top bar */}
      <div className="hidden border-b border-border bg-foreground text-background md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5" />
            Доставка по всей России — бесплатно от 5 000 ₽
          </span>
          <a
            href="tel:+73022000000"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Phone className="h-3.5 w-3.5" />
            +7 (3022) 00-00-00 · г. Чита
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Logo />

        <form
          onSubmit={submitSearch}
          className="relative ml-auto hidden flex-1 max-w-md lg:block"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск тканей и фурнитуры…"
            className="pl-9"
            aria-label="Поиск по товарам"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Личный кабинет"
          >
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Избранное"
          >
            <Link href="/account?tab=favorites">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                  {favorites.length}
                </Badge>
              )}
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Корзина"
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Меню"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Меню</SheetTitle>
              </SheetHeader>
              <form onSubmit={submitSearch} className="relative px-4">
                <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск…"
                  className="pl-9"
                />
              </form>
              <nav className="flex flex-col px-2 py-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* desktop nav */}
      <nav className="hidden border-t border-border lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
