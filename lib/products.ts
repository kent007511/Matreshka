export type Category = 'fabrics' | 'notions' | 'accessories'

export type Product = {
  id: string
  slug: string
  name: string
  category: Category
  price: number // за метр для тканей, за штуку для остального
  oldPrice?: number
  unit: 'м' | 'шт'
  image: string
  colors: string[] // human readable RU
  colorHex: string[]
  fabricType?: string
  composition?: string
  width?: number // см
  density?: number // г/м²
  care?: string[]
  rating: number
  reviews: number
  popularity: number
  isNew?: boolean
  inStock: boolean
  description: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  fabrics: 'Ткани',
  notions: 'Фурнитура',
  accessories: 'Аксессуары',
}

export const FABRIC_TYPES = [
  'Хлопок',
  'Лён',
  'Шёлк',
  'Шерсть',
  'Трикотаж',
  'Сатин',
  'Велюр',
  'Габардин',
]

export const COLOR_OPTIONS: { label: string; hex: string }[] = [
  { label: 'Красный', hex: '#c0392b' },
  { label: 'Чёрный', hex: '#1a1a1a' },
  { label: 'Белый', hex: '#f5f5f0' },
  { label: 'Серый', hex: '#8a8a8a' },
  { label: 'Синий', hex: '#2b4a78' },
  { label: 'Зелёный', hex: '#3c6b4f' },
  { label: 'Бежевый', hex: '#d9c7a8' },
  { label: 'Жёлтый', hex: '#e0b53a' },
]

