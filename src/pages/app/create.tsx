import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import QuestionBrowser from "@/components/questionBrowser";
import Head from "next/head";

import { DecksSaveResponse, DecksSaveRequestBody } from "@/types/api/decks";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DeckWithQuestions } from "@/types/models";

interface Props {}

const AppCreate = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/create", "components/navbar", "components/questionBrowser"]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/${router.locale}/auth/signin`);
        },
    });

    // Modal States
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);
    const [discardModalOpen, setDiscardModalOpen] = React.useState(false);

    const [deck, setDeck] = React.useState<DeckWithQuestions>({
        name: t("sections.name.defaultName"),
        id: "", // Will be set in the backend

        // For options
        options_random: false,
        options_time_limit: false,
        options_time_limit_MS: 30000,

        // For question statuses
        questions_new: 1,
        questions_done: 0,
        questions_studying: 0,

        owner_id: "", // Will be set in the backend

        questions: [
            {
                deck_id: "", // Will be set in the backend
                type: "basic",
                front: t("sections.questions.question.exampleQuestion"),
                back: t("sections.questions.question.exampleAnswer"),
                id: uuidv4(),
            },
        ],
    });

    // Save the deck to the database
    const submitDeck = async () => {
        const response: AxiosResponse<DecksSaveResponse> = await axios({
            method: "POST",
            url: "/api/decks/save",
            data: deck as DecksSaveRequestBody,
            withCredentials: true,
        });

        if (response.data.message == "success") router.push(`/${router.locale}/app`);
    };

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">
            {/* Questions Browser Modal */}
            {deck && (
                <QuestionBrowser
                    deck={deck}
                    open={questionModalOpen}
                    setOpen={setQuestionModalOpen}
                    setDeck={setDeck}
                    t={t}
                />
            )}

            {/* Discard Modal */}
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
                animate={discardModalOpen ? "shown" : "hidden"}
                className="items-center justify-center absolute bg-black/20 w-full min-h-full backdrop-blur-lg"
            >
                <div className="bg-dark1 shadow-md p-4 rounded-md w-1/2 text-center">
                    <h1 className="text-2xl">{t("modals.discard.title")}</h1>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => {
                                setDiscardModalOpen(false);
                            }}
                            className="bg-primary my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                        >
                            {t("modals.discard.continue")}
                        </button>
                        <button
                            onClick={() => {
                                router.push(`/${router.locale}/app`);
                            }}
                            className="bg-red1 my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                        >
                            {t("modals.discard.discard")}
                        </button>
                    </div>
                </div>
            </motion.div>

            <Navbar t={t} session={session} />

            <Head>
                <title>{t("pageTitle")}</title>
            </Head>

            <main className="flex flex-col items-center justify-center mt-24">
                <h1 className="text-center text-3xl font-bold my-6">{t("title")}</h1>

                <section className="p-4 m-4 rounded-md shadow-md bg-white/10 md:w-7/12 w-11/12">
                    <h1 className="text-center text-2xl pb-2">{t("sections.name.header")}</h1>
                    <input
                        defaultValue={deck.name}
                        onBlur={(event) => {
                            let val = event.target.value;
                            if (!val || val.length < 1 || val.length > 30) {
                                setDeck({
                                    ...deck,
                                    name: t("sections.name.defaultName") as string,
                                });
                                event.target.value = t("sections.name.defaultName");
                            } else {
                                setDeck({
                                    ...deck,
                                    name: val as string,
                                });
                            }
                        }}
                        type="text"
                        className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                        placeholder={t("sections.name.placeholder")}
                    />
                </section>

                <section className="flex items-baseline justify-center md:w-7/12 w-11/12">
                    <div className="p-4 mr-2 rounded-md shadow-md bg-white/10 w-1/2">
                        <h1 className="text-center text-2xl pb-2">{t("sections.questions.header")}</h1>
                        <button
                            onClick={() => {
                                setQuestionModalOpen(true);
                            }}
                            className="w-full bg-primary shadow-md rounded-md p-2 transition-all"
                            placeholder="Write Here"
                        >
                            {t("sections.questions.button")}
                        </button>

                        <ul className="list-decimal my-2 list-inside">
                            {deck.questions.map((question) => {
                                return (
                                    <li key={question.id}>
                                        {t(`sections.questions.questionTypes.${question.type}`)} - {question.front}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="p-4 ml-2 rounded-md shadow-md bg-white/10 w-1/2">
                        <h1 className="text-center text-2xl pb-2">{t("sections.options.header")}</h1>
                        <input
                            type="checkbox"
                            defaultChecked={deck.options_random}
                            onChange={(event) =>
                                setDeck({
                                    ...deck,
                                    options_random: event.target.checked,
                                })
                            }
                            id="random-order"
                        />{" "}
                        <label htmlFor="random-order" className="select-none">
                            {t("sections.options.random")}
                        </label>{" "}
                        <br />
                        <input
                            type="checkbox"
                            defaultChecked={deck.options_time_limit}
                            onChange={(event) =>
                                setDeck({
                                    ...deck,
                                    options_time_limit: event.target.checked,
                                })
                            }
                            id="timer"
                        />{" "}
                        <label htmlFor="timer" className="select-none">
                            {t("sections.options.timer")}
                        </label>
                        <br />
                        {deck.options_time_limit && deck.options_time_limit_MS && (
                            <div className="mt-2">
                                <p>{t("sections.options.timePer")}</p>
                                <input
                                    defaultValue={deck.options_time_limit_MS / 1000}
                                    onBlur={(event) => {
                                        if (Number.isNaN(parseInt(event.target.value))) {
                                            setDeck({
                                                ...deck,
                                                options_time_limit_MS: 30000,
                                            });
                                            alert("Please enter a valid number");
                                            event.target.value = "30";
                                        } else {
                                            setDeck({
                                                ...deck,
                                                options_time_limit_MS: parseInt(event.target.value) * 1000,
                                            });
                                        }
                                    }}
                                    type="number"
                                    className="w-full bg-white/10 rounded-md p-[2px] outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                                />
                            </div>
                        )}
                    </div>
                </section>

                <section className="p-4 m-4 rounded-md shadow-md bg-white/10 md:w-7/12 w-11/12 flex items-center justify-center flex-col">
                    <button
                        onClick={() => {
                            submitDeck();
                        }}
                        className="bg-primary my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                    >
                        {t("buttons.save")}
                    </button>
                    <button
                        onClick={() => {
                            setDiscardModalOpen(true);
                        }}
                        className="bg-red1 my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                    >
                        {t("buttons.discard")}
                    </button>
                </section>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["app/create", "components/navbar", "components/questionBrowser"])),
    },
});

export default AppCreate;
