import React, { useState } from "react";
import { CustomNav, Button, Modal } from "..";
import AlertBox from "../AlertBox";
import axios from "../../axios";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const AdminRegistrationForm = () => {
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
  const registerTutor = async (e) => {
    e.preventDefault();
    // Check if inputs are blank
    if (password !== null && cPassword !== null) {
      console.log(`${password} vs ${cPassword}`);
      // Check if they match
      if (password === cPassword) {
        // Check for length,
        if (password.length >= 8) {
          let adminData = {
            firstName: fName,
            surname,
            password,
            contact: `254${contact}`,
            email,
          };

          try {
            let { data } = await axios.post("/auth/register-admin", adminData);
            // Clearing out the inputs
            console.log(JSON.stringify(data));
            setResponse("Tutor Registered Successfully");
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
      <div className="bg-slate-300  bg-opacity-50 flex flex-col justify-center items-center tablet:3/5 laptop:w-2/5 phone:w-full">
        <CustomNav text="Admin Registration" />
        {/* PROPOSED HEADER. */}
        {/* We are doing it the react style. How then do we handle the multipart.form data from our form to our server? */}
        <form className="border-none flex-col px-5 phone:px-2 w-full phone:border-2  phone:rounded-b-md">
          {/* NAMES SECTION */}
          <div className="flex flex-col justify-around  my-2">
            <label htmlFor="contact" className="mb-1">
              Names
            </label>
            <div className="flex flex-col">
              <input
                className=" phone:my-1 px-4   bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
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
                className=" phone:my-1 px-4   bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
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
          <div className="flex flex-col my-5">
            <div className=" flex flex-col w-full  phone:my-1  phone:flex-col  ">
              <label htmlFor="contact" className="mb-1 mr-3">
                Contact
              </label>
              <div className="flex phone:w-full phone:">
                <input
                  className="px-4  w-1/4 bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
                  type="Text"
                  required
                  value="+254"
                  readOnly
                />
                <input
                  className="px-4 w-3/4 bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
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
            <div className=" w-full  h-full phone:my-1  my-2  flex flex-col ">
              <label
                htmlFor="email"
                className="phone:pl-0 pl-3 w-1/5 mr-2 h-full flex  py-1"
              >
                Email
              </label>
              <input
                className="phone:w-full phone:my-1 px-4  w- bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
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

          <div className="flex flex-col  justify-start  my-2 w-full ">
            <label
              htmlFor="password"
              className="pl-3 w-24 mr-2 flex  phone:justify-start phone:pl-0 py-1 phone:w-full"
            >
              Password
            </label>
            <div className="flex flex-col w-full">
              <div>
                <input
                  className=" phone:mx-0 w-full phone:my-1 px-4  w-1/2 bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div>
                <input
                  className="w-full phone:mx-0 phone:my-1 px-4  w-1/2 bg-white-200 appearance-none py-2 border-2 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple placeholder:text-sm"
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
            </div>
          </div>
          {/* THE ALERT BOX */}
          <AlertBox
            responseTracker={responseTracker}
            statusTracker={statusTracker}
            response={response}
          />

          <div className="flex flex-col justify-center items-center w-full mt-8 ">
            <Button
              type="button"
              text="register"
              onClick={(e) => {
                registerTutor(e);
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AdminRegistrationForm;
