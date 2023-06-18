import Forbid from "../assets/403-Forbidden.gif";

function Forbidden() {
  return (
    <div>
      <img src={Forbid} alt="Forbidden image" className="w-full h-full" />
    </div>
  );
}

export default Forbidden;
