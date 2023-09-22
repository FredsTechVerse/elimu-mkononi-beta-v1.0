import React from "react";
import { FormNavigation, Modal, SubmitButton, ErrorMessage } from "..";
import { Link } from "react-router-dom";
const LoginFormSyntax = ({
  background,
  handleSubmit,
  watch,
  login,
  register,
  errors,
  createLoginMutation,
  roleInformation,
}) => {
  return (
    <Modal>
      <div className="form-wrap pb-4">
        <FormNavigation text="Log In" />

        <form className="form-styling" onSubmit={handleSubmit(login)}>
          <div className="input-wrap">
            <label htmlFor="surname">Email</label>
            <input
              className="input-styling"
              placeholder="Enter your email "
              {...register("email", {
                required: "This field is required ",
              })}
            />

            {errors.email && <ErrorMessage message={errors.email?.message} />}
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              className="input-styling"
              type="password"
              {...register("password", {
                required: "This field is required ",
              })}
            />

            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
          </div>
          <div className="w-full flex-row-centered">
            <SubmitButton
              isSubmitting={createLoginMutation.isLoading}
              type="submit"
              disabled={
                watch("email") !== "" && watch("password") !== "" ? false : true
              }
              text={
                createLoginMutation.status === "loading"
                  ? "Logging in"
                  : "Log In"
              }
            />
          </div>
          <p className="mt-1 text-center text-sm text-white ">
            <span className="mx-2 text-black">
              <Link
                to={"/new-user"}
                state={{ background: background, role: roleInformation }}
                className="font-medium hover:text-slate-100 text-primary focus:outline-none focus:ring-2"
              >
                Register
              </Link>
            </span>
            <span className="mx-2 text-black">
              <Link
                to={"/forgot-password"}
                state={{ background: background }}
                className="font-medium hover:text-slate-100 text-primary focus:outline-none focus:ring-2"
              >
                Forgot Password
              </Link>
            </span>
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default LoginFormSyntax;
