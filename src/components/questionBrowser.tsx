import * as React from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { DeckWithQuestions } from "@/types/models";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    t: TFunction;
    deck: DeckWithQuestions;
    setDeck: React.Dispatch<React.SetStateAction<DeckWithQuestions>>;
}

const QuestionBrowserComponent: NextPage<Props> = (props) => {
    // Question editing modal
    const [currentEditingIndex, setCurrentEditingIndex] = React.useState(0); // Base 0

    const frontTextAreaInput = React.useRef<HTMLTextAreaElement>(null);
    const backTextAreaInput = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (currentEditingIndex < props.deck.questions.length) {
            frontTextAreaInput.current!.value = props.deck.questions[currentEditingIndex].front;
            backTextAreaInput.current!.value = props.deck.questions[currentEditingIndex].back;
        } else {
            frontTextAreaInput.current!.value = "";
            backTextAreaInput.current!.value = "";
        }
    }, [currentEditingIndex, props.deck.questions]);

    React.useEffect(() => {
        setCurrentEditingIndex(0);
    }, [props.open])

    return (
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
            animate={props.open ? "shown" : "hidden"}
            className="items-center justify-center absolute bg-black/20 w-full min-h-full backdrop-blur-lg"
        >
            <div className="bg-dark1 shadow-md p-4 rounded-md lg:w-1/2 w-11/12">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-between">
                        <p className="mr-2">
                            {currentEditingIndex + 1}-{props.deck.questions.length}{" "}
                            {currentEditingIndex + 1 > props.deck.questions.length
                                ? props.t("components/questionBrowser:new")
                                : props.t("components/questionBrowser:editing")}
                        </p>
                        <select name="" id="" className="bg-white/10 p-2 rounded-md">
                            <option value="" className="bg-white/20 bg-blue-300">
                                {props.t("components/questionBrowser:questionTypes.basic")}
                            </option>
                            <option value="" className="bg-white/20 bg-blue-300">
                                {props.t("components/questionBrowser:questionTypes.multiple")}
                            </option>
                            <option value="" className="bg-white/20 bg-blue-300">
                                {props.t("components/questionBrowser:questionTypes.missing")}
                            </option>
                        </select>
                    </div>
                    <button
                        className="px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                        onClick={() => {
                            props.setOpen(false);
                        }}
                    >
                        {props.t("components/questionBrowser:buttons.close")}
                    </button>
                </div>

                <h1 className="text-xl">{props.t("components/questionBrowser:front")}</h1>
                <textarea
                    ref={frontTextAreaInput}
                    className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                    cols={50}
                    rows={4}
                ></textarea>

                <br />
                <br />

                <h1 className="text-2xl">{props.t("components/questionBrowser:back")}</h1>
                <textarea
                    ref={backTextAreaInput}
                    className="w-full bg-white/10 rounded-md p-2 outline-none border-2 border-transparent focus:border-cyan-500 transition-all"
                    cols={10}
                    rows={4}
                ></textarea>

                <div className="mt-4 flex items-center justify-between">
                    {currentEditingIndex < props.deck.questions.length && ( // Change to when the card is being edited
                        <button
                            onClick={() => {
                                let newQuestions = props.deck.questions;
                                newQuestions[currentEditingIndex] = {
                                    deck_id: props.deck.id,
                                    type: "basic",
                                    front: frontTextAreaInput.current!.value,
                                    back: backTextAreaInput.current!.value,
                                    id: newQuestions[currentEditingIndex].id,
                                };

                                props.setDeck({
                                    ...props.deck,
                                    questions: newQuestions,
                                });

                                props.setOpen(false);
                                setCurrentEditingIndex(0);
                            }}
                            className="mr-2 px-10 bg-primary shadow-md rounded-md p-2 transition-all"
                        >
                            {props.t("components/questionBrowser:buttons.saveChanges")}
                        </button>
                    )}

                    <div className="flex items-center justify-end">
                        {currentEditingIndex < props.deck.questions.length && ( // If the selected item does exist
                            <button
                                onClick={() => {
                                    let newQuestions = props.deck.questions.splice(currentEditingIndex - 1, 1);
                                    props.setDeck({
                                        ...props.deck,
                                        questions: newQuestions,
                                    });

                                    props.setOpen(false);
                                    setCurrentEditingIndex(0);
                                }}
                                className="mr-2 px-10 bg-red1 shadow-md rounded-md p-2 transition-all"
                            >
                                {props.t("components/questionBrowser:buttons.delete")}
                            </button>
                        )}
                        {/* Only show when there are questions to check */}
                        {props.deck.questions.length && (
                            <button
                                onClick={() => {
                                    if (currentEditingIndex - 1 < 0) return;
                                    setCurrentEditingIndex(currentEditingIndex - 1);
                                }}
                                className={`mr-2 px-10 ${
                                    currentEditingIndex == 0 ? "brightness-75" : "brightness-100"
                                } bg-gray-500 shadow-md rounded-md p-2 transition-all`}
                            >
                                {props.t("components/questionBrowser:buttons.previous")}
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (currentEditingIndex > props.deck.questions.length - 1) {
                                    if (!frontTextAreaInput.current!.value || !backTextAreaInput.current!.value) {
                                        alert("Please fill out all fields");
                                    } else {
                                        props.setDeck({
                                            ...props.deck,
                                            questions: [
                                                ...props.deck.questions,
                                                {
                                                    deck_id: props.deck.id,
                                                    id: (props.deck.questions.length + 1).toString(),
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
                            {currentEditingIndex + 1 > props.deck.questions.length
                                ? props.t("components/questionBrowser:buttons.save")
                                : props.t("components/questionBrowser:buttons.next")}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionBrowserComponent;
