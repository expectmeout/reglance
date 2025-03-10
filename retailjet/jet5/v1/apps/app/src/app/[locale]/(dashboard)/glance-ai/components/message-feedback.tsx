'use client';

import { useState } from 'react';
import { cn } from "@v1/ui/cn";

interface MessageFeedbackProps {
  messageId: string;
  className?: string;
}

export function MessageFeedback({ messageId, className }: MessageFeedbackProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    // In a real implementation, this would send feedback to the server
    console.log('Feedback submitted:', {
      messageId,
      feedbackType: feedback,
      feedbackText,
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSubmitted(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className={cn("text-xs text-muted-foreground", className)}>
        Thank you for your feedback!
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {!showFeedback ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFeedback('positive');
              setShowFeedback(true);
            }}
            className="p-1 text-xs rounded hover:bg-muted transition-colors"
            title="Helpful"
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
              className={feedback === 'positive' ? "text-green-500" : ""}
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setFeedback('negative');
              setShowFeedback(true);
            }}
            className="p-1 text-xs rounded hover:bg-muted transition-colors"
            title="Not helpful"
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
              className={feedback === 'negative' ? "text-red-500" : ""}
            >
              <path d="M17 14V2" />
              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
            </svg>
          </button>
          <span className="text-xs text-muted-foreground">Was this helpful?</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="Any additional feedback? (optional)"
            className="text-xs w-full p-2 border rounded-md resize-none"
            rows={2}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmitFeedback}
              className="text-xs px-2 py-1 bg-muted rounded-md hover:bg-muted/80 transition-colors"
            >
              Submit
            </button>
            <button
              onClick={() => setShowFeedback(false)}
              className="text-xs px-2 py-1 rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
