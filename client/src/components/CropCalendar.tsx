import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Leaf, Droplets, Scissors, AlertCircle, Plus } from "lucide-react";

interface CropActivity {
  id: string;
  crop: string;
  activity: 'plant' | 'water' | 'fertilize' | 'harvest' | 'inspect';
  date: string;
  status: 'upcoming' | 'today' | 'overdue' | 'completed';
  priority: 'low' | 'medium' | 'high';
  description: string;
  weatherDependent?: boolean;
}

interface CropCalendarProps {
  activities?: CropActivity[];
  onAddActivity?: () => void;
  onCompleteActivity?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function CropCalendar({ 
  activities = [], 
  onAddActivity,
  onCompleteActivity,
  onViewDetails 
}: CropCalendarProps) {
  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'plant':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-blue-600" />;
      case 'harvest':
        return <Scissors className="w-4 h-4 text-orange-600" />;
      case 'fertilize':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'today':
        return 'bg-primary text-primary-foreground';
      case 'upcoming':
        return 'bg-muted text-muted-foreground';
      case 'overdue':
        return 'bg-destructive text-destructive-foreground';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const sortedActivities = [...activities].sort((a, b) => {
    const statusOrder = { 'overdue': 0, 'today': 1, 'upcoming': 2, 'completed': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Crop Calendar
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAddActivity}
          data-testid="button-add-activity"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {sortedActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No farming activities scheduled</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={onAddActivity}
              data-testid="button-add-first-activity"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add your first activity
            </Button>
          </div>
        ) : (
          sortedActivities.map((activity) => (
            <div 
              key={activity.id} 
              className={`p-4 rounded-lg border-l-4 ${getPriorityColor(activity.priority)} bg-card hover-elevate`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getActivityIcon(activity.activity)}
                    <span className="font-medium text-sm">{activity.crop}</span>
                    <Badge 
                      className={`text-xs ${getStatusColor(activity.status)}`}
                    >
                      {activity.status}
                    </Badge>
                    {activity.weatherDependent && (
                      <Badge variant="outline" className="text-xs">
                        Weather dependent
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.date}</span>
                    <span>•</span>
                    <span className="capitalize">{activity.activity}</span>
                    <span>•</span>
                    <span className="capitalize">{activity.priority} priority</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDetails?.(activity.id)}
                    data-testid={`button-details-${activity.id}`}
                  >
                    Details
                  </Button>
                  
                  {activity.status !== 'completed' && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onCompleteActivity?.(activity.id)}
                      data-testid={`button-complete-${activity.id}`}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Quick Stats */}
        {activities.length > 0 && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-destructive">
                {activities.filter(a => a.status === 'overdue').length}
              </div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {activities.filter(a => a.status === 'today').length}
              </div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {activities.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}