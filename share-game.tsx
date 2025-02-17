
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export function ShareGame({ gameId }: { gameId: string }) {
  const handleShare = async () => {
    const url = `${window.location.origin}/game/${gameId}`;
    await navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Share it with your friends"
    });
  };

  return (
    <Button onClick={handleShare} variant="outline" size="sm">
      <Share2 className="mr-2 h-4 w-4" />
      Share Game
    </Button>
  );
}
