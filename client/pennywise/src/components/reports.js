import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Reports() {
	const [incomeList, setIncomeList] = useState([]);
	const [expensesList, setExpensesList] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [remainingBudget, setRemainingBudget] = useState(0);
	const chartRef = useRef(null);

	// Fetch data from localStorage
	useEffect(() => {
		// Fetch income and expenses lists
		const incomeData = JSON.parse(localStorage.getItem("incomeList")) || [];
		const expensesData = JSON.parse(localStorage.getItem("expensesList")) || [];

		// Calculate total income and expenses
		const totalIncome = incomeData.reduce(
			(total, item) => total + (item.amount || 0),
			0
		);

		const totalExpenses = expensesData.reduce(
			(total, item) => total + (item.amount || 0),
			0
		);

		// Calculate remaining budget
		const remainingBudget = totalIncome - totalExpenses;

		// Update states
		setIncomeList(incomeData);
		setExpensesList(expensesData);
		setTotalIncome(totalIncome);
		setTotalExpenses(totalExpenses);
		setRemainingBudget(remainingBudget);

		// Render chart
		renderChart(totalIncome, totalExpenses, remainingBudget);
	}, []);

	// Render Chart
	const renderChart = (income, expenses, remainingBudget) => {
		const ctx = document.getElementById("myChart");

		// Destroy existing chart
		if (chartRef.current) {
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Income", "Expenses", "Remaining Budget"],
				datasets: [
					{
						label: "Amount (in Ksh)",
						data: [income, expenses, remainingBudget],
						backgroundColor: ["lightblue", "lightcoral", "lightgreen"],
						borderColor: ["blue", "red", "green"],
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	};

	return (
		<div>
			{/* Report Card */}
			<div
				className="card"
				style={{ textAlign: "center", margin: "20px auto", maxWidth: "400px" }}
			>
				<h2>Spending Reports</h2>
				<div style={{ height: "300px" }}>
					<canvas id="myChart"></canvas>
				</div>

				<div style={{ marginTop: "20px" }}>
					<p>
						<strong>Your Total Income:</strong> {totalIncome} Ksh
					</p>
					<p>
						<strong>Your Total Expenses:</strong> {totalExpenses} Ksh
					</p>
					<p>
						<strong>Your Remaining Budget:</strong> {remainingBudget} Ksh
					</p>
				</div>
			</div>

			{/* Generate Report Button */}
			<div style={{ textAlign: "center", marginBottom: "20px" }}>
				<button
					onClick={() =>
						renderChart(totalIncome, totalExpenses, remainingBudget)
					}
				>
					Refresh Report
				</button>
			</div>
		</div>
	);
}

export default Reports;
