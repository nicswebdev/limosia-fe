import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Drawer = (props) => {
  const { data: session } = useSession();
  const dialogOpen = props.dialogOpen;
  const closeDialog = props.closeDialog;
  const links = props.links;
  return (
    <div
      className={
        "fixed overflow-hidden z-10 bg-white inset-0 transform ease-in-out " +
        (dialogOpen
          ? "  duration-500 translate-x-0  "
          : " transition-all delay-500 translate-x-full  ")
      }
    >
      <button onClick={closeDialog} className="bg-white rounded-full px-5">
        <div
          className="absolute top-10 right-10 w-6 xxl:w-10 h-6 xxl:h-10 cursor-pointer"
          id="navigationClose"
        >
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 xxl:w-10 h-[0.125rem] xxl:h-1 -rotate-45 bg-black"></span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 xxl:w-10 h-[0.125rem] xxl:h-1 rotate-45 bg-black"></span>
        </div>
      </button>
      <ul className="flex flex-col items-center text-black mt-20">
        {links &&
          links.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <div className="group">
                    <li
                      onClick={closeDialog}
                      className="py-2 px-2 custom-link uppercase"
                    >
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
        {session && (
          <li
            onClick={() => {
              signOut();
            }}
            className="py-2 px-2 custom-link cursor:pointer"
          >
            <button className="text-[16px] karla font-bold uppercase">Sign Out</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Drawer;
