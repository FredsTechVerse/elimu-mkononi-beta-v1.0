import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const MenuBtn = ({ openSideBar, sideBarOpen }) => {
  return (
    <div
      onClick={openSideBar}
      className={`${
        sideBarOpen ? "hidden" : "block"
      } text-xl  border-none  flex-col-centered px-2 tablet:hidden `}
    >
      <Bars3BottomRightIcon className="icon-styling" />
    </div>
  );
};

export default MenuBtn;
