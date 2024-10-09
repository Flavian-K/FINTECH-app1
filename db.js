require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

// Use the environment variable for the MongoDB URI
const uri = process.env.MONGODB_URI;

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB Atlas"))
	.catch((err) => console.error("Error connecting to MongoDB Atlas", err));
