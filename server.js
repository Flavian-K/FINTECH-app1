require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB Atlas using connection string from .env file
mongoose
	.connect(process.env.MONGODB_URI)
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

// Set your app to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
