import { Router } from "express";
import {
  getUsers,
  connect,
  getConnections,
  addBio,
  getUserFromId,
  getBio,
  addSkill,
  getSkills,
  resetSkills,
  endorseSkill,
} from "../controllers/users.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();
router.get("/", getUsers);
router.get("/getConnections/:userId", getConnections);
router.get("/getUser/:userId", getUserFromId);
router.get("/getSkills", isAuth, getSkills);
router.get("/getBio", isAuth, getBio);
router.put("/connect", isAuth, connect);
router.put("/resetSkills", isAuth, resetSkills);
router.put("/addBio", isAuth, addBio);
router.put("/addSkill", isAuth, addSkill);
router.put("/endorseSkill", isAuth, endorseSkill);
export default router;
