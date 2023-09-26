import CheckoutBookingDetails from "@/components/Checkout/CheckoutBookingDetails/CheckoutBookingDetails";
import LoadingPage from "@/components/LoadingPage";
import { useFindHotelAddress } from "@/hooks/useFindHotelAddress";
import { useFindRelevantSchema } from "@/hooks/useFindRelevantSchema";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DateInput from "@/components/CustomInputs/DateInput";
import TimePicker from "react-time-picker";
import TimeInput from "@/components/CustomInputs/TimeInput";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { generateRandomOrderId } from "@/utils/generateRandomOrderId";
import { useSession } from "next-auth/react";

const Checkout = ({ thisAirport, allSchema, carData }) => {
  const { data: session, status } = useSession();
  console.log(session);

  const router = useRouter();
  const { date, booking_type, hotel_place_id, guest_number } = router.query;

  const relevantSchema = useFindRelevantSchema(
    carData,
    thisAirport.place_id,
    allSchema,
    hotel_place_id,
    guest_number
  );
  // console.log(relevantSchema)

  const hotelAddress = useFindHotelAddress(hotel_place_id);

  const validationSchema = Yup.object().shape({
    f_name: Yup.string().required("First Name is required"),
    l_name: Yup.string().required("Last Name is required"),
    // email: Yup.string()
    //   .required("Email is required")
    //   .email("Please provide a valid email format"),
    phone: Yup.string().required("Phone is required"),
    dob: Yup.date().required("Birth Date is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    flight_number: Yup.string().required("Flight Number is required"),
    pickup_time: Yup.string().required("Arrival Time is required"),
  });
  const formik = useFormik({
    initialValues: {
      order_no: "",
      f_name: "",
      l_name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      flight_number: "",
      pickup_time: "",
      dob: new Date("2001-03-25"),
    }, // Pass the Yup schema to validate the form
    validationSchema: validationSchema,

    // Handle form submission
    onSubmit: async (
      {
        f_name,
        l_name,
        phone,
        dob,
        address,
        city,
        state,
        zip_code,
        pickup_time,
        flight_number,
      },
      { setErrors }
    ) => {
      let pickup_point = "";
      let destination_point = "";
      if (booking_type === "airportpickup") {
        pickup_point = relevantSchema.schema.airport.name;
        destination_point = hotelAddress;
      }
      if (booking_type === "airportdropoff") {
        pickup_point = hotelAddress;
        destination_point = relevantSchema.schema.airport.name;
      }
      // const pickup_date = new Date(date.getTime() - 8 * 60 * 60 * 1000);
      const range = relevantSchema.range.value;
      const total_price = relevantSchema.schema.base_price;
      const price_schema_name = relevantSchema.schema.tier_name;
      const car_class_name = relevantSchema.schema.car_class.name;
      const airport_name = relevantSchema.schema.airport.name;
      const order_no = generateRandomOrderId(f_name);
      const formData = {
        order_no,
        f_name,
        l_name,
        phone,
        dob,
        address,
        city,
        state,
        zip_code,
        pickup_point,
        destination_point,
        pickup_date: new Date(new Date(date).getTime() - 8 * 60 * 60 * 1000),
        pickup_time,
        flight_number,
        total_guest: guest_number,
        total_suitcase: 0,
        car_class_name,
        airport_name,
        range,
        total_price,
        price_schema_name,
        order_currency: "THB",
        payment_status_id: 1,
        order_status_id: 1,
      };
      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      const res = await fetch(`${apiPath}/orders`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const resData = await res.json();
      console.log(resData);
      if (!res.ok) {
        alert("Internal Server Error");
        return;
      }
      router.push(`/thank-you?order_id=${resData.id}`);
      return;
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

  const handleTimeChange = (value) => {
    setFieldValue("pickup_time", value);
  };

  // const [dob, setDob] = useState(new Date());
  const handleDobChange = (value) => {
    setFieldValue("dob", value);
  };

  return (
    <>
      <Head>
        <title>Limosia - Checkout</title>
      </Head>
      {!relevantSchema ? (
        <LoadingPage />
      ) : (
        <>
          <div className="main-container pb-9 mt-28">
            <p className="title-orange">Checkout</p>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="main-container pb-20 lg:pb-32"
          >
            <div className="main-content lg:basis-[calc((100%-20px)*(60/100))] xxl:basis-[630px]">
              <p className="title pb-8">Details</p>
              <div className="pb-8">
                {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-3">
                  <div className="relative">
                    <span className="absolute top-[10px] left-8 text-xs text-gray-dark">
                      Title
                    </span>
                    <select name="" id="" className="custom-select pt-6">
                      <option value="">Mr.</option>
                      <option value="">Mr.</option>
                      <option value="">Mr.</option>
                    </select>
                  </div>
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-5">
                  <div className="flex flex-col">
                    <label className="block pb-2 font-bold text-sm text-gray-dark">
                      First Name
                    </label>
                    <label className="custom-label">
                      <input
                        type="text"
                        name="f_name"
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        value={formik.values.f_name}
                        placeholder="First Name*"
                        className="custom-input"
                      />
                    </label>
                    {errors.f_name && touched.f_name && (
                      <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                        {errors.f_name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="block pb-2 font-bold text-sm text-gray-dark">
                      Last Name
                    </label>
                    <label className="custom-label">
                      <input
                        type="text"
                        name="l_name"
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        value={formik.values.l_name}
                        placeholder="Last Name*"
                        className="custom-input"
                      />
                    </label>
                    {errors.l_name && touched.l_name && (
                      <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                        {errors.l_name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="block pb-2 font-bold text-sm text-gray-dark">
                      Phone
                    </label>
                    <label className="custom-label">
                      <input
                        type="text"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={handleBlur}
                        placeholder="Phone*"
                        className="custom-input"
                      />
                    </label>
                    {errors.phone && touched.phone && (
                      <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col pb-6">
                <label className="block pb-2 font-bold text-sm text-gray-dark">
                  Date of Birth
                </label>
                <DateInput
                  selectedDate={formik.values.dob}
                  className="custom-select w-full"
                  handleDateChange={handleDobChange}
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

              <div className="flex flex-col pb-3">
                <label className="block pb-2 font-bold text-sm text-gray-dark">
                  Address
                </label>
                <label className="custom-label w-full">
                  <input
                    type="text"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    value={formik.values.address}
                    placeholder="Address"
                    className="custom-input"
                  />
                </label>
                {errors.address && touched.address && (
                  <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-5">
                <div className="flex flex-col">
                  <label className="block pb-2 font-bold text-sm text-gray-dark">
                    City
                  </label>
                  <label className="custom-label">
                    <input
                      type="text"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      value={formik.values.city}
                      placeholder="City"
                      className="custom-input"
                    />
                  </label>
                  {errors.city && touched.city && (
                    <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="block pb-2 font-bold text-sm text-gray-dark">
                    State
                  </label>
                  <label className="custom-label">
                    <input
                      type="text"
                      name="state"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      value={formik.values.state}
                      placeholder="State"
                      className="custom-input"
                    />
                  </label>
                  {errors.state && touched.state && (
                    <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="block pb-2 font-bold text-sm text-gray-dark">
                    Zip Code{" "}
                  </label>
                  <label className="custom-label">
                    <input
                      type="text"
                      name="zip_code"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      value={formik.values.zip_code}
                      placeholder="Zip Code"
                      className="custom-input"
                    />
                  </label>
                  {errors.zip_code && touched.zip_code && (
                    <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                      {errors.zip_code}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 pt-3 gap-4">
                <div className="flex flex-col">
                  <label className="block pb-2 font-bold text-sm text-gray-dark">
                    Flight Number
                  </label>
                  <label className="custom-label w-full">
                    <input
                      type="text"
                      name="flight_number"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      value={formik.values.flight_number}
                      placeholder="Flight Number"
                      className="custom-input"
                    />
                  </label>
                  {errors.flight_number && touched.flight_number && (
                    <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                      {errors.flight_number}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="block pb-2 font-bold text-sm text-gray-dark">
                    Arrival Time
                  </label>
                  <TimeInput
                    name="pickup_time"
                    value={formik.values.pickup_time}
                    onBlur={handleBlur}
                    onChange={handleTimeChange}
                    className="custom-label"
                  />
                  {errors.pickup_time && touched.pickup_time && (
                    <p className="ml-4 mt-1 text-[#FF3333] font-bold karla text-sm">
                      {errors.pickup_time}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="sidebar lg:basis-[calc((100%-20px)*(40/100))] xxl:basis-[524px] max-lg:pt-10">
              <div className="w-full px-4 py-8 md:p-6 xl:p-10 rounded-[20px] bg-orange-light text-white [&_*]:!text-white">
                <CheckoutBookingDetails
                  bookingDetails={relevantSchema}
                  hotelAddress={hotelAddress}
                  pickupDate={date}
                />
                <div className="pt-12 pb-8">
                  <label className="relative block pl-11">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="custom-input"
                    />
                    I Read and agree to term & conditions
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-blue flex justify-between items-center w-full py-3 text-2xl"
                  >
                    <span>Continue to Payment</span>
                    <img
                      src="/assets/images/icons/ph_arrow-up-bold.svg"
                      alt="Icon"
                      className="[&amp;>path]:fill-blue-light"
                    />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const { airport_id, car_class_id } = context.query;

  const apiPath = process.env.NEXT_PUBLIC_API_PATH;

  const thisAirport = await fetch(`${apiPath}/airports/${airport_id}`).then(
    (res) => res.json()
  );
  const allSchema = await fetch(
    `${apiPath}/price-schema?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());

  const res = await fetch(`${apiPath}/car-class/${car_class_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const carData = await res.json();

  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // const access_token = session.access_token;

  return {
    props: {
      thisAirport,
      allSchema,
      // access_token:,
      carData,
    },
  };
}
