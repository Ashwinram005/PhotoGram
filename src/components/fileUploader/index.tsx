import React, { useCallback, useRef, useState } from "react";
import { OutputFileEntry } from "@uploadcare/file-uploader";
import {
  FileUploaderRegular,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import st from "./FileUploader.module.scss";
import cssOverrides from "./FileUploader.overrides.module.css";
import cs from "classnames";
import "@uploadcare/react-uploader/core.css";

type FileUploaderProps = {
  uploaderClassName: string;
  files: OutputFileEntry[]; // Ensuring files prop is an array
  onChange: (files: OutputFileEntry[]) => void;
  theme: "light" | "dark";
};

const localeDefinitionOverride = {
  en: {
    "upload-file": "Upload photo",
    "upload-files": "Upload photos",
    "choose-file": "Choose photo",
    "choose-files": "Choose photos",
    "drop-files-here": "Drop photos here",
    "select-file-source": "Select photo source",
    "edit-image": "Edit photo",
    "no-files": "No photos selected",
    "caption-edit-file": "Edit photo",
    "files-count-allowed": "Only {{count}} {{plural:photo(count)}} allowed",
    "files-max-size-limit-error":
      "Photo is too big. Max photo size is {{maxFileSize}}.",
    "header-uploading": "Uploading {{count}} {{plural:photo(count)}}",
    "header-succeed": "{{count}} {{plural:photo(count)}} uploaded",
    "header-total": "{{count}} {{plural:photo(count)}} selected",
    "photo__one": "photo",
    "photo__many": "photos",
    "photo__other": "photos",
  },
};

export default function FileUploader({
  files = [],
  uploaderClassName,
  onChange,
  theme,
}: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<"success">[]>(
    []
  );
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) => {
      // Filter out the file to be removed from both arrays
      const updatedUploadedFiles = uploadedFiles.filter(
        (file) => file.uuid !== uuid
      );
      const updatedFiles = files.filter((file) => file.uuid !== uuid);

      // Update the parent component with the updated list
      onChange([...updatedFiles, ...updatedUploadedFiles]);

      // Update the local state for uploadedFiles
      setUploadedFiles(updatedUploadedFiles);

      console.log("Removed file with UUID:", uuid); // Debugging output
    },
    [files, uploadedFiles, onChange]
  );

  const resetUploaderState = () =>
    ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    resetUploaderState();

    // Combine existing files with newly uploaded ones, ensuring no duplicates
    const allFiles = [...files, ...uploadedFiles].filter(
      (file, index, array) =>
        array.findIndex((f) => f.uuid === file.uuid) === index
    );
    onChange(allFiles);

    console.log("All files after modal close:", allFiles); // Debugging output
  };

  const handleChangeEvent = (uploadResult: {
    allEntries: OutputFileEntry<"success">[];
  }) => {
    if (!uploadResult || !uploadResult.allEntries) {
      console.error("Invalid files received:", uploadResult);
      return;
    }

    const successfulFiles = uploadResult.allEntries.filter(
      (f) => f.status === "success"
    );

    setUploadedFiles((prevUploadedFiles) => {
      const newFiles = successfulFiles.filter(
        (newFile) =>
          !prevUploadedFiles.some(
            (existingFile) => existingFile.uuid === newFile.uuid
          )
      );
      return [...prevUploadedFiles, ...newFiles];
    });

    const combinedFiles = [...files, ...successfulFiles].filter(
      (file, index, array) =>
        array.findIndex((f) => f.uuid === file.uuid) === index
    );
    onChange(combinedFiles);

    console.log("Updated Files:", combinedFiles);
  };

  return (
    <div className={st.root}>
      <FileUploaderRegular
        pubkey="f851a2ed0d7f578532f9"
        maxLocalFileSizeBytes={10000000}
        imgOnly={true}
        sourceList="local, url, camera, gdrive"
        classNameUploader="my-config uc-light"
        multiple
        removeCopyright
        confirmUpload={false}
        localeDefinitionOverride={localeDefinitionOverride}
        apiRef={ctxProviderRef}
        onModalClose={handleModalCloseEvent}
        onChange={handleChangeEvent}
        className={cs(uploaderClassName)}
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {uploadedFiles.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
              className="w-full h-auto object-cover"
              alt={file.fileInfo?.originalFilename || ""}
            />
            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
