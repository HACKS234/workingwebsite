
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";

export function FriendManagement() {
  const [username, setUsername] = useState("");

  const { data: requests } = useQuery({
    queryKey: ["friend-requests"],
    queryFn: () => fetch("/api/friends/requests").then(res => res.json())
  });

  const addFriend = useMutation({
    mutationFn: (username: string) =>
      fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      }),
    onSuccess: () => {
      toast({ title: "Friend request sent!" });
      setUsername("");
    }
  });

  const handleRequest = useMutation({
    mutationFn: ({ id, action }: { id: number; action: "accept" | "decline" }) =>
      fetch(`/api/friends/requests/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      })
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username to add friend"
        />
        <Button onClick={() => addFriend.mutate(username)}>
          Add Friend
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold">Friend Requests</h3>
        {requests?.map((request: any) => (
          <div key={request.id} className="flex items-center gap-2">
            <span>{request.username}</span>
            <Button
              size="sm"
              onClick={() => handleRequest.mutate({ id: request.id, action: "accept" })}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleRequest.mutate({ id: request.id, action: "decline" })}
            >
              Decline
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
