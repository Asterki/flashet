import express from "express";
import locale from "locale";

import { LangPack } from "../../../shared/types/lang";
import { PagesLanguageResponse } from "../../../shared/types/api";

const router = express.Router();

const languages = {
	en: require("../../../shared/locales/en").default as LangPack,
	es: require("../../../shared/locales/es").default as LangPack,
};

router.get("/language", (req, res) => {
	// Get the supported language files and the languages that the browser supports
	const supported = new locale.Locales((process.env.SUPPORTED_LANGUAGES as string).split(","));
	const locales = new locale.Locales(req.headers["accept-language"] || "en");

	// Get the language file using the best match, then send it to the client
	const language: string = locales.best(supported).language;
	return res.send({ lang: languages[language as "en" | "es"] } as PagesLanguageResponse);
});

module.exports = router;
