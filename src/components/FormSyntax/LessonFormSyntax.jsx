import React from "react";
import {
  FormNavigation,
  ErrorMessage,
  Modal,
  SubmitButton,
  YoutubeUploader,
  ActionBtn,
} from "../../components";
const LessonFormSyntax = ({
  watch,
  handleSubmit,
  saveLesson,
  lessonUrl,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
  isLessonQueryEnabled,
  lessonQuery,
  createLessonMutation,
  updateLessonMutation,
}) => {
  return (
    <Modal>
      <div className={`form-wrap`}>
        <FormNavigation text="Lesson form" />

        <form
          encType="multipart/form-data"
          className="form-styling gap-4"
          text="Lesson form"
          onSubmit={handleSubmit(saveLesson)}
        >
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="lessonDetails" className="w-full ">
              Lesson Details
            </label>
            <input
              className={`input-styling `}
              disabled={true}
              placeholder="Lesson Number"
              {...register("lessonNumber", {})}
            />
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Lesson Name"
              {...register("lessonName", {
                required: "This field is required ",
              })}
            />

            {errors.lessonName && (
              <ErrorMessage message={errors.lessonName?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label
              htmlFor="id"
              className="w-full block my-2 text-sm font-medium text-gray-900"
            >
              Lesson Type
            </label>

            <select
              className="input-styling  mb-5"
              disabled={!isEditEnabled}
              {...register("lessonType", {
                required: "This field is required ",
              })}
            >
              <option value="link">Link</option>
              <option value="file">File</option>
            </select>
            {errors.lessonType && (
              <ErrorMessage message={errors.lessonType?.message} />
            )}
          </div>
          {watch("lessonName") ? (
            <div>
              {watch("lessonType") === "link" ? (
                <div className="input-wrap">
                  <input
                    className="input-styling"
                    readOnly={!isEditEnabled}
                    placeholder="Enter a youtube link"
                    {...register("youtubeUrl", {
                      required: "This field is required ",
                    })}
                  />

                  {errors.lessonUrl && (
                    <ErrorMessage message={errors.lessonUrl?.message} />
                  )}
                </div>
              ) : (
                <div className="input-wrap ">
                  {!lessonUrl ? (
                    <YoutubeUploader
                      updateFileInfo={updateFileInfo}
                      lessonState={lessonState}
                      videoTitle={register("lessonName").name}
                    />
                  ) : (
                    <div className="h-36 w-72 tablet:w-[360px] mt-2 bg-slate-200  bg-opacity-60 rounded-lg flex flex-col items-center gap-2 py-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-16 h-16 text-green-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                      <p className="text-center">Lesson has been uploaded</p>
                    </div>
                  )}
                </div>
                // TO REMOVE
              )}
            </div>
          ) : (
            <div>
              <ErrorMessage message="Enter lesson name to proceed with upload" />
            </div>
          )}

          <div className="cta-wrap">
            <div
              className={`${
                !isLessonQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isLessonQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={lessonUrl || watch("youtubeUrl") ? false : true}
                  isSubmitting={createLessonMutation.isLoading}
                  text={createLessonMutation.isLoading ? "Saving" : "Save"}
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
                isEditEnabled && isLessonQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateLessonMutation.isLoading}
                text={updateLessonMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  lessonQuery.refetch();
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

export default LessonFormSyntax;
