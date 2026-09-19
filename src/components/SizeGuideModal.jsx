import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useScrollLock } from '../hooks/useScrollLock';

const rows = [
  ['XS', '86–90', '70–74', '88–92'],
  ['S', '90–94', '74–78', '92–96'],
  ['M', '94–98', '78–82', '96–100'],
  ['L', '98–104', '82–88', '100–106'],
  ['XL', '104–110', '88–94', '106–112'],
  ['XXL', '110–116', '94–100', '112–118'],
];

export default function SizeGuideModal() {
  const { sizeGuideOpen, closeSizeGuide } = useUI();
  useScrollLock(sizeGuideOpen);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeSizeGuide();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSizeGuide]);

  if (!sizeGuideOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Size guide"
    >
      <div className="absolute inset-0 bg-ink/40" onClick={closeSizeGuide} aria-hidden="true" />
      <div className="relative w-full max-w-2xl bg-white p-8 sm:p-10 animate-fadeUp">
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Size Guide</p>
            <h2 className="mt-2 font-serif text-3xl text-ink">Measurements</h2>
          </div>
          <button onClick={closeSizeGuide} aria-label="Close size guide">
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>
        <p className="mt-6 text-sm text-charcoal max-w-prose">
          All measurements are in centimetres. For a relaxed fit, choose one size up.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pb-3 eyebrow font-medium">Size</th>
                <th className="pb-3 eyebrow font-medium">Chest</th>
                <th className="pb-3 eyebrow font-medium">Waist</th>
                <th className="pb-3 eyebrow font-medium">Hip</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-line/60">
                  {r.map((c, i) => (
                    <td key={i} className="py-3 tabular-nums text-ink">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}