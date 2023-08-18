import Image from "next/image";
import Head from "next/head";
import Hero from "@/components/Hero";
import CarClass from "@/components/CarClass";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WhyCard from "@/components/WhyCard";
import WorksCard from "@/components/WorksCard";
import TestimoniCard from "@/components/TestimoniCard";

export default function Home() {
    const responsive3 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 3,
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
        },
    };
    return (
        <div>
            <Head>
                <title>Limosia</title>
            </Head>
            <Hero />
            <div className="w-full flex items-center flex-col justify-center px-10 pt-[6%]">
                <h5 className="raleway text-[40px] font-bold text-[#FE5B02]">
                    Book A Ride with Limosia
                </h5>
                <p className="karla font-bold text-[20px] text-[#868686]">
                    Amco laboris nisi ut aliquip xea comod consequt duis aute
                    irure dolor reprehenderit
                </p>
                <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
            </div>
            <div className="w-full px-10 py-[6%] gd-carousel-wrapper">
                <Carousel
                    responsive={responsive3}
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={3200}
                    showDots={false}
                >
                    <CarClass
                        image={`/assets/sedan-standard.png`}
                        title={`Sedan Standard`}
                    />
                    <CarClass
                        image={`/assets/sedan-premium.png`}
                        title={`Sedan Premium`}
                    />
                    <CarClass image={`/assets/suv.png`} title={`SUV`} />
                    <CarClass image={`/assets/mpv.png`} title={`MPV`} />
                </Carousel>
            </div>
            <div className="w-full bg-two-linear flex items-center flex-col justify-center px-10 py-[6%]">
                <h5 className="raleway text-[40px] font-bold text-white">
                    Why Choose Us ?
                </h5>
                <p className="karla font-bold text-[20px] text-[#FBE6DB]">
                    Amco laboris nisi ut aliquip xea comod
                </p>
                <div className="w-[10%] border-solid border-[1.5px] border-[#FFFFFF] mt-7"></div>
                <div className="flex py-10 px-14">
                    <WhyCard
                        image={`/assets/icon-satisfaction.png`}
                        title={`Our Customers Always 100% Satisfied`}
                    />
                    <WhyCard
                        image={`/assets/icon-fastbook.png`}
                        title={`We Provide Easier & Faster Bookings`}
                    />
                    <WhyCard
                        image={`/assets/icon-pickup.png`}
                        title={`Your Choice of Any Pickup Location`}
                    />
                </div>
            </div>
            <div className="w-full flex items-center flex-col justify-center px-10 py-[6%]">
                <h5 className="raleway text-[40px] font-bold text-[#1BA0E2]">
                    How it Works
                </h5>
                <p className="karla font-bold text-[20px] text-[#868686]">
                    Amco laboris nisi ut aliquip xea comod consequt duis aute
                    irure dolor reprehenderit
                </p>
                <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
                <div className="flex py-10 px-0 mt-24">
                    <WorksCard
                        image={`/assets/icon-destination.png`}
                        title={`Pick Destination`}
                    />
                    <WorksCard
                        image={`/assets/icon-calendar.png`}
                        title={`Pick a Date`}
                    />
                    <WorksCard
                        image={`/assets/icon-car.png`}
                        title={`Select Car Class`}
                    />
                    <WorksCard
                        image={`/assets/icon-pay.png`}
                        title={`Book & Pay`}
                    />
                    <WorksCard
                        image={`/assets/icon-enjoy.png`}
                        title={`Enjoy Your Ride`}
                    />
                </div>
            </div>
            <div className="w-full bg-[#E8ECF2] flex items-center flex-col justify-center px-10 py-[6%]">
                <h5 className="raleway text-[40px] font-bold text-[#1BA0E2]">
                    Our Travel Partners
                </h5>
                <p className="karla font-bold text-[20px] text-[#868686]">
                    Amco laboris nisi ut aliquip xea comod consequt duis aute
                    irure dolor reprehenderit
                </p>
                <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
                <div className="flex justify-center items-center w-full py-12 px-14">
                    <div className="relative w-full h-[25vh]">
                        <Image
                            src="/assets/travel.png"
                            alt="partner"
                            fill
                            className="object-contain w-full"
                        />
                    </div>
                    <div className="relative w-full h-[25vh]">
                        <Image
                            src="/assets/travel.png"
                            alt="partner"
                            fill
                            className="object-contain w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center flex-col justify-center px-10 py-[6%]">
                <h5 className="raleway text-[40px] font-bold text-[#FE5B02]">
                    What our client say
                </h5>
                <p className="karla font-bold text-[20px] text-[#868686]">
                    Amco laboris nisi ut aliquip xea comod consequt duis aute
                    irure dolor reprehenderit
                </p>
                <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
                <div className="flex py-2 px-0 mt-24">
                    <TestimoniCard
                        image={`/assets/icon-destination.png`}
                        title={`Best Services, Nice Car, Cheap price`}
                    />
                    <TestimoniCard
                        image={`/assets/icon-calendar.png`}
                        title={`Best Services, Nice Car, Cheap price`}
                    />
                    <TestimoniCard
                        image={`/assets/icon-car.png`}
                        title={`Best Services, Nice Car, Cheap price`}
                    />
                    <TestimoniCard
                        image={`/assets/icon-pay.png`}
                        title={`Best Services, Nice Car, Cheap price`}
                    />
                </div>
            </div>
            <div className="w-full bg-[#ED7A48] flex items-center flex-col justify-center px-10 py-[6%]">
                <h5 className="raleway text-[40px] font-bold text-white">
                    Subscribe To Receive 20% Your FIrst Trip
                </h5>
                <p className="karla font-bold text-[20px] text-white">
                    Sign up for our newsletter to get updated information,
                    <br />
                    promotion, or insight. Just drop your active email.
                </p>
                <div className="flex justify-center items-center w-full py-2 px-0 mt-12">
                    <div className="bg-white w-[70%] p-2 rounded-[60px]">
                        <input
                            type="text"
                            className="outline-none p-2 karla font-bold text-[16px] w-[80%]"
                            placeholder="Fill up your email here"
                        />
                        <button className="w-[20%] bg-[#1BA0E2] py-2 px-6 text-[20px] rounded-[50px] karla text-white font-bold">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
