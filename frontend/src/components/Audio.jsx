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
      <div style={{ border: "1px solid red", width: "50%" }}>
        <VoiceVisualizer
          ref={audioRef}
          canvasContainerClassName="hidden"
          controls={recorderControls}
        />
        {recorderControls.isAvailableRecordedAudio && <button>Upload</button>}
      </div>
    </>
  );
}
