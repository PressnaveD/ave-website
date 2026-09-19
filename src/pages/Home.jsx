import { Link } from 'react-router-dom';
import { images } from '../data/images';
import { getFeaturedProducts } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Button from '../components/Button';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-ink" aria-label="Campaign">
        <picture>
          <source media="(max-width: 767px)" srcSet={images.heroMobile} />
          <img
            src={images.hero}
            alt="avé campaign — editorial fashion"
            className="absolute inset-0 h-full w-full object-cover animate-reveal"
            fetchpriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/50" aria-hidden="true" />

        <div className="relative container-lux flex min-h-[92vh] sm:min-h-screen flex-col justify-end pb-16 sm:pb-24 text-ivory">
          <div className="max-w-2xl animate-fadeUp">
            <p className="eyebrow text-ivory/80">The House of avé</p>
            <h1 className="mt-6 font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95]">
              With Elegance<br />We Weave
            </h1>
            <p className="mt-8 max-w-md text-sm text-ivory/85">
              A modern luxury house. Timeless silhouettes, considered materials,
              and quiet confidence.
            </p>
            <div className="mt-10">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-4 border border-ivory px-10 py-4 text-[11px] uppercase tracking-widest2 text-ivory transition-all duration-500 ease-lux hover:bg-white hover:text-ink"
              >
                Explore Collection
                <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="container-lux py-24 sm:py-40" aria-labelledby="statement">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Philosophy</p>
          <h2 id="statement" className="mt-8 font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1] text-ink">
            Designed for those who find confidence in simplicity.
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-charcoal">
            avé exists for the considered wardrobe. Every piece begins with form —
            a silhouette refined until nothing further can be removed. What remains
            is meant to be worn often and kept quietly.
          </p>
        </Reveal>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="container-lux pb-24 sm:pb-32" aria-labelledby="collection">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 id="collection" className="mt-4 font-serif text-4xl sm:text-5xl text-ink">
              The Collection
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            A study in form, fabric and restraint.
          </p>
        </Reveal>

        <div className="mt-14">
          <ProductGrid products={featured} />
        </div>

        <div className="mt-16 flex justify-center">
          <Button to="/shop" variant="secondary" withArrow>
            View All
          </Button>
        </div>
      </section>

      {/* EDITORIAL COLLECTION SECTION */}
      <section className="border-t border-line" aria-labelledby="essentials">
        <div className="container-lux py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-7 order-1">
            <div className="aspect-[4/5] overflow-hidden bg-line/40">
              <img
                src={images.editorialCollection}
                alt="avé essentials — editorial still"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-lux hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 order-2 lg:pl-6">
            <p className="eyebrow">The Essentials</p>
            <h2 id="essentials" className="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
              Refined pieces designed to exist beyond seasons.
            </h2>
            <p className="mt-8 max-w-md text-sm text-charcoal">
              Cut from considered materials and finished with restraint. Each piece is
              made to layer quietly into a wardrobe that already knows itself.
            </p>
            <div className="mt-10">
              <Button to="/shop?category=accessories" variant="primary" withArrow>
                Discover the Collection
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMPAIGN */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden bg-ink" aria-labelledby="drop">
        <img
          src={images.campaign}
          alt="avé Drop 001 campaign"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />
        <div className="relative container-lux flex h-full flex-col items-start justify-center text-ivory">
          <Reveal>
            <p className="eyebrow text-ivory/85">Drop 001</p>
            <h2 id="drop" className="mt-6 font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95]">
              The First<br />Chapter
            </h2>
            <div className="mt-10">
              <Link
                to="/shop?sort=newest"
                className="group inline-flex items-center gap-4 border border-ivory px-10 py-4 text-[11px] uppercase tracking-widest2 text-ivory transition-all duration-500 ease-lux hover:bg-white hover:text-ink"
              >
                Discover Drop 001
                <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="container-lux py-24 sm:py-36" aria-labelledby="craft">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Craftsmanship</p>
            <h2 id="craft" className="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
              Crafted with intention.
            </h2>
            <p className="mt-8 max-w-md text-sm text-charcoal">
              Every avé piece is designed with attention to silhouette, material and
              detail. Nothing is added for effect. Nothing is removed for speed.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <p className="eyebrow">Material</p>
                <p className="mt-3 text-sm text-charcoal">
                  Long-staple cottons, wool, silk and vegetable-tanned leather — sourced
                  from mills we return to.
                </p>
              </div>
              <div>
                <p className="eyebrow">Finish</p>
                <p className="mt-3 text-sm text-charcoal">
                  Finished by hand where it matters. Tested across a full season before
                  approval.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="sm:mt-12 aspect-[4/5] overflow-hidden bg-line/40">
              <img
                src={images.craftsmanship}
                alt="Atelier detail"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-line/40">
              <img
                src={images.craftsmanshipDetail}
                alt="Fabric close-up"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* BRAND STORY */}
      <section className="border-t border-line" aria-labelledby="house">
        <div className="container-lux py-24 sm:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Our Story</p>
            <h2 id="house" className="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
              The House of avé
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-charcoal">
              avé was created around a simple idea: elegance does not need to announce
              itself. We build slowly, from proportion and material first, and let the
              work speak at the volume it deserves.
            </p>
            <div className="mt-10">
              <Button to="/about" variant="ghost" withArrow>
                Read More
              </Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden bg-line/40">
              <img
                src={images.house}
                alt="The house of avé"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  );
}