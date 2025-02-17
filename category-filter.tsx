
import { Button } from "./ui/button";

const categories = ["All", "Action", "Puzzle", "Strategy", "Sports"];

export function CategoryFilter({ onSelect }: { onSelect: (cat: string) => void }) {
  return (
    <div className="flex gap-2 mb-4">
      {categories.map(cat => (
        <Button
          key={cat}
          variant="outline"
          onClick={() => onSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
