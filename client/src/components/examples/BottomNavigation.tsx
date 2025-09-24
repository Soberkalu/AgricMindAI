import BottomNavigation from '../BottomNavigation';

export default function BottomNavigationExample() {
  return (
    <div className="h-96 relative bg-muted/30 flex items-center justify-center">
      <p className="text-muted-foreground">Content area - navigation is at bottom</p>
      <BottomNavigation 
        onNavigate={(itemId) => console.log('Navigate to:', itemId)}
        activeItem="camera"
      />
    </div>
  );
}