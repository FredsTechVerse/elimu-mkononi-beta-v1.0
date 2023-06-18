import { useState } from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { createResource } from "../../controllers/postData";
import { useMutation } from "@tanstack/react-query";
import { handleError } from "../../controllers/handleErrors";
const ResourceForm = () => {
  const navigate = useNavigate();
  // FORM CONFIGURATIONS
  //=========================
  const [resourceName, setResourceName] = useState("");
  const [uploadSuccess, setUploadSucess] = useState(false);

  const saveResource = useMutation({
    mutationFn: createResource,
    onSuccess: (data) => {
      navigate(-1);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const isFormValid = () => {
    if (resourceName !== null && uploadSuccess) {
      return true;
    }
    return false;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      saveResource.mutate({
        resourceName: resourceName,
        resourceUrl: resourceName,
      });
    }
  };

  const verifyUpload = () => {
    setUploadSucess(true);
  };

  const updateFileName = (fileName) => {
    console.log(`Resource Name updated to : ${fileName}`);
    setResourceName(fileName);
  };

  return (
    <Modal>
      <div className="form-wrap">
        <FormNavigation text="RESOURCE FORM" />
        <form encType="multipart/form-data" className="form-styling">
          <div className="input-wrap">
            <label htmlFor="course" className="w-full ">
              File Details
            </label>
            <input
              className="input-styling w-full"
              id="course"
              type="text"
              placeholder="Enter file name"
              value={resourceName}
              onChange={(e) => {
                setResourceName(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-wrap">
            <S3Uploader
              verifyUpload={verifyUpload}
              updateFileName={updateFileName}
            />
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="button"
              text="Add Course"
              onClick={(e) => {
                handleSave(e);
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResourceForm;
