import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";
import QuestionBrowser from "@/components/questionBrowser";

import { DeckWithQuestions } from "@/types/models";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "@/pages/api/decks/fetch";

interface Props {}

const StudyIndex = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/index", "components/navbar", "components/questionBrowser"]);
    const { data: session, status: loggedInStatus } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/${router.locale}/auth/signin`);
        },
    });

    const [deck, setDeck] = React.useState<DeckWithQuestions>();

    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);

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
            {deck && (
                <QuestionBrowser
                    deck={deck}
                    open={questionModalOpen}
                    setOpen={setQuestionModalOpen}
                    setDeck={setDeck as React.Dispatch<React.SetStateAction<DeckWithQuestions>>}
                    t={t}
                />
            )}

            <Navbar t={t} session={session} />

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <main className="flex flex-col items-center justify-center mt-24 w-full h-full">
                <div className="p-4 m-4 rounded-md shadow-md bg-white/10 md:w-7/12 w-11/12">
                    <button
                        className="px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                        onClick={() => {
                            setQuestionModalOpen(true);
                        }}
                    >
                        Open Question Modal
                    </button>
                </div>
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
            ...(await serverSideTranslations(context.locale ?? "en", ["app/index", "components/navbar", "components/questionBrowser"])),
        },
    };
};

export default StudyIndex;
