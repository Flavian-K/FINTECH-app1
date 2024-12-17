import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";
import Reports from "./components/Reports";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard"; // Import the Dashboard Component

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Check if user is logged in (sessionStorage)
		const loggedInUser = sessionStorage.getItem("loggedInUser");
		if (loggedInUser) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("loggedInUser");
		setIsLoggedIn(false);
	};

	return (
		<Router>
			<div>
				{/* Header */}
				<header>
					<h1>Budget Tracker App</h1>
					{/* Conditional Navigation Menu */}
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							{!isLoggedIn ? (
								<>
									<li>
										<Link to="/registration">Registration</Link>
									</li>
									<li>
										<Link to="/login">Login</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<Link to="/dashboard">Dashboard</Link>
									</li>
									<li>
										<Link to="/budget">Budget</Link>
									</li>
									<li>
										<Link to="/expenses">Expenses</Link>
									</li>
									<li>
										<Link to="/reports">Reports</Link>
									</li>
									<li>
										<button onClick={handleLogout}>Logout</button>
									</li>
								</>
							)}
						</ul>
					</nav>
				</header>

				{/* Routes */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route
						path="/dashboard"
						element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
					/>
					<Route
						path="/budget"
						element={isLoggedIn ? <Budget /> : <Navigate to="/login" />}
					/>
					<Route
						path="/expenses"
						element={isLoggedIn ? <Expenses /> : <Navigate to="/login" />}
					/>
					<Route
						path="/reports"
						element={isLoggedIn ? <Reports /> : <Navigate to="/login" />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
