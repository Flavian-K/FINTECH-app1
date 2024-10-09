require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
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

// Test Route (to confirm server is running)
app.get("/", (req, res) => {
	res.send("Server is up and running");
});

// User registration route (Register new users)
app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).send("User already exists.");
		}

		// Create new user
		const newUser = new User({ username, password });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully", newUser });
	} catch (error) {
		res.status(500).json({ error: "Error creating user", details: error });
	}
});

// Route to create a new expense
app.post("/expenses", async (req, res) => {
	try {
		const { userId, category, amount } = req.body;
		const newExpense = new Expense({ userId, category, amount });
		await newExpense.save();
		res.json({ message: "Expense created successfully", newExpense });
	} catch (error) {
		res.status(500).json({ error: "Error creating expense", details: error });
	}
});

// Route to get all users
app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Error fetching users", details: error });
	}
});

// Route to get all expenses
app.get("/expenses", async (req, res) => {
	try {
		const expenses = await Expense.find().populate("userId");
		res.json(expenses);
	} catch (error) {
		res.status(500).json({ error: "Error fetching expenses", details: error });
	}
});

// Set your app to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
