require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT
const nodemailer = require("nodemailer"); // For sending emails
const crypto = require("crypto"); // For generating random tokens
const User = require("./models/user.model"); // Import User model
const Expense = require("./models/expense.model"); // Import Expense model

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB Atlas using connection string from .env file
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to MongoDB!");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
	service: "gmail", // or your preferred email provider
	auth: {
		user: process.env.EMAIL_USER, // Your email
		pass: process.env.EMAIL_PASS, // Your email password
	},
});

// Password reset request route
app.post("/forgot-password", async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ username: email });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		// Generate a reset token and expiry time
		const resetToken = crypto.randomBytes(32).toString("hex");
		const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = resetTokenExpiry;
		await user.save();

		const resetUrl = `${req.protocol}://${req.get(
			"host"
		)}/reset-password/${resetToken}`;

		// Send password reset email
		const mailOptions = {
			to: email,
			from: process.env.EMAIL_USER,
			subject: "Password Reset",
			text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`,
		};

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				return res.status(500).json({ message: "Error sending email", err });
			}
			res.status(200).json({ message: "Password reset email sent" });
		});
	} catch (error) {
		res.status(500).json({ message: "Error processing request", error });
	}
});

// Password reset route
app.post("/reset-password/:token", async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Find user by reset token and check expiry
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
		});

		if (!user) {
			return res.status(400).json({ message: "Invalid or expired token" });
		}

		// Hash the new password and save it
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined; // Clear reset token and expiry
		user.resetPasswordExpires = undefined;

		await user.save();
		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error resetting password", error });
	}
});

// User registration route (Register new users with hashed password)
app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).send("User already exists.");
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully", newUser });
	} catch (error) {
		res.status(500).json({ error: "Error creating user", details: error });
	}
});

// User login route with JWT generation
app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).send("User does not exist.");
		}

		// Compare password with hashed password in the database
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).send("Invalid password.");
		}

		// Generate a JWT token if login is successful
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h", // Token expires in 1 hour
		});

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in", details: error });
	}
});

// Middleware to verify JWT and protect routes
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // Bearer token format
	if (!token) return res.status(401).send("Access denied");

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).send("Invalid token");
		req.user = user; // Attach user info to request
		next();
	});
}

// Route to create a new expense (protected by authentication)
app.post("/expenses", authenticateToken, async (req, res) => {
	try {
		const { category, amount } = req.body;
		const newExpense = new Expense({
			userId: req.user.userId,
			category,
			amount,
		});
		await newExpense.save();
		res.json({ message: "Expense created successfully", newExpense });
	} catch (error) {
		res.status(500).json({ error: "Error creating expense", details: error });
	}
});

// Route to get all users (for testing purposes, not protected)
app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Error fetching users", details: error });
	}
});

// Route to get all expenses (protected by authentication)
app.get("/expenses", authenticateToken, async (req, res) => {
	try {
		const expenses = await Expense.find({ userId: req.user.userId });
		res.json(expenses);
	} catch (error) {
		res.status(500).json({ error: "Error fetching expenses", details: error });
	}
});

// Route to update a user's password (protected by authentication)
app.put("/users/password", authenticateToken, async (req, res) => {
	try {
		const { password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
		const updatedUser = await User.findByIdAndUpdate(
			req.user.userId,
			{ password: hashedPassword },
			{ new: true } // Return the updated user
		);
		if (!updatedUser) {
			return res.status(404).send("User not found.");
		}
		res.json({ message: "Password updated successfully", updatedUser });
	} catch (error) {
		res.status(500).json({ error: "Error updating password", details: error });
	}
});

// Test route to confirm server is running
app.get("/", (req, res) => {
	res.send("Server is up and running");
});

// Set your app to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// Logout route to invalidate JWT
app.post("/logout", (req, res) => {
	// To 'logout', we can send an empty response or clear JWT on the client side
	res.status(200).json({ message: "Logged out successfully" });
});
