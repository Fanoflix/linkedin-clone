import { Router } from "express";
import { getUsers, connect, getConnections } from "../controllers/users.js";
import isAuth from '../middleware/is-auth.js';

const router = Router();
router.get("/", getUsers);
router.get("/getConnections", isAuth, getConnections)
router.put("/connect", isAuth, connect)
export default router;
