import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signIn, getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(7),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email, password }) => {
      if (errorFromServer.email || errorFromServer.password) {
        return;
      }
      const formData = {
        email: email,
        password: password,
      };
      authorizeUser(formData);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const [errorFromServer, setErrorFromServer] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (errorFromServer.email || errorFromServer.password) {
      setErrorFromServer({
        email: "",
        password: "",
      });
    }
  }, [values]);

  const authorizeUser = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res.status === 401) {
      setErrorFromServer({
        email: "Email or password invalid",
        password: "Email or password invalid",
      });
      return;
    }
    if (sessionStorage.getItem("bookLink")) {
      router.push(sessionStorage.getItem("bookLink"));
      return;
    }
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Limosia - Login</title>
      </Head>
      <div className="main-container xl:max-w-[1064px] flex-col pt-16 pb-20 lg:pb-32 [&>*]:w-full mt-20">
        <div className="text-center pb-20">
          <p className="title-orange leading-tight pb-2">
            Login to Your Account
          </p>
          <p className="text-xl leading-tight text-gray-dark pb-8">
            Welcome! Please fill username or email and password to sign in into
            your account.
          </p>

          <div className="mx-auto w-[88px] h-[3px] rounded bg-gray-dark"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:border-r lg:border-r-[#D9D9D9]">
            <form onSubmit={handleSubmit} className="flex flex-col items-start">
              <div className="mb-4 w-full">
                <label className="custom-label flex gap-5">
                  <img src="/assets/images/icons/bxs_user.svg" alt="Icon" />
                  <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="custom-input flex-grow"
                    value={values.email}
                  />
                </label>
                {errors.email && touched.email ? (
                  <p className="ml-6 mt-1 text-red-600">{errors.email} </p>
                ) : (
                  errorFromServer.email && (
                    <p className="ml-6 mt-1 text-red-600">
                      {errorFromServer.email}{" "}
                    </p>
                  )
                )}
              </div>

              <div className="mb-8 w-full">
                <label className="custom-label flex gap-5">
                  <img
                    src="/assets/images/icons/fluent_key-16-filled.svg"
                    alt="Icon"
                  />
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="custom-input flex-grow"
                    value={values.password}
                  />
                </label>
                {errors.password && touched.password ? (
                  <p className="ml-6 mt-1 text-red-600">{errors.password} </p>
                ) : (
                  errorFromServer.password && (
                    <p className="ml-6 mt-1 text-red-600">
                      {errorFromServer.password}{" "}
                    </p>
                  )
                )}
              </div>

              <div className="w-full lg:w-[416px] max-w-full max-lg:pb-8">
                <button
                  type="submit"
                  className="btn-blue flex justify-between items-center w-full py-3 text-2xl"
                >
                  <span>Login to Your Account</span>
                  <img
                    src="/assets/images/icons/ph_arrow-up-bold.svg"
                    alt="Icon"
                    className="[&>path]:fill-blue-light"
                  />
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-full lg:w-[416px] max-w-full">
              <button
                onClick={() => {
                  const bookLink = sessionStorage.getItem("bookLink");
                  signIn("google", { callbackUrl: bookLink ? bookLink : "/" });
                }}
                className="btn-gray flex justify-between items-center py-3 mb-4 text-2xl w-full lg:mt-16"
              >
                <img src="/assets/images/icons/devicon_google.svg" alt="Icon" />
                <span className="mx-auto">Sign in with Google</span>
              </button>
              {/* <Link
                href={`/dashboard`}
                className="btn-blue bg-[#1877F2] flex justify-between items-center py-3 text-2xl"
              >
                <img src="/assets/images/icons/logos_facebook.svg" alt="Icon" />
                <span className="mx-auto">Sign in with Facebook</span>
              </Link> */}
            </div>
          </div>
        </div>

        <div className="pt-14">
          <p className="font-bold text-xl text-gray-dark">
            Forget Password?{" "}
            <a href="#" className="text-orange-dark hover:underline">
              Click here
            </a>
          </p>
          <p className="font-bold text-xl text-gray-dark">
            {`Don't have account?`}
            <Link href="/register" className="text-orange-dark hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Login;
