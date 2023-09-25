import { useRouter } from "next/router";
import React, { useState, forwardRef, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  const { handleDateChange, className } = props;
  const today = new Date();
  const tomorrow = new Date(today);
  const router = useRouter();
  const { date } = router.query;
  const [unfixedDate, setUnfixedDate] = useState(new Date());

  useEffect(() => {
    if (!date) {
      return;
    }
    setUnfixedDate(new Date(date));
  }, [date]);

  useEffect(() => {
    handleDateChange(unfixedDate);
  }, [unfixedDate]);

  const [checkout, setCheckout] = useState(tomorrow);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  tomorrow.setDate(tomorrow.getDate() + 1);
  const handleDateSelect = (value) => {
    const tomorrow = new Date(value);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckout(tomorrow);
    console.log(checkout);
  };

  const ArrivalCustomInput = forwardRef(function MyInput(
    { value, onClick },
    ref
  ) {
    const selectedDate = new Date(value);
    return (
      <input
        onClick={onClick}
        ref={ref}
        id="checkins"
        type="text"
        value={
          selectedDate.getDate() +
          ` ` +
          monthNames[selectedDate.getMonth()] +
          ` ` +
          selectedDate.getFullYear()
        }
        className={className}
      />
    );
  });
  return (
    //   Date Field
    <ReactDatePicker
      selected={unfixedDate}
      dateFormat="yyyy-MM-dd"
      onChange={(date) => setUnfixedDate(date)}
      onSelect={handleDateSelect}
      minDate={today}
      customInput={<ArrivalCustomInput />}
    />
  );
};

export default DateInput;
