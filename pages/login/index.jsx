import Head from "next/head";
import Link from "next/link";
import React from "react";

const Login = () => {
    return (
        <>
            <Head>
                <title>Limosia - Login</title>
            </Head>
            <div class="main-container xl:max-w-[1064px] flex-col pt-16 pb-20 lg:pb-32 [&>*]:w-full mt-20">
                <div class="text-center pb-20">
                    <p class="title-orange leading-tight pb-2">
                        Login to Your Account
                    </p>
                    <p class="text-xl leading-tight text-gray-dark pb-8">
                        Welcome! Please fill username or email and password to
                        sign in into your account.
                    </p>

                    <div class="mx-auto w-[88px] h-[3px] rounded bg-gray-dark"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="lg:border-r lg:border-r-[#D9D9D9]">
                        <form action="#" class="flex flex-col items-start">
                            <label class="custom-label flex gap-5 mb-4">
                                <img
                                    src="/assets/images/icons/bxs_user.svg"
                                    alt="Icon"
                                />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Username / Email"
                                    class="custom-input flex-grow"
                                />
                            </label>

                            <label class="custom-label flex gap-5 mb-8">
                                <img
                                    src="/assets/images/icons/fluent_key-16-filled.svg"
                                    alt="Icon"
                                />
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Password"
                                    class="custom-input flex-grow"
                                />
                            </label>

                            <div class="w-full lg:w-[416px] max-w-full max-lg:pb-8">
                                <Link href={`/dashboard`}>
                                    <button class="btn-blue flex justify-between items-center w-full py-3 text-2xl">
                                        <span>Login to Your Account</span>
                                        <img
                                            src="/assets/images/icons/ph_arrow-up-bold.svg"
                                            alt="Icon"
                                            class="[&>path]:fill-blue-light"
                                        />
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div class="flex flex-col items-end">
                        <div class="w-full lg:w-[416px] max-w-full">
                            <Link
                                href={`/dashboard`}
                                class="btn-gray flex justify-between items-center py-3 mb-4 text-2xl"
                            >
                                <img
                                    src="/assets/images/icons/devicon_google.svg"
                                    alt="Icon"
                                />
                                <span class="mx-auto">Sign in with Google</span>
                            </Link>

                            <Link
                                href={`/dashboard`}
                                class="btn-blue bg-[#1877F2] flex justify-between items-center py-3 text-2xl"
                            >
                                <img
                                    src="/assets/images/icons/logos_facebook.svg"
                                    alt="Icon"
                                />
                                <span class="mx-auto">
                                    Sign in with Facebook
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div class="pt-14">
                    <p class="font-bold text-xl text-gray-dark">
                        Forget Password?{" "}
                        <a href="#" class="text-orange-dark hover:underline">
                            Click here
                        </a>
                    </p>
                    <p class="font-bold text-xl text-gray-dark">
                        {`Don't have account?`}
                        <a href="#" class="text-orange-dark hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
