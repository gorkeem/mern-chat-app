import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        // Find and delete the messages between the two users
        const result = await Message.deleteMany({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Chat deleted successfully",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No messages found to delete",
            });
        }
    } catch (error) {
        console.log("Error in deleteMessages controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const favoriteUser = async (req, res) => {
    const { id: userToFavoriteId } = req.params;
    const myId = req.user._id;

    try {
        const user = await User.findById(myId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.favoriteUsers.includes(userToFavoriteId)) {
            user.favoriteUsers.push(userToFavoriteId);
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: "User added to favorites",
        });
    } catch (error) {
        console.log("Error in favoriteUser controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const unfavoriteUser = async (req, res) => {
    const { id: userToUnfavoriteId } = req.params;
    const myId = req.user._id;

    try {
        const user = await User.findById(myId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const index = user.favoriteUsers.findIndex(
            (favorite) => favorite._id.toString() === userToUnfavoriteId
        );
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "User not in favorites",
            });
        }

        user.favoriteUsers.splice(index, 1);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User unfavorited successfully",
        });
    } catch (error) {
        console.error("Error in unfavoriteUser controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate(
            "favoriteUsers",
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json(user.favoriteUsers);
    } catch (error) {
        console.log("Error in getFavoriteUsers controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
