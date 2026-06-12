import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showSub = true,
}: {
  className?: string
  showSub?: boolean
}) {
  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      <Image
        src="/images/logo-matryoshka.jpeg"
        alt="МАТРЁШКА — магазин тканей и фурнитуры"
        width={48}
        height={48}
        className="h-11 w-11 rounded-md object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-extrabold tracking-tight">
          МАТРЁШКА
        </span>
        {showSub && (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            ткани и фурнитура
          </span>
        )}
      </span>
    </Link>
  )
}
