import { useState } from "react";
import DiagnosisCard from "@/components/DiagnosisCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { History, Search, Filter, TrendingUp, Calendar, Download } from "lucide-react";

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock diagnosis history - TODO: remove mock functionality
  const mockDiagnosisHistory = [
    {
      id: "1",
      cropType: "Maize",
      condition: 'healthy' as const,
      diagnosis: "Excellent growth with optimal leaf color and structure. Continue current care routine.",
      confidence: 95,
      symptoms: ["Vibrant green leaves", "Strong growth", "Good root development"],
      recommendations: ["Continue current watering", "Monitor for pests", "Consider harvest timing"],
      treatmentSteps: [],
      nextCheckDate: "January 15, 2025",
      timestamp: "Dec 22, 2024",
      location: "Field A"
    },
    {
      id: "2",
      cropType: "Tomato", 
      condition: 'critical' as const,
      diagnosis: "Severe blight infection detected. Immediate intervention required to prevent crop loss.",
      confidence: 92,
      symptoms: ["Dark brown spots", "Wilting leaves", "Stem lesions", "Fungal growth"],
      recommendations: [
        "Apply copper-based fungicide immediately",
        "Remove all infected plant parts",
        "Improve air circulation",
        "Reduce watering frequency"
      ],
      treatmentSteps: [],
      nextCheckDate: "Dec 25, 2024",
      timestamp: "Dec 21, 2024",
      location: "Greenhouse B"
    },
    {
      id: "3",
      cropType: "Beans",
      condition: 'warning' as const,
      diagnosis: "Pest damage from leaf miners detected. Early intervention can prevent spread.",
      confidence: 87,
      symptoms: ["Leaf tunnels", "Small holes", "Yellowing patches"],
      recommendations: [
        "Apply neem oil treatment",
        "Remove affected leaves",
        "Increase monitoring frequency"
      ],
      treatmentSteps: [],
      nextCheckDate: "Dec 28, 2024",
      timestamp: "Dec 20, 2024",
      location: "Field C"
    },
    {
      id: "4",
      cropType: "Spinach",
      condition: 'warning' as const,
      diagnosis: "Nitrogen deficiency indicated by pale leaf coloration. Nutritional support needed.",
      confidence: 89,
      symptoms: ["Pale green leaves", "Stunted growth", "Lower leaf yellowing"],
      recommendations: [
        "Apply nitrogen-rich fertilizer",
        "Ensure adequate watering",
        "Test soil pH levels"
      ],
      treatmentSteps: [],
      nextCheckDate: "Dec 27, 2024",
      timestamp: "Dec 19, 2024",
      location: "Garden Plot 1"
    },
    {
      id: "5",
      cropType: "Carrots",
      condition: 'healthy' as const,
      diagnosis: "Root vegetables showing excellent development. Harvest window approaching.",
      confidence: 91,
      symptoms: ["Strong foliage", "Healthy root tops", "Good soil condition"],
      recommendations: [
        "Prepare for harvest in 2-3 weeks",
        "Maintain consistent moisture",
        "Monitor for root fly damage"
      ],
      treatmentSteps: [],
      nextCheckDate: "January 10, 2025",
      timestamp: "Dec 18, 2024",
      location: "Root Bed 2"
    }
  ];

  const filterOptions = [
    { value: "all", label: "All Diagnoses", count: mockDiagnosisHistory.length },
    { value: "healthy", label: "Healthy", count: mockDiagnosisHistory.filter(d => d.condition === 'healthy').length },
    { value: "warning", label: "Warning", count: mockDiagnosisHistory.filter(d => d.condition === 'warning').length },
    { value: "critical", label: "Critical", count: mockDiagnosisHistory.filter(d => d.condition === 'critical').length }
  ];

  const filteredDiagnoses = mockDiagnosisHistory.filter(diagnosis => {
    const matchesFilter = selectedFilter === "all" || diagnosis.condition === selectedFilter;
    const matchesSearch = diagnosis.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         diagnosis.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getHealthStats = () => {
    const total = mockDiagnosisHistory.length;
    const healthy = mockDiagnosisHistory.filter(d => d.condition === 'healthy').length;
    const warning = mockDiagnosisHistory.filter(d => d.condition === 'warning').length;
    const critical = mockDiagnosisHistory.filter(d => d.condition === 'critical').length;
    
    return { total, healthy, warning, critical };
  };

  const stats = getHealthStats();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Diagnosis History</h1>
          <p className="text-muted-foreground">
            Track your crop health over time and monitor progress
          </p>
        </div>

        {/* Health Overview Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Farm Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total Scans</div>
              </div>
              <div className="text-center p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.healthy}</div>
                <div className="text-xs text-green-700 dark:text-green-300">Healthy</div>
              </div>
              <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
                <div className="text-xs text-yellow-700 dark:text-yellow-300">Need Care</div>
              </div>
              <div className="text-center p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
                <div className="text-xs text-red-700 dark:text-red-300">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by crop type or diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-diagnoses"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(option.value)}
                  className="text-xs"
                  data-testid={`filter-${option.value}`}
                >
                  {option.label} ({option.count})
                </Button>
              ))}
            </div>

            {/* Export Options */}
            <div className="flex gap-2 pt-2 border-t">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Export to CSV')}
                data-testid="export-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Generate report')}
                data-testid="generate-report"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Monthly Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDiagnoses.length} of {mockDiagnosisHistory.length} diagnoses
          </p>
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSearchQuery("")}
              data-testid="clear-search"
            >
              Clear search
            </Button>
          )}
        </div>

        {/* Diagnosis List */}
        <div className="space-y-4">
          {filteredDiagnoses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-medium mb-2">No diagnoses found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Start scanning your crops to build your history"}
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  data-testid="reset-filters"
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDiagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="space-y-2">
                {/* Timestamp and Location */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{diagnosis.timestamp}</span>
                  <Badge variant="outline">{diagnosis.location}</Badge>
                </div>
                
                {/* Diagnosis Card */}
                <DiagnosisCard
                  result={diagnosis}
                  onViewDetails={(id) => console.log('View details:', id)}
                  onScheduleReminder={(date) => console.log('Schedule reminder:', date)}
                />
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredDiagnoses.length > 0 && filteredDiagnoses.length < mockDiagnosisHistory.length && (
          <div className="text-center">
            <Button 
              variant="outline"
              onClick={() => console.log('Load more results')}
              data-testid="load-more"
            >
              Load More Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}