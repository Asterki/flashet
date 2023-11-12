import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import Head from "next/head";

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

            <main className="min-h-screen flex flex-col justify-center items-center p-4 md:p-24">
                <section className="flex flex-col-reverse lg:flex-row items-center justify-between lg:w-9/12 w-full">
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">{t("title.title")}</p>
                        <p className="text-gray-100/90 text-xl">{t("title.desc")}</p>

                        <div className="mt-10">
                            {session && (
                                <button
                                    onClick={() => router.push("/app")}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-5/12 p-4 rounded-lg shadow-md"
                                >
                                    {t("title.buttons.dashboard")}
                                </button>
                            )}
                            {!session && (
                                <button
                                    onClick={() => router.push("/auth/signin")}
                                    className="bg-white/10 hover:bg-white/20 transition-all w-5/12 p-4 rounded-lg shadow-md"
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
                            src="/logo-white.svg"
                            alt="Logo"
                        />
                    </div>
                </section>
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
