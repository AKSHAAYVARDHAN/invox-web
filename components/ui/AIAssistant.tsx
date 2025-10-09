
import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, CloseIcon, SendIcon } from './Icons';
import { getAIChatResponse } from '../../services/geminiService';

interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

const AIChatModal = ({ onClose }: { onClose: () => void }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', parts: [{ text: "Hello! I'm Invox AI. How can I help you fuel your curiosity today?" }] }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        // FIX: Pass the updated messages array to getAIChatResponse for accurate history.
        const chatHistory = newMessages.slice(0, -1);
        const responseText = await getAIChatResponse(chatHistory, input);
        
        const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-invox-dark-accent rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <SparklesIcon className="w-6 h-6 mr-2 text-invox-red" />
                        Invox AI Companion
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-invox-red text-white' : 'bg-gray-700 text-invox-light-gray'}`}>
                                <p>{msg.parts[0].text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="max-w-md p-3 rounded-lg bg-gray-700 text-invox-light-gray">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-invox-light-gray rounded-full animate-pulse delay-75"></div>
                                    <div className="w-2 h-2 bg-invox-light-gray rounded-full animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 bg-invox-light-gray rounded-full animate-pulse delay-300"></div>
                                oversight.
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-invox-red text-white"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="bg-invox-red text-white px-4 rounded-r-md hover:bg-invox-red-hover disabled:bg-gray-500 flex items-center justify-center">
                        <SendIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
};


export const AIAssistantButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 bg-invox-red p-4 rounded-full shadow-lg hover:bg-invox-red-hover transform hover:scale-110 transition-transform duration-200 z-40"
                aria-label="Open AI Assistant"
            >
                <SparklesIcon className="w-8 h-8 text-white" />
            </button>
            {isModalOpen && <AIChatModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};
