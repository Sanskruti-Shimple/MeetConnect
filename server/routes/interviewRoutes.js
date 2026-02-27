import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createInterview, getInterviews, updateInterview } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", auth, createInterview);
router.get("/", auth, getInterviews);
router.put("/:id", auth, updateInterview);

export default router;