import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

const HomeBtn = () => {
  return (
    <Link to="/">
      <div className="w-8 h-8  border-white rounded-full text-md flex-row-centered hover:border-2 cursor-pointer hover:text-white ">
        <HomeIcon className="w-5 h-5" />
      </div>
    </Link>
  );
};

export default HomeBtn;
