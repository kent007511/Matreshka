'use client'

import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  products,
  CATEGORY_LABELS,
  COLOR_OPTIONS,
  FABRIC_TYPES,
  type Category,
} from '@/lib/products'

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'new'

const PRICE_MAX = 1500

const sortLabels: Record<SortKey, string> = {
  popular: 'По популярности',
  'price-asc': 'Сначала дешёвые',
  'price-desc': 'Сначала дорогие',
  new: 'Новинки',
}

export function CatalogView() {
  const params = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [price, setPrice] = useState<[number, number]>([0, PRICE_MAX])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('popular')
  const [onlyStock, setOnlyStock] = useState(false)

  useEffect(() => {
    const cat = params.get('category') as Category | null
    const q = params.get('q')
    if (cat) setCategories([cat])
    if (q) setQuery(q)
  }, [params])

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false
      if (colors.length && !p.colors.some((c) => colors.includes(c)))
        return false
      if (types.length && (!p.fabricType || !types.includes(p.fabricType)))
        return false
      if (p.price < price[0] || p.price > price[1]) return false
      if (onlyStock && !p.inStock) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !p.name.toLowerCase().includes(q) &&
          !(p.fabricType?.toLowerCase().includes(q) ?? false) &&
          !p.description.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'new':
          return Number(b.isNew) - Number(a.isNew)
        default:
          return b.popularity - a.popularity
      }
    })
    return result
  }, [categories, colors, types, price, query, sort, onlyStock])

  function toggle<T>(arr: T[], value: T, setter: (v: T[]) => void) {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  function reset() {
    setCategories([])
    setColors([])
    setTypes([])
    setPrice([0, PRICE_MAX])
    setOnlyStock(false)
    setQuery('')
  }

  const activeCount =
    categories.length +
    colors.length +
    types.length +
    (onlyStock ? 1 : 0) +
    (price[0] > 0 || price[1] < PRICE_MAX ? 1 : 0)

  const Filters = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Категория</h3>
        <div className="space-y-2.5">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={categories.includes(cat)}
                onCheckedChange={() => toggle(categories, cat, setCategories)}
              />
              {CATEGORY_LABELS[cat]}
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold">Цена, ₽</h3>
        <Slider
          value={price}
          min={0}
          max={PRICE_MAX}
          step={10}
          onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])}
          className="mt-2"
        />
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>{price[0]} ₽</span>
          <span>{price[1]} ₽</span>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold">Цвет</h3>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => {
            const active = colors.includes(c.label)
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => toggle(colors, c.label, setColors)}
                aria-label={c.label}
                title={c.label}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  active
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-border'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            )
          })}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold">Тип ткани</h3>
        <div className="grid grid-cols-2 gap-2">
          {FABRIC_TYPES.map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={types.includes(t)}
                onCheckedChange={() => toggle(types, t, setTypes)}
              />
              {t}
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <Checkbox
          checked={onlyStock}
          onCheckedChange={(v) => setOnlyStock(Boolean(v))}
        />
        Только в наличии
      </label>
      {activeCount > 0 && (
        <Button variant="outline" className="w-full" onClick={reset}>
          <X className="h-4 w-4" />
          Сбросить фильтры
        </Button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Каталог</h1>
        <p className="mt-1 text-muted-foreground">
          Найдено товаров: {filtered.length}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по каталогу…"
          className="sm:max-w-xs"
        />
        <div className="flex items-center gap-3 sm:ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Фильтры
                {activeCount > 0 && ` (${activeCount})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-8">{Filters}</div>
            </SheetContent>
          </Sheet>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue>{sortLabels[sort]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                <SelectItem key={k} value={k}>
                  {sortLabels[k]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 rounded-lg border border-border bg-card p-5">
            {Filters}
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
              <p className="text-lg font-medium">Ничего не найдено</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Попробуйте изменить параметры фильтра
              </p>
              <Button variant="outline" className="mt-4" onClick={reset}>
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
