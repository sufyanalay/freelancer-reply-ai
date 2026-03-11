import { Router } from "express";
import Groq from "groq-sdk";
import { addToHistory } from "./history.js";

export const replyRouter = Router();

function getGroq() {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

function buildPrompt({ clientMessage, situation, tone, yourService, price, highTicketMode }) {
  const toneDescriptions = {
    Professional: "formal, polished, and highly professional",
    Friendly: "warm, approachable, and personable",
    Confident: "self-assured, direct, and commanding",
    Persuasive: "compelling, benefit-focused, and motivating",
    Apologetic: "empathetic, sincere, and solution-focused",
    Firm: "assertive, confident, and boundary-setting",
  };

  const situationDescriptions = {
    "Collaboration Request": "responding to a brand or creator asking for collaboration",
    "Sponsorship Inquiry": "replying to a brand offering sponsorship or paid promotion",
    "Fan Question": "responding to a fan's question warmly and engagingly",
    "Negative Comment": "handling a negative or rude comment professionally",
    "Media Interview Request": "responding to a media outlet requesting an interview",
    "Content Repost Request": "handling a request to repost or share someone's content",
    "Pricing Question": "answering questions about rates or pricing for promotions",
    "Follow Up": "following up on a previous conversation or unanswered message",
    "Custom Situation": situation,
  };

  const toneDesc = toneDescriptions[tone] || "friendly and professional";
  const situationDesc = situationDescriptions[situation] || situation;
  const highTicketContext = highTicketMode
    ? `\n- This is a high-value opportunity. Use premium language that reflects the influencer's elite personal brand.`
    : "";

  return `You are a professional communication assistant helping a social media influencer reply to client messages.

Context:
- Situation: ${situationDesc}
- Tone: ${toneDesc}
- Influencer's Niche/Service: ${yourService || "general content creation"}
- Rate/Price: ${price || "not specified"}${highTicketContext}

Client/Fan Message:
"${clientMessage}"

Write a reply the influencer can DIRECTLY copy and paste. Rules:
1. Start directly with the reply — no labels or explanations
2. Sound like a real human influencer — warm, authentic, NOT robotic
3. Match the tone exactly — ${toneDesc}
4. Be concise — 2 to 3 short paragraphs only
5. End with a warm closing line
6. NEVER start with "I hope this message finds you well"
7. NO bullet points, NO headers — just clean plain text
8. Write in FIRST PERSON as the influencer (use "I", "my")
9. Make it feel personally written for THIS exact message
10. Be unique and creative every single time

Output ONLY the reply text — nothing else.`;
}

replyRouter.post("/generate", async (req, res, next) => {
  try {
    const { clientMessage, situation, tone, yourService, price, highTicketMode } = req.body;

    if (!clientMessage || clientMessage.trim().length < 5) {
      return res.status(400).json({ error: "Please provide a valid client message." });
    }

    const prompt = buildPrompt({ clientMessage, situation, tone, yourService, price, highTicketMode });

    const groq = getGroq();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert influencer communication coach. Every reply must be unique, human, and ready to copy-paste directly to a client.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 600,
      temperature: 1.0,
    });

    const generatedReply = completion.choices[0]?.message?.content?.trim();

    if (!generatedReply) {
      throw new Error("No reply generated.");
    }

    addToHistory({
      clientMessage,
      situation,
      tone,
      yourService,
      price,
      highTicketMode,
      generatedReply,
    });

    res.json({ success: true, reply: generatedReply });

  } catch (error) {
    console.error("Groq Error:", error);
    if (error?.status === 401) {
      return res.status(401).json({ error: "Invalid Groq API key." });
    }
    if (error?.status === 429) {
      return res.status(429).json({ error: "Rate limit reached. Please wait." });
    }
    next(error);
  }
});