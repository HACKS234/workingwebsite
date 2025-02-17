
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Card } from "./ui/card";

export function Notifications() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New game added!" },
    { id: 2, text: "Your rank increased!" }
  ]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowNotifs(!showNotifs)}
      >
        <Bell className="h-5 w-5" />
      </Button>
      {showNotifs && (
        <Card className="absolute right-0 mt-2 w-64 p-4 z-50">
          {notifications.map(notif => (
            <div key={notif.id} className="mb-2">
              {notif.text}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
