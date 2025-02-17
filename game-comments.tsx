
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function GameComments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), text: newComment }]);
    setNewComment("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <Textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="mb-2"
      />
      <Button onClick={addComment}>Post Comment</Button>
      <div className="mt-4 space-y-2">
        {comments.map(comment => (
          <div key={comment.id} className="p-2 bg-secondary rounded">
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
}
