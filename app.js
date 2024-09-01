document.addEventListener("DOMContentLoaded", function () {
	// Budget Tracking Section
	const budgetForm = document.querySelector("#budget-form"); // Ensure the form has an id of budget-form
	const budgetList = document.querySelector("#budget-list ul");

	let budgetCategories =
		JSON.parse(localStorage.getItem("budgetCategories")) || [];

	function renderBudgetCategories() {
		budgetList.innerHTML = ""; // Clear the existing list

		budgetCategories.forEach(function (category, index) {
			const li = document.createElement("li");
			li.textContent = `${category.name}: ${category.amount} Ksh`;

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
		localStorage.setItem("budgetCategories", JSON.stringify(budgetCategories));
		renderBudgetCategories();
	}

	if (budgetForm) {
		budgetForm.addEventListener("submit", function (event) {
			event.preventDefault();

			const categoryName = budgetForm.querySelector("#category").value.trim();
			const allocatedAmount = budgetForm.querySelector("#amount").value.trim();

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
				console.error("Please fill in both fields.");
			}
		});

		renderBudgetCategories(); // Initial render of budget categories on page load
	}

	// Expense Tracking Section
	const expenseForm = document.querySelector("#expense-form"); // Ensure the form has an id of expense-form
	const expenseList = document.querySelector("#expense-list ul");

	let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

	function renderExpenses() {
		expenseList.innerHTML = ""; // Clear the existing list

		expenses.forEach(function (expense) {
			const li = document.createElement("li");
			li.textContent = `${expense.category}: ${expense.amount} Ksh`;
			expenseList.appendChild(li);
		});
	}

	if (expenseForm) {
		expenseForm.addEventListener("submit", function (event) {
			event.preventDefault();

			const categoryInput = expenseForm
				.querySelector("#expense-category")
				.value.trim();
			const amountInput = expenseForm
				.querySelector("#expense-amount")
				.value.trim();

			if (categoryInput && amountInput) {
				const expense = {
					category: categoryInput,
					amount: amountInput,
				};

				expenses.push(expense);

				localStorage.setItem("expenses", JSON.stringify(expenses));

				renderExpenses();

				expenseForm.reset();
			} else {
				console.error("Please fill in both fields.");
			}
		});

		renderExpenses(); // Initial render of expenses on page load
	}
});
