import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={[
        'fixed inset-0 z-[100] flex items-center justify-center bg-white',
        'transition-opacity duration-500 ease-lux',
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
      aria-hidden={hidden}
    >
      <span className="font-serif text-4xl tracking-widest2 text-ink animate-fadeIn">avé</span>
    </div>
  );
}