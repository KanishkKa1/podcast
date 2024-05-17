import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signin = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: userData } = await axios.post("/api/v1/user/signin", data);
      if (userData.error) {
        toast.error(userData.error);
        setUser(null);
        Cookies.remove("token");
      } else {
        setUser(userData);
        toast.success("Login Successful. Welcome!");
        Cookies.set("token", userData.token, { expires: 1, secure: true }); 
        setData({ emailOrUsername: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error("Login error");
      console.error("Signin error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-md w-3/5 space-y-8 bg-white p-10 rounded-lg ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        <form
          className="mt-8 space-y-6 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Username or email"
            value={data.emailOrUsername}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
          />
          <button
            type="submit"
            className="w-3/5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
          >
            Sign in
          </button>

          <div className="flex justify-center items-center">
            <p className="text-lg">
              New User?{" "}
              <Link to="/signup" className="font-bold underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div>
        <img src="/mic.jpg" className="w-70 h-96 rounded-lg" alt="Microphone" />
      </div>
    </div>
  );
};

export default Signin;
