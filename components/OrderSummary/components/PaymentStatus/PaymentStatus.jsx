import React from "react";

const PaymentStatus = (props) => {
  const { payment_status } = props;
  console.log(payment_status);
  return (
    <div>
      <p className="title pb-6">Payment {payment_status.name} </p>
      {payment_status.id === 2 && (
        <div className="flex items-center gap-3 pb-9 mb-5 border-b border-b-[#D9D9D9]">
          <div className="flex-shrink-0">
            <img src="/assets/images/icons/mastercard.jpg" alt="Mastercard" />
          </div>

          <div>
            <p className="text-gray-dark">
              ending in : <span className="font-bold text-black-2">3456</span>
            </p>
            <p className="text-gray-dark">
              payed at :{" "}
              <span className="font-bold text-black-2">
                21/05/2023 at 12:00am
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
