import Image from "next/image";
import Link from "next/link";
import React from "react";

const Testimoni = ({image, title}) => {
    return (
        <div className="flex p-2 w-full h-300 md:p-[0.2rem] md:w-300 md:h-300 rounded-lg">
            <div className="flex flex-col bg-white w-full border-2 border-solid rounded-lg shadow-md">
                <div className="relative py-2 flex justify-center items-center w-full h-[25vh]">
                    <Image
                        src={`/assets/profile.jpg`}
                        alt="car class"
                        width={80}
                        height={80}
                        className="object-cover rounded-[50%]"
                        unoptimized={true}
                    />
                </div>
                <div className="px-5">
                    <h1 className="text-[#1E1E1E] text-[16px] text-center raleway font-bold">
                        {title}
                    </h1>
                    <p className="text-[16px] text-[#DA8039] text-center font-bold">
                        Jabari Konrad
                    </p>
                    <div className="text-[16px] text-[#868686] karla my-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                        sed don eiusmod tempor enim minim veniam quis notrud
                        exercitation
                    </div>
                </div>
                {/* <p className="font-sans">{dataEx.attributes.Excerpt}</p> */}
            </div>
        </div>
    );
};

export default Testimoni;
