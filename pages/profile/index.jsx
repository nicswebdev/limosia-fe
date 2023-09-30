import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useFormik } from "formik";
import * as Yup from "yup";
import DateInput from "@/components/CustomInputs/DateInput";

const Profile = ({ profileData }) => {
  // console.log(profileData);

  const validationSchema = Yup.object().shape({
    f_name: Yup.string().required("First Name is required"),
    l_name: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please provide a valid email format"),
    dob: Yup.date().required("Birth Date is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
  });
  const formik = useFormik({
    initialValues: {
      f_name: profileData.f_name,
      l_name: profileData.l_name,
      phone: profileData.phone,
      email: profileData.email,
      dob: profileData.guest.dob?profileData.guest.dob:new Date(),
      address: profileData.guest.address,
      city: "",
      state: "",
      zip_code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      { f_name, l_name, phone, email, dob, address, city, state, zip_code },
      { setErrors }
    ) => {
      const formData = {
        f_name,
        l_name,
        phone,
        email,
        dob,
        address,
        city,
        state,
        zip_code,
      };
      console.log(formData);
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
    setFieldValue,
  } = formik;

  return (
    <>
      <Head>
        <title>Limosia - Profile</title>
      </Head>
      <div className="main-container pt-6 pb-8 mt-28">
        <ul className="breadcrumb-list">
          <li>
            <a
              href="javascript:void(0)"
              className="flex flex-row items-center gap-[10px]"
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
      <div className="main-container pb-20 lg:pb-32">
        <div className="sidebar">
          <ul className="list-menu">
            <li>
              <Link href={`/dashboard`}>
                <img src="/assets/images/icons/uil_dashboard.svg" alt="Icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href={`/profile`} className="active">
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

        <div className="main-content">
          <div className="pb-5 border-b border-b-[#D9D9D9]">
            <p className="title-orange">Profile</p>
            <p className="font-bold text-xl text-gray-dark">
              Modify my profile
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3 pt-5 pb-12 border-b border-b-[#D9D9D9]">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                {/* <div className="relative">
                  <span className="absolute top-[10px] left-8 text-xs text-gray-dark">
                    Title
                  </span>
                  <select name="" id="" className="custom-select pt-6">
                    <option value="">Mr.</option>
                    <option value="">Mr.</option>
                    <option value="">Mr.</option>
                  </select>
                </div> */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <label className="custom-label">
                  <input
                    type="text"
                    name="f_name"
                    placeholder="First Name*"
                    className="custom-input"
                    onChange={handleChange}
                    value={values.f_name}
                  />
                </label>

                <label className="custom-label">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Last Name*"
                    className="custom-input"
                    onChange={handleChange}
                    value={values.l_name}
                  />
                </label>

                <label className="custom-label">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Phone*"
                    className="custom-input"
                    onChange={handleChange}
                    value={values.phone}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1">
                <label className="custom-label w-full">
                  <input
                    type="text"
                    id=""
                    placeholder="Email address*"
                    className="custom-input"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </label>
              </div>

              <div className="pt-7">
                <div className="flex flex-col pb-6">
                  <label className="block pb-2 font-bold text-sm text-gray-dark">
                    Date of Birth
                  </label>
                  <DateInput
                    selectedDate={values.dob}
                    className="custom-select w-full"
                    // handleDateChange={handleDobChange}
                    showYearDropdown
                    scrollableYearDropdown
                    maxDate={new Date("2012-12-30")}
                  />
                  {errors.dob && touched.dob && (
                    <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                      {errors.dob}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 pt-5">
                <label className="custom-label w-full">
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    placeholder="Address*"
                    className="custom-input"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-5">
                <label className="custom-label">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="City"
                    className="custom-input"
                  />
                </label>

                <div className="relative">
                  <select name="" id="" className="custom-select">
                    <option value="">State</option>
                    <option value="">State</option>
                    <option value="">State</option>
                  </select>
                </div>

                <label className="custom-label">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Zip Code"
                    className="custom-input"
                  />
                </label>
              </div>
            </div>

            <div className="pt-8">
              <p className="pb-8 font-bold text-xl text-gray-dark">
                Login Information
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 items-end gap-y-3 gap-x-5">
                <div>
                  <label className="block pl-8 pb-1 font-bold text-gray-dark">
                    Username
                  </label>
                  <div className="custom-label">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Username"
                      value="sharukh123"
                      className="custom-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block pl-8 pb-1 font-bold text-gray-dark">
                    Password
                  </label>
                  <div className="custom-label">
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Password"
                      value="12345678"
                      className="custom-input"
                    />
                  </div>
                </div>

                <div>
                  <a
                    href="#"
                    className="btn-blue h-[55px] flex justify-center items-center"
                  >
                    <span>Change Password</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 items-end gap-y-3 gap-x-5 pt-12">
                <div>
                  <a
                    href="#"
                    className="btn-blue h-[55px] flex justify-center items-center"
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  // Get Profile Data
  const profileRes = await fetch(`${apiPath}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  const profileData = await profileRes.json();
  return {
    props: { profileData },
  };
}
