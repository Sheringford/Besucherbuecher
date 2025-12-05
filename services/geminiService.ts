import { GoogleGenAI } from "@google/genai";

export const analyzeTranscription = async (
  xmlContent: string, 
  prompt: string
): Promise<string> => {
  try {
    // Initialize client right before use as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    
    // We strip tags loosely to give the model cleaner text, 
    // though the model handles XML well too.
    const cleanText = xmlContent.replace(/<[^>]+>/g, ' ');

    const fullPrompt = `
      You are a helpful historical assistant analyzing a diary transcription.
      
      Here is the text content of a historical document page:
      "${cleanText}"
      
      User Question: ${prompt}
      
      Please answer the question based on the text provided. If the answer isn't in the text, say so politely.
      Keep the answer concise (under 100 words) unless asked otherwise.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    return response.text || "I could not generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error analyzing the document.";
  }
};
