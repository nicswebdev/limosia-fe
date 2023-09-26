import { formatPrice } from "@/utils/formatPrice";
import React from "react";
import PaymentStatus from "./components/PaymentStatus/PaymentStatus";

const OrderSummary = (props) => {
  const { orderData } = props;
//   console.log(orderData);
  return (
    <div className="sidebar lg:basis-[calc((100%-20px)*(40/100))] xxl:basis-[440px] max-lg:pt-10">
      <div>
        <p className="title pb-8">Order Summary</p>

        <PaymentStatus payment_status={orderData.payment_status} />

        <ul className="[&>li]:flex [&>li]:justify-between [&>li]:items-center [&>li]:gap-2">
          <li>
            <span>Vehicle Subtotal: </span>
            <span>THB {formatPrice(orderData.total_price)}</span>
          </li>
          <li>
            <span>Tax:</span>
            <span>THB 0</span>
          </li>
          <li className="title pt-3 max-sm:flex-col">
            <span>Your total price:</span>
            <span>THB {formatPrice(orderData.total_price)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;
