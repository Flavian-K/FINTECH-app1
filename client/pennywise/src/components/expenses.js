import React, { useState, useEffect } from "react";

function Expenses() {
	const [category, setCategory] = useState("");
	const [expenseAmount, setExpenseAmount] = useState("");
	const [expenses, setExpenses] = useState(
		JSON.parse(localStorage.getItem("expenses")) || []
	);

	// Save expenses to localStorage whenever updated
	useEffect(() => {
		localStorage.setItem("expenses", JSON.stringify(expenses));
	}, [expenses]);

	// Add a new expense
	const handleAddExpense = (e) => {
		e.preventDefault();
		if (category && expenseAmount) {
			setExpenses([
				...expenses,
				{ category, amount: parseFloat(expenseAmount) },
			]);
			setCategory("");
			setExpenseAmount("");
		}
	};

	// Delete an expense
	const handleDeleteExpense = (index) => {
		const updatedExpenses = expenses.filter((_, i) => i !== index);
		setExpenses(updatedExpenses);
	};

	return (
		<div>
			<h2>Expense Tracking</h2>
			<form onSubmit={handleAddExpense}>
				<label>Category:</label>
				<input
					type="text"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					placeholder="Enter category"
					required
				/>
				<label>Amount:</label>
				<input
					type="number"
					value={expenseAmount}
					onChange={(e) => setExpenseAmount(e.target.value)}
					placeholder="Enter amount"
					required
				/>
				<button type="submit">Add Expense</button>
			</form>

			<h3>Your Expenses</h3>
			<ul>
				{expenses.map((expense, index) => (
					<li key={index}>
						{expense.category}: {expense.amount} Ksh
						<button onClick={() => handleDeleteExpense(index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Expenses;
