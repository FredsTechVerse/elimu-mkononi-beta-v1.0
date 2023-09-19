import React from "react";
import { ErrorMessage, FormNavigation, Modal, SubmitButton } from "..";
const ResetTokenVerificationFormSyntax = ({
  watch,
  handleSubmit,
  handleResetToken,
  register,
  errors,
  resetTokenConfirmationMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Reset Token" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handleResetToken)}
        >
          <div className="input-wrap">
            <label htmlFor="course">Reset Token</label>
            <input
              className="input-styling"
              placeholder="Enter reset token sent to email"
              {...register("resetToken", {
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
                disabled={watch("resetToken") ? false : true}
                isSubmitting={resetTokenConfirmationMutation.isLoading}
                text={
                  resetTokenConfirmationMutation.isLoading
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

export default ResetTokenVerificationFormSyntax;
