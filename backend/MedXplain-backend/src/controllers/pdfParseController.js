import fs from "fs/promises";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

// Helper function 1
function preprocessText(text) {
  return text
    .replace(/(\r\n|\n|\r)/gm, " ") // Normalize line breaks
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .replace(/Page \d+ of \d+|LabCorp|Dr\..*?|Report ID:.*?/gi, "")
    .trim();
}

//Helper function 2
function extractLabValues(text) {
  const patterns = [
    // Pattern 1: "Test: Value unit Reference Range: X-Y"
    /([\w\s]+):\s*([\d.<>]+)\s*([^\s]+)\s*Reference Range:\s*([\d.<>\- ]+)/gi,
    // Pattern 2: Fallback if "Reference Range" is missing
    /([\w\s]+):\s*([\d.<>]+)\s*([^\s]+)/gi,
  ];

  let matches = [];
  for (const pattern of patterns) {
    matches = [...text.matchAll(pattern)];
    if (matches.length > 0) break; // Use first matching pattern
  }

  return matches.map((match) => ({
    name: match[1]?.trim(),
    value: parseFloat(match[2]?.replace(/[<>]/g, "")),
    unit: match[3],
    referenceRange: match[4]?.trim() || "Not specified",
  }));
}

//Main Route Handler
export const extractLabReportData = async (req, res, next) => {
  console.log("popopopop");
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  const filePath = req.file.path;

  try {
    // Read PDF asynchronously
    const dataBuffer = await fs.readFile(filePath);

    const data = await pdfParse(dataBuffer);

    const rawText = data.text;
    const cleanedText = preprocessText(rawText);
    const extractedValues = extractLabValues(cleanedText);

    // Delete file async (fail silently if deletion fails)
    await fs
      .unlink(filePath)
      .catch((err) => console.error("Failed to delete PDF:", err));

    req.text = {
      text: rawText,
      extractedValues,
      cleanedText,
    };
    // console.log(req.text);
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error("Error extracting lab report:", err);

    // Attempt cleanup on error
    await fs.unlink(filePath).catch(() => {});

    return res.status(500).json({
      success: false,
      message: "Failed to process PDF",
      error: err.message,
    });
  }
};
