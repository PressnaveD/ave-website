import { images } from './images';

// Mock data — structured to swap with GET /api/products later.
const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products = [
  {
    id: 'ave-signature-tee',
    name: 'avé Signature Tee',
    slug: 'ave-signature-tee',
    price: 3490,
    category: 'men',
    collection: 'Signature',
    description:
      'A refined everyday essential crafted for a clean, understated silhouette. Cut from long-staple cotton with a subtle drop shoulder.',
    material: '100% long-staple Supima cotton, 240gsm',
    care: 'Cold machine wash. Do not bleach. Warm iron on reverse. Dry flat.',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Olive', hex: '#626653' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      img('photo-1521572163474-6864f9cf17ab'),
      img('photo-1503341504253-dff4815485f1'),
      img('photo-1512436991641-6745cdb1723f'),
    ],
    featured: true,
    tag: 'Signature',
  },
  {
    id: 'ave-tailored-trouser',
    name: 'avé Tailored Trouser',
    slug: 'ave-tailored-trouser',
    price: 8990,
    category: 'women',
    collection: 'Essentials',
    description:
      'A high-rise trouser with a straight, elongated leg. Engineered for a fluid drape and quiet confidence.',
    material: '68% virgin wool, 30% viscose, 2% elastane',
    care: 'Dry clean only. Steam to release creases.',
    colors: [
      { name: 'Charcoal', hex: '#2A2A2A' },
      { name: 'Beige', hex: '#D8CFC2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      img('photo-1594633312681-425c7b97ccd1'),
      img('photo-1584370848010-d7fe6bc767ec'),
      img('photo-1551803091-e20673f15770'),
    ],
    featured: true,
    tag: 'Essentials',
  },
  {
    id: 'ave-structured-coat',
    name: 'avé Structured Coat',
    slug: 'ave-structured-coat',
    price: 24990,
    category: 'women',
    collection: 'Signature',
    description:
      'A longline coat with a sculpted shoulder and concealed closure. Designed to hold its line across seasons.',
    material: '80% wool, 20% cashmere. Cupro lining.',
    care: 'Dry clean only. Store on a wide shoulder hanger.',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Maroon', hex: '#4B1F26' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      img('photo-1539109136881-3be0616acf4b'),
      img('photo-1591047139829-d91aecb6caea'),
      img('photo-1544022613-e87ca75a784a'),
    ],
    featured: true,
    tag: 'Signature',
  },
  {
    id: 'ave-knit-crew',
    name: 'avé Knit Crew',
    slug: 'ave-knit-crew',
    price: 6490,
    category: 'men',
    collection: 'Essentials',
    description:
      'A fine-gauge knit with a clean neckline. Soft enough for daily wear, considered enough for evening.',
    material: '90% merino wool, 10% silk',
    care: 'Hand wash cold. Dry flat. Do not wring.',
    colors: [
      { name: 'Olive', hex: '#626653' },
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      img('photo-1576566588028-4147f3842f27'),
      img('photo-1618354691373-d851c5c3a990'),
      img('photo-1591047139829-d91aecb6caea'),
    ],
    featured: true,
    tag: 'Essentials',
  },
  {
    id: 'ave-silk-shirt',
    name: 'avé Silk Shirt',
    slug: 'ave-silk-shirt',
    price: 11990,
    category: 'women',
    collection: 'Signature',
    description:
      'A fluid silk shirt with a relaxed collar and mother-of-pearl buttons. Quietly distinctive.',
    material: '100% mulberry silk, 19mm',
    care: 'Dry clean recommended. Cool iron on reverse.',
    colors: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Forest', hex: '#00594C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      img('photo-1602810318383-e386cc2a3ccf'),
      img('photo-1583744946564-b52ac1c389c8'),
      img('photo-1596755094514-f87e34085b2c'),
    ],
    featured: false,
    tag: 'Signature',
  },
  {
    id: 'ave-wool-scarf',
    name: 'avé Wool Scarf',
    slug: 'ave-wool-scarf',
    price: 4290,
    category: 'accessories',
    collection: 'Essentials',
    description:
      'A generous wool scarf with a hand-finished fringe. Warmth without weight.',
    material: '100% lambswool',
    care: 'Dry clean only.',
    colors: [
      { name: 'Beige', hex: '#D8CFC2' },
      { name: 'Maroon', hex: '#4B1F26' },
      { name: 'Charcoal', hex: '#2A2A2A' },
    ],
    sizes: ['One Size'],
    images: [
      img('photo-1520903920243-00d872a2d1c9'),
      img('photo-1601924994987-69e26d50dc26'),
      img('photo-1520006403909-838d6b92c22e'),
    ],
    featured: false,
    tag: 'Essentials',
  },
  {
    id: 'ave-leather-belt',
    name: 'avé Leather Belt',
    slug: 'ave-leather-belt',
    price: 5490,
    category: 'accessories',
    collection: 'Essentials',
    description:
      'A vegetable-tanned leather belt with a slim brushed-brass buckle. Made to age well.',
    material: 'Vegetable-tanned full-grain leather, brass hardware',
    care: 'Wipe with a soft dry cloth. Condition occasionally.',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Maroon', hex: '#4B1F26' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      img('photo-1553062407-98eeb64c6a62'),
      img('photo-1624222247344-550fb60583dc'),
      img('photo-1611652022419-a9419f74343d'),
    ],
    featured: false,
    tag: 'Essentials',
  },
  {
    id: 'ave-poplin-shirt',
    name: 'avé Poplin Shirt',
    slug: 'ave-poplin-shirt',
    price: 6290,
    category: 'men',
    collection: 'Signature',
    description:
      'A precise poplin shirt with a clean placket and a considered collar roll.',
    material: '100% Egyptian cotton poplin',
    care: 'Machine wash cold. Hang dry. Warm iron.',
    colors: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      img('photo-1596755094514-f87e34085b2c'),
      img('photo-1602810318383-e386cc2a3ccf'),
      img('photo-1620012253295-c15cc3e65df4'),
    ],
    featured: false,
    tag: 'Signature',
  },
];

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
export const getFeaturedProducts = () => products.filter((p) => p.featured).slice(0, 4);