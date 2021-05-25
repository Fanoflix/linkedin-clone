import { Router } from "express";
import { makePost, getUserPosts, likePost, getConPosts } from "../controllers/post.js"
import isAuth from '../middleware/is-auth.js';

const router = Router();

router.post("/", isAuth, makePost);
router.get("/getUserPosts", isAuth, getUserPosts);
router.get("/getConPosts", isAuth, getConPosts);
router.put('/likePost', isAuth, likePost )
export default router;