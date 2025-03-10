'use client';

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
  KeyboardEvent,
} from 'react';
import { cn } from "@v1/ui/cn";

interface GlanceMessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  stop?: () => void;
}

export function GlanceMessageInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  stop
}: GlanceMessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  // Auto resize the textarea based on content
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  // Reset height when input is cleared
  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    if (input === '') {
      resetHeight();
    }
  }, [input]);

  // Handle input change and resize
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  // Handle key presses (Enter to submit, Shift+Enter for new line)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as FormEvent<HTMLFormElement>;
        handleSubmit(formEvent);
        resetHeight();
      }
    }
  };

  // Handle form submission
  const submitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e);
      resetHeight();
    }
  }, [input, isLoading, handleSubmit]);

  return (
    <form onSubmit={submitForm} className="relative">
      <div className="relative flex items-center rounded-lg border bg-background shadow-sm">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Send a message to Glance AI..."
          className="min-h-[48px] max-h-[200px] w-full resize-none border-0 bg-transparent py-3 pl-4 pr-14 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          disabled={isLoading}
          rows={1}
        />
        <div className="absolute right-3 bottom-[calc(50%-12px)]">
          {isLoading ? (
            <StopButton stop={stop} />
          ) : (
            <SendButton submitForm={submitForm} disabled={!input.trim()} />
          )}
        </div>
      </div>
    </form>
  );
}

// Stop button component
function StopButton({ stop }: { stop?: () => void }) {
  return (
    <button
      type="button"
      className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
      onClick={stop}
      disabled={!stop}
      aria-label="Stop generating"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-muted-foreground"
      >
        <rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
}

// Send button component
function SendButton({ submitForm, disabled }: { submitForm: (e: FormEvent<HTMLFormElement>) => void; disabled: boolean }) {
  return (
    <button
      type="submit"
      className={cn(
        "h-8 w-8 inline-flex items-center justify-center rounded-md",
        "text-primary hover:text-primary/80 hover:bg-muted transition-colors",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
      aria-label="Send message"
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
