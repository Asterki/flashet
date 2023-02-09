import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios, { AxiosResponse } from "axios";

import Router from "./router";

import { store } from "./store";
import { useSelector } from "react-redux";
import { RootState } from "./store/index";
import { setLanguage } from "./store/pageSlice";

import type { PagesLanguageResponse } from "../shared/types/api"

const App: React.FC = () => {
	const appState = useSelector((state: RootState) => state);

	useEffect(() => {
		if ("language" in navigator && appState.page.lang.isTemplate) {
			(async () => {
				const response: AxiosResponse<PagesLanguageResponse> = await axios({
					url: `${import.meta.env.VITE_SERVER_URL}/api/pages/language`,
					method: "GET",
				});

				store.dispatch(setLanguage(response.data.lang));
			})();
		}
	}, []);

	return (
		<div>
			<Helmet>
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1" />
				<meta name="theme-color" content="#423aa9" />

				{/* Primary Meta Tags */}
				<title>{appState.page.lang.accounts.login.pageTitle}</title>
				<meta name="title" content="Flashet" />
				<meta name="description" content="App created to help you study with your exams." />
				<link rel="manifest" href="manifest.json" />

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://flashet.com/" />
				<meta property="og:title" content="Flashet" />
				<meta property="og:description" content="App created to help you study with your exams." />
				<meta property="og:image" content="/banner.png" />

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://flashet.com/" />
				<meta property="twitter:title" content="Flashet" />
				<meta property="twitter:description" content="App created to help you study with your exams." />
				<meta property="twitter:image" content="/banner.png" />
			</Helmet>

			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
};

export default App;
