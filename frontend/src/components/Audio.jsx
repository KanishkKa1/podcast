import { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import axios from "axios";

export default function Audio() {
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error, audioRef, isRecording } = recorderControls;
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob.blob);

      const response = await axios.post("/api/v1/podcast", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading audio: ", error);
    }
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
            <button onClick={handleUpload} className="bg-black text-white rounded-full py-2 px-4">Upload</button>
          )}
        </div>
      </div>
    </div>
  );
}
