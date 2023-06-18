import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const FormNavigation = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className=" relative w-full flex justify-center items-center text-lg font-bold text-white uppercase  px-2 py-5  rounded-t-2xl ">
      {text}
      <button className="absolute top-4.5 right-3" onClick={() => navigate(-1)}>
        <MdCancel className="text-black text-3xl" />
      </button>
    </div>
  );
};

export default FormNavigation;
