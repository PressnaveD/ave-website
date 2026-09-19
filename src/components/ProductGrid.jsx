import ProductCard from './ProductCard';

export default function ProductGrid({ products, priorityCount = 4 }) {
  if (!products?.length) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-2xl text-ink">No products found</p>
        <p className="mt-2 text-sm text-muted">Try adjusting your filters.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}