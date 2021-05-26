import { Router } from "express";
import { getUsers, connect, getConnections, addBio, getUserFromId, getBio } from "../controllers/users.js";
import isAuth from '../middleware/is-auth.js';

const router = Router();
router.get("/", getUsers);
router.get("/getConnections/:userId", getConnections)
router.put("/connect", isAuth, connect)
router.put('/addBio', isAuth, addBio)
router.get('/getBio', isAuth, getBio)
router.get('/getUser/:userId', getUserFromId)
export default router;
