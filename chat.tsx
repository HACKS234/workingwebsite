
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      content: newMessage,
      author: user?.username || "Anonymous",
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Chat</h1>
      
      <div className="flex flex-col h-[600px]">
        <Card className="flex-1 p-4 mb-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold">{message.author}</span>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-1">{message.content}</p>
            </div>
          ))}
        </Card>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
