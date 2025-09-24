import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, History, Users, User, Home } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface BottomNavigationProps {
  onNavigate?: (itemId: string) => void;
  activeItem?: string;
}

export default function BottomNavigation({ onNavigate, activeItem = 'home' }: BottomNavigationProps) {
  const [active, setActive] = useState(activeItem);

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: <Camera className="w-5 h-5" />
    },
    {
      id: 'voice',
      label: 'Voice',
      icon: <Mic className="w-5 h-5" />
    },
    {
      id: 'history',
      label: 'History',
      icon: <History className="w-5 h-5" />,
      badge: 3
    },
    {
      id: 'community',
      label: 'Community',
      icon: <Users className="w-5 h-5" />,
      badge: 12
    }
  ];

  const handleItemClick = (itemId: string) => {
    setActive(itemId);
    onNavigate?.(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
              active === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => handleItemClick(item.id)}
            data-testid={`nav-${item.id}`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
            
            {/* Active indicator */}
            {active === item.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-primary rounded-t" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}