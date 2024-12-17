import React, { useState, useEffect } from "react";

function Budget() {
	// State for Budget Management
	const [category, setCategory] = useState("");
	const [budgetAmount, setBudgetAmount] = useState("");
	const [budgetCategories, setBudgetCategories] = useState(
		JSON.parse(localStorage.getItem("budgetCategories")) || []
	);

	// State for Income Management
	const [incomeAmount, setIncomeAmount] = useState("");
	const [incomeList, setIncomeList] = useState(
		JSON.parse(localStorage.getItem("incomeList")) || []
	);

	// Save Budget Categories to localStorage
	useEffect(() => {
		localStorage.setItem("budgetCategories", JSON.stringify(budgetCategories));
	}, [budgetCategories]);

	// Save Income List to localStorage
	useEffect(() => {
		localStorage.setItem("incomeList", JSON.stringify(incomeList));
	}, [incomeList]);

	// Add new Budget Category
	const handleAddCategory = (e) => {
		e.preventDefault();
		if (category && budgetAmount) {
			setBudgetCategories([
				...budgetCategories,
				{ name: category, amount: parseFloat(budgetAmount) },
			]);
			setCategory("");
			setBudgetAmount("");
		}
	};

	// Delete a Budget Category
	const handleDeleteCategory = (index) => {
		const updatedCategories = budgetCategories.filter((_, i) => i !== index);
		setBudgetCategories(updatedCategories);
	};

	// Add Income
	const handleAddIncome = (e) => {
		e.preventDefault();
		if (incomeAmount) {
			setIncomeList([
				...incomeList,
				{ amount: parseFloat(incomeAmount), id: Date.now() },
			]);
			setIncomeAmount("");
		}
	};

	// Delete an Income Entry
	const handleDeleteIncome = (id) => {
		const updatedIncomeList = incomeList.filter((item) => item.id !== id);
		setIncomeList(updatedIncomeList);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "20px" }}>
			{/* Budget Management */}
			<div className="card" style={{ margin: "20px auto", maxWidth: "500px" }}>
				<h2>Budget Management</h2>
				<form onSubmit={handleAddCategory}>
					<div>
						<label>Category Name:</label>
						<input
							type="text"
							placeholder="e.g., Vacation"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Allocated Amount:</label>
						<input
							type="number"
							placeholder="e.g., 5000"
							value={budgetAmount}
							onChange={(e) => setBudgetAmount(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Add Category</button>
				</form>

				{/* Display Budget Categories */}
				<h3>Your Budget Categories</h3>
				<ul>
					{budgetCategories.map((item, index) => (
						<li key={index}>
							{item.name}: {item.amount} Ksh{" "}
							<button onClick={() => handleDeleteCategory(index)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* Income Management */}
			<div className="card" style={{ margin: "20px auto", maxWidth: "500px" }}>
				<h2>Manage Income</h2>
				<form onSubmit={handleAddIncome}>
					<div>
						<label>Enter Income:</label>
						<input
							type="number"
							placeholder="e.g., 10000"
							value={incomeAmount}
							onChange={(e) => setIncomeAmount(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Save Income</button>
				</form>

				{/* Display Income List */}
				<h3>Your Income Entries</h3>
				<ul>
					{incomeList.map((item) => (
						<li key={item.id}>
							{item.amount} Ksh{" "}
							<button onClick={() => handleDeleteIncome(item.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>

				{/* Total Income */}
				<h4>
					Total Income:{" "}
					{incomeList.reduce((total, item) => total + item.amount, 0)} Ksh
				</h4>
			</div>

			{/* Footer */}
			<footer style={{ marginTop: "20px" }}>
				<p>&copy; 2024 Budget Tracker App. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default Budget;
