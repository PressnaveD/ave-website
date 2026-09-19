import { X } from 'lucide-react';

export function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-line py-6">
      <p className="eyebrow mb-4">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <span
        className={[
          'h-4 w-4 border transition-colors duration-300 flex items-center justify-center',
          checked ? 'bg-ink border-ink' : 'border-line group-hover:border-ink',
        ].join(' ')}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-none stroke-ivory" strokeWidth="1.6">
            <path d="M1 4l2.5 2.5L9 1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm text-charcoal">{label}</span>
    </label>
  );
}

export function MobileFilterSheet({ open, onClose, children }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <div
        className={[
          'fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto bg-ivory lg:hidden',
          'transition-transform duration-500 ease-lux',
          open ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-line bg-ivory px-6 py-4">
          <p className="nav-link">Filters</p>
          <button onClick={onClose} aria-label="Close filters">
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>
        <div className="px-6 pb-8">{children}</div>
      </div>
    </>
  );
}