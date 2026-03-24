import React from "react";

export default function BaseSelection() {
  return (
    <div
      className="bg-zinc-800 rounded-[3rem] p-6 text-white
     w-full lg:w-1/4 flex flex-col items-center shadow-lg"
    >
      <div
        className="w-10 h-10 rounded-full bg-gray-700 
        flex items-center justify-center mb-4"
      >
        2
      </div>
      <div className="w-full space-y-4">
        <div
          className="border-b border-gray-600 pb-2
        flex justify-end gap-4 items-center"
        >
          <span>Item 1</span>
        </div>
        <div
          className="border-b border-gray-600 pb-2
        flex justify-end gap-4 items-center"
        >
          <span>Item 2</span>
        </div>
        <div
          className="border-b border-gray-600 pb-2
        flex justify-end gap-4 items-center"
        >
          <span>Item 3</span>
        </div>
      </div>
    </div>
  );
}
