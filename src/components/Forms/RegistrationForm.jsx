import React, { useState, useEffect, useRef } from "react";
import {
  FormNavigation,
  SubmitButton,
  Modal,
  ErrorMessage,
} from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, handleError, fetchUserData } from "../../controllers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const location = useLocation();
  const role = location?.state?.role;
  const { updateAlertBoxData } = useAlertBoxContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fName: "",
      surname: "",
      contact: "",
      email: "",
      password: "",
      cPassword: "",
    },
  });

  const [isUserQueryEnabled, setIsUserQueryEnabled] = useState(false);
  const userID = location?.state?.userID;

  useEffect(() => {
    if (location?.state?.readOnly === true) {
      setIsUserQueryEnabled(true);
      console.log("User Query Enabled");
    }
  }, [userID]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        saveUser(e);
      }
    };
    if (formRef.current) {
      formRef.current.addEventListener("submit", handleKeyPress);
    }
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener("submit", handleKeyPress);
      }
    };
  }, []);

  const userQuery = useQuery(
    ["user", userID],
    () => fetchUserData({ userID: userID, role: "EM-201" }),
    {
      enabled: isUserQueryEnabled,
      retry: 1,
      onSuccess: (data) => {
        const { firstName, surname, email, password, contact, status, role } =
          data;
      },
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["user"]);
        }
      },
    }
  );
  const createUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData([role, data?._id], data);
      queryClient.invalidateQueries([role], {
        exact: true,
      });
      updateAlertBoxData({
        response: "User has been registered.",
        isResponse: true,
        status: "success",
        timeout: 3000,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        createUserMutation.mutate({
          firstName: fName,
          surname,
          password,
          contact: `254${contact}`,
          email,
          role,
        });
      }
    },
  });

  const saveUser = async (data) => {
    console.log(data);
    const { fName, surname, password, contact, email } = data;
    createUserMutation.mutate({
      firstName: fName,
      surname,
      password,
      contact: `254${contact}`,
      email,
      role: role,
    });
  };

  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation
          text={
            role === "EM-203"
              ? "Admin Registration"
              : role === "EM-202"
              ? "Tutor Registration"
              : "Student Registration"
          }
        />
        <form className="form-styling" onSubmit={handleSubmit(saveUser)}>
          <div className="input-wrap">
            <label htmlFor="contact">Names</label>
            <div className="input-wrap">
              <input
                className="input-styling"
                placeholder="First Name"
                {...register("fName", {
                  required: "This field is required ",
                })}
              />

              {errors.fName && <ErrorMessage message={errors.fName?.message} />}

              <input
                className="input-styling"
                placeholder="Last Name"
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

          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              className="input-styling"
              placeholder="Enter Password"
              {...register("password", {
                required: "This field is required ",
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}

            <input
              className="input-styling"
              placeholder="Confirm Password"
              {...register("cPassword", {
                required: "This field is required ",
              })}
            />

            {errors.cPassword && (
              <ErrorMessage message={errors.cPassword?.message} />
            )}
          </div>
          <div className="cta-wrap">
            <SubmitButton
              type="submit"
              isSubmitting={createUserMutation?.isLoading}
              text={
                createUserMutation?.status === "loading"
                  ? "Registering"
                  : "Register"
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegistrationForm;
