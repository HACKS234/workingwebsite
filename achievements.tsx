
import { Trophy, Medal, Star } from "lucide-react";
import { Card } from "./ui/card";

const achievements = [
  { id: 1, title: "First Win", icon: Trophy, description: "Win your first game" },
  { id: 2, title: "Speed Runner", icon: Medal, description: "Complete in under 1min" },
  { id: 3, title: "Pro Player", icon: Star, description: "Win 10 games" }
];

export function Achievements() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="p-4">
          <div className="flex items-center gap-2">
            <achievement.icon className="h-5 w-5" />
            <h3 className="font-bold">{achievement.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </Card>
      ))}
    </div>
  );
}
