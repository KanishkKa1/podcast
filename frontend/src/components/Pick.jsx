import React from "react";
import { Link } from "react-router-dom";
import RandomNames from "./RandomNames";

const Pick = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl my-10 font-bold">
          Are you here to tell a story or listen to one?
        </h1>
      </div>
      <div className="flex justify-center items-center w-8/12 lg:w-[700px] h-96 mb-2">
        <div
          className="flex justify-center items-center rounded-xl w-full h-full mx-5 hover:shadow-xl hover:shadow-black"
          style={{
            backgroundImage: "url('/speaker.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link to="/speaker" className="item">
            <span className="text-3xl text-white font-bold">Speaker</span>
          </Link>
        </div>

        <div
          className="flex justify-center items-center rounded-xl w-full h-full mx-5 hover:shadow-xl hover:shadow-black"
          style={{
            backgroundImage: "url('/listener.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link to="/listener" className="item">
            <span className="text-3xl text-white font-bold">Listener</span>
          </Link>
        </div>
      </div>
      {/* <RandomNames /> */}
    </div>
  );
};

export default Pick;
