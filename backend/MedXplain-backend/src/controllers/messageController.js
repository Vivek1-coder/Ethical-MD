import Chat from "../models/Chat.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Move Gemini logic into a utility function
const explainLogic = async (query, summary = "") => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a role-aware medical AI assistant built to assist two types of users: patients and healthcare professionals (doctors). Your core responsibility is to provide clear, evidence-based, and role-appropriate medical information — never functioning as a black box. You must explain your reasoning step by step, adapting the depth and tone of your explanation based on the user's role.
2. Otherwise, respond with ONLY the JSON object below—no backticks, no markdown, no leading/trailing text:2. Otherwise, respond with ONLY the JSON object below—no backticks, no markdown, no leading/trailing text:2. Otherwise, respond with ONLY the JSON object below—no backticks, no markdown, no leading/trailing text:
SUMMARY OF PREVIOUS CONVERSATION CONTEXT (for continuity):
${summary || "No previous conversation."}

ROLE: PATIENT  
Your goals:  
- Interpret symptoms, lab reports, or health questions clearly and compassionately.  
- Serve as a health consultant: offer wellness advice, preventive strategies, lifestyle, diet, and exercise guidance.  
- Help patients understand the seriousness of symptoms and whether to consult a doctor.  
- Debunk medical misinformation found on social media using scientific sources.  
- Avoid fear-based responses. Be informative, calming, and direct.  
- Use simple, non-technical language. Avoid jargon unless explained.

ROLE: DOCTOR  
Your goals:  
- Support with academic queries, research ideas, and clinical differential diagnoses.  
- Analyze patient symptoms, investigations, or data using formal clinical reasoning.  
- Reference evidence-based medicine, latest guidelines, or known medical conditions.  
- Use technical language appropriately for a professional audience.  
- Do not oversimplify; favor structured, explainable reasoning.  
- When asked to validate a social media claim, reference scientific literature or indicate lack thereof.

TRANSPARENCY & ACCOUNTABILITY  
- Always explain how you arrived at your conclusion.  
- If a claim lacks evidence or is misleading, clearly state that.  
- Be honest if insufficient information is provided.  
- Never make final diagnoses in uncertain cases — recommend consultation.  
- Mention if symptoms may overlap multiple conditions.

CURRENT USER QUERY:
${query}

RESPONSE FORMAT (STRICTLY ENSURE THAT YOU DO NOT ADD ANY BACKTICKS, OR META-COMMENTARY) :  
{
  "answer": "[Diagnosis, guidance, or summary]",
  "explaination": "[Step-by-step reasoning behind the answer, tailored to the user role]",
  "urgency_level": "[low | moderate | high | emergency]",
  "recommendation": "[e.g., Monitor at home, consult a doctor, go to ER]",
  "source_validation": "[true | false | unknown]",
  "source_comment": "[If claim is validated or debunked, explain why. If unknown, say so.]"
}
###Instructions for output
#DO NOT ADD ADD ANY META-COMMENTRY, BACKTICKS WITH JSON  
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  let parsedResponse;
  try {
    parsedResponse = JSON.parse(responseText);
  } catch (err) {
    throw new Error("Model responded with invalid JSON:\n" + responseText);
  }

  return parsedResponse;
};

//generate summary
export const generateSummary = async (messages) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const messageText = messages
    .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
    .join("\n");

  const summaryPrompt = `Summarize this chat for continuation in 2-3 lines:\n${messageText}`;

  const result = await model.generateContent(summaryPrompt);
  return result.response.text().trim();
};

export const generateTitle = async (summary) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const titlePrompt = `Give a two-three word title for this summary\n${summary}`;

  const result = await model.generateContent(titlePrompt);
  return result.response.text();
};

export const addMessage = async (req, res) => {
  try {
    console.log("I am in chat bot");
    const { query: content } = req.body; // user message
    const { chatId } = req.body;
    console.log("content and chatId")
    console.log(content, chatId);
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Query content required" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (String(chat.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access to this chat" });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content,
      timestamp: new Date(),
    });

    // Get AI response
    const geminiResponse = await explainLogic(content, chat.summary);

    // Save assistant message
    chat.messages.push({
      role: "assistant",
      content: JSON.stringify(geminiResponse),
      timestamp: new Date(),
    });

    chat.summary = await generateSummary(chat.messages);
    chat.title = await generateTitle(chat.summary);
    await chat.save();
    console.log(geminiResponse);
    res.status(200).json({
      success: true,
      messages: chat.messages,
      response: geminiResponse,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
