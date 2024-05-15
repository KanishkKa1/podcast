import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const RandomUsername = () => {
    const prefix = [
      "Rain",
      "Sun",
      "Cloud",
      "Moon",
      "Star",
      "Sky",
      "Ocean",
      "Forest",
      "Mountain",
      "River",
      "Flower",
      "Leaf",
      "Rock",
      "Wave",
      "Wind",
      "Snow",
      "Fire",
      "Ice",
      "Earth",
      "Sand",
      "Morning",
      "Evening",
      "Night",
      "Day",
      "Spring",
      "Summer",
      "Autumn",
      "Winter",
      "Dawn",
      "Dusk",
      "Light",
      "Dark",
      "Space",
      "Time",
      "Life",
      "Dream",
      "Hope",
      "Love",
      "Joy",
      "Peace",
      "Music",
      "Art",
      "Poem",
      "Story",
      "Dream",
      "Wisdom",
      "Truth",
      "Magic",
      "Hero",
      "Legend",
      "Brave",
      "Kind",
      "Wise",
      "Gentle",
      "Strong",
      "Happy",
      "Sunny",
      "Lucky",
      "Mighty",
      "Clever",
      "Free",
      "Wild",
      "Swift",
      "Bright",
      "Silver",
      "Golden",
      "Diamond",
      "Emerald",
      "Ruby",
      "Sapphire",
      "Blue",
      "Red",
      "Green",
      "Yellow",
      "Purple",
      "Orange",
      "Pink",
      "White",
      "Black",
      "Gray",
      "Neon",
      "Pixel",
      "Digital",
      "Cyber",
      "Nano",
      "Macro",
      "Micro",
      "Virtual",
      "Dream",
      "Cosmic",
      "Fusion",
      "Nuclear",
      "Quantum",
      "Alpha",
      "Omega",
      "Infinity",
      "Eternal",
      "Magical",
      "Mystic",
      "Fantastic",
    ];
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${randomPrefix}${randomNum}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/user/signup",
        formData
      );
      if (response.error) {
        toast.error(response.error);
      } else {
        setFormData({});
        toast.success("Register Succesful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error: ", error);
    }
  };

  const handleGenerateUsername = () => {
    const generatedUsername = RandomUsername();
    setFormData({
      ...formData,
      username: generatedUsername,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleGenerateUsername}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
          >
            Generate Username
          </button>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
          >
            Sign up
          </button>
        </form>

        <div className="flex justify-center items-center">
          <p className="text-lg">
            Already have an account?{" "}
            <Link to="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
