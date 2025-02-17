import type { Game } from "@shared/schema";

export const mockGames: Game[] = [
  {
    id: 1,
    title: "Run 3",
    description: "Run and jump through space in this exciting endless runner!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/run-3.png",
    embedUrl: "https://www.coolmathgames.com/0-run-3/play",
    category: "Skill",
    difficulty: "Medium",
    playCount: 15234
  },
  {
    id: 2,
    title: "Duck Life 4",
    description: "Train your duck and compete in exciting races!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/duck-life-4_1.png",
    embedUrl: "https://www.coolmathgames.com/0-duck-life-4/play",
    category: "Strategy",
    difficulty: "Easy",
    playCount: 23417
  },
  {
    id: 3,
    title: "Retro Bowl",
    description: "Manage your football team to victory in this retro-style game!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/retro-bowl.png",
    embedUrl: "https://www.coolmathgames.com/0-retro-bowl/play",
    category: "Sports",
    difficulty: "Medium",
    playCount: 12453
  },
  {
    id: 4,
    title: "Moto X3M",
    description: "Race your bike through challenging obstacle courses!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/moto-x3m.png",
    embedUrl: "https://www.coolmathgames.com/0-moto-x3m/play",
    category: "Racing",
    difficulty: "Hard",
    playCount: 19876
  },
  {
    id: 5,
    title: "2048",
    description: "Combine the numbers to reach 2048 in this addictive puzzle!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/2048.png",
    embedUrl: "https://www.coolmathgames.com/0-2048/play",
    category: "Numbers",
    difficulty: "Medium",
    playCount: 8745
  },
  {
    id: 6,
    title: "Snake",
    description: "Classic snake game with modern graphics!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/snake.png",
    embedUrl: "https://www.coolmathgames.com/0-snake/play",
    category: "Classic",
    difficulty: "Easy",
    playCount: 31245
  },
  {
    id: 7,
    title: "B-Cubed",
    description: "Guide your cube to the exit in this challenging puzzle game!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/b-cubed.png",
    embedUrl: "https://www.coolmathgames.com/0-b-cubed/play",
    category: "Logic",
    difficulty: "Medium",
    playCount: 27834
  },
  {
    id: 8,
    title: "Papa's Pizzeria",
    description: "Run your own pizza restaurant in this time management game!",
    thumbnailUrl: "https://www.coolmathgames.com/sites/default/files/papas-pizzeria.png",
    embedUrl: "https://www.coolmathgames.com/0-papas-pizzeria/play",
    category: "Strategy",
    difficulty: "Easy",
    playCount: 42156
  },
  {
    id: 9,
    title: "Ludo",
    description: "Classic board game you can play with friends!",
    thumbnailUrl: "https://unblocked-games.s3.amazonaws.com/games/ludo/splash.jpg",
    embedUrl: "https://unblocked-games.s3.amazonaws.com/games/ludo/index.html",
    category: "Classic",
    difficulty: "Easy",
    playCount: 15678
  },
  {
    id: 10,
    title: "Mini Golf",
    description: "Play through challenging mini golf courses!",
    thumbnailUrl: "https://unblocked-games.s3.amazonaws.com/games/mini-golf/splash.jpg",
    embedUrl: "https://unblocked-games.s3.amazonaws.com/games/mini-golf/index.html",
    category: "Sports",
    difficulty: "Medium",
    playCount: 38912
  }
];

// Initialize storage with mock data
export async function initializeMockData() {
  const res = await fetch("/api/games");
  const games = await res.json();

  if (games.length === 0) {
    for (const game of mockGames) {
      await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
      });
    }
  }
}