import React from "react";
import { CircularProgressBar, SpinnerIcon, SubmitButton } from "../components";

const DraftPage = () => {
  return (
    <div className=" w-full">
      <CircularProgressBar percentCompleted={100} />
      <SubmitButton
        type="submit"
        isSubmitting={true}
        text={"loading" === "loading" ? "Loggin in" : "Save"}
      />
    </div>
  );
};

export default DraftPage;
