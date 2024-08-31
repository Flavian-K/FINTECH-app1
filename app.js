document.addEventListener("DOMContentLoaded", function () {
	// Select the budget form and the <ul> inside the budget list div
	const budgetForm = document.querySelector("form"); // Select the form using the tag name
	const budgetList = document.querySelector("#budget-list ul"); // Select the <ul> inside #budget-list

	// Initialize an array to store budget categories
	let budgetCategories =
		JSON.parse(localStorage.getItem("budgetCategories")) || [];

	// Function to render the budget categories
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

	// Function to delete a category by index (Changed: Added delete functionality)
	function deleteCategory(index) {
		budgetCategories.splice(index, 1); // Remove the item at the specified index
		localStorage.setItem("budgetCategories", JSON.stringify(budgetCategories)); // Update localStorage
		renderBudgetCategories(); // Re-render the list to reflect the changes
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
