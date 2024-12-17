import React, { useState } from "react";
import { Link } from "react-router-dom";

function Expenses() {
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");
	const [expenses, setExpenses] = useState([]);
	const [darkMode, setDarkMode] = useState(false);

	// Add a new expense
	const handleAddExpense = (e) => {
		e.preventDefault();
		if (category && amount) {
			setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
			setCategory("");
			setAmount("");
		}
	};

	// Toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<div className={darkMode ? "dark-mode" : ""}>
			{/* Header */}
			<header>
				<h1>Budget Tracker App</h1>
			</header>

			{/* Dark Mode Toggle Button */}
			<button onClick={toggleDarkMode}>Toggle Dark Mode</button>

			{/* Navigation */}
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/budget">Budget</Link>
					</li>
					<li>
						<Link to="/expenses">Expenses</Link>
					</li>
					<li>
						<Link to="/reports">Reports</Link>
					</li>
					<li>
						<Link to="/settings">Settings</Link>
					</li>
				</ul>
			</nav>

			{/* Expense Tracking Card */}
			<div className="card">
				<h2>Expense Tracking</h2>
				<form onSubmit={handleAddExpense}>
					<label htmlFor="expense-category">Enter Category:</label>
					<input
						type="text"
						id="expense-category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						placeholder="Type category here"
					/>

					<label htmlFor="expense-amount">Expense Amount:</label>
					<input
						type="number"
						id="expense-amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter amount"
					/>

					<button type="submit">Log Expense</button>
				</form>

				{/* Display Logged Expenses */}
				<div id="expenseList">
					<h3>Your Expenses</h3>
					<ul>
						{expenses.map((expense, index) => (
							<li key={index}>
								{expense.category}: {expense.amount} Ksh
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Footer */}
			<footer>
				<p>&copy; 2024 Budget Tracker App. All rights reserved.</p>
				<p>
					Contact us at:{" "}
					<a href="mailto:support@budgettrackerapp.com">
						support@budgettrackerapp.com
					</a>
				</p>
			</footer>
		</div>
	);
}

export default Expenses;
