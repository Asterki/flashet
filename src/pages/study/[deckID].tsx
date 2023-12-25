import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import StudyNavbar from "@/components/studyNavbar";
import Head from "next/head";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

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

    const [showingAnswer, setShowingAnswer] = React.useState<boolean>(false);

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
            {deck && <StudyNavbar deckName={deck.name} deckID={deck.id} />}

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            {loggedInStatus == "loading" && (
                <main className="absolute w-full min-h-screen text-white bg-dark1">
                    <p className="mt-[-2rem] text-2xl text-center text-white font-semibold transition-all duration-500 transform hover:scale-105">
                        Loading...
                    </p>
                </main>
            )}

            {loggedInStatus == "authenticated" && (
                <main className="flex flex-col items-center justify-center mt-8">
                    {deck && (
                        <div>
                            <div className="flex flex-col items-center justify-center mt-4">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-xl text-center">{deck.questions[currentQuestionIndex].front}</p>
                                    <motion.p
                                        variants={{
                                            shown: {
                                                height: "auto",
                                                transition: {
                                                    duration: 0,
                                                },
                                            },
                                            hidden: {
                                                height: 0,
                                            },
                                        }}
                                        initial="hidden"
                                        animate={showingAnswer ? "shown" : "hidden"}
                                        className="text-xl text-center overflow-y-hidden"
                                    >
                                        {deck.questions[currentQuestionIndex].back}
                                    </motion.p>
                                </div>

                                <div className="flex flex-row items-center justify-center mt-4">
                                    <motion.button
                                        variants={{
                                            shown: {
                                                display: "block",
                                            },
                                            hidden: {
                                                display: "none",
                                            },
                                        }}
                                        initial="hidden"
                                        animate={!showingAnswer ? "shown" : "hidden"}
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-24 mx-2"
                                        onClick={() => {
                                            setShowingAnswer(true);
                                        }}
                                    >
                                        Show answer
                                    </motion.button>

                                    <motion.button
                                        variants={{
                                            shown: {
                                                display: "block",
                                            },
                                            hidden: {
                                                display: "none",
                                            },
                                        }}
                                        initial="hidden"
                                        animate={showingAnswer ? "shown" : "hidden"}
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-24 mx-2"
                                        onClick={() => {
                                            setShowingAnswer(false);
                                        }}
                                    >
                                        Hard
                                    </motion.button>
                                    <motion.button
                                        variants={{
                                            shown: {
                                                display: "block",
                                            },
                                            hidden: {
                                                display: "none",
                                            },
                                        }}
                                        initial="hidden"
                                        animate={showingAnswer ? "shown" : "hidden"}
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-24 mx-2"
                                        onClick={() => {
                                            setShowingAnswer(false);
                                        }}
                                    >
                                        Medium
                                    </motion.button>
                                    <motion.button
                                        variants={{
                                            shown: {
                                                display: "block",
                                            },
                                            hidden: {
                                                display: "none",
                                            },
                                        }}
                                        initial="hidden"
                                        animate={showingAnswer ? "shown" : "hidden"}
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-24 mx-2"
                                        onClick={() => {
                                            setShowingAnswer(false);
                                        }}
                                    >
                                        Easy
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    )}

                    <FontAwesomeIcon
                        onClick={() => {
                            router.push(`/${router.locale}/app/edit/${router.query.deckID}`);
                        }}
                        className="text-2xl fixed bottom-4 left-4 p-4 cursor-pointer rounded-full hover:bg-white/20 transition-all"
                        icon={faPencil}
                    />
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
