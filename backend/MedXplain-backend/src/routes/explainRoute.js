import express from "express";
const router = express.Router();
import { explainLogic } from "../controllers/explainController.js";
import { validateUser } from "../middleware/validateUser.js";

router.post("/explain", validateUser, explainLogic);


export default router;
