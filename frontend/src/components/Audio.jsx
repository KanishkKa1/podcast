import { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

export default function Audio() {
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error, audioRef } = recorderControls;

  useEffect(() => {
    if (!recordedBlob) return;

    console.log(recordedBlob);
  }, [recordedBlob, error]);

  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="border-2 border-black w-96 p-20">
          <VoiceVisualizer
            ref={audioRef}
            canvasContainerClassName="hidden"
            controls={recorderControls}
          />
          {recorderControls.isAvailableRecordedAudio && <div className="flex justify-center items-center">
            <button className="bg-black text-white rounded-full py-2 px-4">Upload</button></div>}
        </div>
      </div>
    </>
  );
}
