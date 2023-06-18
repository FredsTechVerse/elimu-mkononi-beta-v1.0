const FancyLine = ({ size }) => {
  return (
    <div
      className={`${
        size === "sm" ? "w-10" : size === "md" ? "w-28" : "w-36"
      } bg-primary mx-auto rounded-full h-1 my-1`}
    ></div>
  );
};

export default FancyLine;
