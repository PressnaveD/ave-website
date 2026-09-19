import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-lux pt-40 pb-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl text-ink">
        Page Not Found
      </h1>
      <p className="mt-6 max-w-md mx-auto text-sm text-charcoal">
        The page you are looking for has moved.
      </p>
      <div className="mt-10">
        <Link to="/" className="btn-secondary inline-block">Return Home</Link>
      </div>
    </div>
  );
}