import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Router from "./router";
import { store } from "./store";

import "./styles/global.css";
import "./styles/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<Provider store={store}>
			<Helmet>
				<title>Flashet</title>
			</Helmet>

			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</Provider>
	</>
);
