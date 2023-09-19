import React from "react";
import {
  ErrorMessage,
  FormNavigation,
  Modal,
  SubmitButton,
  S3Uploader,
  ActionBtn,
  FileUpdater,
} from "../../components";
const CourseFormSyntax = ({
  courseID,
  handleSubmit,
  saveCourse,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
  isCourseQueryEnabled,
  courseQuery,
  courseImage,
  updateCourseImage,
  createCourseMutation,
  updateCourseMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="COURSE FORM" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(saveCourse)}
        >
          <div className="input-wrap">
            <label htmlFor="course">Course Details</label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Course Title"
              {...register("courseTitle", {
                required: "This field is required ",
              })}
            />
            {errors.courseTitle && (
              <ErrorMessage message={errors.courseTitle?.message} />
            )}
          </div>

          <div className={` input-wrap `}>
            {!courseImage ? (
              <S3Uploader updateFileName={updateCourseImage} />
            ) : (
              <FileUpdater
                fileName={courseImage}
                updateImage={updateCourseImage}
                queryKey={[["course", courseID]]}
              />
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`${
                !isCourseQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isCourseQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={courseImage ? false : true}
                  isSubmitting={createCourseMutation.isLoading}
                  text={createCourseMutation.isLoading ? "Saving" : "Save"}
                />
              ) : (
                <ActionBtn
                  type="button"
                  onClick={() => {
                    enableEdit();
                  }}
                  text="Edit"
                />
              )}
            </div>

            <div
              className={`${
                isEditEnabled && isCourseQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateCourseMutation.isLoading}
                text={updateCourseMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  courseQuery.refetch();
                }}
                text="cancel"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseFormSyntax;
