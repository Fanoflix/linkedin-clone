import { Router } from "express";
import { makePost, getUserPosts, likePost, getConPosts, getPostById } from "../controllers/posts.js"
import isAuth from '../middleware/is-auth.js';

const router = Router();

router.post("/make", isAuth, makePost);
router.get("/getUserPosts", isAuth, getUserPosts);
router.put('/likePost', isAuth, likePost);
router.get("/getConPosts", isAuth, getConPosts);
router.get("/getPostById/:postId", isAuth, getPostById);
export default router;