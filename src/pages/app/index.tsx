import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navbar from "@/components/navbar";

import { GetStaticProps, InferGetStaticPropsType } from "next";

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
                            <tr
                                onClick={() => {
                                    router.push("/study/ID HERE");
                                }}
                                className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                            >
                                <td className="p-2">Legislation II Partial II Semester</td>
                                <td className="p-2 text-secondary">4</td>
                                <td className="p-2 text-red1">20</td>
                                <td className="p-2 text-gray-300">10</td>
                            </tr>
                            <tr
                                onClick={() => {
                                    router.push("/study/ID HERE");
                                }}
                                className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                            >
                                <td className="p-2">Legislation II Partial II Semester</td>
                                <td className="p-2 text-secondary">4</td>
                                <td className="p-2 text-red1">20</td>
                                <td className="p-2 text-gray-300">10</td>
                            </tr>
                            <tr
                                onClick={() => {
                                    router.push("/study/ID HERE");
                                }}
                                className="hover:bg-white/5 transition-all rounded-md cursor-pointer"
                            >
                                <td className="p-2">Legislation II Partial II Semester</td>
                                <td className="p-2 text-secondary">4</td>
                                <td className="p-2 text-red1">20</td>
                                <td className="p-2 text-gray-300">10</td>
                            </tr>
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

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["app/main", "components/navbar"])),
    },
});

export default AppMain;
