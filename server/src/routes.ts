import express from "express";
import { compilePDF } from "./controllers/compilePDF";

const router = express.Router();

// define all routes below
router.post("/compile", compilePDF);

export default router;