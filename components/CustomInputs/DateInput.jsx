import { useRouter } from "next/router";
import React, { useState, forwardRef, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  const {
    handleDateChange,
    className,
    minDate,
    maxDate,
    scrollableYearDropdown,
    yearDropdownItemNumber,
    showYearDropdown,
    currentDate,
  } = props;
  const today = new Date();
  const tomorrow = new Date(today);
  const router = useRouter();
  const selectedDate = props.selectedDate;

  // useEffect(() => {
  //   handleDateChange(unfixedDate);
  // }, [unfixedDate]);

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
  };

  const ArrivalCustomInput = forwardRef(function MyInput(
    { value, onClick },
    ref
  ) {
    const selectedDates = new Date(value);
    return (
      <input
        onClick={onClick}
        ref={ref}
        id="checkins"
        type="text"
        value={
          selectedDates.getUTCDate() +
          ` ` +
          monthNames[selectedDates.getUTCMonth()] +
          ` ` +
          selectedDates.getUTCFullYear()
        }
        className={className}
      />
    );
  });
  return (
    //   Date Field
    <ReactDatePicker
      selected={selectedDate}
      dateFormat="yyyy-MM-dd"
      onChange={(date) => handleDateChange(date)}
      onSelect={handleDateSelect}
      minDate={minDate}
      maxDate={maxDate}
      customInput={<ArrivalCustomInput />}
      showYearDropdown={showYearDropdown}
      scrollableYearDropdown={scrollableYearDropdown}
      yearDropdownItemNumber={yearDropdownItemNumber}
    />
  );
};

export default DateInput;
