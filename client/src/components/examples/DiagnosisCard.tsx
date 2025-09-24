import DiagnosisCard from '../DiagnosisCard';

export default function DiagnosisCardExample() {
  const mockResults = [
    {
      id: "1",
      cropType: "Maize",
      condition: 'warning' as const,
      diagnosis: "Nitrogen deficiency detected in your maize crop. The yellowing leaves indicate insufficient nitrogen uptake, likely due to poor soil conditions or inadequate fertilization.",
      confidence: 87,
      symptoms: ["Yellow leaves", "Stunted growth", "Pale leaf tips"],
      recommendations: [
        "Apply 20g of urea fertilizer per plant",
        "Water thoroughly after application",
        "Monitor for improvement in 5-7 days"
      ],
      treatmentSteps: [],
      nextCheckDate: "December 28, 2024"
    },
    {
      id: "2", 
      cropType: "Tomato",
      condition: 'critical' as const,
      diagnosis: "Late blight disease (Phytophthora infestans) identified. This fungal infection can destroy entire crops if not treated immediately.",
      confidence: 94,
      symptoms: ["Dark brown spots", "White fuzzy growth", "Leaf curling"],
      recommendations: [
        "Apply copper-based fungicide immediately",
        "Remove all affected leaves and dispose safely",
        "Improve air circulation around plants"
      ],
      treatmentSteps: [],
      nextCheckDate: "December 25, 2024"
    },
    {
      id: "3",
      cropType: "Bean",
      condition: 'healthy' as const,
      diagnosis: "Your bean plants are showing excellent growth with no signs of disease or nutrient deficiency. Continue current care routine.",
      confidence: 96,
      symptoms: ["Strong green color", "Active growth", "No visible damage"],
      recommendations: [
        "Continue current watering schedule",
        "Monitor for pest activity",
        "Consider light fertilization in 2 weeks"
      ],
      treatmentSteps: [],
      nextCheckDate: "January 5, 2025"
    }
  ];

  return (
    <div className="space-y-4 p-4">
      {mockResults.map((result) => (
        <DiagnosisCard
          key={result.id}
          result={result}
          onViewDetails={(id) => console.log('View details for:', id)}
          onScheduleReminder={(date) => console.log('Schedule reminder for:', date)}
        />
      ))}
    </div>
  );
}