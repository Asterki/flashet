const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa")({
    dest: "public",
    cacheOnFrontEndNav: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV !== 'production'
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    reactStrictMode: true,
    i18n,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/a/**",
            },
        ],
    },

    async rewrites() {
        return [
            // Main
            {
                source: "/home",
                destination: "/main/home",
            },
            {
                source: "/",
                destination: "/main",
            },
            {
                source: "/error",
                destination: "/main/error",
            },
            {
                source: "/about",
                destination: "/main/about",
            },

            // Accounts
            {
                source: "/signin",
                destination: "/auth/signin",
            },
            {
                source: "/signout",
                destination: "/auth/signout",
            },
        ];
    },
});

module.exports = nextConfig;
