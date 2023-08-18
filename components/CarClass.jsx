import Image from "next/image";
import Link from "next/link";
import React from "react";

const CarClass = ({image, title}) => {
    return (
        <div className="flex p-2 w-full h-300 md:p-4 md:w-300 md:h-300 rounded-lg">
            <div className="flex flex-col w-full border border-solid rounded-lg shadow-md border-[#d2d2d2]">
                <div className="relative w-full h-[45vh]">
                    <Image
                        src={image}
                        alt="car class"
                        fill
                        className="object-contain"
                        unoptimized={true}
                    />
                </div>
                <div className="px-3">
                    <h1 className="text-[#1E1E1E] pt-4 text-[24px] raleway font-bold">
                        <Link href={`/car-details`}>{title}</Link>
                    </h1>
                    <div className="text-[16px] text-[#868686] karla">
                        Toyota Atlis or similar
                    </div>
                    <div className="grid grid-cols-1 gap-2 my-2 md:grid-cols-2">
                        <div className="flex gap-1 items-center">
                            <div className="relative w-[24px] h-[24px]">
                                <Image
                                    src={`/assets/icon-pax.png`}
                                    alt="icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="karla text-[14px] text-[#1E1E1E]">
                                4 People
                            </span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="relative w-[24px] h-[24px]">
                                <Image
                                    src={`/assets/icon-luggage.png`}
                                    alt="icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="karla text-[14px] text-[#1E1E1E]">
                                3 pcs
                            </span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="relative w-[24px] h-[24px]">
                                <Image
                                    src={`/assets/icon-ac.png`}
                                    alt="icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="karla text-[14px] text-[#1E1E1E]">
                                AC
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center my-8">
                        <Link href={`/car-details`}>
                            <button className="bg-[#1BA0E2] text-white rounded-[100px] py-2 px-6 karla text-[20px] hover:bg-[#915516]">
                                More Details
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <p className="font-sans">{dataEx.attributes.Excerpt}</p> */}
            </div>
        </div>
    );
};

export default CarClass;
