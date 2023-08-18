import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";

const Navbar = () => {
    const links = [
        {
            names: "Home",
            link: "/",
        },
        {
            names: "Car Class",
            link: "/car-class",
        },
        {
            names: "About",
            link: "/#",
        },
        {
            names: "Our Client",
            link: "/#",
        },
        {
            names: "Contact",
            link: "/#",
        },
        {
            names: "My Account",
            link: "/login",
        },
    ];

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY > 90) {
                setScroll(true);
                // setColor("#FFFFFF");
                // setTextColor("#000000");
                // if (data) {
                //     setLogo(
                //         data.data.attributes.SecondLogo.data.attributes.url
                //     );
                // }
            } else {
                setScroll(false);
                // setColor("transparent");
                // setTextColor("#FFFFFF");
                // if (data) {
                //     setLogo(data.data.attributes.Logo.data.attributes.url);
                // }
            }
        };

        window.addEventListener("scroll", changeColor);
    }, []);

    return (
        <div
            className={`fixed left-0 top-0 w-full z-10 ease-in duration-300 ${
                scroll ? "" : "mt-5"
            }`}
        >
            <div className="max-w-[1240px] 2xl:max-w-[1768px] rounded-lg m-auto flex gap-5 items-center text-[#868686] bg-white">
                <Link href="/" className="bg-[#ED7A48] px-7 py-2 rounded-l-lg">
                    <div className="relative w-[140px] h-[70px]">
                        <Image
                            src={`./assets/limosia-logo.png`}
                            alt="logo-limosia"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </Link>

                <div className="w-full flex justify-between items-center">
                    <ul className="hidden sm:flex items-center gap-8">
                        {links &&
                            links.map((item, index) => {
                                return (
                                    <>
                                        <div key={index}>
                                            <div className="group">
                                                <li className="py-2 px-2 custom-link uppercase">
                                                    <Link
                                                        href={item.link}
                                                        className="text-[16px] karla font-bold"
                                                    >
                                                        {item.names}
                                                    </Link>
                                                </li>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </ul>
                    <div className="pr-4">
                        <div className="group">
                            <select className="rounded-xl border-2 border-[#868686] p-1">
                                <option value={`USD`}>USD</option>
                                <option value={`THB`}>THB</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
