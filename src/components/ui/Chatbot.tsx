'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSend } from 'react-icons/io5';
import { useUI } from '@/context/UIContext';

const CONFIG = {
    workerUrl: 'https://chat.colabmldrive.workers.dev',
    systemPrompt: `You are the AI assistant for Voxel, an ultra-premium digital solutions studio. Your personality is sophisticated, professional, and slightly witty - like a trusted advisor at a luxury brand. You only discuss Voxel and its services.

- Quality over quantity - we take on select projects

YOUR BEHAVIOR:
1. Be conversational, sophisticated, and proud of Voxel's work
2. Guide users through services, approach, and portfolio
3. When users express interest in working together, transition to collecting contact info
4. Detect exit phrases like "thanks", "bye", "contact", "hire", "work together", "get started"
5. Keep responses concise but impactful - like luxury copywriting

CONTACT COLLECTION FLOW:
- When user wants to connect: "Excellent choice. May I have your name?"
- After name: "Pleasure to meet you, [Name]. What's your email?"
- After email: "Perfect. What's your vision for the project?"
- After message: "Thank you. We'll be in touch within 24 hours to discuss your project. ✨"

Remember: You represent a premium brand. Be confident, elegant, and helpful.`,
    welcomeMessage: "Welcome to Voxel. 👋\n\nI'm here to help you discover how we craft digital excellence. Whether you're curious about our **services** or ready to **start a project**, I'm at your service.\n\nWhat brings you here today?",
    model: 'sarvam-m',
    temperature: 0.8,
    typingSpeed: 15 // ms per character
};

interface Message {
    text: string;
    sender: 'user' | 'bot';
    isTyping?: boolean;
}

// Parse markdown-like formatting
const formatMessage = (text: string): string => {
    return text
        // Bold: **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold-electric font-semibold">$1</strong>')
        // Italic: *text*
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Bullet points
        .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
        // Numbered lists
        .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
        // Paragraphs (double newline)
        .replace(/\n\n/g, '</p><p class="mt-3">')
        // Single newlines
        .replace(/\n/g, '<br/>');
};

