import React, { useState } from "react";

function Registration() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<h2>Registration</h2>
			<form>
				<div>
					<label>Password:</label>
					<input
						type={showPassword ? "text" : "password"} // Toggle input type
						value={password}
						onChange={handlePasswordChange}
						placeholder="Enter your password"
					/>
				</div>
				<div>
					<label>
						<input
							type="checkbox"
							checked={showPassword}
							onChange={togglePasswordVisibility}
						/>
						Show Password
					</label>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Registration;
