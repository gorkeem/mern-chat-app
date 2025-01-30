import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    getUsersForSidebar,
    getMessages,
    sendMessage,
    deleteMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

router.delete("/delete/:id", protectRoute, deleteMessages);

export default router;
