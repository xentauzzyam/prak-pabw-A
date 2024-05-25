import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function HomePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["TOKEN"]);

  const handleLogin = (token) => {
    setCookie("TOKEN", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000), 
    });
  };

  return (
    <div className="flex flex-col min-h-screen">  {/* Added min-height for full viewport */}
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Praktikum PABW</h1>

        {cookies.TOKEN ? (
          <button
            type="button"
            onClick={() => removeCookie("TOKEN")}
            className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className="px-2 py-1 text-white hover:underline">
              Login
            </Link>
            <Link to="/register" className="px-2 py-1 text-white hover:underline">
              Register
            </Link>
          </div>
        )}
      </header>

      {/* Main content */}
      <section className="flex flex-col w-full px-4 py-8">  {/* Changed width to w-full for responsiveness */}
        {/* Your existing content goes here */}
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
          <div className="flex flex-wrap">  {/* Added flex-wrap for responsive layout */}
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
            className="w-1/2 px-8 py-8 space-y-4 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100">
            Ke Page 18+
          </Link>
          <button
            type="button"
            onClick={() => removeCookie("TOKEN")}
            className="w-1/2 px-8 py-8 space-y-4 transition duration-75 ease-in-out rounded-md shadow hover:bg-gray-100">
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
        className="px-8 py-8 bg-gray-100 rounded-md shadow cursor-not-allowed text-start">
        Minggu 4
      </button>
      </section>
    </div>
  );
}
