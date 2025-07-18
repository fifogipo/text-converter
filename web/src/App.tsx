import { useEffect, useState } from "react";
import init, {
  text_to_speech,
  pause_speech,
  resume_speech,
} from "./wasm/text_converter";
import "./App.css";
import { FileUploader } from "./components/file-uploader/FileUploader";

function App() {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [uploadedText, setUploadedText] = useState<string>("");

  useEffect(() => {
    init().catch((err) => console.error(err));
  }, []);

  const handleFile = (file: File): void => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadstart = () => setStartAnimation(true);

    reader.onload = () => {
      const text = reader.result as string;
      setUploadedText(text);
      text_to_speech(text);
    };

    reader.onloadend = () => setStartAnimation(false);

    reader.readAsText(file);
  };

  return (
    <div className="appContainer">
      <FileUploader
        name="fileToUpload"
        required={true}
        startAnimation={startAnimation}
        fileType={"TXT"}
        handleFileEmitter={handleFile}
      />
      <div className="textVisualizer">
        <div className="uploadedText">
          <label htmlFor="uploadedText">Uploaded Text</label>
          <div className="uploadedTextContainer">
            <pre id="uploadedText">{uploadedText}</pre>
          </div>
        </div>
        <div className="uploadedTextActions">
          <button onClick={resume_speech}>▶️ Play</button>
          <button onClick={pause_speech}>⏸️ Pause</button>
        </div>
      </div>
    </div>
  );
}

export default App;
