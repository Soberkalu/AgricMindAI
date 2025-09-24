import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface PlantDiagnosisResult {
  cropType: string;
  condition: 'healthy' | 'warning' | 'critical';
  diagnosis: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  treatmentSteps: string[];
  nextCheckDate?: string;
}

export async function analyzePlantImage(base64Image: string, cropType?: string): Promise<PlantDiagnosisResult> {
  try {
    const prompt = `You are an expert agricultural pathologist and plant health specialist. Analyze this plant image and provide a comprehensive diagnosis.

${cropType ? `The farmer believes this is a ${cropType} plant.` : 'Identify the plant type first.'}

Please respond with JSON in this exact format:
{
  "cropType": "identified plant type",
  "condition": "healthy/warning/critical",
  "diagnosis": "detailed diagnosis of plant health",
  "confidence": 85,
  "symptoms": ["symptom 1", "symptom 2"],
  "recommendations": ["immediate action 1", "immediate action 2", "follow-up action"],
  "treatmentSteps": ["step 1", "step 2", "step 3"],
  "nextCheckDate": "YYYY-MM-DD"
}

Analysis guidelines:
- Be specific about diseases, pests, or nutrient deficiencies
- Confidence should be 0-100 based on image clarity and symptom visibility  
- Recommendations should be practical for small-scale farmers
- Include organic/low-cost solutions when possible
- Set nextCheckDate 5-14 days from now based on severity
- For healthy plants, focus on maintenance advice`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // Validate and sanitize the response
    return {
      cropType: result.cropType || 'Unknown Plant',
      condition: ['healthy', 'warning', 'critical'].includes(result.condition) ? result.condition : 'warning',
      diagnosis: result.diagnosis || 'Unable to determine plant condition from image',
      confidence: Math.min(100, Math.max(0, parseInt(result.confidence) || 50)),
      symptoms: Array.isArray(result.symptoms) ? result.symptoms : [],
      recommendations: Array.isArray(result.recommendations) ? result.recommendations : [],
      treatmentSteps: Array.isArray(result.treatmentSteps) ? result.treatmentSteps : [],
      nextCheckDate: result.nextCheckDate || undefined
    };

  } catch (error) {
    console.error('Error analyzing plant image:', error);
    throw new Error('Failed to analyze plant image. Please try again.');
  }
}

export async function generateFarmingAdvice(question: string, context?: string): Promise<string> {
  try {
    const prompt = `You are an AI farming assistant specializing in small-scale agriculture for developing regions. Answer the farmer's question with practical, actionable advice.

${context ? `Context: ${context}` : ''}

Question: ${question}

Guidelines for your response:
- Keep answers concise but comprehensive (2-4 sentences)
- Focus on low-cost, locally available solutions
- Consider climate and resource constraints
- Include specific measurements, timing, or quantities when relevant
- Prioritize organic and sustainable methods
- If the question is about plant diseases, be specific about symptoms and treatments`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are AgriMind, an AI assistant helping small-scale farmers increase their crop yields through practical agricultural guidance. Always provide specific, actionable advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_completion_tokens: 300,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate advice for your question. Please try rephrasing it.";

  } catch (error) {
    console.error('Error generating farming advice:', error);
    throw new Error('Failed to generate farming advice. Please try again.');
  }
}