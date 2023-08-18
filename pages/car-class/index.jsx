import Head from "next/head";
import Link from "next/link";
import React from "react";

const CarClass = () => {
    return (
        <>
            <Head>
                <title>Limosia - Car Search</title>
            </Head>
            <div class="main-container pt-6 pb-8 mt-28">
                <ul class="breadcrumb-list">
                    <li>
                        <a
                            href="javascript:void(0)"
                            class="flex flex-row items-center gap-[0.625rem]"
                        >
                            <img
                                src="/assets/images/icons/material-symbols_home-rounded.svg"
                                alt=""
                                class="w-6"
                            />
                            <span>Reservation</span>
                        </a>
                    </li>
                    <li>Choose Cars</li>
                </ul>
            </div>
            <div class="main-container pb-20 lg:pb-32">
                <div class="sidebar">
                    <p class="title pb-5">ROUTE MAP</p>

                    <div class="w-full h-[16.625rem] pb-5">
                        <img
                            src="/assets/images/maps.jpg"
                            alt="Maps"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <div class="leading-relaxed">
                        <p>
                            From: <span class="font-bold">Airport AAA</span>
                        </p>
                        <p>
                            To: <span class="font-bold">Destination Name</span>
                        </p>
                        <p>
                            Total: <span class="font-bold">9km</span>
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

                    <div class="flex flex-col gap-8">
                        <div class="car-card">
                            <div class="image-wrap">
                                <img
                                    src="/assets/images/cars/car-1.png"
                                    alt="Car"
                                    class="max-xl:max-w-full xl:w-full"
                                />
                            </div>

                            <div class="detail-wrap">
                                <p class="title">Sedan Standard</p>
                                <p class="font-bold text-gray-dark">
                                    Toyota Atlis or similar
                                </p>

                                <ul class="facility-list">
                                    <li>
                                        <img
                                            src="/assets/images/icons/ic_round-people-alt.svg"
                                            alt="Icon"
                                            class="w-6"
                                        />
                                        <p class="text-sm font-bold">
                                            4 People
                                        </p>
                                    </li>
                                    <li>
                                        <img
                                            src="/assets/images/icons/fa-solid_luggage-cart.svg"
                                            alt="Icon"
                                            class="w-6"
                                        />
                                        <p class="text-sm font-bold">3 pcs</p>
                                    </li>
                                    <li>
                                        <img
                                            src="/assets/images/icons/ph_steering-wheel-fill.svg"
                                            alt="Icon"
                                            class="w-6"
                                        />
                                        <p class="text-sm font-bold">AC</p>
                                    </li>
                                </ul>

                                <div class="flex max-sm:flex-col justify-between items-center">
                                    <p class="text-4xl font-bold max-sm:pb-5 sm:pr-4">
                                        USD 45
                                    </p>
                                    <Link
                                        href={`/car-details`}
                                        class="btn-blue flex-shrink-0"
                                    >
                                        <span>BOOK NOW</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarClass;
