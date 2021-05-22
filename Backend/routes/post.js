import { Router } from "express";
import { makePost } from "../controllers/post.js"
const router = Router();

router.post("/", makePost);
export default router;