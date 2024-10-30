import React, { useState } from "react";

function Registration() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Handle form submission for registration
	const handleRegistration = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Registration successful!");
				window.location.href = "/login"; // Redirect to login page after successful registration
			} else {
				alert(data.message || "Registration failed.");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			alert("An error occurred during registration.");
		}
	};

	return (
		<div>
			{/* Header */}
			<header>
				<h1>Budget Tracker App</h1>
			</header>

			{/* Dark Mode Toggle Button */}
			<button>Toggle Dark Mode</button>

			{/* Main Container */}
			<div className="container">
				{/* Registration Card */}
				<div className="card">
					<h2>Register</h2>
					<form onSubmit={handleRegistration}>
						<label htmlFor="register-username">Username:</label>
						<input
							type="text"
							id="register-username"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>

						<label htmlFor="register-email">Email:</label>
						<input
							type="email"
							id="register-email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<label htmlFor="register-password">Password:</label>
						<input
							type="password"
							id="register-password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<p>
							Password must be at least 8 characters long and include at least
							one uppercase letter, one lowercase letter, one number, and one
							special character.
						</p>

						<button type="submit">Register</button>
					</form>
				</div>
			</div>

			{/* Footer */}
			<footer>
				<p>&copy; 2024 Budget Tracker App. All rights reserved.</p>
				<p>
					Contact us at: <a href="#">support@budgettrackerapp.com</a>
				</p>
			</footer>
		</div>
	);
}

export default Registration;
