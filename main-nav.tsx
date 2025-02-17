import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const categories = [
  { name: "Strategy", href: "/category/strategy" },
  { name: "Skill", href: "/category/skill" },
  { name: "Numbers", href: "/category/numbers" },
  { name: "Logic", href: "/category/logic" },
  { name: "Classic", href: "/category/classic" },
  { name: "Trivia", href: "/category/trivia" },
  { name: "Rankings", href: "/rankings" },
  { name: "Proxy", href: "/proxy" }
];

export function MainNav() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="border-b bg-black">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <h2 className="text-2xl font-bold text-white">ElijahHub</h2>
        </Link>

        <nav className="flex items-center space-x-6 ml-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary text-gray-300"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black border-gray-700">
                <DropdownMenuItem className="font-medium text-gray-300">
                  <User className="mr-2 h-4 w-4" />
                  {user.username}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => logoutMutation.mutate()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="ghost" className="text-gray-300">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}