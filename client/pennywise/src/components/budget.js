// src/components/Budget.js

import React, { useState } from "react";

function Budget() {
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");
	const [budgetCategories, setBudgetCategories] = useState([]);
	const [income, setIncome] = useState(0);

	// Add a new budget category
	const handleAddCategory = (e) => {
		e.preventDefault();
		if (category && amount) {
			setBudgetCategories([
				...budgetCategories,
				{ name: category, amount: parseFloat(amount) },
			]);
			setCategory("");
			setAmount("");
		}
	};

	// Handle income form submission
	const handleAddIncome = (e) => {
		e.preventDefault();
		if (income) {
			setIncome(parseFloat(income));
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

			{/* Budget Management Card */}
			<div className="card">
				<h2>Budget Management</h2>
				<form onSubmit={handleAddCategory}>
					<label htmlFor="category">Category Name:</label>
					<input
						type="text"
						id="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>

					<label htmlFor="amount">Allocated Amount:</label>
					<input
						type="number"
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>

					<button type="submit">Add Category</button>
				</form>

				{/* Display Budget Categories */}
				<div id="budget-list">
					<h3>Your Budget Categories</h3>
					<ul>
						{budgetCategories.map((category, index) => (
							<li key={index}>
								{category.name}: {category.amount} Ksh
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Income Input Section */}
			<div className="card">
				<h2>Manage Income</h2>
				<form onSubmit={handleAddIncome}>
					<label htmlFor="income-amount">Enter Income:</label>
					<input
						type="number"
						id="income-amount"
						value={income}
						onChange={(e) => setIncome(e.target.value)}
						placeholder="Enter your income"
					/>
					<button type="submit">Add Income</button>
				</form>

				<div id="income-display">
					<h3>
						Your Income: <span>{income}</span> Ksh
					</h3>
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

export default Budget;
