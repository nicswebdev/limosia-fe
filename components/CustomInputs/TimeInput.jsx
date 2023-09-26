import React, { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";

const TimeInput = (props) => {
  const { className, value, onChange, name, onBlur } = props;
  return (
    <TimePicker
      name={name}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      className={className}
      disableClock
    />
  );
};

export default TimeInput;
