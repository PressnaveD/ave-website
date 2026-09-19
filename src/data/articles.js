const img = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const articles = [
  {
    id: 'art-of-restraint',
    slug: 'the-art-of-restraint',
    category: 'Philosophy',
    title: 'The Art of Restraint',
    date: '2026-01-12',
    excerpt:
      'What is left out is as considered as what remains. A study of the discipline behind avé.',
    cover: img('photo-1490481651871-ab68de25d43d'),
    body: [
      'Restraint is not absence. It is a decision, made repeatedly, to allow only what matters to remain.',
      'Every avé piece begins with a reduction. We remove the unnecessary, the loud, the temporary — until what is left holds its own quiet authority.',
      'The result is a wardrobe that does not need to be explained.',
    ],
  },
  {
    id: 'timeless-design',
    slug: 'why-timeless-design-matters',
    category: 'Design',
    title: 'Why Timeless Design Matters',
    date: '2025-12-02',
    excerpt:
      'Seasons change quickly. A considered silhouette does not. On designing beyond the moment.',
    cover: img('photo-1445205170230-053b83016050'),
    body: [
      'Timelessness is often misunderstood as nostalgia. It is not. It is the discipline of designing something that will remain relevant precisely because it was never designed to be trendy.',
      'We work from proportion and material first. Trend is allowed in only if it survives a decade of looking.',
    ],
  },
  {
    id: 'making-drop-001',
    slug: 'the-making-of-drop-001',
    category: 'Atelier',
    title: 'The Making of Drop 001',
    date: '2025-11-18',
    excerpt:
      'Nine months, three mills and one silhouette. Inside the first chapter of avé.',
    cover: img('photo-1558769132-cb1aea458c5e'),
    body: [
      'Drop 001 began with a single question: what does the first piece of a house need to be?',
      'We answered it slowly. Every fabric was tested across a full season before it was approved. Every proportion was revised until it stopped asking for attention.',
      'What remains is the beginning.',
    ],
  },
  {
    id: 'inside-studio',
    slug: 'inside-the-ave-studio',
    category: 'Atelier',
    title: 'Inside the avé Studio',
    date: '2025-10-05',
    excerpt:
      'A quiet room, natural light and a long table. A short note on how we work.',
    cover: img('photo-1520006403909-838d6b92c22e'),
    body: [
      'The studio is deliberately plain. Natural light, long tables, a pin board with three silhouettes at a time — no more.',
      'We keep the process close to the material. Samples stay in the room. Nothing is approved from a screen.',
    ],
  },
];

export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug);