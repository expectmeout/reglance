'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={`ai-message ${className || ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-2xl font-semibold mt-6 mb-3" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-xl font-semibold mt-6 mb-3" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-lg font-semibold mt-5 mb-3" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="text-base font-semibold mt-5 mb-3" />
          ),
          p: ({ node, ...props }) => <p {...props} className="leading-7 mb-4" />,
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc my-2 ml-6" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal my-2 ml-6" />
          ),
          li: ({ node, ...props }) => <li {...props} className="my-1" />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-border pl-4 py-1 my-4 italic"
            />
          ),
          hr: ({ node, ...props }) => (
            <hr {...props} className="my-6 border-border" />
          ),
          img: ({ node, src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-md max-w-full my-4"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                {...props}
                className="min-w-[50%] border-collapse border border-border"
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead {...props} className="bg-muted" />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => <tr {...props} />,
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="border border-border px-4 py-2 font-semibold text-left"
            />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="border border-border px-4 py-2" />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (match) {
              return (
                <CodeBlock language={language} {...props}>
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              );
            }
            
            return (
              <code
                className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
