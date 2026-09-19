import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug, articles } from '../data/articles';

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="container-lux pt-40 pb-32 text-center">
        <p className="eyebrow">Not Found</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">This article is unavailable.</h1>
        <Link to="/journal" className="mt-8 inline-flex text-[11px] uppercase tracking-widest2 link-underline">
          Return to Journal
        </Link>
      </div>
    );
  }

  const others = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="pt-24 sm:pt-32">
      <header className="container-lux">
        <Link to="/journal" className="eyebrow link-underline">Journal</Link>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl sm:text-6xl leading-[1.05] text-ink">
          {article.title}
        </h1>
        <p className="mt-6 eyebrow">{article.category} · {formatDate(article.date)}</p>
      </header>

      <div className="container-lux mt-16">
        <div className="aspect-[16/9] overflow-hidden bg-line/40">
          <img src={article.cover} alt={article.title} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="container-lux mt-16 pb-24">
        <div className="mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-charcoal">
          {article.body.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-lg text-ink' : ''}>{p}</p>
          ))}
        </div>
      </div>

      {others.length > 0 && (
        <section className="container-lux border-t border-line pt-16 pb-24">
          <p className="eyebrow">More from the Journal</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
            {others.map((a) => (
              <Link key={a.id} to={`/journal/${a.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-line/40">
                  <img
                    src={a.cover}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-lux group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-4">{a.category}</p>
                <h3 className="mt-2 font-serif text-xl text-ink">{a.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}