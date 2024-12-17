import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<div style={{ textAlign: "center" }}>
			<h2>Welcome to Your Dashboard</h2>
			<p>Select an option below to manage your budget:</p>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<li>
					<Link to="/budget">Budget</Link>
				</li>
				<li>
					<Link to="/expenses">Expenses</Link>
				</li>
				<li>
					<Link to="/reports">Reports</Link>
				</li>
			</ul>
		</div>
	);
}

export default Dashboard;
