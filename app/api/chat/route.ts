import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a helpful customer support assistant for "Purbodoy Tours & Travels", a platform for domestic travel across India. 
You should be polite, concise, and help users with booking packages, support inquiries, and general questions. 
If they ask about prices or bookings, tell them they can browse our packages from the top menu and select 'Book Now' to reserve their spot.
If they ask for support or contact, tell them they can reach our support team at support@purbodoy.com or call us at +91-1234567890.
Cancellations made 7 days before the trip are eligible for a full refund.`;

    const history = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will act as the Purbodoy Tours & Travels assistant." }],
      }
    ];

    const generationConfig = {
      maxOutputTokens: 2048,
    };

    let reply = "";
    
    try {
      // Try primary model first
      const primaryModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const chatSession = primaryModel.startChat({ history, generationConfig });
      const result = await chatSession.sendMessage(message);
      reply = result.response.text();
    } catch (primaryError: any) {
      console.warn("Primary model failed, falling back to gemini-1.5-flash:", primaryError.message);
      // Fallback model
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chatSession = fallbackModel.startChat({ history, generationConfig });
      const result = await chatSession.sendMessage(message);
      reply = result.response.text();
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in chat api:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
