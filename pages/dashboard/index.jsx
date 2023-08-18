import Head from "next/head";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Limosia - Dashboard</title>
            </Head>
            <div class="main-container pt-6 pb-8 mt-28">
                <ul class="breadcrumb-list">
                    <li>
                        <a
                            href="javascript:void(0)"
                            class="flex flex-row items-center gap-[10px]"
                        >
                            <img
                                src="./assets/images/icons/material-symbols_home-rounded.svg"
                                alt=""
                            />
                        </a>
                    </li>
                    <li>Dashboard</li>
                </ul>
            </div>
            <div class="main-container pb-20 lg:pb-32">
                <div class="sidebar">
                    <ul class="list-menu">
                        <li>
                            <Link href={`/dashboard`} class="active">
                                <img
                                    src="./assets/images/icons/uil_dashboard.svg"
                                    alt="Icon"
                                />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/profile`}>
                                <img
                                    src="./assets/images/icons/gg_profile-black.svg"
                                    alt="Icon"
                                />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="./assets/images/icons/majesticons_book-line.svg"
                                    alt="Icon"
                                />
                                <span>Booking History</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="./assets/images/icons/icon-park-outline_modify.svg"
                                    alt="Icon"
                                />
                                <span>Modify Booking</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="main-content">
                    <div class="pb-5 border-b border-b-[#D9D9D9]">
                        <p class="title-orange">Dashboard</p>
                        <p class="font-bold text-xl text-gray-dark">
                            You are login as Sakhruk Kan,{" "}
                            <Link
                                href={`/`}
                                class="border-b border-b-[#285CA7] text-[#285CA7] hover:border-b-transparent duration-700"
                            >
                                log out
                            </Link>{" "}
                            now
                        </p>
                    </div>

                    <p class="title py-5">Your Current Booking</p>

                    <div class="flex flex-col gap-8">
                        <div class="car-card">
                            <div class="image-wrap md:!basis-1/4">
                                <img
                                    src="./assets/images/cars/car-2.png"
                                    alt="Car"
                                    class="max-w-full px-2"
                                />
                            </div>

                            <div class="detail-wrap">
                                <p class="title">Sedan Standard</p>
                                <p class="font-bold text-gray-dark">
                                    (Toyota Altis or similar)
                                </p>

                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-5 pt-5">
                                    <div class="flex items-center gap-5">
                                        <img
                                            src="./assets/images/icons/uiw_date.svg"
                                            alt="Icon"
                                        />
                                        <div>
                                            <p class="font-bold text-xs text-black">
                                                DATE
                                            </p>
                                            <p class="text-xs text-gray-dark">
                                                21 May 2023
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-5">
                                        <img
                                            src="./assets/images/icons/mingcute_flight-takeoff-line.svg"
                                            alt="Icon"
                                        />
                                        <div>
                                            <p class="font-bold text-xs text-black">
                                                Flight #
                                            </p>
                                            <p class="text-xs text-gray-dark">
                                                KH012
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-5">
                                        <img
                                            src="./assets/images/icons/ion_time-outline.svg"
                                            alt="Icon"
                                        />
                                        <div>
                                            <p class="font-bold text-xs text-black">
                                                Time
                                            </p>
                                            <p class="text-xs text-gray-dark">
                                                15:30 - 09:00
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-5">
                                        <img
                                            src="./assets/images/icons/icon-park-outline_to-bottom.svg"
                                            alt="Icon"
                                        />
                                        <div>
                                            <p class="font-bold text-xs text-black">
                                                From
                                            </p>
                                            <p class="text-xs text-gray-dark">
                                                21 May 2023
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-5">
                                        <img
                                            src="./assets/images/icons/icon-park-outline_to-bottom.svg"
                                            alt="Icon"
                                            class="rotate-180"
                                        />
                                        <div>
                                            <p class="font-bold text-xs text-black">
                                                To
                                            </p>
                                            <p class="text-xs text-gray-dark">
                                                KH012
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-5">
                                        <img
                                            src="./assets/images/icons/icon-park-outline_check-one-green.svg"
                                            alt="Icon"
                                        />
                                        <div>
                                            <p class="font-bold text-xs text-black">
                                                Status
                                            </p>
                                            <p class="text-xs text-[#319F43]">
                                                Paid
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
