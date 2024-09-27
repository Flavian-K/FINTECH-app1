document.addEventListener("DOMContentLoaded", function () {
	// Get the current page's pathname
	const currentPage = window.location.pathname;

	// Budget Tracking Section
	if (currentPage.includes("budget.html")) {
		const budgetForm = document.querySelector("#budget-form"); // Select the budget form by its ID
		const budgetList = document.querySelector("#budget-list ul"); // Select the budget list

		// Initialize an array to store budget categories
		let budgetCategories =
			JSON.parse(localStorage.getItem("budgetCategories")) || [];

		// Initialize income
		let income = JSON.parse(localStorage.getItem("income")) || 0;

		function renderIncome() {
			const incomeDisplay = document.getElementById("income-value");
			if (incomeDisplay) {
				incomeDisplay.textContent = income;
			}
		}

		// Handle income form submission
		const incomeForm = document.querySelector("#income-form");
		if (incomeForm) {
			incomeForm.addEventListener("submit", function (event) {
				event.preventDefault();
				const incomeAmount = document
					.getElementById("income-amount")
					.value.trim();
				if (incomeAmount) {
					income = parseFloat(incomeAmount);
					localStorage.setItem("income", JSON.stringify(income));
					renderIncome(); // Update the displayed income
				} else {
					alert("Please enter an income amount.");
				}
			});
		}

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
			localStorage.setItem(
				"budgetCategories",
				JSON.stringify(budgetCategories)
			); // Update localStorage
			renderBudgetCategories(); // Re-render the list to reflect the changes
		}

		if (budgetForm) {
			// Handle form submission for adding a budget category
			budgetForm.addEventListener("submit", function (event) {
				event.preventDefault(); // Prevent the default form submission behavior

				// Get the input values from the form
				const categoryName = budgetForm.querySelector("#category").value.trim();
				const allocatedAmount = budgetForm
					.querySelector("#amount")
					.value.trim();

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
	}

	// Expense Tracking Section
	else if (currentPage.includes("expenses.html")) {
		// Retrieve expenses from localStorage or initialize an empty array
		let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

		// Function to render expenses (new addition)
		const expenseForm = document.querySelector("#expenseForm"); // Select the expense form by its ID

		function renderExpenses() {
			const expenseList = document.getElementById("expenseList"); // Select the expense list container
			console.log(expenseList);
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
				const category = document
					.getElementById("expense-category")
					.value.trim();
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
	}
	// Select the button and report display elements
	else if (currentPage.includes("reports.html")) {
		const generateReportButton = document.querySelector("button"); // Select the 'Generate Report' button
		const reportDisplay = document.getElementById("report-display"); // Select the div where the report will be displayed

		// Retrieve budget categories and expenses from localStorage
		let budgetCategories =
			JSON.parse(localStorage.getItem("budgetCategories")) || [];
		let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

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
		if (generateReportButton) {
			generateReportButton.addEventListener("click", generateReport);
		}
	}
	// Reports ends here

	// Handle user login
	else if (currentPage.includes("login.html")) {
		const loginForm = document.querySelector("#login-form"); // Select the login form by its ID
		if (loginForm) {
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
		}
	}
	// end of login functionality

	// Handle user registration
	else if (currentPage.includes("registration.html")) {
		const registerForm = document.querySelector("#register-form");
		const usernameInput = document.querySelector("#register-username");
		const passwordInput = document.querySelector("#register-password");

		if (registerForm) {
			registerForm.addEventListener("submit", function (event) {
				event.preventDefault(); // Prevent the form from submitting the traditional way

				// Get the input values
				const username = usernameInput.value.trim();
				const password = passwordInput.value.trim();

				// Check if both fields are filled
				if (username && password) {
					// Save the user information in localStorage
					const user = {
						username: username,
						password: password, // Ideally, this would be hashed in a real-world application
					};

					localStorage.setItem(username, JSON.stringify(user));

					// Notify the user of successful registration
					alert("Registration successful!");

					// Redirect to the login page (if applicable)
					window.location.href = "login.html"; // Redirect to login page after successful registration
				} else {
					alert("Please fill out both fields.");
				}
			});
		}
	}
	// end of registration functionality

	// Password validation function
	function validatePassword(password) {
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumber = /\d/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (password.length < minLength) {
			alert(`Password must be at least ${minLength} characters long.`);
			return false;
		}
		if (!hasUpperCase) {
			alert("Password must contain at least one uppercase letter.");
			return false;
		}
		if (!hasLowerCase) {
			alert("Password must contain at least one lowercase letter.");
			return false;
		}
		if (!hasNumber) {
			alert("Password must contain at least one number.");
			return false;
		}
		if (!hasSpecialChar) {
			alert("Password must contain at least one special character.");
			return false;
		}
		return true;
	}

	// Listen for form submission
	registerForm.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting the traditional way

		// Get the input values
		const username = usernameInput.value.trim();
		const password = passwordInput.value.trim();

		// Check if both fields are filled
		if (username && password) {
			// Validate the password before proceeding
			if (!validatePassword(password)) {
				return; // Stop the registration if the password is not valid
			}

			// Save the user information in localStorage
			const user = {
				username: username,
				password: password, // Ideally, this would be hashed in a real-world application
			};

			localStorage.setItem("registeredUser", JSON.stringify(user));

			// Notify the user of successful registration
			alert("Registration successful!");

			// Redirect to the login page (if applicable)
			window.location.href = "login.html"; // Redirect to login page after successful registration
		} else {
			alert("Please fill out both fields.");
		}
	});

	// end of password validation functionality
});
