const PageTitle = ({ text }) => {
  return (
    <div className="mt-3 phone:text-lg tablet:text-2xl laptop:text-4xl text-slate-500 font-bold w-full pl-10 text-center uppercase ">
      {text}
    </div>
  );
};

export default PageTitle;
