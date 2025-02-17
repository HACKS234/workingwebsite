
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function Support() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      content: newPost,
      author: user?.username || "Anonymous",
      timestamp: new Date().toISOString()
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Support</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your support post..."
          className="mb-4"
        />
        <Button type="submit">Post</Button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold">{post.author}</span>
              <span className="text-gray-500">
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
            <p>{post.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
