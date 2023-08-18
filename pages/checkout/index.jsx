import Head from "next/head";
import Link from "next/link";
import React from "react";

const Checkout = () => {
    return (
        <>
            <Head>
                <title>Limosia - Checkout</title>
            </Head>
            <div class="main-container pb-9 mt-28">
                <p class="title-orange">Checkout</p>
            </div>

            <div class="main-container pb-20 lg:pb-32">
                <div class="main-content lg:basis-[calc((100%-20px)*(60/100))] xxl:basis-[630px]">
                    <p class="title pb-8">Details</p>

                    <div class="pb-8">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-3">
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

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-5">
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

                            <label class="custom-label">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Email address*"
                                    class="custom-input"
                                />
                            </label>
                        </div>
                    </div>

                    <div class="pb-8">
                        <label class="block pl-8 pb-2 font-bold text-gray-dark">
                            Date of birth*
                        </label>

                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-5">
                            <div class="relative">
                                <select name="" id="" class="custom-select">
                                    <option value="">Day</option>
                                    <option value="">Day</option>
                                    <option value="">Day</option>
                                </select>
                            </div>

                            <div class="relative">
                                <select name="" id="" class="custom-select">
                                    <option value="">Month</option>
                                    <option value="">Month</option>
                                    <option value="">Month</option>
                                </select>
                            </div>

                            <div class="relative">
                                <select name="" id="" class="custom-select">
                                    <option value="">Year</option>
                                    <option value="">Year</option>
                                    <option value="">Year</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="pb-8">
                        <div class="grid grid-cols-1 pb-3">
                            <label class="custom-label w-full">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Address"
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
                    </div>

                    <div>
                        <div class="grid grid-cols-1">
                            <label class="custom-label w-full">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Company"
                                    class="custom-input"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div class="sidebar lg:basis-[calc((100%-20px)*(40/100))] xxl:basis-[524px] max-lg:pt-10">
                    <div class="w-full px-4 py-8 md:p-6 xl:p-10 rounded-[20px] bg-orange-light text-white [&_*]:!text-white">
                        <p class="title pb-8">Booking Details</p>

                        <div class="leading-relaxed pb-8">
                            <p class="title">Pick-up Details</p>
                            <p>
                                From: <span class="font-bold">Airport AAA</span>
                            </p>
                            <p>
                                To:{" "}
                                <span class="font-bold">Destination Name</span>
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

                        <div class="leading-relaxed pb-8 mb-10 border-b border-b-white">
                            <p class="title">Car Class</p>
                            <p class="font-bold">
                                Sedan Standard
                                <br />
                                (Toyota Altis or similar)
                            </p>
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

                        <div class="pt-12 pb-8">
                            <label class="relative block pl-11">
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    class="custom-input"
                                />
                                I Read and agree to term & conditions
                            </label>
                        </div>

                        <div>
                            <Link href={`/thank-you`}>
                                <button class="btn-blue flex justify-between items-center w-full py-3 text-2xl">
                                    <span>Continue to Payment</span>
                                    <img
                                        src="/assets/images/icons/ph_arrow-up-bold.svg"
                                        alt="Icon"
                                        class="[&amp;>path]:fill-blue-light"
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
