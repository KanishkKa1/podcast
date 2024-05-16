import { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaTimes } from "react-icons/fa";

export default function Audio() {
  const navigate = useNavigate();
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, audioRef, isRecording } = recorderControls;
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    tags: "",
    file: null,
  });

  useEffect(() => {
    setIsAnimating(isRecording);
  }, [isRecording]);

  useEffect(() => {
    if (recordedBlob) {
      console.log(recordedBlob);
    }
  }, [recordedBlob]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      const { title, content, tags, file } = formData;
      if (!title || !content || !tags || (!file && !recordedBlob)) {
        toast.error("Please fill all required fields.");
        return;
      }

      const token = Cookies.get("token");
      const podcastData = new FormData();
      if (recordedBlob) {
        podcastData.append("audio", recordedBlob, "recording.wav");
      } else if (file) {
        podcastData.append("audio", file);
      }
      podcastData.append("title", title);
      podcastData.append("content", content);
      podcastData.append("tags", JSON.stringify(tags.split(",")));
      if (formData.image) {
        podcastData.append("image", formData.image);
      }

      const response = await axios.post("/api/v1/podcast/", podcastData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setFormData({
          title: "",
          content: "",
          image: null,
          tags: "",
          file: null,
        });
        toast.success("Podcast uploaded successfully!");
        navigate("/listener");
      }

      console.log(response.data);
      toggleModal();
    } catch (error) {
      console.error("Error uploading audio: ", error);
      toast.error("Error uploading audio. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full h-screen relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="audio-wave-container w-10/12">
            <VoiceVisualizer
              ref={audioRef}
              canvasContainerClassName={`audio-wave ${isAnimating ? "animate" : ""}`}
              controls={recorderControls}
              mainBarColor="black"
              secondaryBarColor="black"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
          <button
            onClick={toggleModal}
            className="bg-black text-white rounded-full py-2 px-4"
          >
            Upload Your File
          </button>
          {showModal && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg relative">
                <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500">
                  <FaTimes />
                </button>
                <h2 className="text-2xl font-bold mb-2">
                  Upload Podcast Details
                </h2>
                <form
                  className="mt-4 space-y-4"
                  onSubmit={handleUpload}
                  encType="multipart/form-data"
                >
                  <div className="text-left">
                    <p className="bg-yellow-100 p-2">
                      If not recorded, upload your own file here 👇
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".mp3,.wav"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white rounded-full py-2 px-4"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
