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
    selectedDate,
  } = props;
  // console.log(selectedDate)
  // const selectedDateObject = new Date(selectedDate);
  // console.log(selectedDateObject)

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

  const ArrivalCustomInput = forwardRef(function MyInput(
    { value, onClick },
    ref
  ) {
    const selectedDates = new Date(value);
    return (
      <input
        readOnly
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
      // onSelect={handleDateSelect}
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
