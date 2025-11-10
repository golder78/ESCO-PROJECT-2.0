import express from "express";
import { register, login } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Register new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Get logged-in user details (for AuthContext auto-login)
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle admin user from environment
    if (decoded.isAdmin && !decoded.id) {
      return res.json({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        isAdmin: true,
      });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export default router;
