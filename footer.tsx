
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-black text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ElijahHub</h3>
            <p className="text-sm">Your go-to platform for online games and entertainment.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/rankings">Rankings</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/chat">Chat</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/strategy">Strategy</Link></li>
              <li><Link href="/category/skill">Skill</Link></li>
              <li><Link href="/category/classic">Classic</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ElijahHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
