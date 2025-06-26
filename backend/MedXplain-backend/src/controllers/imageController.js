import { createWorker } from 'tesseract.js';
import fs from 'fs/promises';

export const extractText = async (req, res,next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  

  const imagePath = req.file.path;

  try {
    const worker = await createWorker();

    // Directly call recognize, no need to load/init
    const { data: { text } } = await worker.recognize(imagePath);

    await worker.terminate();
    await fs.unlink(imagePath);

    req.text={
      success: true,
      text: text.trim()
    };

    next();

  } catch (err) {
    console.error('OCR Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to extract text',
      message: err.message
    });
  }
};
