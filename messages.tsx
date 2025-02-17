
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery, useMutation } from "@tanstack/react-query";

type Message = {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
};

export function Messages() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: () => fetch("/api/friends").then(res => res.json())
  });

  const { data: messages } = useQuery({
    queryKey: ["messages", selectedUser],
    queryFn: () => selectedUser ? 
      fetch(`/api/messages/${selectedUser}`).then(res => res.json()) : [],
    enabled: !!selectedUser
  });

  const sendMessage = useMutation({
    mutationFn: (content: string) =>
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: selectedUser, content })
      })
  });

  return (
    <div className="flex h-[600px] gap-4">
      <Card className="w-64 p-4">
        <h3 className="font-bold mb-4">Friends</h3>
        <ScrollArea className="h-[500px]">
          {friends?.map((friend: any) => (
            <Button
              key={friend.id}
              variant={selectedUser === friend.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedUser(friend.id)}
            >
              {friend.username}
            </Button>
          ))}
        </ScrollArea>
      </Card>

      <Card className="flex-1 p-4 flex flex-col">
        <ScrollArea className="flex-1 mb-4">
          {messages?.map((msg: Message) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded ${
                msg.senderId === user?.id
                  ? "bg-primary ml-auto"
                  : "bg-muted mr-auto"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && messageText) {
                sendMessage.mutate(messageText);
                setMessageText("");
              }
            }}
          />
          <Button
            onClick={() => {
              if (messageText) {
                sendMessage.mutate(messageText);
                setMessageText("");
              }
            }}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
}
