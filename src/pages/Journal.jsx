import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import Reveal from '../components/Reveal';

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function Journal() {
  const [featured, ...rest] = articles;

  return (
    <div className="pt-24 sm:pt-32">
      <section className="container-lux" aria-labelledby="journal-title">
        <Reveal>
          <p className="eyebrow">Journal</p>
          <h1 id="journal-title" className="mt-6 font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-ink">
            Notes from the House
          </h1>
        </Reveal>
      </section>

      {/* Featured */}
      <section className="container-lux mt-16 sm:mt-24">
        <Reveal>
          <Link to={`/journal/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] overflow-hidden bg-line/40">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow">{featured.category} · {formatDate(featured.date)}</p>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-md text-sm text-charcoal">{featured.excerpt}</p>
              <p className="mt-8 text-[11px] uppercase tracking-widest2 text-ink link-underline inline-block">
                Read Article
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="container-lux mt-24 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {rest.map((a, i) => (
            <Reveal key={a.id} delay={i * 60}>
              <Link to={`/journal/${a.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-line/40">
                  <img
                    src={a.cover}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-lux group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-5">{a.category} · {formatDate(a.date)}</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">{a.title}</h3>
                <p className="mt-3 text-sm text-charcoal line-clamp-2">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}