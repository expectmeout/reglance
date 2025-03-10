'use client';

import { ReactNode } from 'react';
import { cn } from "@v1/ui/cn";

interface CodeBlockProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: ReactNode;
  language?: string;
}

export function CodeBlock({
  node,
  inline,
  className,
  language,
  children,
  ...props
}: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const lang = language || (match ? match[1] : '');
  
  if (inline) {
    return (
      <code
        className={cn(
          "bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="not-prose">
      <pre
        className={cn(
          "my-4 overflow-x-auto rounded-lg p-4 bg-muted",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-muted-foreground">
            {lang && <span>{lang}</span>}
          </div>
          <button
            onClick={() => {
              if (typeof children === 'string') {
                navigator.clipboard.writeText(children);
              }
            }}
            className="text-xs px-2 py-1 rounded bg-background hover:bg-muted transition-colors"
            aria-label="Copy code"
          >
            Copy
          </button>
        </div>
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
}
