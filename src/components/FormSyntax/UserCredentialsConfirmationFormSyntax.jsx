import React from "react";
import { ErrorMessage, FormNavigation, Modal, SubmitButton } from "..";

const UserCredentialsConfirmationFormSyntax = ({
  handleSubmit,
  handleResetToken,
  watch,
  register,
  errors,
  userCredentialsConfirmationMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Verify Account" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handleResetToken)}
        >
          <div className="input-wrap">
            <label htmlFor="course">Contact verification code</label>
            <input
              className="input-styling"
              placeholder="Enter confirmation code sent to your phone number"
              {...register("contactVerification", {
                required: "This field is required ",
              })}
            />
            {errors.resetToken && (
              <ErrorMessage message={errors.resetToken?.message} />
            )}
          </div>
          <div className="input-wrap">
            <label htmlFor="course">Email verification Code</label>
            <input
              className="input-styling"
              placeholder="Enter confirmation code sent to your email"
              {...register("emailVerification", {
                required: "This field is required ",
              })}
            />
            {errors.resetToken && (
              <ErrorMessage message={errors.resetToken?.message} />
            )}
          </div>
          <div className="cta-wrap">
            <div className="flex flex-row gap-5 items-center">
              <SubmitButton
                type="submit"
                disabled={
                  watch("contactVerification") && watch("emailVerification")
                    ? false
                    : true
                }
                isSubmitting={userCredentialsConfirmationMutation.isLoading}
                text={
                  userCredentialsConfirmationMutation.isLoading
                    ? "Verifying"
                    : "Verify"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserCredentialsConfirmationFormSyntax;
