"use client"

import { useChat } from "@ai-sdk/react"
import { generateUUID } from "./utils"
import { GlanceMessages } from "./components/glance-messages"
import { MultimodalInput } from "./components/multimodal-input"
import { Message } from "./types"
import { useState } from "react"
import "./glance-ai.css"

export default function GlanceAIPage() {
  const id = generateUUID()
  
  // For handling file attachments
  const [attachments, setAttachments] = useState<Array<any>>([])
  
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    isLoading,
    stop,
    error,
    append
  } = useChat({
    id,
    api: "/api/chat",
    body: { 
      id, 
      selectedChatModel: "gpt-4" 
    },
    initialMessages: [],
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  // Handler for clearing the chat
  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden rounded-lg">
      {/* Header - simplified to match AI chat style but keeping RetailJet branding */}
      <div className="flex justify-between items-center p-4 border-b border-border/30">
        <h1 className="text-xl font-semibold">RetailJet Glance AI</h1>
        <button
          onClick={handleClearChat}
          className="text-xs p-1.5 rounded-md hover:bg-muted transition-colors"
          aria-label="Clear chat"
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
      </div>

      {/* Messages area - using standard layout from ai-chat */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 pt-4 pb-32">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center h-full">
              <div className="max-w-lg text-center">
                <h3 className="text-xl font-semibold mb-3">Welcome to Glance AI</h3>
                <p className="text-muted-foreground">
                  Ask anything about your Amazon business, inventory management, 
                  competitor analysis, or PrimeLeap® metrics.
                </p>
              </div>
            </div>
          ) : (
            <GlanceMessages
              messages={messages as Message[]}
              isLoading={isLoading}
              className="mb-4"
            />
          )}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mx-4 mb-2 p-2 text-sm text-destructive bg-destructive/10 rounded">
          <p>Error: {error.message || "Something went wrong. Please try again."}</p>
        </div>
      )}

      {/* Input area with multimodal support - exact match to AI chatbot */}
      <div className="fixed bottom-0 left-0 w-full">
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
            className="shadow-lg border dark:border-zinc-700"
          />
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Glance AI provides insights based on your Amazon business data and RetailJet analytics.
          </p>
        </div>
      </div>
    </div>
  )
}