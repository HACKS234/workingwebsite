
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Messages } from "@/components/messages";
import { FriendManagement } from "@/components/friend-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvatarUpload } from "@/components/avatar-upload";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <Card className="p-6 space-y-4">
          <AvatarUpload />
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p>Play Time: {user?.playTime || 0} minutes</p>
        </Card>

        <Tabs defaultValue="messages" className="flex-1">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>
          <TabsContent value="messages" className="mt-4">
            <Messages />
          </TabsContent>
          <TabsContent value="friends" className="mt-4">
            <FriendManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
