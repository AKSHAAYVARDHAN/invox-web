
import { GoogleGenAI, Type } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateFeedPost = async (idea: string): Promise<{ title: string; body: string; hashtags: string[]; imagePrompt: string } | null> => {
    if (!apiKey) return null;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following user idea, generate a full feed post. The idea is: "${idea}".`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "An engaging and catchy title for the post." },
                        body: { type: Type.STRING, description: "A well-structured body for the post, at least 3 paragraphs long." },
                        hashtags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "An array of 3-5 relevant hashtags (without the #)."
                        },
                        imagePrompt: { type: Type.STRING, description: "A short, descriptive prompt to generate a relevant background image." }
                    },
                    required: ["title", "body", "hashtags", "imagePrompt"]
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error generating feed post:", error);
        return null;
    }
};


export const generateSummary = async (text: string): Promise<string> => {
    if (!apiKey) return "AI Summary is unavailable.";
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a concise, one-line summary for the following content: "${text}"`,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating summary:", error);
        return "Could not generate summary.";
    }
}

export const getAIChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], newMessage: string): Promise<string> => {
    if (!apiKey) return "AI is currently unavailable. Please check the API key configuration.";

    // FIX: The history passed to the chat should include all previous messages.
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: history,
        config: {
            systemInstruction: "You are Invox AI, a helpful, friendly, and slightly humorous assistant. You help users explore ideas, understand topics, and navigate the Invox platform.",
        },
    });

    try {
        const response = await chat.sendMessage({ message: newMessage });
        return response.text.trim();
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
};
