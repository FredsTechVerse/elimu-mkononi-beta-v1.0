import React from "react";

import {
  ErrorMessage,
  FormNavigation,
  Modal,
  SubmitButton,
} from "../../components";

const PasswordUpdateFormSyntax = ({
  watch,
  handleSubmit,
  handlePasswordUpdate,
  register,
  errors,
  updatePasswordMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Update Password" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handlePasswordUpdate)}
        >
          <div className="input-wrap">
            <label htmlFor="course">New Password</label>
            <input
              className="input-styling"
              placeholder="Enter new password"
              {...register("password", {
                required: "This field is required ",
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
          </div>
          <div className="input-wrap mt-3">
            <label htmlFor="course">Confirm Password</label>

            <input
              className="input-styling"
              placeholder="Retype New Password"
              {...register("cPassword", {
                required: "This field is required ",
              })}
            />
            {errors.cPassword && (
              <ErrorMessage message={errors.cPassword?.message} />
            )}
          </div>

          <div className="cta-wrap">
            <div className="flex flex-row gap-5 items-center">
              <SubmitButton
                type="submit"
                disabled={watch("password") ? false : true}
                isSubmitting={updatePasswordMutation.isLoading}
                text={updatePasswordMutation.isLoading ? "Updating" : "Update"}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PasswordUpdateFormSyntax;
