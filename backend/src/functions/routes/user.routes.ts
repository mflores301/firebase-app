// external imports
import * as express from "express";

// internal imports
import { getUsers, updateUser } from "../controllers/user/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.put("/:id", updateUser);

export default router;
