import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    getUsersForSidebar,
    getMessages,
    sendMessage,
    deleteMessages,
    favoriteUser,
    unfavoriteUser,
    getFavorites,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

router.delete("/delete/:id", protectRoute, deleteMessages);

router.put("/favorite/:id", protectRoute, favoriteUser);

router.put("/unfavorite/:id", protectRoute, unfavoriteUser);

router.get("/get-favorites/:id", protectRoute, getFavorites);

export default router;
