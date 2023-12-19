import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import Head from "next/head";

import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

const App = ({ Component, pageProps: { session, ...pageProps } }: any) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default appWithTranslation(App);
