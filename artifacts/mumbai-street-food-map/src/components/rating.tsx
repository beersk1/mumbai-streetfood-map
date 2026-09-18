import { Star } from 'lucide-react';

export function Rating({ value, reviews, large = false }: { value: number; reviews?: number; large?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 ${large ? 'text-base' : 'text-sm'}`} data-testid={`rating-${value}`}>
      <Star size={large ? 17 : 14} className="fill-secondary text-secondary" />
      <strong className="font-semibold">{value.toFixed(1)}</strong>
      {reviews !== undefined && <span className="text-muted-foreground">({reviews})</span>}
    </span>
  );
}