'use client';

import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
    toggleChat: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => setIsChatOpen((prev) => !prev);

    return (
        <UIContext.Provider value={{ isChatOpen, setIsChatOpen, toggleChat }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
