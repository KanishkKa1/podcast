import React, { useContext } from "react";
import { Link as Route } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { UserContext } from "../../context/userContext";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    document.cookie = "token=;path=/;max-age=-1";
  };

  return (
    <div className="shadow-2xl p-1 w-full fixed top-0 left-0 bg-white">
      <div className="flex justify-between mx-10 items-center p-3">
        <div>
          <h1 className="text-3xl font-extrabold text-yellow-400">
            Here to Hear
          </h1>
        </div>
        <div>
          <span className="text-xl font-bold mx-5 p-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-white cursor-pointer">
            <Scroll to="home" smooth={true} duration={500}>
              Home
            </Scroll>
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
        </div>
      </div>
    </div>
  );
};

export default Nav;
