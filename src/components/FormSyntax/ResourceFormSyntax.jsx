import React from "react";
import {
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
  ErrorMessage,
} from "../../components";
const ResourceFormSyntax = ({
  handleSubmit,
  saveResource,
  register,
  errors,
  createResourceMutation,
  updateFileName,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="RESOURCE FORM" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(saveResource)}
        >
          <div className="input-wrap">
            <label htmlFor="resource">Resource Details</label>
            <input
              className="input-styling"
              placeholder="Name of file"
              {...register("resourceName", {
                required: "This field is required ",
              })}
            />

            {errors.resourceName && (
              <ErrorMessage message={errors.resourceName?.message} />
            )}
          </div>
          <div className="input-wrap ">
            {!resourceUrl && <S3Uploader updateFileName={updateFileName} />}
          </div>
          {/* CTA BUTTONS */}
          <div className="cta-wrap">
            <SubmitButton
              type="submit"
              isSubmitting={createResourceMutation?.isLoading}
              disabled={resourceUrl && chapterID ? false : true}
              text={
                createResourceMutation?.status === "loading"
                  ? "Uploading"
                  : "Upload"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResourceFormSyntax;
