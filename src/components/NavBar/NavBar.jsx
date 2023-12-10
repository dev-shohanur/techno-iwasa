import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

// Add this style to your css file

const NavBar = ({ isOpen, setIsOpen }) => {
  const navRef = useRef();
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="bg-white w-full top-0 z-20 fixed left-0 shadow-md">
      <div className="flex items-center px-4  justify-between mx-auto md:px-8">
        <div className="flex justify-between gap-6">
          <div className="lg:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <Link to="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>
        </div>

        <div
          className={`flex justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto overflow-auto pr-4`}
        >
          {!user?._id ? (
            <Link
              to="/auth/signin"
              className="py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0"
            >
              Login
            </Link>
          ) : (
            <div className="py-4 px-4">
              <div className="flex items-center gap-x-4">
                <div>
                  <span className="block text-gray-700 text-sm font-semibold">
                    {user?.name}
                  </span>
                  <button
                    onClick={() => logOut()}
                    className="px-3 rounded cursor-pointer py-1 bg-red-700 text-white"
                  >
                    Log Out
                  </button>
                </div>
                <img src={user?.pp_url} className="w-12 h-12 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
