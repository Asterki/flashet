import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

import { DeckType } from "@/types/models";
import { DecksSaveResponse, DecksSaveRequestBody } from "@/types/api/decks";
import { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {}

const AppCreate = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/create", "components/navbar"]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    // Modal States
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);
    const [discardModalOpen, setDiscardModalOpen] = React.useState(false);

    const [deck, setDeck] = React.useState<DeckType>({
        name: t("sections.name.defaultName"),
        id: uuidv4(),
        owner: "To Be Replaced",
        options: {
            random: true,
            timeLimit: false,
            timeLimitMS: 30 * 1000,
        },
        questionStatus: {
            new: 0,
            studying: 0,
            done: 0, 
        },
        questions: [
            {
                type: "basic",
                front: t("sections.questions.question.exampleQuestion"),
                back: t("sections.questions.question.exampleAnswer"),
                id: uuidv4(),
            },
        ],
    });

    // Question editing modal
    const [currentEditingIndex, setCurrentEditingIndex] = React.useState(0); // Base 0
    const frontTextAreaInput = React.useRef<HTMLTextAreaElement>(null);
    const backTextAreaInput = React.useRef<HTMLTextAreaElement>(null);
    React.useEffect(() => {
        if (currentEditingIndex < deck.questions.length) {
            frontTextAreaInput.current!.value = deck.questions[currentEditingIndex].front;
            backTextAreaInput.current!.value = deck.questions[currentEditingIndex].back;
        } else {
            frontTextAreaInput.current!.value = "";
            backTextAreaInput.current!.value = "";
        }
    }, [currentEditingIndex, deck.questions]);

    // Save the deck to the database
    const submitDeck = async () => {
        const response: AxiosResponse<DecksSaveResponse> = await axios({
            method: "POST",
            url: "/api/decks/save",
            data: deck as DecksSaveRequestBody,
            withCredentials: true,
        });

        if (response.data.message == "success") router.push("/app");
    };

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">
            {/* Questions Browser Modal */}
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
                animate={questionModalOpen ? "shown" : "hidden"}
                className="items-center justify-center absolute bg-black/20 w-full min-h-full backdrop-blur-lg"
            >
                <div className="bg-dark1 shadow-md p-4 rounded-md lg:w-1/2 w-11/12">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-between">
                            <p className="mr-2">
                                {currentEditingIndex + 1}-{deck.questions.length}{" "}
                                {currentEditingIndex + 1 > deck.questions.length
                                    ? t("modals.questionBrowser.new")
                                    : t("modals.questionBrowser.editing")}
                            </p>
                            <select name="" id="" className="bg-white/10 p-2 rounded-md">
                                <option value="" className="bg-white/20 bg-blue-300">
                                    {t("modals.questionBrowser.questionTypes.basic")}
                                </option>
                                <option value="" className="bg-white/20 bg-blue-300">
                                    {t("modals.questionBrowser.questionTypes.multiple")}
                                </option>
                                <option value="" className="bg-white/20 bg-blue-300">
                                    {t("modals.questionBrowser.questionTypes.missing")}
                                </option>
                            </select>
                        </div>
                        <button
                            className="px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                            onClick={() => {
                                setQuestionModalOpen(false);
                            }}
                        >
                            {t("modals.questionBrowser.buttons.close")}
                        </button>
                    </div>

                    <h1 className="text-xl">{t("modals.questionBrowser.front")}</h1>
                    <textarea
                        ref={frontTextAreaInput}
                        className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                        cols={50}
                        rows={4}
                    ></textarea>

                    <br />
                    <br />

                    <h1 className="text-2xl">{t("modals.questionBrowser.back")}</h1>
                    <textarea
                        ref={backTextAreaInput}
                        className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                        cols={10}
                        rows={4}
                    ></textarea>

                    <div className="mt-4 flex items-center justify-between">
                        {currentEditingIndex < deck.questions.length && ( // Change to when the card is being edited
                            <button
                                onClick={() => {
                                    let newQuestions = deck.questions;
                                    newQuestions[currentEditingIndex] = {
                                        type: "basic",
                                        front: frontTextAreaInput.current!.value,
                                        back: backTextAreaInput.current!.value,
                                        id: newQuestions[currentEditingIndex].id,
                                    };

                                    setDeck({
                                        ...deck,
                                        questions: newQuestions,
                                    });

                                    setQuestionModalOpen(false);
                                    setCurrentEditingIndex(0);
                                }}
                                className="mr-2 px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                            >
                                {t("modals.questionBrowser.buttons.saveChanges")}
                            </button>
                        )}

                        <div className="flex items-center justify-end">
                            {currentEditingIndex < deck.questions.length && ( // If the selected item does exist
                                <button
                                    onClick={() => {
                                        let newQuestions = deck.questions.splice(currentEditingIndex - 1, 1);
                                        setDeck({
                                            ...deck,
                                            questions: newQuestions,
                                        });

                                        setQuestionModalOpen(false);
                                        setCurrentEditingIndex(0);
                                    }}
                                    className="mr-2 px-10 bg-red1 shadow-md rounded-md p-2 transition-all"
                                >
                                    {t("modals.questionBrowser.buttons.delete")}
                                </button>
                            )}
                            {/* Only show when there are questions to check */}
                            {deck.questions.length && (
                                <button
                                    onClick={() => {
                                        if (currentEditingIndex - 1 < 0) return;
                                        setCurrentEditingIndex(currentEditingIndex - 1);
                                    }}
                                    className={`mr-2 px-10 ${
                                        currentEditingIndex == 0 ? "brightness-75" : "brightness-100"
                                    } bg-gray-500 shadow-md rounded-md p-2 transition-all`}
                                >
                                    {t("modals.questionBrowser.buttons.previous")}
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (currentEditingIndex > deck.questions.length - 1) {
                                        if (!frontTextAreaInput.current!.value || !backTextAreaInput.current!.value) {
                                            alert("Please fill out all fields");
                                        } else {
                                            setDeck({
                                                ...deck,
                                                questions: [
                                                    ...deck.questions,
                                                    {
                                                        id: (deck.questions.length + 1).toString(),
                                                        type: "basic",
                                                        front: frontTextAreaInput.current!.value,
                                                        back: backTextAreaInput.current!.value,
                                                    },
                                                ],
                                            });
                                        }
                                    } else {
                                        setCurrentEditingIndex(currentEditingIndex + 1);
                                    }
                                }}
                                className="px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                            >
                                {currentEditingIndex + 1 > deck.questions.length
                                    ? t("modals.questionBrowser.buttons.save")
                                    : t("modals.questionBrowser.buttons.next")}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

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
                                router.push("/app");
                            }}
                            className="bg-red1 my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                        >
                            {t("modals.discard.discard")}
                        </button>
                    </div>
                </div>
            </motion.div>

            <Navbar t={t} session={session} />

            <main className="flex flex-col items-center justify-center mt-24">
                <h1 className="text-center text-3xl font-bold my-6">{t("title")}</h1>

                <section className="p-4 m-4 rounded-md shadow-md bg-white/10 md:w-7/12 w-11/12">
                    <h1 className="text-center text-2xl pb-2">{t("sections.name.header")}</h1>
                    <input
                        defaultValue={deck.name}
                        onBlur={(event) => {
                            let val = event.target.value;
                            if (!val || val.length < 3 || val.length > 30) {
                                setDeck({
                                    ...deck,
                                    name: t("sections.name.defaultName"),
                                });
                                event.target.value = t("sections.name.defaultName");
                            } else {
                                setDeck({
                                    ...deck,
                                    name: val,
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
                                setCurrentEditingIndex(0);
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
                            defaultChecked={deck.options.random}
                            onChange={(event) =>
                                setDeck({
                                    ...deck,
                                    options: {
                                        ...deck.options,
                                        random: event.target.checked,
                                    },
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
                            defaultChecked={deck.options.timeLimit}
                            onChange={(event) =>
                                setDeck({
                                    ...deck,
                                    options: {
                                        ...deck.options,
                                        timeLimit: event.target.checked,
                                    },
                                })
                            }
                            id="timer"
                        />{" "}
                        <label htmlFor="timer" className="select-none">
                            {t("sections.options.timer")}
                        </label>
                        <br />
                        {deck.options.timeLimit && (
                            <div className="mt-2">
                                <p>{t("sections.options.timePer")}</p>
                                <input
                                    defaultValue={deck.options.timeLimitMS / 1000}
                                    onBlur={(event) => {
                                        if (Number.isNaN(parseInt(event.target.value))) {
                                            setDeck({
                                                ...deck,
                                                options: {
                                                    ...deck.options,
                                                    timeLimitMS: 30000,
                                                },
                                            });
                                            alert("Please enter a valid number");
                                            event.target.value = "30";
                                        } else {
                                            setDeck({
                                                ...deck,
                                                options: {
                                                    ...deck.options,
                                                    timeLimitMS: parseInt(event.target.value) * 1000,
                                                },
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
        ...(await serverSideTranslations(locale ?? "en", ["app/create", "components/navbar"])),
    },
});

export default AppCreate;
