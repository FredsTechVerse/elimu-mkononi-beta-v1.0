import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "../../controllers/handleLogout";
const LogoutBtn = () => {
  return (
    <div
      onClick={handleLogout}
      className="w-8 h-8 rounded-full text-md flex-row-centered bg-black hover:bg-white hover:text-black  cursor-pointer text-white "
    >
      <FiLogOut />
    </div>
  );
};

export default LogoutBtn;
