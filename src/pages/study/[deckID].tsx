import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";

import { DeckWithQuestions, QuestionType } from "@/types/models";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "../api/decks/fetch";

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
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);

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

            {loggedInStatus == "loading" && (
                <main className="absolute w-full min-h-screen text-white bg-dark1">
                    <p className="text-2xl text-center text-primary font-bold transition-all duration-500 transform hover:scale-105">
                        Loading...
                    </p>
                </main>
            )}

            {loggedInStatus == "authenticated" && (
                <main className="flex flex-col items-center justify-center mt-24">
                    {deck && (
                        <div>
                            <p className="text-2xl text-center text-primary font-bold transition-all duration-500 transform hover:scale-105">
                                Currently Studying: {deck.name}
                            </p>

                            <div className="flex flex-col items-center justify-center mt-8">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl text-center text-primary font-bold">
                                        {deck.questions[currentQuestionIndex].front}
                                    </p>
                                    <p className="text-xl text-center text-primary font-bold">
                                        {deck.questions[currentQuestionIndex].back}
                                    </p>
                                </div>

                                <div className="flex flex-row items-center justify-center mt-8">
                                    <button
                                        onClick={() => {
                                            if (currentQuestionIndex == 0) return;
                                            setCurrentQuestionIndex(currentQuestionIndex - 1);
                                        }}
                                        className="p-4 bg-primary rounded-full shadow-xl text-white transition-all hover:scale-105"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Remove 1 from the current index, it can't be lower than 0 and no bigger than the deck's questions length
                                            if (currentQuestionIndex == deck.questions.length - 1) return;
                                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                                        }}
                                        className="p-4 bg-primary rounded-full shadow-xl text-white transition-all hover:scale-105"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            router.push(`/${router.locale}/app/edit/${router.query.deckID}`);
                        }}
                        className="fixed bottom-4 left-4 p-4 bg-primary rounded-full shadow-xl text-white transition-all hover:scale-105"
                    >
                        Edit Deck
                    </button>
                </main>
            )}
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
