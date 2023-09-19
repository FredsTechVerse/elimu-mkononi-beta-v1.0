import React from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
  ActionBtn,
} from "../../components";
const UnitFormSyntax = ({
  handleSubmit,
  saveUnit,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
  isUnitQueryEnabled,
  unitQuery,
  createUnitMutation,
  updateUnitMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="unit form" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(saveUnit)}
        >
          <div className="flex flex-col">
            <label
              htmlFor="id"
              className="w-full block my-2 text-sm font-medium text-gray-900"
            >
              Select Tutor
            </label>

            <select
              disabled={!isEditEnabled}
              className="input-styling  mb-5"
              {...register("tutor", {
                required: "This field is required ",
              })}
            >
              {tutorsQuery?.data ? (
                tutorsQuery?.data.map((tutor, index) => {
                  const { _id: tutorID, firstName, surname } = tutor;
                  return (
                    <option
                      key={`tutor-${index}`}
                      className="w-full h-8 "
                      value={tutorID}
                    >
                      {`${firstName} ${surname}`}
                    </option>
                  );
                })
              ) : (
                <option className="bg-rose-500 w-full h-8 rounded-lg">
                  No tutor data found
                </option>
              )}
            </select>
            {errors.tutor && <ErrorMessage message={errors.tutor?.message} />}
          </div>
          {/* FILE */}
          <div className="input-wrap">
            <label htmlFor="unitCode" className="w-full ">
              Unit Details
            </label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Unit Code"
              {...register("unitCode", {
                required: "This field is required ",
                maxLength: {
                  value: 15,
                  message: "Must not be greater than 10 characters",
                },
              })}
            />
            {errors.unitCode && (
              <ErrorMessage message={errors.unitCode?.message} />
            )}

            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Unit Name"
              {...register("unitName", {
                required: "This field is required ",
                maxLength: {
                  value: 30,
                  message: "Must not be greater than 20 characters",
                },
              })}
            />

            {errors.unitName && (
              <ErrorMessage message={errors.unitName?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label htmlFor="description" className="w-full">
              Unit Description
            </label>
            <textarea
              readOnly={!isEditEnabled}
              placeholder="What is the unit about?"
              maxLength={60}
              {...register("unitDescription", {
                required: "This field is required ",
                maxLength: {
                  value: 60,
                  message: "Must not be greater than 60 characters",
                },
              })}
            ></textarea>
            {errors.unitDescription && (
              <ErrorMessage message={errors.unitDescription?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div
              className={`${
                !isUnitQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isUnitQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  disabled={courseID ? false : true}
                  isSubmitting={createUnitMutation.isLoading}
                  text={
                    createUnitMutation.isLoading ? "Registering" : "Register"
                  }
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
                isEditEnabled && isUnitQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateUnitMutation.isLoading}
                text={updateUnitMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  unitQuery.refetch();
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

export default UnitFormSyntax;
