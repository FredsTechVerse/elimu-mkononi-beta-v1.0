import { Link, useLocation } from "react-router-dom";

const NavBgBtn = ({ to, text }) => {
  const location = useLocation();
  return (
    <Link to={to} state={{ background: location }}>
      <div
        className={
          text == "Log In"
            ? "border-2 border-white navbar-link"
            : text === "register"
            ? "navbar-link bg-white text-black"
            : "capitalize flex-row-centered gap-1 text-black bg-white w-32 rounded-full h-8  px-0.5"
        }
      >
        {text}
      </div>
    </Link>
  );
};

export default NavBgBtn;
