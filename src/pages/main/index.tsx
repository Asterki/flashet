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
import { faRightToBracket, faBook, faCode } from "@fortawesome/free-solid-svg-icons";

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
                <section className="min-h-[95vh] flex flex-col-reverse lg:flex-row items-center justify-center md:justify-between px-4 md:px-0 lg:w-9/12 w-full">
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
                                    <FontAwesomeIcon icon={faRightToBracket} className="px-2" />
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

                <section className="bg-dark2 min-h-[95vh] flex flex-col lg:flex-row items-center justify-center md:justify-between p-4 md:px-[12.5%] w-full">
                    <div className="lg:w-5/12 w-1/2 flex justify-end items-end">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            width={400}
                            height={400}
                            src="https://picsum.photos/600/900"
                            alt="Logo"
                        />
                    </div>
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">About Us</p>
                        <p className="text-gray-100/90 text-xl">
                            Flashet is not just a flashcard app; it&apos;s a comprehensive learning ecosystem designed to make learning
                            enjoyable and effective. We believe that everyone has the potential to unlock their brilliance, and Flashet is
                            here to help you unleash your full learning potential.
                        </p>

                        <div className="mt-10">
                            <button
                                onClick={() => router.push(`/${router.locale}/app`)}
                                className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                            >
                                <FontAwesomeIcon icon={faBook} className="px-2" />
                                About
                            </button>
                        </div>
                    </div>
                </section>

                <section className="min-h-[95vh] flex flex-col-reverse lg:flex-row items-center justify-center px-4 md:px-0 lg:w-9/12 w-full">
                    <div className="lg:w-5/12 w-full text-center lg:text-left">
                        <p className="text-[50px] font-black mb-12">Open Source</p>
                        <p className="text-gray-100/90 text-xl">
                            At Flashet, we are passionate about the transformative power of education and the spirit of collaboration.
                            That&apos;s why we have embraced an open-source philosophy to empower our community of learners and developers. Join
                            us on this exciting journey as we unlock the potential of collaborative learning.
                        </p>

                        <div className="mt-10">
                            <button
                                onClick={() => router.push(`https://github.com/Asterki/flashet`)}
                                className="bg-white/10 hover:bg-white/20 transition-all w-full md:w-7/12 p-4 rounded-lg shadow-md"
                            >
                                <FontAwesomeIcon icon={faCode} className="px-2" />
                                Check out our GitHub
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-5/12 lg:flex hidden justify-end items-end">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            width={400}
                            height={400}
                            src="https://picsum.photos/600/900"
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
