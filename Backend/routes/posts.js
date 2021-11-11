import { Router } from "express";
import { makePost, getUserPosts, likePost, getConPosts, getPostById } from "../controllers/posts.js"
import isAuth from '../middleware/is-auth.js';

const router = Router();

// posts + puts
router.put('/likePost', isAuth, likePost);
router.post("/makePost", isAuth, makePost);

// gets
router.get("/getUserPosts", isAuth, getUserPosts);
router.get("/getConPosts", isAuth, getConPosts);
router.get("/getPostById/:postId", isAuth, getPostById);
export default router;