import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import type { NextPage } from "next";

type Props = {};
const FooterComponent: NextPage<Props> = (props) => {
    return (
        <footer className="bg-dark2 md:px-32 px-12 py-16 w-full flex justify-between">
            <div className="w-1/2">
                <b>Links</b>
                <div className="flex flex-col md:flex-row">
                    <div className="px-4">
                        <ul className="mt-4 list-disc">
                            <li className="mb-2">
                                <a href="" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="" className="hover:underline">
                                    Dashboard
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="" className="hover:underline">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4">
                        <ul className="md:mt-4 list-disc">
                            <li className="mb-2">
                                <a href="" className="hover:underline">
                                    Open Source
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="" className="hover:underline">
                                    Terms of Service
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="" className="hover:underline">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-right">
                Flashet © 2023-{new Date().getFullYear()} <br />
                This is a project made by{" "}
                <a href="https://github.com/Asterki" className="hover:underline">
                    Asterki
                </a>
                <div className="mt-4">
                    <a href="https://github.com/Asterki" target="_blank" referrerPolicy="no-referrer" className="hover:underline">
                        <FontAwesomeIcon icon={faGithub} className="h-6 w-6 p-2 text-[40px]" />
                    </a>
                    <a href="https://twitter.com/AsterkiDev" target="_blank" referrerPolicy="no-referrer" className="hover:underline">
                        <FontAwesomeIcon icon={faTwitter} className="h-6 w-6 p-2 text-[40px]" />
                    </a>
                    <a href="https://instagram.com/nicht.fer" target="_blank" referrerPolicy="no-referrer" className="hover:underline">
                        <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 p-2 text-[40px]" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
