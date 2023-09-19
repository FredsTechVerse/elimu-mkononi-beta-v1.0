import React from "react";
import {
  ErrorMessage,
  FormNavigation,
  Modal,
  SubmitButton,
} from "../../components";

const ForgotPasswordFormSyntax = ({
  handleSubmit,
  handleContactVerification,
  register,
  errors,
  contactVerificationMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Forgot Password" />
        <form
          encType="multipart/form-data"
          className="form-styling"
          onSubmit={handleSubmit(handleContactVerification)}
        >
          <div className="input-wrap">
            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                className="input-styling"
                placeholder="E-mail Address"
                type="email"
                {...register("email", {
                  required: "This field is required ",
                })}
              />
              {errors.email && <ErrorMessage message={errors.email?.message} />}
            </div>
            <label htmlFor="contact">Contact</label>
            <div className="flex phone:gap-3 tablet:gap-2">
              <input
                className="input-styling w-16"
                type="Text"
                required
                value="+254"
                readOnly
              />
              <input
                className="input-styling phone:w-52  tablet:w-72"
                placeholder="Safaricom No."
                {...register("contact", {
                  required: "This field is required ",
                })}
              />
            </div>
            {errors.contact && (
              <ErrorMessage message={errors.contact?.message} />
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="id"
              className="w-full block my-2 text-sm font-medium text-gray-900"
            >
              Select Role
            </label>

            <select
              className="input-styling  mb-5"
              {...register("role", {
                required: "This field is required ",
              })}
            >
              <option
                value="EM-201"
                className="uppercase w-full h-8 tablet:h-10 rounded-lg"
              >
                Student
              </option>
              <option
                value="EM-202"
                className="uppercase w-full h-8 tablet:h-10 rounded-lg"
              >
                Tutor
              </option>
              <option
                value="EM-203"
                className="uppercase w-full h-8 tablet:h-10 rounded-lg"
              >
                Admin
              </option>
            </select>
            {errors.tutor && <ErrorMessage message={errors.tutor?.message} />}
          </div>
          <div className="cta-wrap">
            <div className="flex flex-row gap-5 items-center">
              <SubmitButton
                type="submit"
                isSubmitting={contactVerificationMutation.isLoading}
                text={
                  contactVerificationMutation.isLoading ? "Verifying" : "Verify"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForgotPasswordFormSyntax;
