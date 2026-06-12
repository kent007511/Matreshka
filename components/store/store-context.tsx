'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'
import type { Product } from '@/lib/products'

export type CartItem = {
  product: Product
  quantity: number // метров или штук
}

export type Order = {
  id: string
  date: string
  items: { name: string; quantity: number; unit: string; price: number }[]
  total: number
  status: 'Оформлен' | 'Собирается' | 'В пути' | 'Доставлен'
  delivery: string
  address: string
}

export type User = {
  name: string
  email: string
  phone?: string
  bonus: number
}

type StoreContextValue = {
  cart: CartItem[]
  favorites: string[]
  user: User | null
  orders: Order[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  cartCount: number
  cartTotal: number
  login: (email: string, name?: string) => void
  logout: () => void
  placeOrder: (order: Order) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

const LS = {
  cart: 'matryoshka_cart',
  fav: 'matryoshka_fav',
  user: 'matryoshka_user',
  orders: 'matryoshka_orders',
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const c = localStorage.getItem(LS.cart)
      const f = localStorage.getItem(LS.fav)
      const u = localStorage.getItem(LS.user)
      const o = localStorage.getItem(LS.orders)
      if (c) setCart(JSON.parse(c))
      if (f) setFavorites(JSON.parse(f))
      if (u) setUser(JSON.parse(u))
      if (o) setOrders(JSON.parse(o))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(LS.cart, JSON.stringify(cart))
  }, [cart, hydrated])
  useEffect(() => {
    if (hydrated) localStorage.setItem(LS.fav, JSON.stringify(favorites))
  }, [favorites, hydrated])
  useEffect(() => {
    if (hydrated) localStorage.setItem(LS.orders, JSON.stringify(orders))
  }, [orders, hydrated])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        )
      }
      return [...prev, { product, quantity }]
    })
    toast.success('Добавлено в корзину', { description: product.name })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === id ? { ...i, quantity: Math.max(0.5, quantity) } : i,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  const login = useCallback((email: string, name?: string) => {
    const u: User = {
      name: name || email.split('@')[0],
      email,
      bonus: 350,
    }
    setUser(u)
    localStorage.setItem(LS.user, JSON.stringify(u))
    toast.success('Вы вошли в личный кабинет')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(LS.user)
    toast('Вы вышли из аккаунта')
  }, [])

  const placeOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  const cartCount = cart.reduce((sum, i) => sum + 1, 0)
  const cartTotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  )

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        user,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        cartCount,
        cartTotal,
        login,
        logout,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
