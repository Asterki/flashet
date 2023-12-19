import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
type Props = {};

const MainIndex = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["main/index", "components/navbar"]);
    const { data: session } = useSession({
        required: false,
    });

    return (
        <div className="text-white bg-dark1">
            <Navbar t={t} session={session} />

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <main className="flex flex-col justify-center items-center">
                <section className="min-h-[95vh] flex flex-col-reverse lg:flex-row items-center justify-between lg:w-9/12 w-full">
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">{t("title.title")}</p>
                        <p className="text-gray-100/90 text-xl">{t("title.desc")}</p>

                        <div className="mt-10">
                            {session && (
                                <button
                                    onClick={() => router.push(`/${router.locale}/app`)}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.dashboard")}
                                </button>
                            )}
                            {!session && (
                                <button
                                    onClick={() => router.push(`/${router.locale}/auth/signin`)}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.login")}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-5/12 lg:flex hidden justify-end items-end">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            width={400}
                            height={400}
                            src="/svg/logo-white.svg"
                            alt="Logo"
                        />
                    </div>
                </section>

                <section className="bg-dark2 min-h-[95vh] flex flex-col-reverse lg:flex-row items-center justify-between w-full">
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">{t("title.title")}</p>
                        <p className="text-gray-100/90 text-xl">{t("title.desc")}</p>

                        <div className="mt-10">
                            {session && (
                                <button
                                    onClick={() => router.push(`/${router.locale}/app`)}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.dashboard")}
                                </button>
                            )}
                            {!session && (
                                <button
                                    onClick={() => router.push(`/${router.locale}/auth/signin`)}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.login")}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-5/12 lg:flex hidden justify-end items-end">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            width={400}
                            height={400}
                            src="/svg/logo-white.svg"
                            alt="Logo"
                        />
                    </div>
                </section>

                <section className="bg-dark1 min-h-[95vh] flex flex-col-reverse lg:flex-row items-center justify-between w-full">
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">{t("title.title")}</p>
                        <p className="text-gray-100/90 text-xl">{t("title.desc")}</p>

                        <div className="mt-10">
                            {session && (
                                <button
                                    onClick={() => router.push(`/${router.locale}/app`)}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.dashboard")}
                                </button>
                            )}
                            {!session && (
                                <button
                                    onClick={() => router.push(`/${router.locale}/auth/signin`)}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.login")}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-5/12 lg:flex hidden justify-end items-end">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            width={400}
                            height={400}
                            src="/svg/logo-white.svg"
                            alt="Logo"
                        />
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["main/index", "components/navbar"])),
    },
});

export default MainIndex;
