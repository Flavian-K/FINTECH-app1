document.addEventListener("DOMContentLoaded", function () {
	// Budget Tracking Section
	const budgetForm = document.querySelector("#budget-form"); // Select the budget form by its ID
	const budgetList = document.querySelector("#budget-list ul"); // Select the budget list

	// Initialize an array to store budget categories
	let budgetCategories =
		JSON.parse(localStorage.getItem("budgetCategories")) || [];

	function renderBudgetCategories() {
		budgetList.innerHTML = ""; // Clear the existing list

		// Loop through the budgetCategories array and create list items with delete buttons
		budgetCategories.forEach(function (category, index) {
			const li = document.createElement("li");
			li.textContent = `${category.name}: ${category.amount} Ksh`;

			// Create the delete button (Changed: Added delete button functionality)
			const deleteButton = document.createElement("button");
			deleteButton.textContent = "Delete";
			deleteButton.style.marginLeft = "10px"; // Add some spacing between the text and button
			deleteButton.addEventListener("click", function () {
				deleteCategory(index); // Call the delete function when clicked
			});

			li.appendChild(deleteButton); // Append the delete button to the list item
			budgetList.appendChild(li); // Append the list item to the list
		});
	}

	function deleteCategory(index) {
		budgetCategories.splice(index, 1); // Remove the item at the specified index
		localStorage.setItem("budgetCategories", JSON.stringify(budgetCategories)); // Update localStorage
		renderBudgetCategories(); // Re-render the list to reflect the changes
	}

	if (budgetForm) {
		// Handle form submission for adding a budget category
		budgetForm.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent the default form submission behavior

			// Get the input values from the form
			const categoryName = budgetForm.querySelector("#category").value.trim();
			const allocatedAmount = budgetForm.querySelector("#amount").value.trim();

			// Ensure both fields are filled
			if (categoryName && allocatedAmount) {
				// Create a budget category object
				const budgetCategory = {
					name: categoryName,
					amount: allocatedAmount,
				};

				// Add the new category to the budgetCategories array
				budgetCategories.push(budgetCategory);

				// Save the updated budgetCategories array to localStorage
				localStorage.setItem(
					"budgetCategories",
					JSON.stringify(budgetCategories)
				);

				// Re-render the budget categories list
				renderBudgetCategories();

				// Reset the form fields after submission
				budgetForm.reset();
			} else {
				console.error("Please fill in both fields."); // Debugging message
			}
		});

		// Initial render of budget categories on page load
		renderBudgetCategories();
	}

	// Expense Tracking Section
	const expenseForm = document.querySelector("#expense-form"); // Select the expense form by its ID
	const expenseList = document.getElementById("expense-list"); // Select the expense list container

	// Retrieve expenses from localStorage or initialize an empty array
	let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

	// Function to render expenses (new addition)
	function renderExpenses() {
		expenseList.innerHTML = ""; // Clear the current expense list

		// Loop through the expenses array and create list items
		expenses.forEach(function (expense, index) {
			const expenseItem = document.createElement("p");
			expenseItem.textContent = `${expense.category}: ${expense.amount} Ksh`;

			// Create the delete button (New Addition)
			const deleteButton = document.createElement("button");
			deleteButton.textContent = "Delete";
			deleteButton.style.marginLeft = "10px"; // Add some spacing between text and button

			// Add event listener to delete the expense item (New Addition)
			deleteButton.addEventListener("click", function () {
				deleteExpense(index); // Call the delete function when clicked
			});

			// Append the delete button to the expense item
			expenseItem.appendChild(deleteButton);

			// Add the new expense item to the expense list
			expenseList.appendChild(expenseItem);
		});
	}

	// Function to delete an expense by index (New Addition)
	function deleteExpense(index) {
		expenses.splice(index, 1); // Remove the expense from the array
		localStorage.setItem("expenses", JSON.stringify(expenses)); // Update localStorage
		renderExpenses(); // Re-render the list to reflect the changes
	}

	// Initial render of expenses on page load (New Addition)
	renderExpenses();

	if (expenseForm) {
		// Listen for form submission
		expenseForm.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent the form from submitting the traditional way

			// Get the input values
			const category = document.getElementById("expense-category").value.trim();
			const amount = document.getElementById("expense-amount").value.trim();

			// Check if both category and amount are provided
			if (category && amount) {
				// Create a new expense object
				const expense = {
					category: category,
					amount: amount,
				};

				// Add the new expense to the expenses array
				expenses.push(expense);

				// Save the updated expenses array to localStorage (New Addition)
				localStorage.setItem("expenses", JSON.stringify(expenses));

				// Re-render the expenses list
				renderExpenses();

				// Clear the input fields
				expenseForm.reset();
			} else {
				alert("Please fill out both fields.");
			}
		});
	}
	// Select the button and report display elements
	const generateReportButton = document.querySelector("button"); // Select the 'Generate Report' button
	const reportDisplay = document.getElementById("report-display"); // Select the div where the report will be displayed

	// Retrieve budget categories and expenses from localStorage
	// fixed the redeclaring of budgetCategories and expenses variables that had broken functionality of reports section
	budgetCategories = JSON.parse(localStorage.getItem("budgetCategories")) || [];
	expenses = JSON.parse(localStorage.getItem("expenses")) || [];

	// Function to generate and display the report
	function generateReport() {
		// Clear any previous report
		reportDisplay.innerHTML = "";

		// Check if there are any budget categories or expenses
		if (budgetCategories.length === 0 || expenses.length === 0) {
			reportDisplay.innerHTML =
				"<p>No data available to generate the report.</p>";
			return;
		}

		// Calculate total budget and total expenses
		const totalBudget = budgetCategories.reduce(
			(total, category) => total + parseFloat(category.amount),
			0
		);
		const totalExpenses = expenses.reduce(
			(total, expense) => total + parseFloat(expense.amount),
			0
		);

		// Display a summary
		const summary = document.createElement("p");
		summary.innerHTML = `<strong>Total Budget:</strong> ${totalBudget} Ksh<br>
                         <strong>Total Expenses:</strong> ${totalExpenses} Ksh<br>
                         <strong>Remaining Budget:</strong> ${
														totalBudget - totalExpenses
													} Ksh`;
		reportDisplay.appendChild(summary);

		// Create and display a chart (basic text-based chart as an example)
		const chart = document.createElement("div");
		const chartWidth = 200; // Width of the chart container
		const expensePercentage = (totalExpenses / totalBudget) * 100;
		const remainingPercentage = 100 - expensePercentage;

		chart.innerHTML = `
        <div style="background-color: lightcoral; width: ${expensePercentage}%; height: 20px;"></div>
        <div style="background-color: lightgreen; width: ${remainingPercentage}%; height: 20px;"></div>
    `;
		reportDisplay.appendChild(chart);

		// Additional breakdown by categories
		const breakdown = document.createElement("ul");
		budgetCategories.forEach((category) => {
			const categoryTotal = expenses
				.filter((expense) => expense.category === category.name)
				.reduce((total, expense) => total + parseFloat(expense.amount), 0);

			const listItem = document.createElement("li");
			listItem.innerHTML = `<strong>${category.name}:</strong> Budgeted ${category.amount} Ksh, Spent ${categoryTotal} Ksh`;
			breakdown.appendChild(listItem);
		});
		reportDisplay.appendChild(breakdown);
	}

	// Add event listener to the 'Generate Report' button
	generateReportButton.addEventListener("click", generateReport);

	// Handle user login
	loginForm.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting the traditional way

		// Get input values
		const username = document.querySelector("#login-username").value.trim();
		const password = document.querySelector("#login-password").value;

		// Check if user exists in localStorage
		const user = JSON.parse(localStorage.getItem(username));

		if (user && user.password === password) {
			alert("Login successful!");
			// Store the logged-in user in sessionStorage to track the active session
			sessionStorage.setItem("loggedInUser", username);

			// Redirect to another page (e.g., the budget tracking page)
			window.location.href = "budget.html";
		} else {
			alert("Invalid username or password.");
		}
	});
	// end of login functionality
});
