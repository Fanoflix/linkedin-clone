import { Router } from "express";
import { makePost, getUserPosts, likePost, getConPosts } from "../controllers/posts.js"
import isAuth from '../middleware/is-auth.js';

const router = Router();

router.post("/make", isAuth, makePost);
router.get("/getUserPosts", isAuth, getUserPosts);
router.get("/getConPosts", isAuth, getConPosts);
router.put('/likePost', isAuth, likePost )
export default router;