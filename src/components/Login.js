import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // To send requests to the backend

function Login({ updateLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Send user credentials to the backend server for verification
			const response = await axios.post("http://localhost:3001/login", {
				username,
				password,
			});

			console.log(response);

			const { token, message } = response.data;

			if (token) {
				// Store the token in sessionStorage for authentication
				sessionStorage.setItem("token", token);
				updateLogin();
				alert("Login successful!");
				navigate("/dashboard");
			} else {
				alert("Login failed. Please try again.");
			}
		} catch (error) {
			alert("Invalid username or password. Please try again.");
			console.error("Error:", error.response?.data || error.message);
		}
	};

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
				<div style={{ marginBottom: "10px" }}>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						required
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Password:</label>
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<input
						type="checkbox"
						checked={showPassword}
						onChange={() => setShowPassword(!showPassword)}
					/>
					<label style={{ marginLeft: "5px" }}>Show Password</label>
				</div>
				<button type="submit" style={{ marginTop: "10px" }}>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
