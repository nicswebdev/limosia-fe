import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signIn, getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const router = useRouter();

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please provide a valid email format"),
    password: Yup.string()
      .min(8, "Password must be 8 or more characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm password must match"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }, // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async (
      { firstName, lastName, email, password },
      { setErrors }
    ) => {
      const formData = {
        f_name: firstName,
        l_name: lastName,
        email: email,
        password: password,
      };

      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      const res = await fetch(`${apiPath}/auth/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (!res.ok) {
        if (res.status === 400) {
          if (resData.message === "Email is already taken.") {
            setErrors({ email: "Email is already taken" });
            return;
          }
          if (Array.isArray(resData.message)) {
            const messageToShow = resData.message[0];
            if (messageToShow === "password is not strong enough")
              setErrors({
                password:
                  "Password must have an uppercase, a lowercase, and number",
              });
            return;
          }
        }
        return;
      }
      // Log user on success register
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (!loginRes.ok) {
        alert("Server Error");
      } else {
        router.push("/");
      }
    },
  });
  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = formik;

  const [errorFromServer, setErrorFromServer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  //   useEffect(() => {
  //     if (errorFromServer.email || errorFromServer.password) {
  //       setErrorFromServer({
  //         email: "",
  //         password: "",
  //       });
  //     }
  //   }, [values]);

  return (
    <>
      <Head>
        <title>Limosia - Register</title>
      </Head>
      <div className="main-container xl:max-w-[1064px] flex-col pt-16 pb-20 lg:pb-32 [&>*]:w-full mt-20">
        <div className="text-center pb-12">
          <p className="title-orange leading-tight pb-2">
            Register to Limosia{" "}
          </p>
          <p className="text-xl leading-tight text-gray-dark pb-8">
            Welcome! Please fill the form to create your account
          </p>

          <div className="mx-auto w-[88px] h-[3px] rounded bg-gray-dark"></div>
        </div>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <label className="custom-label flex gap-5">
                <img src="/assets/images/icons/bxs_user.svg" alt="Icon" />
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="custom-input flex-grow"
                  value={values.firstName}
                  onBlur={handleBlur}
                />
              </label>
              {errors.firstName && touched.firstName ? (
                <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                  {errors.firstName}{" "}
                </p>
              ) : (
                errorFromServer.firstName && (
                  <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                    {errorFromServer.firstName}
                  </p>
                )
              )}
            </div>
            <div className="mb-4 w-full">
              <label className="custom-label flex gap-5">
                <img src="/assets/images/icons/bxs_user.svg" alt="Icon" />
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="custom-input flex-grow"
                  value={values.lastName}
                  onBlur={handleBlur}
                />
              </label>
              {errors.lastName && touched.lastName ? (
                <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                  {errors.lastName}{" "}
                </p>
              ) : (
                errorFromServer.lastName && (
                  <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                    {errorFromServer.lastName}{" "}
                  </p>
                )
              )}
            </div>

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
                  onBlur={handleBlur}
                />
              </label>
              {errors.email && touched.email ? (
                <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                  {errors.email}{" "}
                </p>
              ) : (
                errorFromServer.email && (
                  <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                    {errorFromServer.email}{" "}
                  </p>
                )
              )}
            </div>

            <div className="mb-4 w-full">
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
                  onBlur={handleBlur}
                />
              </label>
              {errors.password && touched.password ? (
                <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                  {errors.password}{" "}
                </p>
              ) : (
                errorFromServer.password && (
                  <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                    {errorFromServer.password}{" "}
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
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  className="custom-input flex-grow"
                  value={values.passwordConfirm}
                  onBlur={handleBlur}
                />
              </label>
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                  {errors.passwordConfirm}{" "}
                </p>
              ) : (
                errorFromServer.passwordConfirm && (
                  <p className="ml-6 mt-1 text-[#FF3333] font-bold karla">
                    {errorFromServer.passwordConfirm}{" "}
                  </p>
                )
              )}
            </div>

            <div className="w-full lg:w-[416px] max-w-full max-lg:pb-8 flex">
              <button
                type="submit"
                className="btn-blue  w-full py-3 text-2xl"
                disabled={isSubmitting}
              >
                <span>Register Now</span>
              </button>
            </div>
          </form>
        </div>

        <div className="pt-14 flex justify-center">
          <p className="font-bold text-xl text-gray-dark">
            {`Already Have an Account?`}
            <Link href="/login" className="text-orange-dark hover:underline">
              Sign in
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

export default Register;
