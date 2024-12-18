import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
	const [newPassword, setNewPassword] = useState("");
	const [message, setMessage] = useState("");
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token"); // Fetch token from URL

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${process.env.REACT_APP_BACKEND_URI}/reset-password`, {
				token,
				newPassword,
			});
			setMessage("Password reset successfully! Please log in.");
		} catch (error) {
			setMessage("Error: " + error.response.data.message);
		}
	};

	return (
		<div>
			<h2>Reset Password</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="password"
					placeholder="Enter your new password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>
				<button type="submit">Reset Password</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default ResetPassword;
