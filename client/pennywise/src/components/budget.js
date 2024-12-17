import React, { useState } from "react";
import { Link } from "react-router-dom";

function Budget() {
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");
	const [budgetCategories, setBudgetCategories] = useState([]);
	const [income, setIncome] = useState(0);
	const [darkMode, setDarkMode] = useState(false);

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
						onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
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
					Contact us at:{" "}
					<a href="mailto:support@budgettrackerapp.com">
						support@budgettrackerapp.com
					</a>
				</p>
			</footer>
		</div>
	);
}

export default Budget;
