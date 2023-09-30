import { getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { formatPrice } from "@/utils/formatPrice";
import OrderSummary from "@/components/OrderSummary/OrderSummary";

const ThankYou = ({ orderData }) => {
  console.log(orderData);
  return (
    <>
      <Head>
        <title>Limosia - Payment Success</title>
      </Head>
      <div className="main-container pb-8 pt-16 mt-20">
        <p className="title-orange">Booking Successful</p>
      </div>

      <div className="main-container pb-12">
        <div className="main-content lg:basis-[calc((100%-20px)*(60/100))] xxl:basis-[738px]">
          <div className="px-4 py-8 md:p-6 xl:p-[52px] rounded-[15px] box-shadow">
            <p className="title pb-8">
              <span className="pr-5 text-gray-dark">Booking#</span>
              <span className="font-karla underline">{orderData.order_no}</span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <p className="pb-3 text-gray-dark">
                  Name :{" "}
                  <span className="font-bold text-black-2">{`${orderData.f_name} ${orderData.l_name}`}</span>
                </p>
                <p className="pb-3 text-gray-dark">
                  Phone :
                  <span className="font-bold text-black-2">
                    {orderData.phone}
                  </span>
                </p>
                <p className="pb-3 text-gray-dark">
                  Email :{" "}
                  <span className="font-bold text-black-2">
                    {orderData.email}
                  </span>
                </p>
                <p className="pb-3 text-gray-dark">
                  Address :<br />
                  <span className="font-bold text-black-2">
                    {orderData.address}
                  </span>
                </p>

                <p className="pb-3 text-gray-dark">
                  <span className="font-bold text-black-2"></span>
                </p>
              </div>

              <div className="max-lg:pb-8">
                <p className="pb-3 text-gray-dark">
                  Car Model :{" "}
                  <span className="font-bold text-black-2">
                    {orderData.car_class_name}
                  </span>
                </p>
                <p className="pb-3 text-gray-dark">
                  Max Pax :{" "}
                  <span className="font-bold text-black-2">
                    {orderData.total_guest} peoples
                  </span>
                </p>
                <p className="pb-3 text-gray-dark">
                  Max Luggage :{" "}
                  <span className="font-bold text-black-2">
                    {orderData.total_suitcase} pcs
                  </span>
                </p>
              </div>
            </div>

            <div>
              <p className="pb-3 text-gray-dark">
                Date :{" "}
                <span className="font-bold text-black-2">
                  {orderData.pickup_date}
                </span>
              </p>
              <p className="pb-3 text-gray-dark">
                From :{" "}
                <span className="font-bold text-black-2">
                  {orderData.pickup_point}
                </span>
              </p>
              <p className="pb-3 text-gray-dark">
                To :{" "}
                <span className="font-bold text-black-2">
                  {orderData.destination_point}
                </span>
              </p>
              <p className="pb-3 text-gray-dark">
                Total :{" "}
                <span className="font-bold text-black-2">
                  {orderData.range}
                </span>
              </p>
            </div>
          </div>
        </div>
        <OrderSummary orderData={orderData} />
      </div>

      <div className="main-container pb-32">
        <div className="w-full pt-10 border-t border-t-[#D9D9D9]">
          <div className="flex justify-between max-md:flex-col max-md:items-center max-md:gap-5">
            <div className="w-[325px] max-w-100">
              <Link
                href={`/`}
                className="btn-blue flex justify-between items-center w-full px-10 py-3 text-2xl bg-transparent border border-blue-light"
              >
                <img
                  src="/assets/images/icons/ph_arrow-up-bold-gray-dark.svg"
                  alt="Icon"
                />
                <span className="text-gray-dark">Back to Homepage</span>
              </Link>
            </div>
            <div className="w-[325px] max-w-100">
              <Link
                href={`/car-className`}
                className="btn-blue flex justify-between items-center w-full px-10 py-3 text-2xl"
              >
                <span>Book Other Cars</span>
                <img
                  src="/assets/images/icons/ph_arrow-up-bold.svg"
                  alt="Icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { order_id } = context.query;
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const session = await getServerSession(context.req, context.res, authOptions);
  const access_token = session.access_token;

  const getOrderResponse = await fetch(`${apiPath}/orders/${order_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const orderData = await getOrderResponse.json();
  console.log(orderData);
  return {
    props: {
      orderData,
    },
  };
}

export default ThankYou;
