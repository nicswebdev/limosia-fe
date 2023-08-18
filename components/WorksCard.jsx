import Image from "next/image";
import Link from "next/link";
import React from "react";

const Works = ({image, title}) => {
    return (
        <div className="flex p-2 w-full h-300 md:p-[0.2rem] md:w-300 md:h-300 rounded-lg">
            <div className="flex flex-col bg-white w-full border-2 border-solid border-[#285CA7] rounded-lg shadow-md">
                <div className="relative py-5 flex justify-center items-center w-full h-[15vh]">
                    <div className="flex justify-center items-center w-[160px] h-[160px] mt-[-50%] rounded-[50%] bg-[#77D0E5]">
                        <Image
                            src={image}
                            alt="car class"
                            width={50}
                            height={50}
                            className="object-cover"
                            unoptimized={true}
                        />
                    </div>
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

export default Works;
