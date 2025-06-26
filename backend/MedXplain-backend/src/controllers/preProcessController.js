import { GoogleGenerativeAI } from "@google/generative-ai";
import { SummaryModel } from "../models/Summary.Model.js";
function sanitizeModelJson(raw) {
  let s = raw.trim();

  // 1) Strip ```json … ``` (non-greedy)
  const fenceMatch = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    s = fenceMatch[1].trim();
  }

  // 2) Remove any leftover backticks
  s = s.replace(/`/g, "").trim();

  // 3) Remove trailing commas that might break parse
  s = s.replace(/,\s*([}\]])/g, "$1");
  console.log(s);
  return s;
}

//function to extract summary using metrics and remarks
const extractSummaryUsingMatricsAndRemarks = async (
  metrics,
  remarks,
  user_id
) => {
  if (!metrics) {
    return { success: false, message: "Invalid or missing metrics object" };
  }

  const formattedMetrics = Object.entries(metrics)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY2
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an experienced medical assistant AI. Given a set of lab metrics and remarks, return a structured JSON response with:
    A medical summary (it should be in easy language and detailed  that a common man can easily understand the summary).
    An explanation of what the results mean in simple terms.
    Actionable insights or suggestions for next steps.
    Instructions:
    Use medical deatiled reasoning.
    Do not output anything except valid JSON.
    The output should be suitable for displaying in a medical UI.
    Input:
    Metrics: ${formattedMetrics}
    Remarks: ${remarks || "None"}
    Output Format:
    {
    "summary": "...detailed summary",
    "explanation": "... detailed explaination",
    "actionable_insights": ["...", "..."]
    }
    Example:
    {
    "summary": "Low hemoglobin and high WBC suggest possible anemia with underlying infection.",
    "explanation": "WBC is elevated indicating infection or inflammation. Low hemoglobin indicates anemia. Patient symptoms     of fatigue support this finding.",
    "actionable_insights": [
    "Recommend complete iron panel to assess iron deficiency.",
    "Investigate signs of infection: CBC trend, urine/stool test.",
    "Consider referral to hematologist if anemia persists."
    ]
    }
    strictly No extra text,no extra comma , no extra punctuation, no  quotes  ,no extra backslash and no newline character , no   explanation.Only a valid JSON response .

    `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  if (!responseText) {
    return {
      success: false,
      message: "Model returned an empty response",
    };
  }
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(responseText);
  } catch (err) {
    return {
      success: true,
      message: "Model responded with a invalid JSON!",
      response: responseText,
    };
  }
  // save the summary to the database
  const newSummary = new SummaryModel({
    user_id: user_id,
    metrics: metrics || {},
    remarks: remarks || "",
    summary: parsedResponse.summary,
    explanation: parsedResponse.explanation,
    actionable_insights: parsedResponse.actionable_insights,
  });

  const savedSummary = await newSummary.save();

  if (!savedSummary) {
    return {
      success: true,
      message: "Failed to save summary to the database",
      response: parsedResponse,
    };
  }

  return {
    success: true,
    response: savedSummary,
  };
};

const PreprocessReport = async (req, res) => {
  console.log("lolololololo");
  try {
    const user_id = req.user;

    const { text } = req.text;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "No text provided for preprocessing",
      });
    }
    // console.log(process.env);
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY2 || process.env.GEMINI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a medical Ai assitant.Your are provided with a text extracted from a PDF lab-report Document.Your task is to extract the key medical metrics from the text and return them in a structured JSON format.
    The metrics should include all relevant key medical metrice present in the document.Return the metrics in the following JSON format:
    {
      "metrics": {
        "metric1": {value : "value1" , normalRange: "150-200( for example)" },
        "metric2":{value : "value2" , normalRange: "100-120( for example)" },
        // Add more metrics as needed
      },
      remarks: "if Any additional remarks or notes else keep it empty"
    }
    Here is the text extracted from the PDF lab-report Document:
    ${text}
    Please return the response in JSON format only.
    strictly No extra text , no extra comma , no extra punctuation,no extra quotes  ,no extra backslash and no newline character , no explanation.Only a valid JSON response.Respond with the object only and do **not** include \`\`json or anything else`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) {
      return res.status(502).json({
        success: false,
        message: "Model returned an empty response",
      });
    }

    let cleanResponse = responseText.trim();
    console.log(responseText);
    // Remove markdown-like formatting if any
    if (cleanResponse.startsWith("```json")) {
      // console.log("int it boiiii");
      cleanResponse = cleanResponse.replace(/```json|```/g, "").trim();
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanResponse);
    } catch (err) {
      return res.status(502).json({
        success: true,
        message: "Model responded with a invalid JSON!",
        response: cleanResponse,
      });
    }
    // console.log("Response from Gemini:", parsedResponse);
    // console.log("hello boy ");

    // metrics and remarks extraction
    const metrics = parsedResponse.metrics || {};
    const remarks = parsedResponse.remarks || "";

    // console.log("Metrics and Remarks extracted successfully");
    // console.log(metrics, remarks);

    const responseToClinet = await extractSummaryUsingMatricsAndRemarks(
      metrics,
      remarks,
      user_id
    );
    return res.status(200).json(responseToClinet);
  } catch (err) {
    console.log("zozozozoz");
    res.status(500).json({
      success: false,
      message: "Failed to process your query using Gemini",
      error: err.message,
    });
  }
};

export { PreprocessReport };
