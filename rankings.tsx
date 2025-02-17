import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Loader2, Trophy } from "lucide-react";

interface RankingUser {
  username: string;
  playTime: number;
}

export default function Rankings() {
  const { data: users = [], isLoading } = useQuery<RankingUser[]>({
    queryKey: ["/api/users/rankings"],
    queryFn: async () => {
      const res = await fetch("/api/users/rankings");
      if (!res.ok) {
        throw new Error("Failed to fetch rankings");
      }
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">Player Rankings</h1>
      </div>

      <Card className="bg-black border-gray-700">
        <div className="divide-y divide-gray-700">
          {users.map((user, index) => (
            <div
              key={user.username}
              className="p-4 flex items-center justify-between hover:bg-gray-900"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-400">#{index + 1}</span>
                <span className="text-lg text-gray-200">{user.username}</span>
              </div>
              <span className="text-gray-400">
                {Math.floor(user.playTime / 3600)}h {Math.floor((user.playTime % 3600) / 60)}m
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}