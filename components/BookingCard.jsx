import React from "react";

const BookingCard = (props) => {
  const { bookingData, className } = props;

  const StatusView = (props) => {
    const { status } = props;
    const Template = (props) => {
      const { status, statusTextColor, imgPath } = props;
      return (
        <div className="flex items-center gap-5">
          {/* C:\Users\Renaisan\Desktop\Bukan Bokep\BiruDaunProjects\limosia-fe\public\assets\images\icons\icon-park-outline_check-one-gray.svg */}
          <img src={imgPath} alt="Icon" />
          <div>
            <p className="font-bold text-xs text-black">Status</p>
            <p className={`text-xs text-[${statusTextColor}]`}>{status}</p>
          </div>
        </div>
      );
    };
    const views = {
      1: (
        <Template
          imgPath="./assets/images/icons/icon-park-outline_check-one-gray.svg"
          status="Pending"
        />
      ),
      2: (
        <Template
          imgPath="./assets/images/icons/icon-park-outline_check-one-green.svg"
          statusTextColor="#319F43"
          status="Completed"
        />
      ),
    };

    const CurrentStatusView = views[status];
    return CurrentStatusView;
  };

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="car-card">
        <div className="image-wrap md:!basis-1/4">
          <img
            src={bookingData.car_class.image}
            alt="Car"
            className="max-w-full px-2"
          />
        </div>

        <div className="detail-wrap">
          <p className="title">{bookingData?.car_class_name}</p>
          <p className="font-bold text-gray-dark">
            {bookingData.car_class.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-5 pt-5">
            <div className="flex items-center gap-5">
              <img src="./assets/images/icons/uiw_date.svg" alt="Icon" />
              <div>
                <p className="font-bold text-xs text-black">DATE</p>
                <p className="text-xs text-gray-dark">
                  {bookingData?.pickup_date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <img
                src="./assets/images/icons/mingcute_flight-takeoff-line.svg"
                alt="Icon"
              />
              <div>
                <p className="font-bold text-xs text-black">Flight #</p>
                <p className="text-xs text-gray-dark">
                  {bookingData.flight_number}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <img
                src="./assets/images/icons/ion_time-outline.svg"
                alt="Icon"
              />
              <div>
                <p className="font-bold text-xs text-black">Time</p>
                <p className="text-xs text-gray-dark">
                  {bookingData.pickup_time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <img
                src="./assets/images/icons/icon-park-outline_to-bottom.svg"
                alt="Icon"
              />
              <div>
                <p className="font-bold text-xs text-black">From</p>
                <p className="text-xs text-gray-dark">
                  {bookingData.pickup_point.slice(0, 20) + "..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <img
                src="./assets/images/icons/icon-park-outline_to-bottom.svg"
                alt="Icon"
                className="rotate-180"
              />
              <div>
                <p className="font-bold text-xs text-black">To</p>
                <p className="text-xs text-gray-dark">
                  {bookingData.destination_point.slice(0, 20) + "..."}
                </p>
              </div>
            </div>

            <StatusView status={bookingData.order_status.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
