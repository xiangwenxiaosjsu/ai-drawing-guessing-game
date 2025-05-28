import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not found in environment variables. AI recognition will use mock data.');
}

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function recognizeImage(imageBuffer: Buffer): Promise<{ result: string; confidence: number }> {
  // If no API key, return mock data
  if (!openai) {
    const mockResults = ['cat', 'dog', 'house', 'tree', 'car', 'flower', 'bird', 'fish'];
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      result: randomResult,
      confidence: 0.75 + Math.random() * 0.2 // Random confidence between 0.75-0.95
    };
  }

  try {
    // Convert image buffer to base64
    const base64Image = imageBuffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please identify what object is drawn in this image. Please only answer with the name of the object, without any other explanations."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 50
    });

    const result = response.choices[0]?.message?.content?.trim() || 'unknown object';
    
    return {
      result,
      confidence: 0.85 // Fixed confidence, in real applications this could be calculated based on model response
    };
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw new Error('Image recognition failed');
  }
}
