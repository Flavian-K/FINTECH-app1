document.addEventListener("DOMContentLoaded", function () {
	// Get the current page's pathname
	const currentPage = window.location.pathname;

	// Login form section
	if (currentPage.includes("login.html")) {
		const loginForm = document.querySelector("#login-form");

		if (loginForm) {
			loginForm.addEventListener("submit", function (event) {
				event.preventDefault();

				const username = document.querySelector("#login-username").value.trim();
				const password = document.querySelector("#login-password").value;

				const user = JSON.parse(localStorage.getItem(username));

				if (user && user.password === password) {
					alert("Login successful!");
					sessionStorage.setItem("loggedInUser", username);

					// Redirect to the home page
					window.location.href = "index.html";
				} else {
					alert("Invalid username or password.");
				}
			});
		}
	}

	// Budget Tracking Section
	if (currentPage.includes("budget.html")) {
		const budgetForm = document.querySelector("#budget-form");
		const budgetList = document.querySelector("#budget-list ul");

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
					renderIncome();
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

				// Create the delete button
				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Delete";
				deleteButton.style.marginLeft = "10px";
				deleteButton.addEventListener("click", function () {
					deleteCategory(index);
				});

				li.appendChild(deleteButton);
				budgetList.appendChild(li);
			});
		}

		function deleteCategory(index) {
			budgetCategories.splice(index, 1);
			localStorage.setItem(
				"budgetCategories",
				JSON.stringify(budgetCategories)
			);
			renderBudgetCategories();
		}

		if (budgetForm) {
			budgetForm.addEventListener("submit", function (event) {
				event.preventDefault();

				const categoryName = budgetForm.querySelector("#category").value.trim();
				const allocatedAmount = budgetForm
					.querySelector("#amount")
					.value.trim();

				if (categoryName && allocatedAmount) {
					const budgetCategory = {
						name: categoryName,
						amount: allocatedAmount,
					};

					budgetCategories.push(budgetCategory);
					localStorage.setItem(
						"budgetCategories",
						JSON.stringify(budgetCategories)
					);
					renderBudgetCategories();
					budgetForm.reset();
				} else {
					alert("Please fill in both fields.");
				}
			});

			renderBudgetCategories();
		}
	}

	// Expense Tracking Section
	else if (currentPage.includes("expenses.html")) {
		const expenseForm = document.querySelector("#expenseForm");
		let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

		function renderExpenses() {
			const expenseList = document.getElementById("expenseList");
			expenseList.innerHTML = ""; // Clear the current expense list

			expenses.forEach(function (expense, index) {
				const expenseItem = document.createElement("p");
				expenseItem.textContent = `${expense.category}: ${expense.amount} Ksh`;

				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Delete";
				deleteButton.style.marginLeft = "10px";

				deleteButton.addEventListener("click", function () {
					deleteExpense(index);
				});

				expenseItem.appendChild(deleteButton);
				expenseList.appendChild(expenseItem);
			});
		}

		function deleteExpense(index) {
			expenses.splice(index, 1);
			localStorage.setItem("expenses", JSON.stringify(expenses));
			renderExpenses();
		}

		if (expenseForm) {
			expenseForm.addEventListener("submit", function (event) {
				event.preventDefault();

				const category = document
					.getElementById("expense-category")
					.value.trim();
				const amount = document.getElementById("expense-amount").value.trim();

				if (category && amount) {
					const expense = {
						category: category,
						amount: amount,
					};

					expenses.push(expense);
					localStorage.setItem("expenses", JSON.stringify(expenses));
					renderExpenses();
					expenseForm.reset();
				} else {
					alert("Please fill out both fields.");
				}
			});

			renderExpenses();
		}
	}

	// Password validation on the registration page
	else if (currentPage.includes("registration.html")) {
		const registerForm = document.querySelector("#register-form");
		const usernameInput = document.querySelector("#register-username");
		const passwordInput = document.querySelector("#register-password");

		if (registerForm) {
			registerForm.addEventListener("submit", function (event) {
				event.preventDefault();

				const username = usernameInput.value.trim();
				const password = passwordInput.value.trim();

				if (!validatePassword(password)) {
					return;
				}

				const user = {
					username: username,
					password: password,
				};

				localStorage.setItem(username, JSON.stringify(user));
				alert("Registration successful!");
				window.location.href = "login.html";
			});
		}
	}

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

	// Reports section
	if (currentPage.includes("reports.html")) {
		const generateReportButton = document.getElementById(
			"generateReportButton"
		);
		const reportDisplay = document.getElementById("report-display");
		const budgetCategories =
			JSON.parse(localStorage.getItem("budgetCategories")) || [];
		const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
		const income = JSON.parse(localStorage.getItem("income")) || 0;

		function generateChart(totalIncome, totalExpenses, remainingBudget) {
			const ctx = document.getElementById("myChart").getContext("2d");
			new Chart(ctx, {
				type: "bar",
				data: {
					labels: ["Income", "Expenses", "Remaining Budget"],
					datasets: [
						{
							label: "Amount (in Ksh)",
							data: [totalIncome, totalExpenses, remainingBudget],
							backgroundColor: ["lightblue", "lightcoral", "lightgreen"],
							borderColor: ["blue", "red", "green"],
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		function calculateTotals() {
			const totalExpenses = expenses.reduce(
				(total, expense) => total + parseFloat(expense.amount),
				0
			);
			const remainingBudget = income - totalExpenses;

			// Remove the placeholder styling
			reportDisplay.classList.remove("placeholder");

			reportDisplay.innerHTML = `
                <p><strong>Total Income:</strong> ${income} Ksh</p>
                <p><strong>Total Expenses:</strong> ${totalExpenses} Ksh</p>
                <p><strong>Remaining Budget:</strong> ${remainingBudget} Ksh</p>
            `;

			generateChart(income, totalExpenses, remainingBudget);
		}

		generateReportButton.addEventListener("click", calculateTotals);
	}
});
