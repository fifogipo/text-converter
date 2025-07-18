import { useState, type FC, type DragEvent, type ChangeEvent } from "react";
import "./FileUploader.css";

export type FileUploaderProps = {
  label?: string;
  name: string;
  required: boolean;
  startAnimation: boolean;
  fileType: "TXT" | "MD";
  handleFileEmitter: (file: File) => void;
};

export const FileUploader: FC<FileUploaderProps> = (props) => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const MAX_FILE_SIZE = 500 * 1024 * 1024;

  const handleDragOver = (event: DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (): void => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
    setDragOver(false);

    if (event.dataTransfer) {
      const droppedFiles = event.dataTransfer.files;

      if (droppedFiles.length > 0) {
        const validFiles: File[] = [];
        let hasError = false;
        let hasErrorType = false;

        for (let i = 0; i < droppedFiles.length; i++) {
          const file = droppedFiles[i];

          if (file.size <= MAX_FILE_SIZE) {
            validFiles.push(file);
          } else {
            hasError = true;
            break;
          }

          if (!["text/plain"].includes(file.type)) {
            hasErrorType = true;
            break;
          }
        }

        setErrorCallBack(hasError, hasErrorType, validFiles[0]);
      }
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const newFiles = (event.target as HTMLInputElement).files;

    if (newFiles && newFiles.length > 0) {
      const validFiles: File[] = [];
      let hasError: boolean = false;
      let hasErrorType: boolean = false;

      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];

        if (file.size <= MAX_FILE_SIZE) {
          validFiles.push(file);
        } else {
          hasError = true;
          break;
        }

        if (!["text/plain"].includes(file.type)) {
          hasErrorType = true;
          break;
        }
      }

      setErrorCallBack(hasError, hasErrorType, validFiles[0]);
    }
  };

  const setErrorCallBack = (
    hasError: boolean,
    hasErrorType: boolean,
    file: File
  ) => {
    if (hasError) {
      setError("Per favore carica un documento più piccolo di 500MB");
      setFiles([]);
    } else if (hasErrorType) {
      setError("Invalid file type");
      setFiles([]);
    } else {
      setError(undefined);
      props.handleFileEmitter(file);
    }
  };

  return (
    <div className="fileUploaderContainer">
      <label htmlFor="file-uploader">Upload Text to Speach</label>
      <div id="file-uploader" className="fileUploader">
        <label
          htmlFor="dropzone-file"
          className={dragOver ? "dragOver" : "dragOut"}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {props.startAnimation ? (
            <video
              src="loading-animation.webm"
              controls={false}
              width={150}
              height={150}
              loop
              autoPlay
              muted
            ></video>
          ) : (
            <div className="fileUploaderTextContainer">
              <p>
                Trascina qui il file oppure <span>carica</span>
              </p>
              <p>{props.fileType}</p>
            </div>
          )}
          <input
            type="file"
            id="dropzone-file"
            accept="text/*"
            name={props.name}
            required={props.required}
            onChange={handleFileUpload}
          />
          {error && <p className="textError">{error}</p>}
        </label>
      </div>
    </div>
  );
};
