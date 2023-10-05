import Image from "next/image";
import {} from "next/router";
import React, { useState } from "react";
import AirportTransferForm from "./components/AirportTransferForm/AirportTransferForm";
import { formatPrice } from "@/utils/formatPrice";
import MainTab from "./components/MainTab/MainTab";
import DayRentalForm from "./components/DayRentalForm/DayRentalForm";
import HeroSkeleton from "./views/HeroSkeleton";

const Hero = ({ airportData, threeCheapestSchema, loading }) => {
  const [mainTab, setMainTab] = useState("airporttransfer");
  const changeMainTab = (value) => {
    setMainTab(value);
  };

  const formViews = {
    airporttransfer: AirportTransferForm,
    dayrental: DayRentalForm,
  };
  const ShownForm = formViews[mainTab];

  return (
    <div className="flex items-center justify-center h-full bg-fixed bg-center bg-cover">
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[2]" /> */}
      <div className="relative w-full h-[100vh]">
        <Image
          src="/assets/bg_top.jpg"
          alt="Header Image"
          fill
          className="object-cover w-full h-full"
        />
        {loading ? (
          <HeroSkeleton />
        ) : (
          <div className="absolute right-[7%]  md:right-[5%] top-[20%]  w-[85%] md:w-[30%]">
            <MainTab activeTab={mainTab} changeTab={changeMainTab} />
            <div className="bg-white h-auto rounded-md p-4">
              <ShownForm airportData={airportData} />
              <div className="flex justify-center gap-10 mt-3">
                {threeCheapestSchema &&
                  threeCheapestSchema.map((value) => {
                    return (
                      <div key={value.id} className="karla  font-bold">
                        <h1 className="text-[12px] text-center">
                          {value.name} from:
                        </h1>
                        <p className="text-center">
                          THB {formatPrice(value.cheapest_base_price)}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
