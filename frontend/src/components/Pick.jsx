import React from "react";
import { Link } from "react-router-dom";

const Pick = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl my-10 font-bold">
          Are you here to tell a story or listen to one?
        </h1>
      </div>
      <div className="flex justify-center items-center w-8/12 lg:w-[700px] h-96 mb-2">
        <Link
          to="/speaker"
          className="flex justify-center items-center rounded-xl w-full h-full mx-5 hover:shadow-xl hover:shadow-black transition duration-100"
          style={{
            backgroundImage: "url('/speaker.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="text-3xl text-white font-bold">Speaker</span>
        </Link>

        <Link
          to="/listener"
          className="flex justify-center items-center rounded-xl w-full h-full mx-5 hover:shadow-xl hover:shadow-black transition duration-100"
          style={{
            backgroundImage: "url('/listener.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="text-3xl text-white font-bold">Listener</span>
        </Link>
      </div>
    </div>
  );
};

export default Pick;