export const products: Product[] = [
  {
    id: '1',
    slug: 'hlopok-premium-krasnyj',
    name: 'Хлопок «Премиум» красный',
    category: 'fabrics',
    price: 540,
    oldPrice: 690,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Красный'],
    colorHex: ['#c0392b'],
    fabricType: 'Хлопок',
    composition: '100% хлопок',
    width: 150,
    density: 145,
    care: ['Стирка 40°C', 'Не отбеливать', 'Гладить при 150°C'],
    rating: 4.8,
    reviews: 124,
    popularity: 98,
    isNew: false,
    inStock: true,
    description:
      'Плотный хлопок премиального качества с насыщенным красным оттенком. Идеален для пошива платьев, рубашек и домашнего текстиля.',
  },
  {
    id: '2',
    slug: 'len-naturalnyj-bezhevyj',
    name: 'Лён натуральный бежевый',
    category: 'fabrics',
    price: 720,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Бежевый'],
    colorHex: ['#d9c7a8'],
    fabricType: 'Лён',
    composition: '100% лён',
    width: 140,
    density: 190,
    care: ['Стирка 30°C', 'Гладить влажным'],
    rating: 4.9,
    reviews: 87,
    popularity: 92,
    isNew: true,
    inStock: true,
    description:
      'Натуральный лён приятной фактуры. Дышащий и износостойкий материал для летней одежды и предметов интерьера.',
  },
  {
    id: '3',
    slug: 'shelk-armani-chernyj',
    name: 'Шёлк «Армани» чёрный',
    category: 'fabrics',
    price: 1290,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Чёрный'],
    colorHex: ['#1a1a1a'],
    fabricType: 'Шёлк',
    composition: '95% полиэстер, 5% эластан',
    width: 150,
    density: 110,
    care: ['Деликатная стирка', 'Не отжимать'],
    rating: 4.7,
    reviews: 56,
    popularity: 80,
    inStock: true,
    description:
      'Струящийся шёлк «Армани» с лёгким матовым блеском. Прекрасно драпируется, подходит для блуз, юбок и вечерних платьев.',
  },
  {
    id: '4',
    slug: 'trikotazh-futer-seryj',
    name: 'Трикотаж футер серый',
    category: 'fabrics',
    price: 610,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Серый'],
    colorHex: ['#8a8a8a'],
    fabricType: 'Трикотаж',
    composition: '80% хлопок, 20% полиэстер',
    width: 180,
    density: 240,
    care: ['Стирка 40°C', 'Не гладить принт'],
    rating: 4.6,
    reviews: 143,
    popularity: 95,
    inStock: true,
    description:
      'Мягкий футер с начёсом для тёплых худи, свитшотов и спортивных костюмов. Хорошо держит форму.',
  },
  {
    id: '5',
    slug: 'satin-belyj',
    name: 'Сатин белый',
    category: 'fabrics',
    price: 480,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Белый'],
    colorHex: ['#f5f5f0'],
    fabricType: 'Сатин',
    composition: '100% хлопок',
    width: 220,
    density: 130,
    care: ['Стирка 60°C', 'Гладить при 200°C'],
    rating: 4.8,
    reviews: 201,
    popularity: 88,
    inStock: true,
    description:
      'Гладкий сатин с шелковистой поверхностью. Лучший выбор для постельного белья и нарядной одежды.',
  },
  {
    id: '6',
    slug: 'sherst-kostyumnaya-sinyaya',
    name: 'Шерсть костюмная синяя',
    category: 'fabrics',
    price: 980,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Синий'],
    colorHex: ['#2b4a78'],
    fabricType: 'Шерсть',
    composition: '70% шерсть, 30% полиэстер',
    width: 150,
    density: 280,
    care: ['Только сухая чистка'],
    rating: 4.9,
    reviews: 39,
    popularity: 70,
    isNew: true,
    inStock: true,
    description:
      'Костюмная шерсть с благородной фактурой. Держит форму, не мнётся, идеальна для пиджаков и брюк.',
  },
  {
    id: '7',
    slug: 'pugovicy-derevyannye-nabor',
    name: 'Пуговицы деревянные, набор 20 шт',
    category: 'notions',
    price: 220,
    unit: 'шт',
    image: '/images/cat-notions.png',
    colors: ['Бежевый'],
    colorHex: ['#d9c7a8'],
    rating: 4.7,
    reviews: 64,
    popularity: 76,
    inStock: true,
    description:
      'Натуральные деревянные пуговицы диаметром 18 мм. Подходят для кардиганов, пальто и декора.',
  },
  {
    id: '8',
    slug: 'molniya-spiralnaya-krasnaya',
    name: 'Молния спиральная красная 50 см',
    category: 'notions',
    price: 75,
    unit: 'шт',
    image: '/images/cat-notions.png',
    colors: ['Красный'],
    colorHex: ['#c0392b'],
    rating: 4.8,
    reviews: 158,
    popularity: 90,
    inStock: true,
    description:
      'Прочная разъёмная молния тип 5. Лёгкий ход бегунка, насыщенный красный цвет ленты.',
  },
  {
    id: '9',
    slug: 'nitki-armirovannye-chernye',
    name: 'Нитки армированные чёрные 200 м',
    category: 'notions',
    price: 95,
    oldPrice: 120,
    unit: 'шт',
    image: '/images/cat-notions.png',
    colors: ['Чёрный'],
    colorHex: ['#1a1a1a'],
    rating: 4.9,
    reviews: 312,
    popularity: 99,
    inStock: true,
    description:
      'Высокопрочные армированные нитки 45ЛЛ для машинного и ручного шитья. Не путаются и не рвутся.',
  },
  {
    id: '10',
    slug: 'lenta-atlasnaya-belaya',
    name: 'Лента атласная белая 25 мм',
    category: 'notions',
    price: 45,
    unit: 'м',
    image: '/images/cat-notions.png',
    colors: ['Белый'],
    colorHex: ['#f5f5f0'],
    rating: 4.6,
    reviews: 91,
    popularity: 68,
    isNew: true,
    inStock: true,
    description:
      'Двусторонняя атласная лента с гладкой поверхностью. Для отделки, упаковки и декора изделий.',
  },
  {
    id: '11',
    slug: 'nozhnicy-portnovskie',
    name: 'Ножницы портновские 24 см',
    category: 'accessories',
    price: 1450,
    oldPrice: 1790,
    unit: 'шт',
    image: '/images/cat-accessories.png',
    colors: ['Чёрный'],
    colorHex: ['#1a1a1a'],
    rating: 4.9,
    reviews: 73,
    popularity: 84,
    inStock: true,
    description:
      'Профессиональные кованые ножницы из нержавеющей стали. Острая заточка и удобные ручки.',
  },
  {
    id: '12',
    slug: 'santimetrovaya-lenta',
    name: 'Сантиметровая лента 150 см',
    category: 'accessories',
    price: 90,
    unit: 'шт',
    image: '/images/cat-accessories.png',
    colors: ['Жёлтый'],
    colorHex: ['#e0b53a'],
    rating: 4.7,
    reviews: 205,
    popularity: 72,
    inStock: true,
    description:
      'Гибкая сантиметровая лента с двусторонней разметкой. Незаменимый инструмент для снятия мерок.',
  },
  {
    id: '13',
    slug: 'igolnica-magnitnaya',
    name: 'Игольница магнитная',
    category: 'accessories',
    price: 380,
    unit: 'шт',
    image: '/images/cat-accessories.png',
    colors: ['Красный'],
    colorHex: ['#c0392b'],
    rating: 4.8,
    reviews: 48,
    popularity: 60,
    isNew: true,
    inStock: true,
    description:
      'Магнитная игольница удержит все булавки и иглы на месте. Стильный аксессуар для рабочего стола.',
  },
  {
    id: '14',
    slug: 'rasporyvatel-shvov',
    name: 'Распарыватель швов с колпачком',
    category: 'accessories',
    price: 120,
    unit: 'шт',
    image: '/images/cat-accessories.png',
    colors: ['Серый'],
    colorHex: ['#8a8a8a'],
    rating: 4.6,
    reviews: 167,
    popularity: 64,
    inStock: false,
    description:
      'Острый распарыватель для аккуратного удаления швов и петель. Защитный колпачок в комплекте.',
  },
  {
    id: '15',
    slug: 'gabardin-zelenyj',
    name: 'Габардин зелёный',
    category: 'fabrics',
    price: 560,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Зелёный'],
    colorHex: ['#3c6b4f'],
    fabricType: 'Габардин',
    composition: '100% полиэстер',
    width: 150,
    density: 200,
    care: ['Стирка 40°C', 'Гладить с изнанки'],
    rating: 4.5,
    reviews: 58,
    popularity: 66,
    inStock: true,
    description:
      'Плотный габардин с диагональным переплетением. Практичная ткань для верхней одежды и униформы.',
  },
  {
    id: '16',
    slug: 'velur-bordovyj',
    name: 'Велюр бордовый',
    category: 'fabrics',
    price: 870,
    unit: 'м',
    image: '/images/cat-fabrics.png',
    colors: ['Красный'],
    colorHex: ['#7a1f2b'],
    fabricType: 'Велюр',
    composition: '92% полиэстер, 8% спандекс',
    width: 160,
    density: 250,
    care: ['Деликатная стирка', 'Не гладить ворс'],
    rating: 4.8,
    reviews: 41,
    popularity: 74,
    isNew: true,
    inStock: true,
    description:
      'Мягкий бархатистый велюр глубокого бордового цвета. Для нарядных платьев, штор и декора.',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getRelated(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}
