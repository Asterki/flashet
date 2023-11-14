import * as React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";

import type { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {}

const MainNewUser = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["main/new-user", "components/navbar"]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`${router.locale}/auth/signin`);
        },
    });

    return (
        <div className="text-white bg-dark1">
            <Navbar t={t} session={session} />

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <main className="min-h-screen flex flex-col justify-center items-center p-24">
                <section className="lg:w-5/12 w-full text-center">
                    <p className="text-[50px] font-black mb-12">Flashet</p>
                    <p className="text-gray-100/90 text-xl">
                        {t("text1")}
                        <br />
                        <br />
                        {t("text2")}

                        <br />
                        <br />
                        {t("text3")}
                    </p>

                    <div className="mt-10">
                        <button
                            onClick={() => {
                                router.push(`${router.locale}/app`);
                            }}
                            className="bg-white/10 hover:bg-white/20 transition-all p-4 rounded-lg shadow-md"
                        >
                            {t("button")}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["main/new-user", "components/navbar"])),
    },
});

export default MainNewUser;
