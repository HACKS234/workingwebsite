import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Globe } from "lucide-react";

export default function ProxyPage() {
  const [url, setUrl] = useState("");
  const [activeProxy, setActiveProxy] = useState<string | null>(null);

  const proxyServers = [
    {
      name: "Croxy Proxy",
      description: "Fast and reliable proxy service",
      url: "https://167.71.43.43/"
    },
    {
      name: "Ultra Violet",
      description: "High-performance web proxy",
      url: "https://example-proxy1.com"
    },
    {
      name: "Rammerhead",
      description: "Advanced proxy with browser emulation",
      url: "https://example-proxy2.com"
    }
  ];

  const handleProxyClick = (proxyUrl: string) => {
    setActiveProxy(proxyUrl);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Proxy Services</h1>
      </div>

      {!activeProxy ? (
        <>
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to proxy..."
                className="flex-1"
              />
              <Button>
                <Globe className="mr-2 h-4 w-4" />
                Go
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proxyServers.map((server) => (
              <Card 
                key={server.name} 
                className="p-6 bg-black border-gray-700 cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleProxyClick(server.url)}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{server.name}</h3>
                <p className="text-gray-400 mb-4">{server.description}</p>
                <Button variant="outline" className="w-full">
                  Use Proxy
                </Button>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="relative w-full">
          <Button 
            variant="outline" 
            className="absolute top-4 left-4 z-10"
            onClick={() => setActiveProxy(null)}
          >
            Back to Proxies
          </Button>
          <iframe
            src={activeProxy}
            className="w-full h-[80vh] rounded-lg border border-gray-700"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            style={{ backgroundColor: 'white' }}
          />
        </div>
      )}
    </div>
  );
}