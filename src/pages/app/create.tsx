import * as React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

import { DeckType } from "@/types/models";

const AppCreate = () => {
    const router = useRouter();
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
        name: "Something",
        id: uuidv4(),
        options: {
            random: true,
            timeLimit: false,
            timeLimitMS: 30 * 1000,
        },
        questions: [
            {
                type: "basic",
                front: "Green stuff in plants",
                back: "Chorlophile",
                id: uuidv4(),
            },
            {
                type: "basic",
                front: "Colour of the sun",
                back: "White",
                id: uuidv4(),
            },
        ],
    });
    const [currentEditingIndex, setCurrentEditingIndex] = React.useState(0); // Base 0

    // Options States
    const [randomQuestionOrderChecked, setRandomQuestionOrderChecked] =
        React.useState(false);
    const [questionTimerChecked, setQuestionTimerChecked] =
        React.useState(false);

    // Modal refs
    const frontTextAreaInput = React.useRef<HTMLTextAreaElement>(null);
    const backTextAreaInput = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (currentEditingIndex < deck.questions.length) {
            frontTextAreaInput.current!.value =
                deck.questions[currentEditingIndex].front;
            backTextAreaInput.current!.value =
                deck.questions[currentEditingIndex].back;
        } else {
            frontTextAreaInput.current!.value = "";
            backTextAreaInput.current!.value = "";
        }
    }, [currentEditingIndex, deck.questions]);

    const submitDeck = async () => {
        const response = await axios({
            method: "POST",
            url: "/api/decks/save",
            data: deck,
            withCredentials: true,
        });

        console.log(response);
    };

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">
            {/* Add Questions Modal */}
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
                                {currentEditingIndex + 1}-
                                {deck.questions.length}{" "}
                                {currentEditingIndex + 1 > deck.questions.length
                                    ? "(New)"
                                    : "(Editing)"}
                            </p>
                            <select
                                name=""
                                id=""
                                className="bg-white/10 p-2 rounded-md"
                            >
                                <option
                                    value=""
                                    className="bg-white/20 bg-blue-300"
                                >
                                    Basic (Question-Answer)
                                </option>
                                <option
                                    value=""
                                    className="bg-white/20 bg-blue-300"
                                >
                                    Multiple Choice (Question-One Answer)
                                </option>
                                <option
                                    value=""
                                    className="bg-white/20 bg-blue-300"
                                >
                                    jewioq
                                </option>
                            </select>
                        </div>
                        <button
                            className="px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                            onClick={() => {
                                setQuestionModalOpen(false);
                            }}
                        >
                            Close
                        </button>
                    </div>

                    <h1 className="text-xl">Front (Question)</h1>
                    <textarea
                        ref={frontTextAreaInput}
                        className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                        cols={50}
                        rows={4}
                    ></textarea>

                    <br />
                    <br />

                    <h1 className="text-2xl">Back (Answer)</h1>
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
                                    setDeck({
                                        ...deck,
                                        questions: [
                                            ...deck.questions,
                                            (deck.questions[
                                                currentEditingIndex
                                            ] = {
                                                type: "basic",
                                                back: "ejwoqi",
                                                front: "ejwoqi",
                                                id: deck.questions[
                                                    currentEditingIndex
                                                ].id,
                                            }),
                                        ],
                                    });

                                    setQuestionModalOpen(false);
                                    setCurrentEditingIndex(0);
                                }}
                                className="mr-2 px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                            >
                                Save
                            </button>
                        )}

                        <div className="flex items-center justify-end">
                            {currentEditingIndex < deck.questions.length && ( // If the selected item does exist
                                <button
                                    onClick={() => {
                                        let newQuestions =
                                            deck.questions.splice(
                                                currentEditingIndex - 1,
                                                1
                                            );
                                        setDeck({
                                            ...deck,
                                            questions: newQuestions,
                                        });

                                        setQuestionModalOpen(false);
                                        setCurrentEditingIndex(0);
                                    }}
                                    className="mr-2 px-10 bg-red1 shadow-md rounded-md p-2 transition-all"
                                >
                                    Delete
                                </button>
                            )}
                            {/* Only show when there are questions to check */}
                            {deck.questions.length && (
                                <button
                                    onClick={() => {
                                        if (currentEditingIndex - 1 < 0) return;
                                        setCurrentEditingIndex(
                                            currentEditingIndex - 1
                                        );
                                    }}
                                    className={`mr-2 px-10 ${
                                        currentEditingIndex == 0
                                            ? "brightness-75"
                                            : "brightness-100"
                                    } bg-gray-500 shadow-md rounded-md p-2 transition-all`}
                                >
                                    Previous
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (
                                        currentEditingIndex >
                                        deck.questions.length - 1
                                    ) {
                                        if (
                                            !frontTextAreaInput.current!
                                                .value ||
                                            !backTextAreaInput.current!.value
                                        ) {
                                            alert("Please fill out all fields");
                                        } else {
                                            setDeck({
                                                ...deck,
                                                questions: [
                                                    ...deck.questions,
                                                    {
                                                        id: (
                                                            deck.questions
                                                                .length + 1
                                                        ).toString(),
                                                        type: "basic",
                                                        front: frontTextAreaInput.current!
                                                            .value,
                                                        back: backTextAreaInput.current!
                                                            .value,
                                                    },
                                                ],
                                            });
                                        }
                                    } else {
                                        setCurrentEditingIndex(
                                            currentEditingIndex + 1
                                        );
                                    }
                                }}
                                className="px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                            >
                                {currentEditingIndex + 1 > deck.questions.length
                                    ? "Save"
                                    : "Next"}
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
                    <h1 className="text-2xl">
                        Are you sure you want to discard this deck?
                    </h1>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => {
                                setDiscardModalOpen(false);
                            }}
                            className="bg-primary my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                        >
                            Continue Editing
                        </button>
                        <button
                            onClick={() => {
                                router.push("/app");
                            }}
                            className="bg-red1 my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </motion.div>

            <Navbar session={session} />

            <main className="flex flex-col items-center justify-center mt-24">
                <h1 className="text-center text-3xl font-bold my-6">
                    Create a deck
                </h1>

                <div className="p-4 m-4 rounded-md shadow-md bg-white/10 md:w-7/12 w-11/12">
                    <h1 className="text-center text-2xl pb-2">
                        Give it a name
                    </h1>
                    <input
                        type="text"
                        className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                        placeholder="Write Here"
                    />
                </div>

                <div className="flex items-baseline justify-center md:w-7/12 w-11/12">
                    <div className="p-4 mr-2 rounded-md shadow-md bg-white/10 w-1/2">
                        <h1 className="text-center text-2xl pb-2">Questions</h1>
                        <button
                            onClick={() => {
                                setQuestionModalOpen(true);
                            }}
                            className="w-full bg-primary shadow-md rounded-md p-2 transition-all"
                            placeholder="Write Here"
                        >
                            Add Questions
                        </button>

                        <ul className="list-decimal my-2 list-inside">
                            {deck.questions.map((question) => {
                                return (
                                    <li key={question.id}>
                                        {question.type} - {question.front}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="p-4 ml-2 rounded-md shadow-md bg-white/10 w-1/2">
                        <h1 className="text-center text-2xl pb-2">Options</h1>
                        <input
                            type="checkbox"
                            onChange={(event) =>
                                setRandomQuestionOrderChecked(
                                    event.target.checked
                                )
                            }
                            id="random-order"
                        />{" "}
                        <label htmlFor="random-order" className="select-none">
                            Show Questions In Random Order
                        </label>{" "}
                        <br />
                        <input
                            type="checkbox"
                            onChange={(event) =>
                                setQuestionTimerChecked(event.target.checked)
                            }
                            id="timer"
                        />{" "}
                        <label htmlFor="timer" className="select-none">
                            Add Timer
                        </label>
                        <br />
                        {questionTimerChecked && (
                            <div className="mt-2">
                                <p>Time Per Question (In Seconds)</p>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 rounded-md p-[2px] outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 m-4 rounded-md shadow-md bg-white/10 md:w-7/12 w-11/12 flex items-center justify-center flex-col">
                    <button
                        onClick={() => {
                            submitDeck();
                        }}
                        className="bg-primary my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setDiscardModalOpen(true);
                        }}
                        className="bg-red1 my-2 shadow-md rounded-md p-2 transition-all w-1/2"
                    >
                        Discard
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AppCreate;
