'use client';

import { useEffect, useState } from 'react';
import { cn } from "@v1/ui/cn";

interface SuggestedActionsProps {
  onActionClick: (action: string) => void;
  className?: string;
}

export function SuggestedActions({
  onActionClick,
  className
}: SuggestedActionsProps) {
  // RetailJet specific suggested actions focused on Amazon marketplace optimization
  const [suggestions] = useState([
    'How is my inventory health?',
    'Show my PrimeLeap® score',
    'Analyze my top competitors',
    'Optimize my Amazon PPC campaigns',
    'What are my best selling products?',
    'Forecast Q2 sales trends',
    'Improve product listings',
    'Check my account health'
  ]);

  // State to track if suggestions have been used already
  const [isSuggestionsUsed, setIsSuggestionsUsed] = useState(false);

  // Reset suggestions visibility when there are no messages
  useEffect(() => {
    // This could be expanded to track message count and reset when appropriate
    setIsSuggestionsUsed(false);
  }, []);

  if (isSuggestionsUsed) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          className="text-left bg-muted hover:bg-muted/80 rounded-lg px-4 py-3 text-sm w-full transition-colors"
          onClick={() => {
            onActionClick(suggestion);
            setIsSuggestionsUsed(true);
          }}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
