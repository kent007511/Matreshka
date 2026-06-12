export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <h1 className="font-serif text-3xl font-bold text-balance md:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
