import React, { useContext } from "react";
import { Link as Route, useLocation } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { UserContext } from "../../context/userContext";
import Cookies from "js-cookie";
import { IoHome } from "react-icons/io5";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <div className="shadow-sm p-0 w-full fixed top-0 left-0 bg-white z-50">
      <div className="flex justify-between mx-10 items-center p-2">
        <div>
          <h1 className="text-3xl font-extrabold text-yellow-400">
            <Route to="/">Here to Hear</Route>
          </h1>
        </div>
        <div>
          {isHome && (
            <>
              <span className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
                <Route to="/">Home</Route>
              </span>
              <Route to="/pick">
                <span className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
                  Podcast
                </span>
              </Route>
              <span className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
                <Scroll to="connect" smooth={true} duration={500}>
                  Connect
                </Scroll>
              </span>
              <span className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
                <Scroll to="contact" smooth={true} duration={500}>
                  Contact Us
                </Scroll>
              </span>
            </>
          )}
          {!isHome && (
            <div className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
              <IoHome
                className=""
                onClick={() => window.location.replace("/")}
              />
            </div>
          )}
          {isHome && (
            <>
              {user ? (
                <span
                  className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              ) : (
                <Route to="/login">
                  <span className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
                    Login
                  </span>
                </Route>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
