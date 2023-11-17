import Link from "next/link";

import { Session } from "next-auth";
import { NextPage } from "next";

import { useTranslation, TFunction } from "next-i18next";

interface ComponentProps {
    session: Session | null;
    t: TFunction;
}

const NavbarComponent: NextPage<ComponentProps> = ({ session, t }) => {
    return (
        <header className="absolute flex items-center justify-between w-full p-4 md:p-8">
            <Link
                href="/"
                className="text-[40px] font-bold hover:text-primary hover:drop-shadow-[2px_1px_1px_rgba(0,0,0,1)] transition-all"
            >
                Flashet
            </Link>
            <div className="flex items-center">
                <Link href="/about" className="mx-2 transition-all hover:text-red1">
                    {t("components/navbar:about")}
                </Link>
                <Link href="https://github.com/Asterki/flashet" className="mx-2 transition-all hover:text-red1">
                    {t("components/navbar:openSource")}
                </Link>
                {session && (
                    <Link href="/auth/signout" className="mx-2 transition-all hover:text-red1">
                        {t("components/navbar:loggedIn")} {session.user?.name}
                    </Link>
                )}
                {!session && (
                    <Link href="/auth/signin" className="mx-2 transition-all hover:text-red1">
                        {t("components/navbar:login")}
                    </Link>
                )}
            </div>
        </header>
    );
};

export default NavbarComponent;
