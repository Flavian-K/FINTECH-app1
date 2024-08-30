document.addEventListener("DOMContentLoaded", function () {
	// Select the budget form and the <ul> inside the budget list div
	const budgetForm = document.querySelector("form"); // Select the form using the tag name
	const budgetList = document.querySelector("#budget-list ul"); // Select the <ul> inside #budget-list

	// Check if the form and list exist in the DOM
	if (!budgetForm || !budgetList) {
		console.error("Form or list not found in the DOM.");
		return; // Exit the script if the elements are not found
	}

	// Initialize an array to store budget categories
	let budgetCategories =
		JSON.parse(localStorage.getItem("budgetCategories")) || [];

	// Function to render the budget categories
	function renderBudgetCategories() {
		budgetList.innerHTML = ""; // Clear the existing list

		// Loop through the budgetCategories array and create list items
		budgetCategories.forEach(function (category) {
			const li = document.createElement("li");
			li.textContent = `${category.name}: ${category.amount} Ksh`;
			budgetList.appendChild(li);
		});
	}

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
});
