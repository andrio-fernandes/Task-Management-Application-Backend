const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !name.trim() || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        message: "Invalid email address"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET PROFILE
router.get("/profile", authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(req.user).select("name email");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE PROFILE
router.put("/profile", authMiddleware, async (req, res) => {

  try {

    const { name, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const updates = {};

    if (name !== undefined) {

      if (!name.trim()) {
        return res.status(400).json({
          message: "Name cannot be empty"
        });
      }

      updates.name = name.trim();

    }

    if (newPassword) {

      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required"
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters"
        });
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Current password is incorrect"
        });
      }

      updates.password = await bcrypt.hash(newPassword, 10);

    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No changes to update"
      });
    }

    Object.assign(user, updates);

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;