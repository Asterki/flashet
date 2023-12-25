import { useRouter } from "next/router";

import { NextPage } from "next";

interface ComponentProps {
    deckID: string;
    deckName: string;
}

const StudyNavbar: NextPage<ComponentProps> = (props) => {
    const router = useRouter();

    return (
        <div className="w-full bg-dark2 text-center">
            <div className="w-full flex items-center text-center justify-center">
                <p className="m-2 text-xl font-semibold hover:bg-white/20 p-2 cursor-pointer transition-all rounded-md w-2/12" onClick={() => {
                    router.push(`/${router.locale}/app/`);
                }}>Decks</p>
                <p className="m-2 text-xl font-semibold hover:bg-white/20 p-2 cursor-pointer transition-all rounded-md w-2/12" onClick={() => {
                    router.push("/")
                }}>
                    Edit Question
                </p>
                <p className="m-2 text-xl font-semibold hover:bg-white/20 p-2 cursor-pointer transition-all rounded-md w-2/12" onClick={() => {
                    router.push(`/${router.locale}/app/edit/${router.query.deckID}`);
                }}>Edit Deck</p>
            </div>
            <p className="text-lg font-semibold p-2">Currently Studying: {props.deckName}</p>
        </div>
    );
};

export default StudyNavbar;
