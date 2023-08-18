import Image from "next/image";
import Link from "next/link";
import React from "react";

const WhyCard = ({image, title}) => {
    return (
        <div className="flex p-2 w-full h-300 md:p-4 md:w-300 md:h-300 rounded-lg">
            <div className="flex flex-col bg-white w-full rounded-lg shadow-md">
                <div className="relative py-5 flex justify-center items-center w-full h-[25vh]">
                    <Image
                        src={image}
                        alt="car class"
                        width={80}
                        height={80}
                        className="object-cover w-[80px] h-[80px]"
                        unoptimized={true}
                    />
                </div>
                <div className="px-5">
                    <h1 className="text-[#1E1E1E] pt-4 text-[24px] raleway font-bold">
                        <Link href={`/`}>{title}</Link>
                    </h1>
                    <div className="text-[16px] text-[#868686] karla mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                        sed don eiusmod tempor enim minim veniam quis notrud
                        exercitation
                    </div>

                    <div className="flex gap-4 justify-start my-4">
                        <Link
                            href={`/`}
                            className="karla text-[#FE5B02] font-bold"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
                {/* <p className="font-sans">{dataEx.attributes.Excerpt}</p> */}
            </div>
        </div>
    );
};

export default WhyCard;
