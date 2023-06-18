import { Link, useLocation } from "react-router-dom";
const NavBtn = ({ to, text }) => {
  return (
    <Link to={to}>
      <div className="navbar-link ">{text}</div>
    </Link>
  );
};

export default NavBtn;
