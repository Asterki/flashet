import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "../api/decks/fetch-all";
import { DeckType } from "@/types/models";

interface Props {}

const AppMain = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/main", "components/navbar"]);
    const { data: session, status: loggedInStatus } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/${router.locale}/auth/signin`);
        },
    });

    const [decks, setDecks] = React.useState<DeckType[]>([]);

    React.useEffect(() => {
        (async () => {
            const deckResponse: AxiosResponse<ResponseData> = await axios({
                url: "/api/decks/fetch-all",
                withCredentials: true,
            });

            if (!deckResponse.data.decks) return;
            setDecks(deckResponse.data.decks);
        })();
    }, []);

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
                <main className="flex items-center justify-center mt-24">
                    <section className="p-4 m-10 rounded-md shadow-md bg-white/10 md:w-7/12 w-full">
                        <p className="text-3xl text-center font-bold">{t("title")}</p>

                        <div className="flex items-center justify-center text-center my-4">
                            {decks.length !== 0 && (
                                <table className="w-full">
                                    <tr>
                                        <th className="md:px-10 px-4">{t("headers.deck")}</th>
                                        <th className="md:px-10 px-4">{t("headers.new")}</th>
                                        <th className="md:px-10 px-4">{t("headers.studying")}</th>
                                        <th className="md:px-10 px-4">{t("headers.done")}</th>
                                    </tr>

                                    {decks.map((deck) => {
                                        return (
                                            <tr
                                                key={deck.id}
                                                onClick={() => {
                                                    router.push(`/study/${deck.id}`);
                                                }}
                                                className="hover:bg-white/5 transition-all rounded-lg cursor-pointer"
                                            >
                                                <td className="p-2">{deck.name}</td>
                                                <td className="p-2 text-secondary">{deck.questions_new}</td>
                                                <td className="p-2 text-red1">{deck.questions_studying}</td>
                                                <td className="p-2 text-gray-300">{deck.questions_done}</td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            )}
                            {decks.length == 0 && <p>{t("noDecks")}</p>}
                        </div>

                        <div className="text-center mt-4">
                            <button
                                onClick={() => {
                                    router.push(`/${router.locale}/app/create`);
                                }}
                                className="p-2 outline-none rounded-md bg-primary shadow-md text-white font-semibold hover:brightness-110 transition-all"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                                {t("buttons.createDeck")}
                            </button>
                        </div>
                    </section>
                </main>
            )}
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
