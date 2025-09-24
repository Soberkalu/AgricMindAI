import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import BottomNavigation from "@/components/BottomNavigation";
import Home from "@/pages/Home";
import Camera from "@/pages/Camera";
import Voice from "@/pages/Voice";
import History from "@/pages/History";
import Community from "@/pages/Community";
import NotFound from "@/pages/not-found";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/camera" component={Camera} />
      <Route path="/voice" component={Voice} />
      <Route path="/history" component={History} />
      <Route path="/community" component={Community} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState('home');

  const handleNavigation = (itemId: string) => {
    setActiveNav(itemId);
    // Simple navigation mapping
    const routes: Record<string, string> = {
      home: '/',
      camera: '/camera',
      voice: '/voice',
      history: '/history',
      community: '/community'
    };
    
    if (routes[itemId]) {
      window.history.pushState({}, '', routes[itemId]);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen">
          {/* Theme Toggle - Fixed Position */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          
          {/* Main Content */}
          <Router />
          
          {/* Bottom Navigation */}
          <BottomNavigation 
            activeItem={activeNav}
            onNavigate={handleNavigation}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
