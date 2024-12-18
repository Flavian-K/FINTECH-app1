require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/user.model"); // User model

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow localhost frontend
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Successfully connected to MongoDB!"))
	.catch((error) => console.error("Error connecting to MongoDB:", error));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Generate a reset token (expires in 15 mins)
		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

		// Save token in the database (optional if resetToken is part of the User model)
		user.resetToken = token;
		await user.save();

		// Respond with token for simplicity (this is where you'd send it via email)
		return res
			.status(200)
			.json({ message: "Reset link generated successfully!", token });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// Reset Password Route
app.post("/reset-password", async (req, res) => {
	try {
		const { token, newPassword } = req.body;

		// Verify the token
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Hash the new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		// Update the password and clear the reset token
		user.password = hashedPassword;
		user.resetToken = null;
		await user.save();

		return res.status(200).json({ message: "Password reset successfully!" });
	} catch (err) {
		return res.status(400).json({ message: "Invalid or expired token" });
	}
});

// User Registration Route
app.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(400).send("User already exists.");
		}

		// Hash password and save user
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error creating user", details: error });
	}
});

// User Login Route
app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find user and validate password
		const user = await User.findOne({ username });
		if (!user) {
			console.log("User not found");
			return res.status(400).send("User does not exist.");
		}

		console.log("User found:", user);

		const isPasswordValid = await bcrypt.compare(password, user.password);
		console.log("Password valid:", isPasswordValid);
		if (!isPasswordValid) return res.status(400).send("Invalid password.");

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: "1h",
		});

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		// add token to response data
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in", details: error });
	}
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
	const token = req.cookies.token;
	if (!token) return res.status(401).send("Access denied");

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.status(403).send("Invalid token");
		req.user = user;
		next();
	});
}

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
