import React from "react";

function Home() {
	return (
		<div>
			<header>
				<h1>Budget Tracker App</h1>
			</header>
			<div
				className="card"
				style={{ margin: "20px auto", textAlign: "center" }}
			>
				<h2>Welcome to the Budget Tracker App</h2>
				<p>This is your personal tool to manage and track your expenses.</p>
			</div>
		</div>
	);
}

export default Home;
