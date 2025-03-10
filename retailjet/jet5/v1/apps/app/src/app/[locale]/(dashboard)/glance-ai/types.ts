/**
 * Type definitions for the Glance AI component
 */

// Message type definition similar to ai package
export interface Message {
  id: string
  role: 'user' | 'assistant' | 'function' | 'system'
  content: string
  createdAt?: Date | number | string
  name?: string
  function_call?: {
    name: string
    arguments: string
  }
}

export interface Attachment {
  name: string
  type: string
  content: string | ArrayBuffer | Blob
}

// Types for the chat function return values
export interface ChatHelpers {
  messages: Message[]
  setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void
  input: string
  setInput: (input: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  stop: () => void
  reload: () => void
  append: (message: Message) => Promise<string | null | undefined>
}

export interface GlanceSettings {
  selectedChatModel: string
}
