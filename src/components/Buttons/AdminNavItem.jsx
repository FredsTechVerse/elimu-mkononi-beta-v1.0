import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
const AdminNavItem = ({ to, text }) => {
  return (
    <Link to={to}>
      <div className="button debug ">
        {text}
        <span className="text-xl">
          <BsChevronRight />
        </span>
      </div>
    </Link>
  );
};

export default AdminNavItem;
