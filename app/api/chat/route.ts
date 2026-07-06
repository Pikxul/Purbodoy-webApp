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

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are a helpful customer support assistant for "Purbodoy Tours & Travels", a platform for domestic travel across India. 
You should be polite, concise, and help users with booking packages, support inquiries, and general questions. 
If they ask about prices or bookings, tell them they can browse our packages from the top menu and select 'Book Now' to reserve their spot.
If they ask for support or contact, tell them they can reach our support team at support@purbodoy.com or call us at +91-1234567890.
Cancellations made 7 days before the trip are eligible for a full refund.`;

    const chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will act as the Purbodoy Tours & Travels assistant." }],
        }
      ],
      generationConfig: {
        maxOutputTokens: 250,
      }
    });

    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in chat api:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
