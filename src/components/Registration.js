import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prepare the new user object
		const newUser = { username, email, password };

		try {
			// Save to backend
			await axios.post("http://localhost:3001/register", newUser);

			// Retrieve existing users from localStorage or initialize an empty array
			const users = JSON.parse(localStorage.getItem("users")) || [];

			// Add the new user
			users.push(newUser);

			// Save the updated users list to localStorage
			localStorage.setItem("users", JSON.stringify(users));

			alert("Registration successful!");
			navigate("/login");
		} catch (error) {
			alert("Error registering user. Please try again.");
			console.error(error);
		}
	};

	return (
		<div>
			<header>
				<h1>Budget Tracker App</h1>
			</header>

			<div
				className="card"
				style={{ margin: "20px auto", textAlign: "center" }}
			>
				<h2>Registration</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						required
					/>

					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>

					<div>
						<input
							type="checkbox"
							id="showPassword"
							checked={showPassword}
							onChange={() => setShowPassword(!showPassword)}
						/>
						<label htmlFor="showPassword">Show Password</label>
					</div>

					<button type="submit">Register</button>
				</form>
			</div>

			<footer>
				<p>&copy; 2024 Budget Tracker App. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default Registration;
