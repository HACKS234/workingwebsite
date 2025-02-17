import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/search-bar";
import { GameGrid } from "@/components/game-grid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gameCategories } from "@shared/schema";
import { mockGames } from "@/lib/mock-data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFullscreenGame, setActiveFullscreenGame] = useState<number | null>(null);

  const { data: games = mockGames, isLoading } = useQuery({
    queryKey: [
      "games",
      selectedCategory !== "all" ? `/api/games/category/${selectedCategory}` : "/api/games",
      searchQuery ? `/api/games/search?q=${searchQuery}` : null
    ].filter(Boolean),
    queryFn: async ({ queryKey }) => {
      try {
        const res = await fetch(queryKey[1] as string);
        if (!res.ok) {
          // If API fails, use mock data
          return mockGames;
        }
        return await res.json();
      } catch (error) {
        console.error('Failed to fetch games:', error);
        return mockGames;
      }
    }
  });

  const filteredGames = games.filter(game => 
    (selectedCategory === "all" || game.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (!searchQuery || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Cool Games</h1>

      <div className="flex flex-col gap-6 mb-8">
        <SearchBar onSearch={setSearchQuery} />

        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All Games</TabsTrigger>
            {gameCategories.map((category) => (
              <TabsTrigger key={category} value={category.toLowerCase()}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {activeFullscreenGame && (
        <div className="fixed inset-0 z-50 bg-background">
          <iframe
            src={games.find(g => g.id === activeFullscreenGame)?.embedUrl}
            className="w-full h-full border-0"
            allowFullScreen
          />
          <button
            onClick={() => setActiveFullscreenGame(null)}
            className="absolute top-4 right-4 p-2 bg-black rounded-full text-white"
          >
            Close
          </button>
        </div>
      )}

      <GameGrid 
        games={filteredGames} 
        isLoading={isLoading} 
        onFullscreen={(gameId) => setActiveFullscreenGame(gameId)}
      />
    </div>
  );
}