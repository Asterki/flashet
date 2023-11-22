import * as React from "react";
import axios, { AxiosResponse } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";
import Head from "next/head";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ResponseData } from "../api/hub/search";
import { SearchResult } from "@/types/models";

interface Props {}

const HubIndex = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { t } = useTranslation(["app/index", "components/navbar"]);
    const { data: session, status: loggedInStatus } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/${router.locale}/auth/signin`);
        },
    });

    const searchInput = React.useRef<HTMLInputElement>(null);

    const [deckList, setDeckList] = React.useState<SearchResult[]>([]);

    const search = async (query: string) => {
        if (query == "" || query.length > 100) return alert("Invalid query");

        const response: AxiosResponse<ResponseData> = await axios({
            method: "POST",
            url: "/api/hub/search",
            data: {
                query: query,
            },
        });
        2;

        if (response.data.decks) setDeckList(response.data.decks);
    };

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
                <main className="flex flex-col items-center justify-center mt-32">
                    <h1 className="text-4xl font-bold text-center text-white transition-all duration-500 transform hover:scale-105">
                        Discover Decks Created By Users, Shared In This Community
                    </h1>

                    <div className="flex items-center justify-center w-1/2 h-10 mt-5 text-white transform bg-dark2 rounded-md">
                        <input
                            ref={searchInput}
                            type="text"
                            className="w-5/6 h-full text-white bg-transparent outline-none p-2 transition-all rounded-l-md border-2 border-dark2 focus:border-primary"
                            autoComplete="off"
                            placeholder="Search for a deck..."
                        />
                        <button
                            type="button"
                            className="flex items-center justify-center w-1/6 h-full text-white transition-all duration-500 transform bg-primary rounded-r-md outline-none border-2 border-primary"
                            onClick={() => search(searchInput.current?.value ?? "")}
                        >
                            Search
                        </button>
                    </div>

                    <p
                        className={`text-lg font-bold text-center text-primary transition-all duration-500 transform ${
                            deckList.length > 0 ? "mt-5" : "hidden"
                        }`}
                    >
                        {deckList.length} Results
                    </p>

                    {deckList.map((deck) => {
                        return (
                            <div
                                key={deck.id}
                                className="flex flex-col items-center justify-center w-1/2 mt-5 transition-all duration-500 transform bg-dark2 rounded-md"
                            >
                                <h1 className="text-2xl font-bold text-center text-primary transition-all duration-500 transform hover:scale-105">
                                    {deck.name}
                                </h1>
                                <p className="text-lg font-bold text-center text-primary transition-all duration-500 transform hover:scale-105">
                                    {deck.owner.name}
                                </p>
                                <p className="text-lg font-bold text-center text-primary transition-all duration-500 transform hover:scale-105">
                                    {deck._count.questions} Questions
                                </p>
                            </div>
                        );
                    })}
                </main>
            )}
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", ["app/index", "components/navbar"])),
        },
    };
};

export default HubIndex;
