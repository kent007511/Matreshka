"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useStore } from "@/components/store/store-context"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, LogOut, Package, User } from "lucide-react"
import { toast } from "sonner"

export function AccountView() {
  const { user, login, logout, favorites } = useStore()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password || (mode === "register" && !form.name)) {
      toast.error("Заполните все поля")
      return
    }
    login({ name: form.name || form.email.split("@")[0], email: form.email })
    toast.success(mode === "login" ? "Вы вошли в аккаунт" : "Аккаунт создан")
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-12">
        <div className="rounded-xl border border-border bg-card p-8">
          <h1 className="font-serif text-2xl font-bold">
            {mode === "login" ? "Вход в личный кабинет" : "Регистрация"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Войдите, чтобы видеть заказы и избранное."
              : "Создайте аккаунт, чтобы отслеживать заказы."}
          </p>

          <form onSubmit={handleAuth} className="mt-6 flex flex-col gap-4">
            {mode === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <Button type="submit" size="lg" className="mt-2">
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-medium text-primary hover:underline"
            >
              {mode === "login" ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-7" aria-hidden />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="size-4" aria-hidden /> Выйти
        </Button>
      </div>

      <Tabs defaultValue="orders" className="mt-8">
        <TabsList>
          <TabsTrigger value="orders">
            <Package className="mr-1.5 size-4" aria-hidden /> Заказы
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="mr-1.5 size-4" aria-hidden /> Избранное
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <Package className="mx-auto size-10 text-muted-foreground" aria-hidden />
            <h2 className="mt-4 font-serif text-lg font-semibold">У вас пока нет заказов</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Оформите первый заказ — и он появится здесь со статусом доставки.
            </p>
            <Button asChild className="mt-4">
              <Link href="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {favoriteProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <Heart className="mx-auto size-10 text-muted-foreground" aria-hidden />
              <h2 className="mt-4 font-serif text-lg font-semibold">В избранном пусто</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Нажимайте на сердечко у понравившихся товаров.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
