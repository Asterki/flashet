// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "de", "fr", "es", "ru"],
    },
    /** To avoid issues when deploying to some paas (vercel...) */
    localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
    
    reloadOnPrerender: process.env.NODE_ENV === "development",
};
