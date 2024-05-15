import { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import axios from "axios";

export default function Audio() {
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error, audioRef, isRecording } = recorderControls;
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    if (isRecording) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isRecording]);

  useEffect(() => {
    if (!recordedBlob) return;

    console.log(recordedBlob);
  }, [recordedBlob, error]);

  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const cookie = await cookieStore.get("token");
      const token = cookie?.value;

      const podcastData = new FormData();
      podcastData.append("audio", recordedBlob);
      podcastData.append("title", formData.title);
      podcastData.append("content", formData.content);
      podcastData.append("image", formData.image);
      podcastData.append("tags", formData.tags);

      const response = await axios.post("/api/v1/podcast", podcastData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      toggleModal(); // Close the modal after successful upload
    } catch (error) {
      console.error("Error uploading audio: ", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full h-screen relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="audio-wave-container w-10/12">
            <VoiceVisualizer
              ref={audioRef}
              canvasContainerClassName={`audio-wave ${isAnimating ? 'animate' : ''}`}
              controls={recorderControls}
              mainBarColor="black"
              secondaryBarColor="black"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
          {recorderControls.isAvailableRecordedAudio && (
            <>
              <button onClick={toggleModal} className="bg-black text-white rounded-full py-2 px-4">Upload</button>
              {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg relative">
                    <h2 className="text-2xl font-bold mb-2">Upload Podcast Details</h2>
                    <form className="mt-4 space-y-4" onSubmit={handleUpload}>
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
                      <button onClick={handleUpload} className="bg-black text-white rounded-full py-2 px-4">Submit</button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
