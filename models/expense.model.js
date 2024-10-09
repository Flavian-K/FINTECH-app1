// models/expense.model.js
const mongoose = require("mongoose");

// Define the schema for expenses
const expenseSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	category: { type: String, required: true },
	amount: { type: Number, required: true },
	date: { type: Date, default: Date.now },
});

// Create and export the Expense model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
