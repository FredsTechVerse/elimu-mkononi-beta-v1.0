import React, { useState, useEffect } from "react";
import { FormNavigation, SubmitButton, Modal } from "../../components";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const RegistrationForm = ({ role }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  // DECLARATION OF OUR STATES
  //==========================
  const [fName, setFName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);

  const isFormValid = () => {
    if (
      password !== null &&
      cPassword !== null &&
      password === cPassword &&
      password.length >= 8
    ) {
      return true;
    }
    return false;
  };
  const createUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(
        `User has been successfully registered ${JSON.stringify(data)}`
      );
      queryClient.invalidateQueries(["tutors"], { exact: true });
      navigate(-1);
    },
  });
  const saveUser = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      createUserMutation.mutate({
        firstName: fName,
        surname,
        password,
        contact: `254${contact}`,
        email,
        role,
      });
    }
  };

  return (
    <Modal>
      <div className="form-wrap h-[550px]">
        <FormNavigation
          text={
            role === "EM-203"
              ? "Admin Registration"
              : role === "EM-202"
              ? "Tutor Registration"
              : "Student Registration"
          }
        />
        <form className="form-styling" onSubmit={registerUser}>
          <div className="input-wrap">
            <label htmlFor="contact">Names</label>
            <div className="input-wrap">
              <input
                className="input-styling"
                id="fName"
                type="Text"
                placeholder="First Name"
                value={fName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                required
              ></input>

              <input
                className="input-styling"
                id="lName"
                type="Text"
                placeholder="Last Name"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                required
              ></input>
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
                  id="contact"
                  type="Number"
                  placeholder="Safaricom No."
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                className="input-styling"
                id="email"
                type="email"
                placeholder="E-mail Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </div>

          {/* PASSWORD SECTION */}

          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              className="input-styling"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            <input
              className="input-styling"
              id="CPassword"
              type="password"
              placeholder="Confirm Password"
              value={cPassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="cta-wrap">
            <SubmitButton
              type="button"
              text="register"
              onClick={(e) => {
                saveUser(e);
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegistrationForm;
