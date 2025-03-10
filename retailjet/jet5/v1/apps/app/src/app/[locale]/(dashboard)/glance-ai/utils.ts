/**
 * Utilities for Glance AI implementation
 */

import { Message } from 'ai';

/**
 * Generates a UUID for chat messages and sessions
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Formats a date for display in chat messages
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

/**
 * Sanitizes message content when stopping AI response
 */
export function sanitizeUIMessages(messages: Array<Message>): Array<Message> {
  return messages.map((message) => {
    if (message.role === 'assistant' && message.content === '') {
      return {
        ...message,
        content: 'I apologize, but my response was interrupted.',
      };
    }
    return message;
  });
}
