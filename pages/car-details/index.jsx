import Head from "next/head";
import Link from "next/link";
import React from "react";

const CarDetails = () => {
    return (
        <>
            <Head>
                <title>Limosia - Car Details</title>
            </Head>
            <div class="main-container pt-6 pb-8 mt-28">
                <ul class="breadcrumb-list">
                    <li>
                        <a
                            href="javascript:void(0)"
                            class="flex flex-row items-center gap-[10px]"
                        >
                            <img
                                src="/assets/images/icons/material-symbols_home-rounded.svg"
                                alt=""
                            />
                            <span>Reservation</span>
                        </a>
                    </li>
                    <li>Choose Cars</li>
                </ul>
            </div>
            <div class="main-container pb-20 lg:pb-32">
                <div class="sidebar">
                    <div class="flex justify-center items-center w-full px-5 py-8 mb-9 rounded-[15px] bg-gray-light">
                        <img
                            src="/assets/images/cars/car-2.png"
                            alt="Car"
                            class="max-w-full"
                        />
                    </div>

                    <div class="pb-6">
                        <p class="title">Sedan Standard</p>
                        <p class="font-bold text-gray-dark">
                            Toyota Atlis or similar
                        </p>
                    </div>

                    <div class="leading-relaxed">
                        <p class="title">Pick-up Details</p>
                        <p>
                            From: <span class="font-bold">Airport AAA</span>
                        </p>
                        <p>
                            To: <span class="font-bold">Destination Name</span>
                        </p>
                        <p>
                            Total: <span class="font-bold">9km</span>
                        </p>
                        <p>
                            Date:{" "}
                            <span class="font-bold">
                                23.05.2023 at 12:00 hrs
                            </span>
                        </p>
                    </div>
                </div>

                <div class="main-content">
                    <form
                        action="#"
                        class="flex flex-col md:flex-row max-md:gap-4 justify-between md:items-center px-4 md:px-8 py-4 mb-5 rounded-[0.625rem] box-shadow bg-gray-light"
                    >
                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_to-bottom.svg"
                                alt="Icon"
                                class="w-6"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                                <label
                                    for="airport"
                                    class="text-xs font-bold leading-none"
                                >
                                    FROM AIRPORT
                                </label>
                                <select
                                    id="airport"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                >
                                    <option>airport name</option>
                                    <option>Airport 1</option>
                                    <option>Airport 2</option>
                                    <option>Airport 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_to-bottom.svg"
                                alt="Icon"
                                class="w-6 rotate-180"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                                <label
                                    for="destination"
                                    class="text-xs font-bold leading-none"
                                >
                                    DESTINATION
                                </label>
                                <select
                                    id="destination"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                >
                                    <option>destination name</option>
                                    <option>Destination 1</option>
                                    <option>Destination 2</option>
                                    <option>Destination 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/uiw_date.svg"
                                alt="Icon"
                                class="w-6 px-[0.125rem]"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                                <label
                                    for="date"
                                    class="text-xs font-bold leading-none"
                                >
                                    DATE
                                </label>
                                <input
                                    id="date"
                                    type="text"
                                    placeholder="23/05/23 | 15:30 - 09:00"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                />
                            </div>
                        </div>

                        <div>
                            <button class="text-xs font-bold leading-none text-orange-light">
                                CHANGE BOOKING DATE
                            </button>
                        </div>
                    </form>
                    <form
                        action="#"
                        class="flex flex-col md:flex-row max-md:gap-4 justify-between md:items-center px-4 md:px-8 py-4 mb-5 rounded-[10px] box-shadow bg-gray-light"
                    >
                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_check-one-orange.svg"
                                alt="Icon"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[6px]">
                                <label
                                    for="vehicle"
                                    class="text-xs font-bold leading-none text-orange-dark"
                                >
                                    VEHICLE
                                </label>
                                <select
                                    id="vehicle"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                >
                                    <option>SELECTION</option>
                                    <option>SELECTION 1</option>
                                    <option>SELECTION 2</option>
                                    <option>SELECTION 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_check-one-gray.svg"
                                alt="Icon"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[6px]">
                                <label
                                    for="extras"
                                    class="text-xs font-bold leading-none"
                                >
                                    EXTRAS
                                </label>
                                <select
                                    id="extras"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                >
                                    <option>SELECTION</option>
                                    <option>SELECTION 1</option>
                                    <option>SELECTION 2</option>
                                    <option>SELECTION 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_check-one-gray.svg"
                                alt="Icon"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[6px]">
                                <label
                                    for="date"
                                    class="text-xs font-bold leading-none"
                                >
                                    DRIVER
                                </label>
                                <input
                                    id="date"
                                    type="text"
                                    placeholder="DETAILS"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                />
                            </div>
                        </div>
                    </form>

                    <div class="px-4 py-8 md:p-6 xl:p-10 rounded-[15px] box-shadow text-black-2">
                        <p class="title">Base rate</p>
                        <p class="font-bold text-gray-dark">
                            CHEAPEST PRICE - YOU SAVE 3%
                        </p>

                        <ul class="list-term pt-5 pb-6">
                            <li>
                                Rebooking and cancellation (subject to charges)
                            </li>
                            <li>Unlimited miles</li>
                            <li>Third party insurance</li>
                            <li>
                                <a href="#" class="link">
                                    More information ›
                                </a>
                            </li>
                            <li>Loss Damage Waiver</li>
                        </ul>

                        <p class="text-4xl font-bold max-sm:pb-5 sm:pr-4">
                            USD 15
                        </p>

                        <hr class="my-8 border-[#D9D9D9]" />

                        <div class="flex justify-between items-center">
                            <span class="text-gray-dark">
                                Vehicle Subtotal:{" "}
                            </span>
                            <span class="font-bold">USD 45</span>
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-gray-dark">
                                Premium Location Fee:{" "}
                            </span>
                            <span class="font-bold">USD 5</span>
                        </div>

                        <div class="flex max-sm:flex-col justify-between sm:items-center pt-5">
                            <span class="title">Your total price:</span>
                            <span class="title">USD 50</span>
                        </div>

                        <div class="pt-12">
                            <Link href={`/checkout`} class="btn-blue">
                                <span>ACCEPT RATE AND PAY NOW</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarDetails;
