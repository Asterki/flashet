import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBan } from "@fortawesome/free-solid-svg-icons";

import { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {}

const SignOut = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["auth/signout", "components/navbar"]);
    const { data: session, status: loggedInStatus } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/${router.locale}/auth/signin`);
        },
    });

    return (
        <div className="text-white bg-dark1">
            <Navbar t={t} session={session} />

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            {loggedInStatus == "loading" && (
                <main className="absolute w-full min-h-screen text-white bg-dark1">
                    <p className="text-2xl text-center text-primary font-bold transition-all duration-500 transform hover:scale-105">
                        Loading...
                    </p>
                </main>
            )}

            {loggedInStatus == "authenticated" && (
                <main className="min-h-screen flex flex-col justify-center items-center lg:p-12">
                    <section className="md:w-4/12 w-11/12">
                        <div className="my-4 text-gray-100 text-center">
                            <h1 className="text-3xl">{t("title")}</h1>
                            <p>{t("desc")}</p>
                        </div>

                        <button
                            className="bg-white/20 hover:bg-red1 w-full shadow-md rounded-md p-4 transition-all"
                            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            {t("buttons.signout")}
                        </button>

                        <br />
                        <br />

                        <button
                            className="bg-white/20 hover:bg-primary w-full shadow-md rounded-md p-4 transition-all"
                            onClick={() => router.push(`/${router.locale}/app`)}
                        >
                            <FontAwesomeIcon icon={faBan} className="mr-2" />
                            {t("buttons.cancel")}
                        </button>
                    </section>
                </main>
            )}
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["auth/signout", "components/navbar"])),
    },
});

export default SignOut;
