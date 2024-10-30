import React, { useState } from "react";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Handle form submission for login
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Login successful!");
				// Redirect to the home page or other page after successful login
				window.location.href = "/home";
			} else {
				alert(data.message || "Login failed.");
			}
		} catch (error) {
			console.error("Error during login:", error);
			alert("An error occurred during login.");
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
				{/* Login Card */}
				<div className="card">
					<h2>Login</h2>
					<form onSubmit={handleLogin}>
						<label htmlFor="login-username">Username:</label>
						<input
							type="text"
							id="login-username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>

						<label htmlFor="login-password">Password:</label>
						<input
							type="password"
							id="login-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<button type="submit">Login</button>
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

export default Login;
