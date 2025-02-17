import { type Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertGameSchema } from "@shared/schema";
import { setupAuth } from "./auth";

export function registerRoutes(app: Express) {
  // Set up authentication routes
  setupAuth(app);

  // Rankings route
  app.get("/api/users/rankings", async (req, res) => {
    const users = await storage.getAllUsers();
    // Only send username and playtime, exclude sensitive information
    const rankings = users.map(user => ({
      username: user.username,
      playTime: user.playTime || 0
    }));
    res.json(rankings.sort((a, b) => b.playTime - a.playTime));
  });

  // Track play time
  app.post("/api/users/playtime", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    const userId = req.user!.id;
    await storage.incrementPlayTime(userId);
    res.json({ success: true });
  });

  // Game routes
  app.get("/api/games", async (req, res) => {
    const games = await storage.getAllGames();
    res.json(games);
  });

  app.get("/api/games/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.json([]);
    }
    const games = await storage.searchGames(query);
    res.json(games);
  });

  app.get("/api/games/category/:category", async (req, res) => {
    const { category } = req.params;
    const games = await storage.getGamesByCategory(category);
    res.json(games);
  });

  app.get("/api/games/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const game = await storage.getGameById(id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  });

  app.post("/api/games/:id/play", async (req, res) => {
    const id = parseInt(req.params.id);
    const game = await storage.getGameById(id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    await storage.incrementPlayCount(id);
    res.json({ success: true });
  });

  const server = createServer(app);
  return server;
}