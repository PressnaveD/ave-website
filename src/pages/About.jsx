import { images } from '../data/images';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';

const chapters = [
  {
    eyebrow: 'Our Philosophy',
    title: 'Elegance does not need to announce itself.',
    body:
      'avé was created for the quiet wardrobe — pieces that hold their own through proportion, material and finish rather than through mark.',
    image: images.aboutCraft,
    reverse: false,
  },
  {
    eyebrow: 'Craft',
    title: 'Built slowly, tested across seasons.',
    body:
      'We prototype, wear, wash and repeat before approving a piece. What survives the process becomes part of the house.',
    image: images.aboutDesign,
    reverse: true,
  },
  {
    eyebrow: 'Design',
    title: 'Form first, always.',
    body:
      'Every silhouette begins as a line drawing and is refined until nothing further can be removed. Detail is added only when it earns its place.',
    image: images.aboutMaterial,
    reverse: false,
  },
  {
    eyebrow: 'Intention',
    title: 'Made to remain.',
    body:
      'avé is not designed for a season. It is designed for the person who keeps their wardrobe for years.',
    image: images.craftsmanshipDetail,
    reverse: true,
  },
];

export default function About() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero */}
      <section className="container-lux" aria-labelledby="about-title">
        <Reveal>
          <p className="eyebrow">The House</p>
          <h1 id="about-title" className="mt-6 font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-ink">
            The House of avé
          </h1>
          <p className="mt-8 max-w-2xl text-sm text-charcoal">
            A modern luxury house. We design timeless clothing with a focus on
            refined silhouettes, premium materials and understated branding.
          </p>
        </Reveal>
        <Reveal className="mt-16">
          <div className="aspect-[16/9] overflow-hidden bg-line/40">
            <img
              src={images.aboutHero}
              alt="The house of avé"
              className="h-full w-full object-cover"
              fetchpriority="high"
            />
          </div>
        </Reveal>
      </section>

      {/* Chapters */}
      <section className="container-lux py-24 sm:py-36">
        <div className="space-y-24 sm:space-y-36">
          {chapters.map((c, i) => (
            <Reveal
              key={c.eyebrow}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center`}
            >
              <div className={`lg:col-span-6 ${c.reverse ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden bg-line/40">
                  <img src={c.image} alt={c.eyebrow} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className={`lg:col-span-6 ${c.reverse ? 'lg:order-1 lg:pr-10' : 'lg:pl-10'}`}>
                <p className="eyebrow">{c.eyebrow}</p>
                <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
                  {c.title}
                </h2>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-charcoal">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}