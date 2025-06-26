import { GoogleGenerativeAI } from "@google/generative-ai";

const explainLogic = async (req, res) => {
  try {
    console.log("helloin expalin");
    const { query } = req.body;

    if (!query)
      return res
        .status(400)
        .json({ success: false, message: "No Query Found!" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a medical AI assistant. When given a lab report, patient symptoms, or a clinical query, you must return your 
    diagnosis or recommendation in structured JSON format. Use evidence-based medical reasoning. Do not include any text outside the JSON 
    object.
    Instructions:
    Analyze the input thoroughly.
    Your response must be a valid JSON object.
    The explanation should be concise but informative, suitable for display in a medical UI.
    Input (user query):${query}
    Respond in the following JSON format:

    {
    "answer": "[Final diagnosis, interpretation, or clinical suggestion]",
    "explanation": "[Concise, step-by-step reasoning behind the answer, in plain language]"
    }
     Example Output:
    {
    "answer": "The patient may be experiencing an infection or possible leukemia.",
    "explanation": "Elevated WBC suggests an immune response or hematologic malignancy. Low hemoglobin points to anemia. These findings togethermay indicate a hematologic disorder and require further investigation."
    }\n
    strictly No extra text,no extra comma , no extra  punctuation, quotes  ,no extra backslash and no newline character , no explanation.Only a valid JSON response .`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) {
      return res.status(502).json({
        success: false,
        message: "Model returned an empty response",
      });
    }
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (err) {
      return res.status(502).json({
        success: true,
        message: "Model responded with a invalid JSON!",
        response: responseText,
      });
    }

    res.status(200).json({
      success: true,
      response: parsedResponse,
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to process your query using Gemini",
      error: err.message,
    });
  }
};

export { explainLogic };
