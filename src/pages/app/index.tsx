import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "../api/decks/fetch";
import { DeckType } from "@/types/models";

interface Props {}

const AppMain = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/main", "components/navbar"]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    const [decks, setDecks] = React.useState<DeckType[]>([]);

    React.useEffect(() => {
        (async () => {
            const deckResponse: AxiosResponse<ResponseData> = await axios({
                url: "/api/decks/fetch-decks",
                withCredentials: true,
            });

            if (!deckResponse.data.decks) return;
            setDecks(deckResponse.data.decks);
        })();
    }, []);

    return (
        <div className="absolute w-full min-h-screen text-white bg-dark1">
            <Navbar t={t} session={session} />

            <main className="flex items-center justify-center mt-24">
                <section className="p-4 m-10 rounded-md shadow-md bg-white/10 md:w-7/12 w-full">
                    <p className="text-3xl text-center font-bold">{t("title")}</p>

                    <div className="flex items-center justify-center text-center my-4">
                        <table>
                            <tr>
                                <th className="md:px-10 px-4">{t("headers.deck")}</th>
                                <th className="md:px-10 px-4">{t("headers.new")}</th>
                                <th className="md:px-10 px-4">{t("headers.studying")}</th>
                                <th className="md:px-10 px-4">{t("headers.done")}</th>
                            </tr>

                            {/* // TODO: LATER TO BE MAPPED FROM A DATABASE */}
                            {decks.map((deck) => {
                                return (
                                    <tr
                                        key={deck.id}
                                        onClick={() => {
                                            router.push(`/study/${deck.id}`);
                                        }}
                                        className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                                    >
                                        <td className="p-2">{deck.name}</td>
                                        <td className="p-2 text-secondary">{deck.questionStatus.new}</td>
                                        <td className="p-2 text-red1">{deck.questionStatus.studying}</td>
                                        <td className="p-2 text-gray-300">{deck.questionStatus.done}</td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            onClick={() => {
                                router.push("/app/create");
                            }}
                            className="p-2 rounded-md bg-primary shadow-md"
                        >
                            {t("buttons.createDeck")}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", ["app/main", "components/navbar"])),
        },
    };
};

export default AppMain;
