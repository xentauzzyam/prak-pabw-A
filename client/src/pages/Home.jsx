import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
      {/* Main content */}
      <section className="flex flex-col w-full px-4 py-8">
        <Link
          to={"/week-1"}
          className="px-4 py-4 space-y-2 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100"
        >
          <h1>Minggu 1</h1>
          <p className="text-xl font-bold">GET, POST, Upload, & Download</p>
        </Link>
        <div className="flex flex-col w-full px-4 py-4 space-y-2 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100">
          <h1>Minggu 2</h1>
          <p className="text-xl font-bold">
            Login Page, Register Page dan Cookies
          </p>
          <div className="flex flex-wrap">
            <Link
              to={"/login"}
              className="w-1/2 px-4 py-2 space-y-2 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100"
            >
              Ke Login page
            </Link>
            <Link
              to={"/register"}
              className="w-1/2 px-4 py-2 space-y-2 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100"
            >
              Ke Register Page
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full px-8 py-8 space-y-4 transition duration-75 ease-in-out rounded-md shadow">
          <h1>Minggu 3</h1>
          <p className="text-2xl font-bold">Hanya 18+, User-Roles, Signout</p>
          <div className="flex">
            <Link
              to={"/bahaya"}
              className="w-1/2 px-8 py-8 space-y-4 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100"
            >
              Ke Page 18+
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-1/2 px-8 py-8 space-y-4 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full px-8 py-8 space-y-4 transition duration-75 ease-in-out rounded-md shadow">
          <h1>Minggu 4</h1>
          <p className="text-2xl font-bold">Logs</p>
          <p className="text-lg">Logs di-implementasikan di Back-End</p>
        </div>
        <button
          type="button"
          disabled
          className="px-8 py-8 bg-gray-100 rounded-md shadow cursor-not-allowed text-start"
        >
          Minggu 4
        </button>
      </section>
    </div>
  );
}
