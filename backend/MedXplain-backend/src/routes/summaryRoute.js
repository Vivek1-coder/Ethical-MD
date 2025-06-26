import express from "express";
import { validateUser } from "../middleware/validateUser.js";
import { SummaryModel } from "../models/Summary.Model.js";
const router = express.Router();

// Route to get all the summary of a user
router.get("/all", validateUser, async (req, res) => {
  const userId = req.user;
  try {
    const allSummaries = await SummaryModel.find({ user_id: userId });
    if (allSummaries.length === 0) {
      return res.status(404).json({
        message: "No summaries found for this user.",
      });
    }

    const allSummariesIDArray = allSummaries.map((summary) => {
      return { ID: summary._id };
    });
    res.status(200).json({
      message: "Summaries retrieved successfully.",
      summaries_id_Array: allSummariesIDArray,
    });
  } catch (err) {
    console.error("Error retrieving summaries:", err);
    res.status(500).json({
      message: "Internal server error while retrieving summaries.",
      error: err.message,
    });
  }
});

// Route to get a single summary by ID for a user
router.post("/single", validateUser, async (req, res) => {
  const { summaryId } = req.body;
  console.log(summaryId);
  const userId = req.user._id.toString();

  console.log("hello boi, lololo", userId);
  if (!summaryId) {
    return res.status(400).json({
      message: "Summary ID is required.",
    });
  }

  try {
    const summary = await SummaryModel.findOne({
      _id: summaryId,
      user_id: userId,
    });

    if (!summary) {
      return res.status(404).json({
        message: "Summary not found for this user.",
      });
    }
    console.log("here it is", summary);
    res.status(200).json({
      message: "Summary retrieved successfully.",
      summary,
    });
  } catch (err) {
    console.error("Error retrieving summary:", err);
    res.status(500).json({
      message: "Internal server error while retrieving summary.",
      error: err.message,
    });
  }
});

export default router;
