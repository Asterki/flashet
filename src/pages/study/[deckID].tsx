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
import { faBan, faCircleStop, faIceCream, faLemon, faNoteSticky, faPencil, faPepperHot } from "@fortawesome/free-solid-svg-icons";

import { DeckWithQuestions, QuestionType } from "@/types/models";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "../api/decks/fetch";
import { faCloudsmith } from "@fortawesome/free-brands-svg-icons";

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
    const [finishModalShowing, setFinishModalShowing] = React.useState<boolean>(false);

    const [studyingQuestions, setStudyingQuestions] = React.useState<QuestionType[]>([]);
    const [studiedQuestions, setStudiedQuestions] = React.useState<QuestionType[]>([]);

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

            if (response.data.message == "success" && response.data.deck) {
                setDeck(response.data.deck);
                return setStudyingQuestions(response.data.deck.questions);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    const continueButton = (type: "hard" | "medium" | "easy" | "again", questionID: string) => {
        if (!deck) return;

        const switchQuestion = () => {
            const question = studyingQuestions.find((question) => question.id == questionID);
            if (question) {
                setStudyingQuestions(studyingQuestions.filter((question) => question.id != questionID));
                setStudiedQuestions((prevQuestions) => [...prevQuestions, question]);
            }
        };

        switch (type) {
            case "hard":
                if (Math.random() <= 0.1) return switchQuestion();
                break;
            case "medium":
                if (Math.random() <= 0.3) return switchQuestion();
                break;
            case "easy":
                if (Math.random() <= 0.9) return switchQuestion();
                break;
        }

        // Set the index to a random index inside the studying questions array
        setShowingAnswer(false);
        setCurrentQuestionIndex(Math.floor(Math.random() * studyingQuestions.length));
    };

    React.useEffect(() => {
        if (studiedQuestions.length == deck?.questions.length) {
            setFinishModalShowing(true);
        }
    }, [studiedQuestions]);

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">
            {deck && <StudyNavbar deckName={deck.name} deckID={deck.id} />}

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        transitionEnd: {
                            display: "none",
                        },
                    },
                    shown: {
                        opacity: 1,
                        display: "flex",
                    },
                }}
                transition={{
                    duration: 0.2,
                }}
                initial="hidden"
                animate={finishModalShowing ? "shown" : "hidden"}
                className="items-center justify-center absolute bg-black/20 w-full min-h-full backdrop-blur-lg top-0 left-0 z-10"
            >
                <div className="bg-dark1 shadow-md p-4 rounded-md w-1/2 text-center">
                    <h1 className="text-2xl">You&apos;re done</h1>

                    <p className="mt-2">
                        You&apos;ve studied all the cards in this deck. You can either go back to the deck page or start over.
                    </p>

                    <div className="flex">
                        <button
                            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-1/2 mx-2"
                            onClick={() => {
                                router.push(`/${router.locale}/app`);
                            }}
                        >
                            <FontAwesomeIcon icon={faBan} className="mr-2" />
                            Go back
                        </button>
                        <button
                            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-1/2 mx-2"
                            onClick={() => {
                                router.push(router.asPath);
                            }}
                        >
                            <FontAwesomeIcon icon={faCloudsmith} className="mr-2" />
                            Start over
                        </button>
                    </div>
                </div>
            </motion.div>

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
                            <p className="text-center text-white/50 m-0">
                                <span className="mx-2 text-orange-300">Studying {studyingQuestions.length}</span>
                                <span className="mx-2 text-blue-400">Studied {studiedQuestions.length}</span>
                                <span className="mx-2">{deck.questions.length} Total questions</span>
                            </p>
                            <div className="flex flex-col items-center justify-center mt-4">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-xl text-center font-semibold">{deck.questions[currentQuestionIndex].front}</p>
                                    <motion.p
                                        variants={{
                                            shown: {
                                                height: "auto",
                                            },
                                            hidden: {
                                                height: 0,
                                                transition: {
                                                    duration: 0,
                                                },
                                            },
                                        }}
                                        initial="hidden"
                                        animate={showingAnswer ? "shown" : "hidden"}
                                        className="text-xl text-center overflow-y-hidden"
                                    >
                                        {deck.questions[currentQuestionIndex].back}
                                    </motion.p>
                                </div>

                                <div className="flex flex-row items-center justify-center mt-4 fixed bottom-4">
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
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-24 mx-2 w-auto"
                                        onClick={() => {
                                            setShowingAnswer(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faNoteSticky} className="mr-2" />
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
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-32 mx-2"
                                        onClick={() => {
                                            continueButton("again", deck.questions[currentQuestionIndex].id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCircleStop} className="mr-2" />
                                        Again
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
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-32 mx-2"
                                        onClick={() => {
                                            continueButton("hard", deck.questions[currentQuestionIndex].id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPepperHot} className="mr-2" />
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
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-32 mx-2"
                                        onClick={() => {
                                            continueButton("medium", deck.questions[currentQuestionIndex].id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faLemon} className="mr-2" />
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
                                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all w-32 mx-2"
                                        onClick={() => {
                                            continueButton("easy", deck.questions[currentQuestionIndex].id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faIceCream} className="mr-2" />
                                        Easy
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    )}
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
