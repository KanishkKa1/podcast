import { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

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
            <button className="bg-black text-white rounded-full py-2 px-4">Upload</button>
          )}
        </div>
      </div>
    </div>
  );
}