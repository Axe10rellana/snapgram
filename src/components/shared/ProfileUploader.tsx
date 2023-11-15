/* eslint-disable react-hooks/exhaustive-deps */

//react
import { useCallback, useState } from "react";

//react-dropzone
import { FileWithPath, useDropzone } from "react-dropzone";

//utils
import { convertFileToUrl } from "@/lib/utils";

//types
type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
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
    <div {...getRootProps()}>
      <input className="cursor-pointer" {...getInputProps()} />

      <div className="cursor-pointer flex-center gap-4">
        <img
          className="pointer-events-none h-24 w-24 rounded-full object-cover object-top"
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
        />
        <p className="text-primary-500 small-regular md:base-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
