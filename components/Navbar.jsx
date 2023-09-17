import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import BurgerButton from "./BurgerButton";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  // console.log(session)
  const links = session
    ? [
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
          link: "/profile",
        },
      ]
    : [
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
          names: "Login",
          link: "/login",
        },
        {
          names: "Register",
          link: "/register",
        },
      ];

  const [scroll, setScroll] = useState(false);
  // State to open the navbar when on mobile
  const [openNavbar, setOpenNavbar] = useState(false);

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
        <Link href="/" className="bg-[#ED7A48] px-7 py-2 ">
          <div className="relative w-[140px] h-[70px]">
            <Image
              src={`./assets/qicco-logo-long.png`}
              alt="logo-limosia"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </Link>

        <div className="w-full flex justify-between items-center">
          {/* //Burger Button */}
          <div className="md:hidden w-full flex justify-end">
            <BurgerButton
              onClick={() => {
                setOpenNavbar(true);
                document.body.classList.add("overflow-hidden");
              }}
            />
            <Drawer
              dialogOpen={openNavbar}
              closeDialog={() => {
                setOpenNavbar(false);
                document.body.classList.remove("overflow-hidden");
              }}
              links={links}
            />
          </div>
          <ul className="hidden md:flex items-center gap-8">
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
          {session ? (
            <button
              className="hidden md:flex text-[16px] karla font-bold uppercase"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          ) : (
            <></>
          )}
          <div className="pr-4">
            <div className="hidden sm:group">
              <select className="rounded-xl border-2 border-[#868686] p-1">
                <option value={`USD`}>USD</option>
                <option value={`THB`} selected>
                  THB
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
