import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto";

function Reports() {
	const [reportData, setReportData] = useState({
		income: JSON.parse(localStorage.getItem("income")) || 0,
		expenses: JSON.parse(localStorage.getItem("expenses")) || [],
		remainingBudget: 0,
	});

	const [chartInstance, setChartInstance] = useState(null);
	const [darkMode, setDarkMode] = useState(false);

	// Generate report with dynamic data
	const generateReport = () => {
		const income = reportData.income;
		const totalExpenses = reportData.expenses.reduce(
			(total, expense) => total + parseFloat(expense.amount || 0),
			0
		);
		const remainingBudget = income - totalExpenses;

		setReportData({ income, expenses: totalExpenses, remainingBudget });
		renderChart(income, totalExpenses, remainingBudget);
	};

	// Render Chart with Chart.js
	const renderChart = (income, expenses, remainingBudget) => {
		const ctx = document.getElementById("myChart").getContext("2d");

		// Destroy old chart instance if it exists
		if (chartInstance) {
			chartInstance.destroy();
		}

		const newChart = new Chart(ctx, {
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
				scales: {
					y: { beginAtZero: true },
				},
			},
		});

		setChartInstance(newChart);
	};

	// Toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	useEffect(() => {
		// Cleanup chart instance on unmount
		return () => {
			if (chartInstance) chartInstance.destroy();
		};
	}, [chartInstance]);

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

			{/* Main Container for Reports */}
			<div className="container">
				<div className="card">
					<h2>Spending Reports</h2>
					<canvas id="myChart" width="400" height="200"></canvas>

					<div id="report-display">
						<p>
							<strong>Your report will appear here.</strong>
						</p>
						<p>
							Click "Generate Report" to view your detailed spending breakdown.
						</p>
						<img
							src="reports.jpg"
							alt="Report Illustration"
							style={{ width: "100px", marginTop: "10px" }}
						/>
					</div>

					<button onClick={generateReport}>Generate Report</button>
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

export default Reports;
