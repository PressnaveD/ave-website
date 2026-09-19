import { useState } from 'react';
import Button from './Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('done');
    setEmail('');
  };

  return (
    <section className="border-t border-line" aria-labelledby="newsletter-title">
      <div className="container-lux py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 id="newsletter-title" className="mt-4 font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
            Stay with avé
          </h2>
        </div>
        <div className="lg:pt-3">
          <p className="text-sm text-charcoal max-w-md">
            Receive new collection announcements, editorial stories and private access
            to upcoming releases.
          </p>
          <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:border-b sm:border-ink">
            <label htmlFor="newsletter-email" className="sr-only">Your email</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              className="w-full bg-transparent py-3 text-[11px] uppercase tracking-widest2 outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-widest2 font-medium text-ink sm:pl-6 py-3 text-left sm:text-right transition-opacity hover:opacity-60"
            >
              {status === 'done' ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
          {status === 'done' && (
            <p className="mt-3 text-xs text-muted">Thank you. Please check your inbox to confirm.</p>
          )}
        </div>
      </div>
    </section>
  );
}