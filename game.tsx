import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Maximize, Minimize } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Game() {
  const [, params] = useRoute("/game/:id");
  const id = params?.id;
  const { user } = useAuth();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { data: game, isLoading } = useQuery({
    queryKey: [`/api/games/${id}`],
    enabled: !!id
  });

  useEffect(() => {
    if (game) {
      // Record play start
      fetch(`/api/games/${id}/play`, { method: "POST" });

      // Start tracking play time if user is logged in
      if (user) {
        const interval = setInterval(() => {
          fetch("/api/users/playtime", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id })
          });
        }, 60000); // Update every minute

        return () => clearInterval(interval);
      }
    }
  }, [game, id, user]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (iframeRef.current?.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (isLoading || !game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-[600px] bg-card animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </Link>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
            <p className="text-muted-foreground mb-4">{game.description}</p>
            <div className="flex gap-2">
              <Badge>{game.category}</Badge>
              <Badge variant="outline">{game.difficulty}</Badge>
              <Badge variant="secondary">
                {game.playCount.toLocaleString()} plays
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Card className="w-full aspect-[16/9] overflow-hidden">
          <iframe
            ref={iframeRef}
            src={game.embedUrl}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </Card>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}