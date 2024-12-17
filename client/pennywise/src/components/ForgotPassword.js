import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		// For now, log the email (backend will handle actual reset logic)
		console.log(`Password reset link sent to: ${email}`);
		alert(`If an account with ${email} exists, a reset link will be sent.`);

		// Redirect user to Login page after submission
		navigate("/login");
	};

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h2>Forgot Password</h2>
			<p>Enter your email to reset your password.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{
						padding: "10px",
						width: "250px",
						margin: "10px",
						borderRadius: "5px",
						border: "1px solid #ccc",
					}}
					required
				/>
				<br />
				<button
					type="submit"
					style={{
						padding: "10px 20px",
						border: "none",
						borderRadius: "5px",
						backgroundColor: "#8b5cf6",
						color: "#fff",
						cursor: "pointer",
						marginTop: "10px",
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default ForgotPassword;
