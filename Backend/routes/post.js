import { Router } from "express";
import { makePost, getPosts } from "../controllers/post.js"
import isAuth from '../middleware/is-auth.js';

const router = Router();

router.get("/getPosts", getPosts);
router.post("/", makePost);
export default router;