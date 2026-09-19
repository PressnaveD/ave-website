import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary: 'bg-ink text-ivory px-10 py-4 hover:bg-charcoal',
  secondary: 'border border-ink text-ink px-10 py-4 hover:bg-ink hover:text-ivory',
  ghost: 'text-ink px-0 py-2',
};

export default function Button({
  to,
  href,
  children,
  variant = 'primary',
  withArrow = false,
  className = '',
  ...rest
}) {
  const base = `group/btn inline-flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest2 font-medium transition-all duration-500 ease-lux select-none ${variants[variant] || variants.primary} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-500 ease-lux group-hover/btn:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </>
  );

  if (to) return <Link to={to} className={base} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={base} {...rest}>{content}</a>;
  return <button className={base} {...rest}>{content}</button>;
}