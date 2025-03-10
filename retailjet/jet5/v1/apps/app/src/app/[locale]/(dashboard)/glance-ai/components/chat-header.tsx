'use client';

import { useState } from 'react';
import { cn } from "@v1/ui/cn";

interface ChatHeaderProps {
  onClearChat: () => void;
  className?: string;
}

export function ChatHeader({ onClearChat, className }: ChatHeaderProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className={cn("flex justify-between items-center p-4 border-b", className)}>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">RetailJet Glance AI</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-xs text-muted-foreground hidden md:block">
          Ask me anything about your Amazon business, PrimeLeap® metrics, or inventory
        </div>
        
        {showClearConfirm ? (
          <div className="flex items-center gap-2">
            <span className="text-xs">Clear chat history?</span>
            <button
              onClick={() => {
                onClearChat();
                setShowClearConfirm(false);
              }}
              className="text-xs px-2 py-1 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs px-2 py-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
