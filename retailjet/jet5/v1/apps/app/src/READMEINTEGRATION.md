# AI Chatbot Integration Steps

The key differences I'm noticing:

1. The original chatbot has a clean, borderless design
2. Your implementation has visible borders and different spacing
3. The message input and suggested prompts look different

Here's a step-by-step approach to properly integrate the UI:

## 1. Component Analysis and Extraction

First, identify the key components from the AI chatbot you need to extract:

- `components/chat.tsx` - The main chat interface
- `components/messages.tsx` - The message display area
- `components/multimodal-input.tsx` - The input box at the bottom
- `components/suggested-actions.tsx` - The suggested prompts
- `components/ui/sidebar.tsx` - For the sidebar functionality

## 2. Styling Integration

The original chatbot uses a combination of Tailwind classes and custom CSS in `globals.css`. You need to:

- Copy the relevant Tailwind classes from the original components
- Make sure your theme variables match
- Remove the border outlines that are showing up in your implementation

## 3. Implementation Steps

Here's a concrete implementation plan:

```tsx
// In your Glance AI page component
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Message } from 'ai';
import { generateUUID } from '@/lib/utils';

export default function GlanceAIPage() {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    append
  } = useChat({
    id: generateUUID(),
    // Add your API configurations here
  });

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h1 className="text-xl font-semibold">RetailJet Glance AI</h1>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to Glance AI</h2>
            <p className="text-zinc-400 max-w-md">
              Ask anything about your Amazon business, inventory management, 
              competitor analysis, or PrimeLeap® metrics.
            </p>
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id}
              className={`mb-4 p-4 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-600 ml-auto max-w-[80%]' 
                  : 'bg-zinc-800 max-w-[80%]'
              }`}
            >
              {message.content}
            </div>
          ))
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="px-4 pb-4 grid grid-cols-2 gap-2">
          <SuggestionButton 
            onClick={() => append({role: 'user', content: 'How is my inventory health?'})}
          >
            How is my inventory health?
          </SuggestionButton>
          <SuggestionButton 
            onClick={() => append({role: 'user', content: 'Show my PrimeLeap® score'})}
          >
            Show my PrimeLeap® score
          </SuggestionButton>
          {/* Add more suggestion buttons */}
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
        <div className="relative">
          <input
            className="w-full bg-zinc-800 rounded-full border-0 px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Send a message to Glance AI..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full disabled:opacity-50"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

function SuggestionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-zinc-800 hover:bg-zinc-700 rounded-lg px-4 py-3 text-sm"
    >
      {children}
    </button>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
```

```

## 5. Using the Original Components

For the most accurate recreation, you can copy and adapt the actual component files from the chatbot repository:

1. Copy the relevant files to your project
2. Update the imports to match your project structure
3. Modify the components to use your authentication and data fetching logic
4. Update styling to match your application's theme