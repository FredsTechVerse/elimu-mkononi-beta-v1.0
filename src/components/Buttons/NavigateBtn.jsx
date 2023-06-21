import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
// I have the freedom to append props directly to icons.
const NavigateBtn = ({ text, destination }) => {
  const location = useLocation();
  return (
    <Link to={destination} state={{ background: location }}>
      <div
        className={`
      capitalize flex-row-centered gap-1 text-black bg-white w-32 rounded-full h-8  px-0.5 `}
      >
        {text}
      </div>
    </Link>
  );
};

export default NavigateBtn;
