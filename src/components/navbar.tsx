import Link from "next/link";

import { Session } from "next-auth";
import { NextPage } from "next";

interface ComponentProps {
    session: Session | null;
}

const NavbarComponent: NextPage<ComponentProps> = (props) => {
    return (
        <header className="absolute flex items-center justify-between w-full p-4 md:p-8">
            <Link href="/" className="text-[40px] font-bold hover:text-primary hover:drop-shadow-[2px_1px_1px_rgba(0,0,0,1)] transition-all">Flashet</Link>
            <div className="flex items-center">
                <Link href="/about" className="mx-2 transition-all hover:text-red1">
                    About
                </Link>
                <Link
                    href="https://github.com/Asterki/flashet"
                    className="mx-2 transition-all hover:text-red1"
                >
                    Open Source
                </Link>
                {props.session && (
                    <Link href="/auth/signout" className="mx-2 transition-all hover:text-red1">
                        Logged in as {props.session.user?.name}
                    </Link>
                )}
                {!props.session && (
                    <Link href="/auth/sigin" className="mx-2 transition-all hover:text-red1">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default NavbarComponent;
