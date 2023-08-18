import Head from "next/head";
import Link from "next/link";
import React from "react";

const Profile = () => {
    return (
        <>
            <Head>
                <title>Limosia - Profile</title>
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
                        </a>
                    </li>
                    <li>Dashboard</li>
                </ul>
            </div>
            <div class="main-container pb-20 lg:pb-32">
                <div class="sidebar">
                    <ul class="list-menu">
                        <li>
                            <Link href={`/dashboard`}>
                                <img
                                    src="/assets/images/icons/uil_dashboard.svg"
                                    alt="Icon"
                                />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/profile`} class="active">
                                <img
                                    src="/assets/images/icons/gg_profile-black.svg"
                                    alt="Icon"
                                />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="/assets/images/icons/majesticons_book-line.svg"
                                    alt="Icon"
                                />
                                <span>Booking History</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="/assets/images/icons/icon-park-outline_modify.svg"
                                    alt="Icon"
                                />
                                <span>Modify Booking</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="main-content">
                    <div class="pb-5 border-b border-b-[#D9D9D9]">
                        <p class="title-orange">Profile</p>
                        <p class="font-bold text-xl text-gray-dark">
                            Modify my profile
                        </p>
                    </div>

                    <form action="#" class="">
                        <div class="flex flex-col gap-3 pt-5 pb-12 border-b border-b-[#D9D9D9]">
                            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
                                <div class="relative">
                                    <span class="absolute top-[10px] left-8 text-xs text-gray-dark">
                                        Title
                                    </span>
                                    <select
                                        name=""
                                        id=""
                                        class="custom-select pt-6"
                                    >
                                        <option value="">Mr.</option>
                                        <option value="">Mr.</option>
                                        <option value="">Mr.</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                <label class="custom-label">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="First Name*"
                                        class="custom-input"
                                    />
                                </label>

                                <label class="custom-label">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Last Name*"
                                        class="custom-input"
                                    />
                                </label>

                                <label class="custom-label">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Phone*"
                                        class="custom-input"
                                    />
                                </label>
                            </div>

                            <div class="grid grid-cols-1">
                                <label class="custom-label w-full">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Email address*"
                                        class="custom-input"
                                    />
                                </label>
                            </div>

                            <div class="pt-7">
                                <label class="block pl-8 pb-2 font-bold text-gray-dark">
                                    Date of birth*
                                </label>

                                <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-5">
                                    <div class="relative">
                                        <select
                                            name=""
                                            id=""
                                            class="custom-select"
                                        >
                                            <option value="">Day</option>
                                            <option value="">Day</option>
                                            <option value="">Day</option>
                                        </select>
                                    </div>

                                    <div class="relative">
                                        <select
                                            name=""
                                            id=""
                                            class="custom-select"
                                        >
                                            <option value="">Month</option>
                                            <option value="">Month</option>
                                            <option value="">Month</option>
                                        </select>
                                    </div>

                                    <div class="relative">
                                        <select
                                            name=""
                                            id=""
                                            class="custom-select"
                                        >
                                            <option value="">Year</option>
                                            <option value="">Year</option>
                                            <option value="">Year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 pt-5">
                                <label class="custom-label w-full">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Address*"
                                        class="custom-input"
                                    />
                                </label>
                            </div>

                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-5">
                                <label class="custom-label">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="City"
                                        class="custom-input"
                                    />
                                </label>

                                <div class="relative">
                                    <select name="" id="" class="custom-select">
                                        <option value="">State</option>
                                        <option value="">State</option>
                                        <option value="">State</option>
                                    </select>
                                </div>

                                <label class="custom-label">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Zip Code"
                                        class="custom-input"
                                    />
                                </label>
                            </div>

                            <div class="grid grid-cols-1 pt-5">
                                <label class="custom-label w-full">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Address*"
                                        class="custom-input"
                                    />
                                </label>
                            </div>
                        </div>

                        <div class="pt-8">
                            <p class="pb-8 font-bold text-xl text-gray-dark">
                                Login Information
                            </p>

                            <div class="grid grid-cols-1 lg:grid-cols-3 items-end gap-y-3 gap-x-5">
                                <div>
                                    <label class="block pl-8 pb-1 font-bold text-gray-dark">
                                        Username
                                    </label>
                                    <div class="custom-label">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Username"
                                            value="sharukh123"
                                            class="custom-input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label class="block pl-8 pb-1 font-bold text-gray-dark">
                                        Password
                                    </label>
                                    <div class="custom-label">
                                        <input
                                            type="password"
                                            name=""
                                            id=""
                                            placeholder="Password"
                                            value="12345678"
                                            class="custom-input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <a
                                        href="#"
                                        class="btn-blue h-[55px] flex justify-center items-center"
                                    >
                                        <span>Change Password</span>
                                    </a>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 lg:grid-cols-3 items-end gap-y-3 gap-x-5 pt-12">
                                <div>
                                    <a
                                        href="#"
                                        class="btn-blue h-[55px] flex justify-center items-center"
                                    >
                                        <span>Save my profile</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
