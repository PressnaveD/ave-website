import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Shop',
    links: [
      ['New Arrivals', '/shop?sort=newest'],
      ['Collection', '/shop'],
      ['Men', '/shop?category=men'],
      ['Women', '/shop?category=women'],
      ['Essentials', '/shop?category=accessories'],
    ],
  },
  {
    title: 'About',
    links: [
      ['Our Story', '/about'],
      ['Craftsmanship', '/about#craft'],
      ['Journal', '/journal'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Client Services',
    links: [
      ['Shipping', '/shipping'],
      ['Returns', '/returns'],
      ['Size Guide', '/size-guide'],
      ['FAQ', '/faq'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Cookies', '/cookies'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ivory" role="contentinfo">
      <div className="container-lux py-16 sm:py-24">
        <div className="font-serif text-[18vw] leading-none tracking-tighter text-ink sm:text-[10rem] lg:text-[14rem] select-none">
          avé
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-line pt-12">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="link-underline text-sm text-charcoal">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6 text-[11px] uppercase tracking-widest2 text-muted">
            <a href="#" className="link-underline">Instagram</a>
            <a href="#" className="link-underline">YouTube</a>
            <a href="#" className="link-underline">Pinterest</a>
          </div>
          <p className="text-[11px] uppercase tracking-widest2 text-muted">
            © 2026 avé — With Elegance We Weave
          </p>
        </div>
      </div>
    </footer>
  );
}