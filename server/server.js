require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const User = require("./models/user.model");

const app = express();

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB Atlas
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Successfully connected to MongoDB!");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Password reset request route using email or username
app.post("/forgot-password", async (req, res) => {
	try {
		const { usernameOrEmail } = req.body;
		const user = await User.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		});
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const resetToken = crypto.randomBytes(32).toString("hex");
		const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = resetTokenExpiry;
		await user.save();

		const resetUrl = `${req.protocol}://${req.get(
			"host"
		)}/reset-password/${resetToken}`;

		const mailOptions = {
			to: user.email,
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

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ message: "Invalid or expired token" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();
		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error resetting password", error });
	}
});

// User registration route
app.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(400).send("User already exists.");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully", newUser });
	} catch (error) {
		res.status(500).json({ error: "Error creating user", details: error });
	}
});

// User login route
app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).send("User does not exist.");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).send("Invalid password.");
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ error: "Error logging in", details: error });
	}
});

// Middleware to verify JWT from cookies
function authenticateToken(req, res, next) {
	const token = req.cookies.token;
	if (!token) return res.status(401).send("Access denied");

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).send("Invalid token");
		req.user = user;
		next();
	});
}

// Set your app to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
