import Link from "next/link";

import { Session } from "next-auth";
import { NextPage } from "next";

import { TFunction } from "next-i18next";

interface ComponentProps {
    session: Session | null;
    t: TFunction;
}

const NavbarComponent: NextPage<ComponentProps> = ({ session, t }) => {
    return (
        <header className="absolute flex items-center justify-between w-full p-4 md:p-8">
            <Link
                href="/"
                className="md:text-[40px] text-[25px] font-bold"
            >
                Flashet
            </Link>
            <div className="flex items-center md:ml-0 ml-4">
                <Link href="/about" className="mx-2 transition-all hover:text-red1 md:text-left text-right hidden sm:block">
                    {t("components/navbar:about")}
                </Link>
                <Link href="https://github.com/Asterki/flashet" target="_blank" rel="noopener noreferrer" className="mx-2 transition-all hover:text-red1 md:text-left text-right hidden sm:block">
                    {t("components/navbar:openSource")}
                </Link>
                {session && (
                    <Link href="/auth/signout" className="mx-2 transition-all hover:text-red1 md:text-left text-right">
                        {t("components/navbar:loggedIn")} {session.user?.name}
                    </Link>
                )}
                {!session && (
                    <Link href="/auth/signin" className="mx-2 transition-all hover:text-red1 md:text-left text-right">
                        {t("components/navbar:login")}
                    </Link>
                )}
            </div>
        </header>
    );
};

export default NavbarComponent;
