
import { GoogleGenAI, Type } from "@google/genai";
import { Post } from '../types';

if (!process.env.API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const postSchema = {
    type: Type.OBJECT,
    properties: {
        oneLiner: {
            type: Type.STRING,
            description: "A compelling, concise one-line summary of the content, under 15 words. This is like a catchy headline.",
        },
        content: {
            type: Type.STRING,
            description: "The main body of the post. It should be well-structured and engaging, expanding on the initial idea.",
        },
        hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 3-5 relevant hashtags as strings, without the '#' symbol.",
        },
    },
    required: ["oneLiner", "content", "hashtags"],
};


export const generatePostFromIdea = async (idea: string): Promise<{ oneLiner: string; content: string; hashtags: string[] } | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following idea, generate a full feed post. The tone should be insightful and thought-provoking. Idea: "${idea}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: postSchema,
            },
        });
        
        const text = response.text.trim();
        const parsed = JSON.parse(text);
        return {
            oneLiner: parsed.oneLiner,
            content: `${parsed.content}\n\n${parsed.hashtags.map((h: string) => `#${h}`).join(' ')}`,
            hashtags: parsed.hashtags,
        };

    } catch (error) {
        console.error("Error generating post from idea:", error);
        return null;
    }
};

export const generateImageForPost = async (postContent: string): Promise<string> => {
    try {
        const imagePrompt = `Create a visually stunning, abstract, and conceptual image that represents the core themes of this text: "${postContent}". The style should be modern, slightly futuristic, and suitable for a platform about knowledge and curiosity. Avoid text and human faces.`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
        return `https://picsum.photos/seed/${encodeURIComponent(postContent)}/1280/720`;
    } catch (error) {
        console.error("Error generating image:", error);
        // Fallback to a placeholder
        return `https://picsum.photos/seed/${encodeURIComponent(postContent)}/1280/720`;
    }
};
