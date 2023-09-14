import React from "react";

const LoginModal = (props) => {
  const closeModal = props.closeModal;
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t bg-[#ED7A48]">
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={closeModal}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                X
              </span>
            </button>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <h5>Please log in to continue booking</h5>
          </div>
          <div className="flex justify-center text-white">
            <button
              className="mb-5 bg-[#ED7A48] rounded w-1/2 py-1"
              onClick={() => {
                sessionStorage.setItem('bookLink','/car-details')
                window.location.href = "/login";
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
