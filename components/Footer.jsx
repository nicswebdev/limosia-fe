import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full px-[10px] sm:px-[80px] py-20 h-auto flex justify-around items-start flex-row bg-black grid lg:grid-cols-4">
        {/* About us sections */}
        <div className="pl-4 pr-16 py-2">
          <h2 className=" text-[24px] text-white raleway font-bold mb-8">
            About Us
          </h2>
          <div className="text-[#868686] text-[12px] karla">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do
              eiusmod seta incididunt ut labore magna lorem ipsum dolor sit
              amet.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut du aute irure dolor in reprehenderit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, ctetur elitse adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>
        {/* // Useful Link Section */}
        <div className="px-4 py-2 ">
          <h2 className="text-[24px] text-white raleway font-bold mb-8">
            Useful Links
          </h2>
          <div className="text-[#868686] text-[12px] karla">
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Vehicles</li>
              <li>Our Client</li>
              <li>Reservation</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        {/* // Contact us section */}
        <div className="px-4 py-2 ">
          <h2 className="text-[24px] text-white raleway font-bold mb-8">
            Contact Us
          </h2>
          <div className="text-[#868686] text-[12px] karla">
            <p className="mb-2">(+40) 74 0920 2288</p>
            <p className="mb-2">office@rentacar.com</p>
            <p className="mb-2">
              New York 11673 Collins Street West Victoria United State.
            </p>
          </div>
        </div>
        {/* // Services section */}
        <div className="px-4 py-2">
          <h2 className="text-[24px] text-white raleway font-bold mb-8">
            Services
          </h2>
          <div className="text-[#868686] text-[12px] karla">
            <ul>
              <li>Daily Rent Car</li>
              <li>Monthly Rent Car</li>
              <li>Tour & Travel Car</li>
              <li>Rent Truck</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full px-[80px] border-t border-solid border-[#868686] py-6 h-auto flex sm:justify-between items-center sm:flex-row flex-col bg-black">
        <div className="relative w-[20vw] h-[5vh] sm:self-start xs:self-center">
          <Image
            src="/assets/quicco-logo-transparent.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="karla text-[#868686] text-[12px]">
          <p>Copyright © 2023 Quicco, All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
