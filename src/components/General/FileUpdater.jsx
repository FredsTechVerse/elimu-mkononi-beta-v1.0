import React, { useState } from "react";
import { ActionBtn, S3Uploader } from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFile, verifyAccess, handleError } from "../../controllers";

const FileUpdater = ({ queryKey, fileName, updateImage }) => {
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const [updatedFileName, setUpdatedFileName] = useState("");
  const [currentImage, setCurrentImage] = useState(fileName);
  const [isImageEditEnabled, setIsImageEditEnabled] = useState(false);
  const [isDeleteQueryEnabled, setIsDeleteQueryEnabled] = useState(false);

  const enableImageEdit = () => {
    setIsImageEditEnabled(true);
  };
  const disableImageEdit = () => {
    setIsImageEditEnabled(false);
  };
  const updateFileName = (imageURL) => {
    setUpdatedFileName(imageURL);
    setCurrentImage(imageURL);
  };

  console.log({ currentImage });

  const accessQuery = useQuery(["accessVerification"], verifyAccess, {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
    },
  });
  useQuery(["deletedFile", fileName], () => deleteFile({ fileKey: fileName }), {
    enabled: isDeleteQueryEnabled,
    staleTime: 0,
    retry: 0,
    onSuccess: () => {
      updateAlertBoxData({
        response: "Deleted user successfully",
        isResponse: true,
        status: "success",
        timeout: 2500,
      });
      setIsDeleteQueryEnabled(false);
      queryClient.invalidateQueries(queryKey, { exact: true });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["deletedFile", fileName]);
      }
    },
  });

  return (
    <div className="flex flex-col debug">
      <div className=" debug">
        {currentImage && !isImageEditEnabled ? (
          <img
            src={`https://elimu-mkononi.s3.af-south-1.amazonaws.com/${currentImage}`}
            className="bg-gray-300 h-36 w-72 tablet:w-[360px] rounded-xl object-cover  bg-cover bg-center"
            alt="courseImage"
          />
        ) : (
          <S3Uploader
            isTokenActive={accessQuery.status === "success"}
            updateFileName={updateFileName}
          />
        )}
      </div>
      <div className="flex items-center justify-center gap-1">
        <ActionBtn
          type="button"
          onClick={() => {
            if (!isImageEditEnabled) {
              enableImageEdit();
            } else {
              disableImageEdit();
              updateImage(updatedFileName);
            }
          }}
          text={!isImageEditEnabled ? "Edit" : "Save"}
        />
        {isImageEditEnabled && (
          <ActionBtn
            type="button"
            onClick={() => {
              disableImageEdit();
            }}
            text="cancel"
          />
        )}
      </div>
    </div>
  );
};

export default FileUpdater;
