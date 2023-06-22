const SubmitButton = ({ text, type, disabled = false }) => {
  return (
    <button
      className={`text-lg capitalize w-48 m-3 h-9 rounded-full text-white text-center ${
        disabled ? "bg-blue-400" : " bg-primary  hover:bg-purple-600"
      }`}
      type={type}
      disabled={disabled}
    >
      <div className="w-full h-full flex-row-centered">{text}</div>
    </button>
  );
};

export default SubmitButton;
