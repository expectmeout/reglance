import { NextRequest, NextResponse } from "next/server"
import { Message } from "../../[locale]/(dashboard)/glance-ai/types"
import { generateUUID } from "../../[locale]/(dashboard)/glance-ai/utils"

export const runtime = "edge"

/**
 * Mock chat completion function for RetailJet Glance AI
 * In production, this would use OpenAI or another AI provider with proper prompt engineering
 */
async function mockChatCompletion(messages: Message[]) {
  // Get the last user message
  let lastMessage = ""
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message && typeof message === 'object' && message.role === "user" && typeof message.content === "string") {
      lastMessage = message.content;
      break;
    }
  }
  
  // Create response based on RetailJet's context and the Amazon marketplace focus
  let response = ""
  
  // Define categories to ensure type safety
  type ResponseCategory = 'sales' | 'inventory' | 'competitors' | 'advertising' | 'listings' | 'metrics' | 'general';
  
  // Retail business-specific responses with PrimeLeap® metrics mentions
  const keywords: Record<ResponseCategory, string[]> = {
    sales: [
      "Based on your Q1 sales data, your PrimeLeap® score has increased by 15 points. This indicates strong growth in your Amazon marketplace presence.",
      "I've analyzed your sales performance across categories. Your electronics category shows a 22% increase in conversion rate compared to last quarter."
    ],
    inventory: [
      "Your inventory health score is currently at 87/100. I recommend adjusting restock quantities for these top 3 SKUs to optimize your working capital.",
      "Based on seasonal trends, I've identified 5 products that may need inventory adjustments to prevent stockouts during the upcoming holiday season."
    ],
    competitors: [
      "Your competitor analysis shows that your main competitors have increased their advertising spend by 30% this month. Consider adjusting your PPC strategy.",
      "I've detected 3 new competitors entering your primary category. Their pricing is 7-12% lower, but their seller ratings average only 3.8/5."
    ],
    advertising: [
      "Your Amazon PPC campaigns are showing a 14% increase in ACOS. I recommend adjusting bidding on these 10 keywords to improve efficiency.",
      "Based on RetailJet's analysis, reallocating 20% of your budget from brand campaigns to product targeting could improve your overall ROAS."
    ],
    listings: [
      "Your product listings optimization score is 82/100. Adding enhanced A+ content to your top 5 products could improve conversion by up to 15%.",
      "I've identified keyword gaps in 7 of your product listings. Adding these terms could improve your organic search visibility by 25-30%."
    ],
    metrics: [
      "Your PrimeLeap® metrics indicate strong performance in customer satisfaction but potential improvement areas in indexation and search visibility.",
      "Week-over-week, your seller performance metrics have improved by 8 points. Your customer response time is now in the top 10% of sellers in your category."
    ],
    general: [
      "As your RetailJet Glance AI assistant, I'm here to help optimize your Amazon marketplace presence. I can analyze PrimeLeap® metrics, inventory levels, competitor movements, and more.",
      "Welcome to Glance AI. I can help you interpret your RetailJet analytics, identify growth opportunities, and optimize your Amazon selling strategy."
    ]
  }
  
  // Match keywords to provide contextually relevant responses
  const userMessage = lastMessage.toLowerCase()
  let categoryResponse = "";
  
  // Helper function to get a random response from a category
  const getRandomResponse = (category: ResponseCategory): string => {
    const responses = keywords[category];
    // Ensure we have a valid array of responses
    if (!Array.isArray(responses) || responses.length === 0) {
      return "I'm here to help with your RetailJet analytics and Amazon marketplace optimization.";
    }
    const index = Math.floor(Math.random() * responses.length);
    return responses[index] || responses[0] || "I'm ready to assist with your RetailJet analytics.";
  };
  
  if (userMessage.includes("sales") || userMessage.includes("revenue") || userMessage.includes("performance")) {
    categoryResponse = getRandomResponse("sales");
  } 
  else if (userMessage.includes("inventory") || userMessage.includes("stock") || userMessage.includes("supply")) {
    categoryResponse = getRandomResponse("inventory");
  }
  else if (userMessage.includes("competitor") || userMessage.includes("competition")) {
    categoryResponse = getRandomResponse("competitors");
  }
  else if (userMessage.includes("ad") || userMessage.includes("ppc") || userMessage.includes("advertising")) {
    categoryResponse = getRandomResponse("advertising");
  }
  else if (userMessage.includes("listing") || userMessage.includes("product") || userMessage.includes("content")) {
    categoryResponse = getRandomResponse("listings");
  }
  else if (userMessage.includes("metric") || userMessage.includes("primeleap") || userMessage.includes("analytics")) {
    categoryResponse = getRandomResponse("metrics");
  }
  else {
    categoryResponse = getRandomResponse("general");
  }
  
  // Set the response
  response = categoryResponse;
  
  // Add greeting or response variation based on message length
  if (lastMessage.length < 10) {
    response = "Hello! " + getRandomResponse("general");
  }
  
  // Create response message object
  const responseMessage: Message = {
    id: generateUUID(),
    role: "assistant",
    content: response,
    createdAt: new Date().toISOString()
  }
  
  return responseMessage
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages: Message[] = Array.isArray(body.messages) ? body.messages : []
    const id: string = typeof body.id === 'string' ? body.id : generateUUID()
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      )
    }
    
    // Simulate network latency to make it feel more realistic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Perform the chat completion with our mock function
    const responseMessage = await mockChatCompletion(messages)
    
    // Create streaming response format matching AI SDK expectations
    return NextResponse.json({ 
      id,
      message: responseMessage
    })
    
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "An error occurred during chat processing" },
      { status: 500 }
    )
  }
}
