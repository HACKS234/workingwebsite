
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function AvatarUpload() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatar || ""} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="avatar-upload"
      />
      <Button asChild>
        <label htmlFor="avatar-upload">Upload Avatar</label>
      </Button>
    </div>
  );
}
