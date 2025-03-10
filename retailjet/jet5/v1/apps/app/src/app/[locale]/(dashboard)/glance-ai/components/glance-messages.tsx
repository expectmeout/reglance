"use client"

import { HTMLAttributes, useRef, useEffect, memo } from "react"
import { cn } from "@v1/ui/cn"
import { formatDate } from "../utils"
import { Message } from "../types"
import { Markdown } from "./markdown"
import { MessageActions } from "./message-actions"
import { MessageFeedback } from "./message-feedback"

interface GlanceMessagesProps extends HTMLAttributes<HTMLDivElement> {
  messages: Message[]
  isLoading?: boolean
}

function PureGlanceMessages({
  messages,
  isLoading,
  className,
  ...props
}: GlanceMessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div
      ref={messagesContainerRef}
      className={cn(
        "flex flex-col gap-6 h-full overflow-y-auto py-4",
        className
      )}
      {...props}
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-lg text-center">
            <h3 className="text-xl font-semibold mb-3">Welcome to Glance AI</h3>
            <p className="text-muted-foreground">
              Ask anything about your Amazon business, inventory management, 
              competitor analysis, or PrimeLeap® metrics.
            </p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={message.id}
            data-role={message.role}
            className={cn(
              "group/message",
              {
                "animate-in fade-in-0 slide-in-from-bottom-3": index === messages.length - 1,
              }
            )}
          >
            <div className="w-full max-w-4xl mx-auto px-4">
              <div
                className={cn(
                  "flex w-full",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 flex items-center justify-center mr-3 rounded-full shrink-0 bg-primary/10">
                    <svg 
                      className="w-4 h-4 text-primary" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.2-4.5-6.3 4.5 2.3-7.2-6-4.4h7.6z" />
                    </svg>
                  </div>
                )}

                <div
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl mb-1",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {typeof message.content === "string" ? (
                      message.role === "user" ? (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      ) : (
                        <div className="relative">
                          <Markdown>{message.content}</Markdown>
                          <div className="absolute top-0 right-0 opacity-0 group-hover/message:opacity-100 transition-opacity">
                            <MessageActions content={message.content} />
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="whitespace-pre-wrap">Content not available</div>
                    )}
                  </div>
                  
                  <div className="flex px-2 items-center gap-2">
                    <div className="text-xs text-muted-foreground/70">
                      {formatDate(message.createdAt instanceof Date ? message.createdAt : new Date(message.createdAt || Date.now()))}
                    </div>
                    {message.role === "assistant" && (
                      <div className="opacity-0 group-hover/message:opacity-100 transition-opacity">
                        <MessageFeedback messageId={message.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      
      {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex">
            <div className="w-8 h-8 flex items-center justify-center mr-3 rounded-full shrink-0 bg-primary/10">
              <svg 
                className="w-4 h-4 text-primary" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.2-4.5-6.3 4.5 2.3-7.2-6-4.4h7.6z" />
              </svg>
            </div>
            <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-muted">
              <div className="h-4 w-8 animate-pulse rounded-full bg-muted-foreground/25"></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} className="h-4" />
    </div>
  )
}

export const GlanceMessages = memo(PureGlanceMessages)
