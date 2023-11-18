import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";

import { DeckType, DeckWithQuestions } from "@/types/models";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "@/pages/api/decks/fetch";

interface Props {}

const StudyIndex = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/index", "components/navbar"]);
    const { data: session, status: loggedInStatus } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/${router.locale}/auth/signin`);
        },
    });

    const [deck, setDeck] = React.useState<DeckWithQuestions>();

    React.useEffect(() => {
        (async () => {
            if (loggedInStatus == "loading" || !router.query.deckID) return;

            const response: AxiosResponse<ResponseData> = await axios({
                method: "POST",
                url: "/api/decks/fetch",
                withCredentials: true,
                data: {
                    deckID: router.query.deckID,
                },
            });

            console.log(response.data.deck);

            if (response.data.message == "success" && response.data.deck) return setDeck(response.data.deck);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">
            <Navbar t={t} session={session} />

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <main className="flex flex-col items-center justify-center mt-24">
                
            </main>
        </div>
    );
};

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", ["app/index", "components/navbar"])),
        },
    };
};

export default StudyIndex;
