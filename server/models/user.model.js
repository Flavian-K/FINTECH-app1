const mongoose = require("mongoose");

// Define the schema for users
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }, // Hashed password
	resetPasswordToken: String, // Token for password reset functionality
	resetPasswordExpires: Date, // Expiry time for the reset token
	createdAt: { type: Date, default: Date.now },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
