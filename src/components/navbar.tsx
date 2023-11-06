import Link from "next/link";

import { Session } from "next-auth";
import { NextPage } from "next";

interface ComponentProps {
    session: Session | null;
}

const NavbarComponent: NextPage<ComponentProps> = (props) => {
    return (
        <header className="absolute flex items-center justify-between w-full p-4 md:p-8">
            <div className="text-[40px]">Flashet</div>
            <div className="flex items-center">
                <Link href="/about" className="mx-2 transition-all hover:text-cyan-500">
                    About
                </Link>
                <Link
                    href="https://github.com/Asterki/flashet"
                    className="mx-2 transition-all hover:text-cyan-500"
                >
                    Open Source
                </Link>
                {props.session && (
                    <Link href="/auth/signout" className="mx-2 transition-all hover:text-cyan-500">
                        Logged in as {props.session.user?.name}
                    </Link>
                )}
                {!props.session && (
                    <Link href="/auth/sigin" className="mx-2 transition-all hover:text-cyan-500">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default NavbarComponent;
