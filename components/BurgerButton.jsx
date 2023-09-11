import React from "react";

const BurgerButton = (props) => {
    const onClick = props.onClick
  return (
    <button
      onClick={onClick}
      className="relative w-6 xxl:w-10 h-4 xxl:h-6 cursor-pointer"
      id="navigationOpen"
    >
      <span className="block absolute inset-x-0 top-0 w-full h-[0.125rem] xxl:h-1 bg-black group-[.active-scroll]:bg-brown-1"></span>
      <span className="block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.125rem] xxl:h-1 bg-black group-[.active-scroll]:bg-brown-1"></span>
      <span className="block absolute inset-x-0 bottom-0 w-full h-[0.125rem] xxl:h-1 bg-black group-[.active-scroll]:bg-brown-1"></span>
    </button>
  );
};

export default BurgerButton;
