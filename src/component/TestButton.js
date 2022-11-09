import React from "react";

const TestButton = () => (
  <button
    type="button"
    onClick={() => console.log("test réussi (button)")}
    className=" hover:bg-gray-50  active:bg-gray-100 active:ring-1 active:ring-offset-1 active:ring-gray-500 text-gray-700 bg-white border border-gray-300 flex text-center shadow-sm text-sm rounded px-6 py-3  appearance-none"
  >
    Button Test
  </button>
);

export default TestButton;
