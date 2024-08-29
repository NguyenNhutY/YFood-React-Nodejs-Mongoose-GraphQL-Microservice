import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface FileUploadProps {
  selectedFiles: File[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: (index: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFiles,
  handleFileChange,
  handleFileRemove,
}) => (
  <div className='form-group'>
    <label htmlFor='files'>Upload Files:</label>
    <input
      type='file'
      name='files'
      onChange={handleFileChange}
      multiple
      accept='image/*,video/*'
    />
    {selectedFiles.length > 0 && (
      <div className='file-preview'>
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className={
              file.type.startsWith("image/")
                ? "file-preview-image-container"
                : "file-preview-video-container"
            }
          >
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className='file-preview-image'
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                controls
                className='file-preview-video'
              />
            )}
            <button
              type='button'
              className='btn-remove-file'
              onClick={() => handleFileRemove(index)}
            >
              <FontAwesomeIcon className='icon-remove-file' icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FileUpload;
