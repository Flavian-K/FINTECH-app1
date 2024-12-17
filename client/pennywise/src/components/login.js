import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/login", {
				username,
				password,
			});

			// Store login status and token in sessionStorage
			sessionStorage.setItem("loggedInUser", username);
			alert("Login successful!");
			navigate("/dashboard");
		} catch (error) {
			alert("Invalid username or password. Please try again.");
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
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>

					<button type="submit">Login</button>
				</form>

				{/* Forgot Password Button */}
				<div style={{ marginTop: "10px" }}>
					<Link to="/forgot-password">
						<button
							style={{
								background: "none",
								color: "blue",
								border: "none",
								cursor: "pointer",
							}}
						>
							Forgot Password?
						</button>
					</Link>
				</div>
			</div>

			<footer>
				<p>&copy; 2024 Budget Tracker App. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default Login;
