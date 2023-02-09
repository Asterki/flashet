import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

import { Provider } from "react-redux";
import { store } from "./store";

import "./styles/global.scss";
import "./styles/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<App />
	</Provider>
);
