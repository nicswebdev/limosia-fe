import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
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
                <div className="bg-white w-[30vw] h-auto absolute flex flex-col gap-4 right-[5%] top-[25%] rounded-md p-4">
                    <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                        <label className="karla text-[12px]">From :</label>
                        <input
                            type="text"
                            value={`BKK - Suvarnabhumi`}
                            className="form-control karla font-bold text-[16px]"
                        />
                    </div>
                    <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                        <label className="karla text-[12px]">To :</label>
                        <input
                            type="text"
                            value={`SHAN Villas Sukhumvit`}
                            className="form-control karla font-bold text-[16px]"
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-1 w-[100%]">
                        <div className="bg-[#F6F6F6] rounded-[100px] self-start py-2 px-5 flex flex-col w-[47%]">
                            <label className="karla text-[12px]">Date :</label>
                            <input
                                type="text"
                                value={`01 June 2023`}
                                className="form-control karla font-bold text-[16px]"
                            />
                        </div>
                        <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
                            <label className="karla text-[12px]">
                                Passanger :
                            </label>
                            <input
                                type="text"
                                value={`2`}
                                className="form-control karla font-bold text-[16px]"
                            />
                        </div>
                    </div>
                    <div className="self-center text-center rounded-[100px] py-2 px-5 flex flex-col">
                        <label className="karla text-[12px]">Rate from :</label>
                        <span className="text-[24px] font-bold karla">
                            $23.5
                        </span>
                    </div>
                    <Link href={`/car-class`}>
                        <button className="w-full items-center justify-center bg-[#1BA0E2] rounded-[100px] text-white font-bold karla text-center py-2 px-5 flex flex-col">
                            BOOK NOW
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
