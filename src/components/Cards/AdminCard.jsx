const AdminCard = ({ Icon, Text, Number }) => {
  return (
    <div className="text flex justify-start items-center gap-7 max-w-[450px] border-2 border-primary h-48 rounded-md pl-5 ">
      <img
        className="flex-row-centered w-1/3 h-4/5 text-8xl text-dark"
        src={Icon}
        alt="Admin Section Icon"
      />
      <div id="text" className="flex flex-col items-center">
        <div className="number text-6xl">{Number}</div>
        <div className="text text-xl font-light">{Text}</div>
      </div>
    </div>
  );
};

export default AdminCard;
