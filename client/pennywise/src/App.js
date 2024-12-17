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
import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";
import Reports from "./components/Reports";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
	// Check localStorage for logged-in state
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!sessionStorage.getItem("loggedInUser")
	);

	// Logout function
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
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							{isLoggedIn ? (
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
							) : (
								<>
									<li>
										<Link to="/registration">Registration</Link>
									</li>
									<li>
										<Link to="/login">Login</Link>
									</li>
								</>
							)}
						</ul>
					</nav>
				</header>

				{/* Routes */}
				<Routes>
					<Route
						path="/"
						element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
					/>
					<Route
						path="/registration"
						element={
							isLoggedIn ? <Navigate to="/dashboard" /> : <Registration />
						}
					/>
					<Route
						path="/login"
						element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
					/>
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
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
