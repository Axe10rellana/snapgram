/* eslint-disable react-hooks/exhaustive-deps */

//react
import { useCallback, useState } from "react";

//react-dropzone
import { FileWithPath, useDropzone } from "react-dropzone";

//utils
import { convertFileToUrl } from "@/lib/utils";

//components
import { Button } from "@/components/ui";

//types
type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  //state variables
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  //react-dropzone
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg", ".gif"],
    },
  });

  return (
    <div
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
      {...getRootProps()}
    >
      <input className="cursor-pointer" {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              className="pointer-events-none file_uploader-img"
              src={fileUrl}
              alt="image"
            />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            className="pointer-events-none"
            src="/assets/icons/file-upload.svg"
            alt="file upload"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button className="shad-button_dark_4" type="button">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
