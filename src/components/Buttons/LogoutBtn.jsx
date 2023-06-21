import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "../../controllers/handleLogout";
const LogoutBtn = ({ position = "sidebar" }) => {
  return (
    <div
      onClick={handleLogout}
      className={`${
        position === "navbar"
          ? "border-2 border-white navbar-link"
          : "w-8 h-8 border-2 border-primary rounded-full text-md flex-row-centered hover:bg-primary cursor-pointer hover:text-white"
      }`}
    >
      {position === "navbar" ? "Logout" : <FiLogOut />}
    </div>
  );
};

export default LogoutBtn;
