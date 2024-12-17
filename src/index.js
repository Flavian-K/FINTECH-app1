import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Optional if you're using styles

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use createRoot from React 18+

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
