import React from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
  ActionBtn,
} from "../../components";
const ChapterFormSyntax = ({
  unitID,
  handleSubmit,
  saveChapter,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
  isChapterQueryEnabled,
  chapterQuery,
  createChapterMutation,
  updateChapterMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Chapter Form" />
        <form className="form-styling" onSubmit={handleSubmit(saveChapter)}>
          <div className="input-wrap gap-2">
            <label htmlFor="cNumber" className="w-full ">
              Chapter Details
            </label>
            <input
              disabled={true}
              className={`input-styling `}
              placeholder="Chapter Number"
              {...register("chapterNumber", {})}
            />
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Chapter Name"
              {...register("chapterName", {
                required: "This field is required ",
              })}
            />
            {errors.chapterName && (
              <ErrorMessage message={errors.chapterName?.message} />
            )}
            <textarea
              readOnly={!isEditEnabled}
              placeholder="Description"
              {...register("chapterDescription", {
                required: "This field is required ",
              })}
            ></textarea>
            {errors.chapterDescription && (
              <ErrorMessage message={errors.chapterDescription?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`${
                !isChapterQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isChapterQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={unitID ? false : true}
                  isSubmitting={createChapterMutation.isLoading}
                  text={createChapterMutation.isLoading ? "Saving" : "Save"}
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
                isEditEnabled && isChapterQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateChapterMutation.isLoading}
                text={updateChapterMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  chapterQuery.refetch();
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

export default ChapterFormSyntax;
