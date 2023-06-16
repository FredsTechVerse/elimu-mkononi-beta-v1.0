import React, { useState } from "react";
import { FormNavigation, SubmitButton, Modal, AlertBox } from "..";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
const RegistrationForm = ({ role }) => {
  const navigate = useNavigate();

  // DECLARATION OF OUR STATES
  //==========================
  const [fName, setFName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);

  const [responseTracker, setResponseTracker] = useState(false);
  const [statusTracker, setStatusTracker] = useState(true);
  const [response, setResponse] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    // Check if inputs are blank
    if (password !== null && cPassword !== null) {
      // Check if they match
      if (password === cPassword) {
        // Check for length,
        if (password.length >= 8) {
          let userData = {
            firstName: fName,
            surname,
            password,
            contact: `254${contact}`,
            email,
          };

          try {
            if (role === "EM-203") {
              let { data } = await axios.post("/auth/register-admin", userData);
              console.log(JSON.stringify(data));
              return;
            } else if (role === "EM-201") {
              let { data } = await axios.post(
                "/auth/register-student",
                userData
              );
              console.log(`Student Data ${data}`);
              setResponse("Student Registered Successfully");
              return;
            } else if (role === "EM-202") {
              let { data } = await axios.post("/auth/register-tutor", userData);
              console.log(`Tutor Data ${data}`);
              setResponse("Tutor Registered Successfully");
              return;
            }
            setStatusTracker(true);
            setResponseTracker(true);
            setFName("");
            setSurname("");
            setEmail("");
            setContact("");
            setPassword("");
            setCPassword("");

            setTimeout(() => {
              setResponseTracker(false);
              navigate(-1);
            }, 2000);
          } catch (error) {
            setStatusTracker(false);
            console.log(error);
            console.log(error.response.data.message.message);
            setResponse(
              `[${error.response.data.message.name}] ${error.response.data.message.message}`
            );
            setResponseTracker(true);
            setTimeout(() => {
              setResponseTracker(false);
            }, 4500);
          }
        } else {
          setStatusTracker(false);
          setResponse(`Password should be eight digits.`);
          setResponseTracker(true);
          setTimeout(() => {
            setResponseTracker(false);
          }, 4500);
        }
      } else {
        setStatusTracker(false);
        setResponse(`The passwords entered do not match!`);
        setResponseTracker(true);
        setTimeout(() => {
          setResponseTracker(false);
        }, 3000);
      }
    } else {
      setStatusTracker(false);
      setResponse(`Password fields cannot be left blank!`);
      setResponseTracker(true);
      setTimeout(() => {
        setResponseTracker(false);
      }, 3000);
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
          {/* THE ALERT BOX */}
          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={response}
          />

          <div className="cta-wrap">
            <SubmitButton type="submit" text="register" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegistrationForm;
