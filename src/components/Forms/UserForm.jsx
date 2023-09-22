import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { UserFormSyntax } from "../../components";
import {
  registerUser,
  updateUser,
  handleError,
  fetchUserData,
} from "../../controllers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useForm } from "react-hook-form";
const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const { updateAlertBoxData } = useAlertBoxContext();
  const role = new URLSearchParams(location.search).get("role");
  const userID = new URLSearchParams(location.search).get("userID");

  const { background } = location?.state;
  const isUserQueryEnabled = userID ? true : false;
  const [isEditEnabled, setIsEditEnabled] = useState(userID ? false : true);
  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.type === "submit") {
        handleSubmit(saveUser)(e);
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

  //  Fetches the user data is need be
  const userQuery = useQuery(
    ["user", userID],
    () => fetchUserData({ userID, role }),
    {
      enabled: isUserQueryEnabled,
      staleTime: 1000 * 60 * 60,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["user", userID], { exact: true });
        }
      },
    }
  );

  // Updates accordingly  after fetch
  useEffect(() => {
    if (userQuery?.status === "success" && userQuery?.data) {
      const splittedContact = userQuery?.data?.contact.split("254")[1];
      setValue("fName", userQuery?.data?.firstName);
      setValue("surname", userQuery?.data?.surname);
      setValue("contact", splittedContact);
      setValue("email", userQuery?.data?.email);
    }
  }, [userID, userQuery?.status]);

  // Used to create a user instance.

  const createUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const { _id: userID } = data;
      queryClient.setQueryData([role, data?._id], data);
      queryClient.invalidateQueries(["users"], { exact: true });
      queryClient.invalidateQueries([role], {
        exact: true,
      });
      updateAlertBoxData({
        response: "User has been registered.",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate("/account-confirmation", {
        state: { userID: userID, background: background, role: role },
      });
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryCreatingUserMutation(error.config.data);
      }
    },
  });

  const retryCreatingUserMutation = (formData) => {
    createUserMutation.mutate({
      firstName: formData.firstName,
      surname: formData.surname,
      password: formData.password,
      contact: formData.contact,
      email: formData.email,
      role: formData.email,
    });
  };

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user", userID], {
        exact: true,
      });
      queryClient.invalidateQueries([role], {
        exact: true,
      });
      updateAlertBoxData({
        response: "User info has been updated.",
        isResponse: true,
        status: "success",
        timeout: 4500,
      });
      navigate(-1);
    },
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        retryUpdatingUserMutation(error.config.data);
      }
    },
  });

  const retryUpdatingUserMutation = (formData) => {
    createUserMutation.mutate({
      userID: formData.userID,
      firstName: formData.firstName,
      surname: formData.surname,
      contact: formData.contact,
      email: formData.email,
      role: formData.email,
    });
  };

  const saveUser = async (data) => {
    const { fName, surname, password, cPassword, contact, email } = data;
    if (role) {
      if (!isUserQueryEnabled) {
        if (password === cPassword) {
          createUserMutation.mutate({
            firstName: fName.trim(),
            surname: surname.trim(),
            password: password.trim(),
            contact: `254${contact.trim()}`,
            email: email.trim(),
            role,
          });
        } else {
          updateAlertBoxData({
            response: "Passwords do not match",
            isResponse: true,
            status: "failure",
            timeout: 4500,
          });
        }
      } else {
        updateUserMutation.mutate({
          userID,
          firstName: fName,
          surname,
          contact: `254${contact}`,
          email,
          role,
        });
      }
      return;
    }
    updateAlertBoxData({
      response: "Role has not been provided.",
      isResponse: true,
      status: "failure",
      timeout: 4500,
    });
  };

  return (
    <UserFormSyntax
      role={role}
      handleSubmit={handleSubmit}
      saveUser={saveUser}
      isEditEnabled={isEditEnabled}
      isUserQueryEnabled={isUserQueryEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      userQuery={userQuery}
      createUserMutation={createUserMutation}
      updateUserMutation={updateUserMutation}
    />
  );
};

export default UserForm;
