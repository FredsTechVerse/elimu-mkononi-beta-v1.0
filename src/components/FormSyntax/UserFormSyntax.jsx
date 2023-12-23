import React from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
  ActionBtn,
} from "../../components";
const UserFormSyntax = ({
  role,
  handleSubmit,
  saveUser,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
  isUserQueryEnabled,
  userQuery,
  createUserMutation,
  updateUserMutation,
}) => {
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation
          text={
            role === "EM-203" ? "Admin Registration" : "Student Registration"
          }
        />
        <form className="form-styling" onSubmit={handleSubmit(saveUser)}>
          <div className="input-wrap">
            <label htmlFor="names">Names</label>
            <div className="input-wrap">
              <input
                readOnly={!isEditEnabled}
                maxLength={15}
                className="input-styling"
                placeholder="First Name"
                {...register("fName", {
                  required: "This field is required ",
                })}
              />

              {errors.fName && <ErrorMessage message={errors.fName?.message} />}

              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="Last Name"
                maxLength={15}
                {...register("surname", {
                  required: "This field is required ",
                })}
              />
              {errors.surname && (
                <ErrorMessage message={errors.surname?.message} />
              )}
            </div>
          </div>
          {/* CONTACT SECTION */}
          <div className="input-wrap">
            <div className="input-wrap">
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
                  readOnly={!isEditEnabled}
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
            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="E-mail Address"
                type="email"
                {...register("email", {
                  required: "This field is required ",
                })}
              />
              {errors.email && <ErrorMessage message={errors.email?.message} />}
            </div>
          </div>

          {/* PASSWORD SECTION */}
          {!isUserQueryEnabled && (
            <div className="input-wrap">
              <label htmlFor="password">Password</label>
              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="Enter Password"
                type="password"
                {...register("password", {
                  required: "This field is required ",
                })}
              />
              {errors.password && (
                <ErrorMessage message={errors.password?.message} />
              )}

              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="Confirm Password"
                type="password"
                {...register("cPassword", {
                  required: "This field is required ",
                })}
              />

              {errors.cPassword && (
                <ErrorMessage message={errors.cPassword?.message} />
              )}
            </div>
          )}

          <div className="cta-wrap">
            <div
              className={`${
                !isUserQueryEnabled || !isEditEnabled
                  ? "flex flex-row gap-5 items-center"
                  : "hidden"
              }`}
            >
              {!isUserQueryEnabled ? (
                <SubmitButton
                  type="submit"
                  isSubmitting={createUserMutation.isLoading}
                  text={
                    createUserMutation.isLoading ? "Registering" : "Register"
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
                isEditEnabled && isUserQueryEnabled
                  ? "flex flex-row  items-center"
                  : "hidden"
              }`}
            >
              <SubmitButton
                type="submit"
                isSubmitting={updateUserMutation.isLoading}
                text={updateUserMutation.isLoading ? "Updating" : "Update"}
              />
              <ActionBtn
                type="button"
                onClick={() => {
                  disableEdit();
                  userQuery.refetch();
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

export default UserFormSyntax;
