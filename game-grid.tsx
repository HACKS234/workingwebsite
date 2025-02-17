import { GameCard } from "./game-card";
import type { Game } from "@shared/schema";

interface GameGridProps {
  games: Game[];
  isLoading?: boolean;
  onFullscreen?: (gameId: number) => void;
}

export function GameGrid({ games, isLoading, onFullscreen }: GameGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-80 bg-card animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-muted-foreground">No games found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onFullscreen={onFullscreen ? () => onFullscreen(game.id) : undefined}
        />
      ))}
    </div>
  );
}