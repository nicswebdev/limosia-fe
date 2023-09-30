import Head from "next/head";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import BookingCard from "@/components/BookingCard";

const Dashboard = ({ bookingData, userData }) => {
  return (
    <>
      <Head>
        <title>Limosia - Dashboard</title>
      </Head>
      <div className="main-container pt-6 pb-8 mt-28">
        <ul className="breadcrumb-list">
          <li>
            <a
              href="javascript:void(0)"
              className="flex flex-row items-center gap-[10px]"
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
      <div className="main-container pb-20 lg:pb-32">
        <div className="sidebar">
          <ul className="list-menu">
            <li>
              <Link href={`/dashboard`} className="active">
                <img src="./assets/images/icons/uil_dashboard.svg" alt="Icon" />
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

        <div className="main-content">
          <div className="pb-5 border-b border-b-[#D9D9D9]">
            <p className="title-orange">Dashboard</p>
            <p className="font-bold text-xl text-gray-dark">
              You are signed in as {`${userData.f_name} ${userData.l_name} `}
              {/* <Link
                href={`/`}
                className="border-b border-b-[#285CA7] text-[#285CA7] hover:border-b-transparent duration-700"
              >
                LOG OUT
              </Link>{" "} */}
              {/* now */}
            </p>
          </div>

          <p className="title py-5">Your Current Booking</p>
          <div className="grid grid-cols-1 gap-8">
            {bookingData &&
              bookingData.map((booking) => {
                return <BookingCard key={booking.id} bookingData={booking} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

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
  const userData = session.user;
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  // get booking data
  const bookingDataRes = await fetch(
    `${apiPath}/orders/me?page=1&limit=9999999&sortBy=ASC`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );
  const bookingData = await bookingDataRes.json();
  return {
    props: {
      bookingData: bookingData.items,
      userData,
    },
  };
}
