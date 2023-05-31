import React from "react";

const spinner = () => {
  return (
    <div className="justify-center m-auto pr-[2rem] ">
      {" "}
      <div
        class="w-12 h-12 rounded-full animate-spin absolute  
    border-8 border-solid border-purple-500 border-t-transparent"
      ></div>
    </div>
  );
};

export default spinner;
