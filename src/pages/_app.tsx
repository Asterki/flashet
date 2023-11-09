import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps: { session, ...pageProps } }: any) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default appWithTranslation(App);
