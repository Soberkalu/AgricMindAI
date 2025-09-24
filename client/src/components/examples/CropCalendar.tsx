import CropCalendar from '../CropCalendar';

export default function CropCalendarExample() {
  const mockActivities = [
    {
      id: "1",
      crop: "Maize",
      activity: 'fertilize' as const,
      date: "Dec 23, 2024",
      status: 'today' as const,
      priority: 'high' as const,
      description: "Apply NPK fertilizer to boost growth during vegetative stage",
      weatherDependent: true
    },
    {
      id: "2", 
      crop: "Tomatoes",
      activity: 'water' as const,
      date: "Dec 22, 2024",
      status: 'overdue' as const,
      priority: 'medium' as const,
      description: "Deep watering session - soil appears dry",
      weatherDependent: false
    },
    {
      id: "3",
      crop: "Beans",
      activity: 'plant' as const,
      date: "Dec 25, 2024", 
      status: 'upcoming' as const,
      priority: 'high' as const,
      description: "Plant second batch of bean seeds in prepared beds",
      weatherDependent: true
    },
    {
      id: "4",
      crop: "Spinach",
      activity: 'harvest' as const,
      date: "Dec 21, 2024",
      status: 'completed' as const,
      priority: 'medium' as const,
      description: "Harvest mature spinach leaves",
      weatherDependent: false
    },
    {
      id: "5",
      crop: "Carrots",
      activity: 'inspect' as const,
      date: "Dec 24, 2024",
      status: 'upcoming' as const,
      priority: 'low' as const,
      description: "Check for pest damage and root development",
      weatherDependent: false
    }
  ];

  return (
    <div className="p-4">
      <CropCalendar 
        activities={mockActivities}
        onAddActivity={() => console.log('Add new activity')}
        onCompleteActivity={(id) => console.log('Complete activity:', id)}
        onViewDetails={(id) => console.log('View details for:', id)}
      />
    </div>
  );
}