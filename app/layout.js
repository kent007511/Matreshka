export const metadata = {
  title: 'Матрешка',
  description: 'Магазин тканей',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
