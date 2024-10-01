document.addEventListener("DOMContentLoaded", function () {
	// Get the current page's pathname
	const currentPage = window.location.pathname;

	// Login form section (Fix: Define loginForm before using it)
	if (currentPage.includes("login.html")) {
		const loginForm = document.querySelector("#login-form"); // Select the login form by its ID

		if (loginForm) {
			// Check if loginForm exists
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
				incomeDisplay.textContent = income; // Fix: Ensure income display element exists before using it
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

				// Create the delete button
				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Delete";
				deleteButton.style.marginLeft = "10px";
				deleteButton.addEventListener("click", function () {
					deleteCategory(index);
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
			);
			renderBudgetCategories(); // Re-render the list to reflect the changes
		}

		if (budgetForm) {
			// Handle form submission for adding a budget category
			budgetForm.addEventListener("submit", function (event) {
				event.preventDefault();

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
					console.error("Please fill in both fields.");
				}
			});

			// Initial render of budget categories on page load
			renderBudgetCategories();
		}
	}

	// Password validation only on the registration page
	else if (currentPage.includes("registration.html")) {
		const registerForm = document.querySelector("#register-form");
		const usernameInput = document.querySelector("#register-username");
		const passwordInput = document.querySelector("#register-password");

		if (registerForm) {
			// Listen for form submission
			registerForm.addEventListener("submit", function (event) {
				event.preventDefault();

				// Get the input values
				const username = usernameInput.value.trim();
				const password = passwordInput.value.trim();

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

				// Redirect to the login page
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
});
