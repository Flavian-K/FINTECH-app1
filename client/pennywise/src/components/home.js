// src/components/Home.js
import React from "react";

function Home() {
	return (
		<div>
			<header>
				<h1>Budget Tracker App</h1>
			</header>

			<nav>
				<ul>
					<li>
						<a href="/home">Home</a>
					</li>
					<li>
						<a href="/registration">Registration</a>
					</li>
					<li>
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/budget">Budget</a>
					</li>
					<li>
						<a href="/expenses">Expenses</a>
					</li>
					<li>
						<a href="/reports">Reports</a>
					</li>
					<li>
						<a href="/settings">Settings</a>
					</li>
				</ul>
			</nav>

			<button id="darkModeToggle">Toggle Dark Mode</button>

			<div className="container">
				<div className="card">
					<h2>Welcome to the Budget Tracker App</h2>
					<p>This is your personal tool to manage and track your expenses.</p>
				</div>
			</div>

			<footer>
				<p>&copy; 2024 Budget Tracker App. All rights reserved.</p>
				<p>
					Contact us at: <a href="#">support@budgettrackerapp.com</a>
				</p>
			</footer>
		</div>
	);
}

export default Home;
