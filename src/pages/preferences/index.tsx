import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "next/head";

import { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {}

const PreferencesPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/index", "components/navbar"]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`${router.locale}/auth/signin`);
        },
    });

    return (
        <div className="text-white bg-gradient-to-tr from-blue-950 to-cyan-800">
            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <main className="min-h-screen flex flex-col justify-center items-center p-4 md:p-24"></main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", ["app/index", "components/navbar"])),
        },
    };
};

export default PreferencesPage;
