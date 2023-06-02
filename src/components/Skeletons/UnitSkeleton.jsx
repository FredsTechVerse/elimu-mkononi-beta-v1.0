const UnitSkeleton = () => {
  return (
    <article className="w-80 bg-white h-48 flex flex-col gap-2  pt-3 rounded-md animate-pulse ">
      <section className=" w-full px-2  flex items-center gap-3 ">
        <div className="ml-4 w-12 h-12 rounded-full bg-slate-400 "></div>
        <div className="w-36 h-6 bg-slate-400 rounded-full"></div>
      </section>
      <section className="w-full h-full flex flex-col gap-2 p-2">
        <div className="w-64 h-5  rounded-full bg-slate-400 "></div>
        <div className="w-56 h-5  rounded-full bg-slate-400 "></div>
        <div className="w-32 h-5  rounded-full bg-slate-400 "></div>
      </section>
    </article>
  );
};

export default UnitSkeleton;
