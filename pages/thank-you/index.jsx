import Head from "next/head";
import Link from "next/link";
import React from "react";

const ThankYou = () => {
    return (
        <>
            <Head>
                <title>Limosia - Payment Success</title>
            </Head>
            <div class="main-container pb-8 pt-16 mt-20">
                <p class="title-orange">Booking Successful</p>
            </div>

            <div class="main-container pb-12">
                <div class="main-content lg:basis-[calc((100%-20px)*(60/100))] xxl:basis-[738px]">
                    <div class="px-4 py-8 md:p-6 xl:p-[52px] rounded-[15px] box-shadow">
                        <p class="title pb-8">
                            <span class="pr-5 text-gray-dark">Booking#</span>
                            <span class="font-karla underline">1233723</span>
                        </p>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div>
                                <p class="pb-3 text-gray-dark">
                                    Name :{" "}
                                    <span class="font-bold text-black-2">
                                        Johan Holloman{" "}
                                    </span>
                                </p>
                                <p class="pb-3 text-gray-dark">
                                    Phone :{" "}
                                    <span class="font-bold text-black-2">
                                        +62 8989 765 876
                                    </span>
                                </p>
                                <p class="pb-3 text-gray-dark">
                                    Email :{" "}
                                    <span class="font-bold text-black-2">
                                        jh.maste@gmail.com
                                    </span>
                                </p>
                                <p class="pb-3 text-gray-dark">
                                    Address :<br />
                                    <span class="font-bold text-black-2">
                                        2932 Devils Hill Road
                                        <br />
                                        Jackson, Mississippi
                                        <br />
                                        39211
                                    </span>
                                </p>

                                <p class="pb-3 text-gray-dark">
                                    <span class="font-bold text-black-2"></span>
                                </p>
                            </div>

                            <div class="max-lg:pb-8">
                                <p class="pb-3 text-gray-dark">
                                    Car Model :{" "}
                                    <span class="font-bold text-black-2">
                                        Sedan Standard
                                    </span>
                                </p>
                                <p class="pb-3 text-gray-dark">
                                    Max Pax :{" "}
                                    <span class="font-bold text-black-2">
                                        3 peoples
                                    </span>
                                </p>
                                <p class="pb-3 text-gray-dark">
                                    Max Luggage :{" "}
                                    <span class="font-bold text-black-2">
                                        3 pcs
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <p class="pb-3 text-gray-dark">
                                Date :{" "}
                                <span class="font-bold text-black-2">
                                    21 May 2023
                                </span>
                            </p>
                            <p class="pb-3 text-gray-dark">
                                From :{" "}
                                <span class="font-bold text-black-2">
                                    Airport AAA
                                </span>
                            </p>
                            <p class="pb-3 text-gray-dark">
                                To :{" "}
                                <span class="font-bold text-black-2">
                                    Airport AAA
                                </span>
                            </p>
                            <p class="pb-3 text-gray-dark">
                                Total :{" "}
                                <span class="font-bold text-black-2">9km</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="sidebar lg:basis-[calc((100%-20px)*(40/100))] xxl:basis-[440px] max-lg:pt-10">
                    <div>
                        <p class="title pb-8">Order Summary</p>
                        <p class="title pb-6">Payment Successfully </p>

                        <div class="flex items-center gap-3 pb-9 mb-5 border-b border-b-[#D9D9D9]">
                            <div class="flex-shrink-0">
                                <img
                                    src="/assets/images/icons/mastercard.jpg"
                                    alt="Mastercard"
                                />
                            </div>

                            <div>
                                <p class="text-gray-dark">
                                    ending in :{" "}
                                    <span class="font-bold text-black-2">
                                        3456
                                    </span>
                                </p>
                                <p class="text-gray-dark">
                                    payed at :{" "}
                                    <span class="font-bold text-black-2">
                                        21/05/2023 at 12:00am
                                    </span>
                                </p>
                            </div>
                        </div>

                        <ul class="[&>li]:flex [&>li]:justify-between [&>li]:items-center [&>li]:gap-2">
                            <li>
                                <span>Vehicle Subtotal: </span>
                                <span>USD 45</span>
                            </li>
                            <li>
                                <span>Premium Location Fee:</span>
                                <span>USD 5</span>
                            </li>
                            <li class="title pt-3 max-sm:flex-col">
                                <span>Your total price:</span>
                                <span>USD 50</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="main-container pb-32">
                <div class="w-full pt-10 border-t border-t-[#D9D9D9]">
                    <div class="flex justify-between max-md:flex-col max-md:items-center max-md:gap-5">
                        <div class="w-[325px] max-w-100">
                            <Link
                                href={`/`}
                                class="btn-blue flex justify-between items-center w-full px-10 py-3 text-2xl bg-transparent border border-blue-light"
                            >
                                <img
                                    src="/assets/images/icons/ph_arrow-up-bold-gray-dark.svg"
                                    alt="Icon"
                                />
                                <span class="text-gray-dark">
                                    Back to Homepage
                                </span>
                            </Link>
                        </div>
                        <div class="w-[325px] max-w-100">
                            <Link
                                href={`/car-class`}
                                class="btn-blue flex justify-between items-center w-full px-10 py-3 text-2xl"
                            >
                                <span>Book Other Cars</span>
                                <img
                                    src="/assets/images/icons/ph_arrow-up-bold.svg"
                                    alt="Icon"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThankYou;
