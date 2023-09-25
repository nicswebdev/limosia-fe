import Image from "next/image";
import Head from "next/head";
import Hero from "@/components/Hero/Hero";
import CarClass from "@/components/CarClass";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WhyCard from "@/components/WhyCard";
import WorksCard from "@/components/WorksCard";
import TestimoniCard from "@/components/TestimoniCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home({ carClassData, airportData, cheapestSchema }) {
  const responsive3 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Head>
        <title>Quicoo</title>
        <link rel="icon" href="/assets/qicco-logo-icon.png" />
      </Head>
      <Hero carClass={carClassData} airportData={airportData} cheapestSchema={cheapestSchema} />
      <div className="w-full flex items-center flex-col justify-center px-10 pt-[6%]">
        <h5 className="raleway text-[40px] font-bold text-[#FE5B02]">
          Book A Ride with Quicco
        </h5>
        <p className="karla font-bold text-[20px] text-[#868686]">
          Amco laboris nisi ut aliquip xea comod consequt duis aute irure dolor
          reprehenderit
        </p>
        <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
      </div>
      <div className="w-full md:mb-24">
        <Carousel
          responsive={responsive3}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={3200}
          showDots={false}
        >
          {carClassData.items.map((item, index) => {
            return (
              <>
                <CarClass
                  key={item.id}
                  image={item.image}
                  title={item.name}
                  guest={item.max_guest}
                  suitcase={item.max_suitcase}
                  description={item.description}
                  carid={item.id}
                />
              </>
            );
          })}
        </Carousel>
      </div>
      <div className="w-full bg-two-linear flex items-center flex-col justify-center px-10 py-[6%]">
        <h5 className="raleway text-[40px] font-bold text-white">
          Why Choose Us ?
        </h5>
        <p className="karla font-bold text-[20px] text-[#FBE6DB]">
          Amco laboris nisi ut aliquip xea comod
        </p>
        <div className="w-[10%] border-solid border-[1.5px] border-[#FFFFFF] mt-7"></div>
        <div className="flex md:py-10 md:px-14 md:flex-row flex-col">
          <WhyCard
            image={`/assets/icon-satisfaction.png`}
            title={`Our Customers Always 100% Satisfied`}
          />
          <WhyCard
            image={`/assets/icon-fastbook.png`}
            title={`We Provide Easier & Faster Bookings`}
          />
          <WhyCard
            image={`/assets/icon-pickup.png`}
            title={`Your Choice of Any Pickup Location`}
          />
        </div>
      </div>

      <div className="w-full flex items-center flex-col justify-center px-10 py-[6%]">
        <h5 className="raleway text-[40px] font-bold text-[#1BA0E2]">
          How it Works
        </h5>
        <p className="karla font-bold text-[20px] text-[#868686]">
          Amco laboris nisi ut aliquip xea comod consequt duis aute irure dolor
          reprehenderit
        </p>
        <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
        <div className="flex py-10 px-0 mt-24 md:flex-row flex-col">
          <div className="mb-32 sm:mb-60 lg:mb-0 sm:mt-10 md:mt-10 lg:mt-0">
            <WorksCard
              image={`/assets/icon-destination.png`}
              title={`Pick Destination`}
            />
          </div>

          <div className="mb-32 sm:mb-60 lg:mb-0">
            <WorksCard
              image={`/assets/icon-calendar.png`}
              title={`Pick a Date`}
            />
          </div>

          <div className="mb-32 sm:mb-60 lg:mb-0">
            <WorksCard
              image={`/assets/icon-car.png`}
              title={`Select Car Class`}
            />
          </div>
          <div className="mb-32 sm:mb-60 lg:mb-0">
            <WorksCard image={`/assets/icon-pay.png`} title={`Book & Pay`} />
          </div>
          <div className="mb-10 sm:mb-24 lg:mb-0">
            <WorksCard
              image={`/assets/icon-enjoy.png`}
              title={`Enjoy Your Ride`}
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#E8ECF2] flex items-center flex-col justify-center px-10 py-[6%]">
        <h5 className="raleway text-[40px] font-bold text-[#1BA0E2]">
          Our Travel Partners
        </h5>
        <p className="karla font-bold text-[20px] text-[#868686]">
          Amco laboris nisi ut aliquip xea comod consequt duis aute irure dolor
          reprehenderit
        </p>
        <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
        <div className="flex justify-center items-center w-full py-12 px-14 flex-col md:flex-row">
          <div className="relative w-full h-[25vh]">
            <Image
              src="/assets/travel.png"
              alt="partner"
              fill
              className="object-contain w-full"
            />
          </div>
          <div className="relative w-full h-[25vh]">
            <Image
              src="/assets/travel.png"
              alt="partner"
              fill
              className="object-contain w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center flex-col justify-center px-10 py-[6%]">
        <h5 className="raleway text-[40px] font-bold text-[#FE5B02]">
          What our client say
        </h5>
        <p className="karla font-bold text-[20px] text-[#868686]">
          Amco laboris nisi ut aliquip xea comod consequt duis aute irure dolor
          reprehenderit
        </p>
        <div className="w-[10%] border-solid border-[1.5px] border-[#868686] mt-7"></div>
        <div className="flex py-2 px-0 mt-24 flex-col md:flex-row">
          <TestimoniCard
            image={`/assets/icon-destination.png`}
            title={`Best Services, Nice Car, Cheap price`}
          />
          <TestimoniCard
            image={`/assets/icon-calendar.png`}
            title={`Best Services, Nice Car, Cheap price`}
          />
          <TestimoniCard
            image={`/assets/icon-car.png`}
            title={`Best Services, Nice Car, Cheap price`}
          />
          <TestimoniCard
            image={`/assets/icon-pay.png`}
            title={`Best Services, Nice Car, Cheap price`}
          />
        </div>
      </div>

      <div className="w-full bg-[#ED7A48] flex items-center flex-col justify-center px-10 py-[6%]">
        <h5 className="raleway text-[40px] font-bold text-white">
          Subscribe To Receive 20% Your FIrst Trip
        </h5>
        <p className="karla font-bold text-[20px] text-white">
          Sign up for our newsletter to get updated information,
          <br />
          promotion, or insight. Just drop your active email.
        </p>
        <div className="flex justify-center items-center w-full py-2 px-0 mt-12">
          <div className="flex bg-white w-[100%] md:w-[70%] p-2 rounded-[60px]">
            <input
              type="text"
              className="outline-none p-2 karla font-bold text-[16px] w-[80%]"
              placeholder="Fill up your email here"
            />
            <button className="justify-self-end text-[1rem] md:text-[1.5rem] bg-[#1BA0E2] py-2 px-4 md:px-16 text-[20px] rounded-[50px] karla text-white font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const carClassData = await fetch(
    `${apiPath}/car-class?page=1&limit=10&sortBy=ASC`
  ).then((res) => res.json());

  const airportData = await fetch(
    `${apiPath}/airports?page=1&limit=9999&sortBy=ASC`
  ).then((res) => res.json());

  const schemaData = await fetch(
    `${apiPath}/price-schema?page=1&limit=999999&sortBy=ASC`
  ).then((res) => res.json());

  const selectCheapestSchema = () => {
    let uniqueCarClasses = {};
    let filteredItems = [];

    schemaData.items.forEach((item) => {
      if (!uniqueCarClasses[item.car_class.name]) {
        uniqueCarClasses[item.car_class.name] = true;
        filteredItems.push(item);
      }
    });

    filteredItems.sort((a, b) => a.base_price - b.base_price);

    let threeCheapestUniqueCarClasses = filteredItems.slice(0, 3);

    return threeCheapestUniqueCarClasses;
  };
  const cheapestSchema = selectCheapestSchema();
  console.log(cheapestSchema)
  // // to check if fetching the right user
  // const session = await getServerSession(context.req, context.res, authOptions);
  // //Check if get user data
  // if (session) {
  //   const res = await fetch(`${apiPath}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session.access_token}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // }

  return {
    props: {
      carClassData,
      airportData,
      cheapestSchema
    },
  };
}
