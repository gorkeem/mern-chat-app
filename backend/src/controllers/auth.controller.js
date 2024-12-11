import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All the fields are required",
            });
        }
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password length should be at least 6 characters",
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                success: true,
                _id: newUser._id,
                fullName: newUser.fullName,
                password: newUser.password,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid User Data",
            });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
            password: user.password,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully",
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
        return res
            .status(400)
            .json({ success: false, message: "Profile Picture Is Required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = User.findByIdAndUpdate(
        userId,
        {
            profilePic: uploadResponse.secure_url,
        },
        { new: true }
    );
    res.status(200).json({ success: true, updatedUser });
    try {
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
