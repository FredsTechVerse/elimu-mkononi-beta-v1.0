const PriceTag = ({ amount, status }) => {
  return (
    <div
      className={` ${(status = "Ok"
        ? "bg-green-900"
        : status == "Average"
        ? "bg-yellow-900"
        : "bg-red-500 text-red-900")}absolute w-16 h-6 top-0 left-0  text-white rounded-tl-lg flex-row-centered`}
    >
      {amount}
    </div>
  );
};

export default PriceTag;
