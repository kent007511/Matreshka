import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { StoreProvider } from '@/components/store/store-context'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Toaster } from '@/components/ui/sonner'

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})
const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'МАТРЁШКА — магазин тканей и фурнитуры из Читы | Доставка по России',
  description:
    'Интернет-магазин тканей и фурнитуры МАТРЁШКА из Читы. Качественные ткани, фурнитура и аксессуары для рукоделия и шитья. Доставка по всей России — Почта России, СДЭК, Boxberry.',
  keywords: [
    'ткани',
    'фурнитура',
    'магазин тканей',
    'Чита',
    'рукоделие',
    'шитьё',
    'отрез ткани',
    'доставка по России',
  ],
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <StoreProvider>
          <Suspense fallback={null}>
            <SiteHeader />
          </Suspense>
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </StoreProvider>
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