// Premium AI Face Bubble - Highly recognizable Robot Face with live animations
const ChatIcon = ({ isThinking }: { isThinking?: boolean }) => (
    <div className="relative w-8 h-8 flex items-center justify-center">
        {/* The Thinking Ring (only visible when thinking) */}
        <AnimatePresence>
            {isThinking && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1.1,
                        rotate: 360
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 border border-gold-electric/40 rounded-full"
                    style={{ borderStyle: 'dashed' }}
                    transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 }
                    }}
                />
            )}
        </AnimatePresence>

        {/* The message bubble frame */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5186 20 9.12745 19.6593 7.91504 19.0607L3 20L4.17335 16.4185C3.41819 15.0292 3 13.3644 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />

            {/* The AI Face Silhouette inside */}
            <g transform="translate(7.5, 8)">
                <rect x="0" y="0" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />

                {/* Ocular Sensors (Eyes) */}
                <motion.circle
                    cx="2.5"
                    cy="3.5"
                    r="1"
                    fill="currentColor"
                    animate={isThinking ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                    } : {
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                    cx="6.5"
                    cy="3.5"
                    r="1"
                    fill="currentColor"
                    animate={isThinking ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                    } : {
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />

                {/* Mouth / Status Line */}
                <motion.rect
                    x="3"
                    y="5.5"
                    width="3"
                    height="0.4"
                    rx="0.2"
                    fill="currentColor"
                    fillOpacity="0.5"
                    animate={isThinking ? {
                        width: [2, 4, 2],
                        x: [3.5, 2.5, 3.5]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </g>
        </svg>
    </div>
);

export default function Chatbot() {
    const { isChatOpen, setIsChatOpen } = useUI();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [conversationHistory, setConversationHistory] = useState<{ role: string, content: string }[]>([]);
    const [collectingContact, setCollectingContact] = useState(false);
    const [contactStep, setContactStep] = useState(0);
    const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
    const [displayedText, setDisplayedText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Typewriter animation
    const typeMessage = useCallback(async (text: string) => {
        setIsAnimating(true);
        setDisplayedText('');

        for (let i = 0; i <= text.length; i++) {
            await new Promise(resolve => setTimeout(resolve, CONFIG.typingSpeed));
            setDisplayedText(text.slice(0, i));
        }

        setIsAnimating(false);
        return text;
    }, []);

    // Add bot message with typing animation
    const addBotMessage = useCallback(async (text: string) => {
        // Add placeholder message
        setMessages(prev => [...prev, { text: '', sender: 'bot', isTyping: true }]);

        // Animate typing
        await typeMessage(text);

        // Replace with final message
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { text, sender: 'bot', isTyping: false };
            return newMessages;
        });
    }, [typeMessage]);

    useEffect(() => {
        if (isChatOpen && messages.length === 0) {
            addBotMessage(CONFIG.welcomeMessage);
        }
    }, [isChatOpen, messages.length, addBotMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, displayedText]);

    useEffect(() => {
        if (isChatOpen && !isAnimating) inputRef.current?.focus();
    }, [isChatOpen, isAnimating]);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const sendContactEmail = async () => {
        try {
            const response = await fetch(CONFIG.workerUrl + '/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });

            if (!response.ok) throw new Error('Email send failed');

            await addBotMessage("Thank you! We've received your message and will be in touch within 24 hours. ✨");
        } catch (error) {
            await addBotMessage(`No problem! You can also reach us directly at selvaofficialmail@gmail.com`);
        }

        setCollectingContact(false);
        setContactStep(0);
        setContactData({ name: '', email: '', message: '' });
    };

    const handleSend = async () => {
        const userMessage = input.trim();
        if (!userMessage || isProcessing || isAnimating) return;

        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');
        setIsProcessing(true);

        // Handle contact collection flow
        if (collectingContact) {
            if (contactStep === 1) {
                setContactData(prev => ({ ...prev, name: userMessage }));
                setContactStep(2);
                await addBotMessage(`Pleasure to meet you, ${userMessage}. What's your email?`);
                setIsProcessing(false);
                return;
            } else if (contactStep === 2) {
                if (validateEmail(userMessage)) {
                    setContactData(prev => ({ ...prev, email: userMessage }));
                    setContactStep(3);
                    await addBotMessage("Perfect. What's your vision for the project?");
                    setIsProcessing(false);
                    return;
                } else {
                    await addBotMessage("That doesn't seem like a valid email. Could you try again?");
                    setIsProcessing(false);
                    return;
                }
            } else if (contactStep === 3) {
                setContactData(prev => ({ ...prev, message: userMessage }));
                await sendContactEmail();
                setIsProcessing(false);
                return;
            }
        }

        // Show thinking indicator
        setMessages(prev => [...prev, { text: '...', sender: 'bot', isTyping: true }]);

        try {
            const newHistory = [...conversationHistory, { role: 'user', content: userMessage }];
            setConversationHistory(newHistory);

            const response = await fetch(CONFIG.workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: CONFIG.systemPrompt,
                    conversationHistory: newHistory,
                    model: CONFIG.model,
                    temperature: CONFIG.temperature
                })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            const botMessage = data.choices[0].message.content;

            // Remove thinking indicator
            setMessages(prev => prev.slice(0, -1));

            // Add message with typing animation
            await addBotMessage(botMessage);

            setConversationHistory(prev => [...prev, { role: 'assistant', content: botMessage }]);

            // Check if bot is asking for contact info
            if (botMessage.toLowerCase().includes("may i have your name") ||
                botMessage.toLowerCase().includes("what's your name")) {
                setCollectingContact(true);
                setContactStep(1);
            }
        } catch (error) {
            setMessages(prev => prev.slice(0, -1));
            await addBotMessage('Apologies, I encountered an issue. Please try again or reach us at selvaofficialmail@gmail.com');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            {/* Floating Button - Glassmorphism and Gold Glow */}
            <motion.button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full bg-zinc-950/40 backdrop-blur-md border border-gold-electric/20 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_50px_rgba(212,175,55,0.25)] hover:border-gold-electric/40 transition-all duration-500 group overflow-hidden"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                {/* Subtle internal glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="text-gold-electric relative">
                    <ChatIcon isThinking={isProcessing || isAnimating} />
                    {/* Pulsing indicator - more subtle and integrated */}
                    <motion.span
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold-electric/80 rounded-full border border-black-void"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 z-[100] w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-gradient-to-b from-zinc-900 to-black-void border border-gold-electric/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.1)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gold-electric/20 bg-gradient-to-r from-black-void to-zinc-900">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-electric/20 to-gold-electric/5 border border-gold-electric/30 flex items-center justify-center">
                                    <span className="text-gold-electric text-lg">✦</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold font-display tracking-wide">Voxel</h3>
                                    <p className="text-xs text-gold-electric/70">AI Concierge</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                            >
                                <IoClose />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black-void/50" data-lenis-prevent>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-gradient-to-br from-gold-electric to-amber-500 text-black-void font-medium rounded-br-sm'
                                        : 'bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-white/10 text-neutral-200 rounded-bl-sm'
                                        }`}>
                                        {msg.text === '...' ? (
                                            <div className="flex gap-1.5 py-1">
                                                <span className="w-2 h-2 bg-gold-electric/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-gold-electric/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-gold-electric/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        ) : msg.isTyping && isAnimating ? (
                                            <p
                                                className="[&_strong]:text-gold-electric [&_strong]:font-semibold [&_li]:ml-4 [&_li]:list-disc"
                                                dangerouslySetInnerHTML={{ __html: formatMessage(displayedText) + '<span class="inline-block w-0.5 h-4 bg-gold-electric ml-0.5 animate-pulse"></span>' }}
                                            />
                                        ) : (
                                            <p
                                                className="[&_strong]:text-gold-electric [&_strong]:font-semibold [&_li]:ml-4 [&_li]:list-disc"
                                                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gold-electric/20 bg-gradient-to-r from-zinc-900 to-black-void">
                            <div className="flex gap-3">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about our services..."
                                    disabled={isAnimating}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-gold-electric/50 focus:bg-white/10 transition-all disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isProcessing || isAnimating || !input.trim()}
                                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-electric to-amber-500 text-black-void flex items-center justify-center hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    <IoSend />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
