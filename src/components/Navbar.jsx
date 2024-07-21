import React from "react";

const Navbar = () => {
  return (
    <div className="flex bg-indigo-900  justify-around text-white p-2">
      <div className="logo mx-4">
        <span className="font-bold text-xl cursor-pointer">iTasks</span>
      </div>
      <ul className="flex gap-4 mx-6">
        <li className="hover:font-bold cursor-pointer transition-all duration-100">
          Home
        </li>
        <li className="hover:font-bold cursor-pointer transition-all duration-100">
          {" "}
          Your Tasks
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
