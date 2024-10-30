import React, { useState } from "react";

function Expenses() {
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");
	const [expenses, setExpenses] = useState([]);

	// Add a new expense
	const handleAddExpense = (e) => {
		e.preventDefault();
		if (category && amount) {
			setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
			setCategory("");
			setAmount("");
		}
	};

	return (
		<div>
			{/* Header */}
			<header>
				<h1>Budget Tracker App</h1>
			</header>

			{/* Dark Mode Toggle Button */}
			<button>Toggle Dark Mode</button>

			{/* Navigation */}
			<nav>
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/budget">Budget</a>
					</li>
					<li>
						<a href="/expenses">Expenses</a>
					</li>
					<li>
						<a href="/reports">Reports</a>
					</li>
					<li>
						<a href="/settings">Settings</a>
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
					Contact us at: <a href="#">support@budgettrackerapp.com</a>
				</p>
			</footer>
		</div>
	);
}

export default Expenses;
