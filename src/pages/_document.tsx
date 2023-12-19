import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Add Font Awesome here */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    integrity="sha512-..."
                    crossOrigin="anonymous"
                />

                <meta name="application-name" content="Flashet" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Flashet" />
                <meta name="description" content="Open-Source flashcard app for studying" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/logos/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#27363B" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href="/logos/ios/256.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/logos/ios/152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/logos/ios/180.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/logos/ios/167.png" />

                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/logos/ios/icons/safari-pinned-tab.svg" color="#9AB999" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://flashet.com" />
                <meta name="twitter:title" content="Flashet" />
                <meta name="twitter:description" content="Open-Source flashcard app for studying" />
                <meta
                    name="twitter:image"
                    content="https://flashet.com/logos/android/android-launchericon-192-192.png"
                />
                <meta name="twitter:creator" content="@AsterkiDev" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Flashet" />
                <meta property="og:description" content="Open-Source flashcard app for studying" />
                <meta property="og:site_name" content="Flashet" />
                <meta property="og:url" content="https://flashet.com" />
                <meta property="og:image" content="https://flashet.com/logos/ios/512.png" />
            </Head>
            <body>
                <Main />
                <NextScript  />
            </body>
        </Html>
    );
}
