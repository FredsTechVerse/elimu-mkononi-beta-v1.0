const TutorCard = () => {
  return (
    <article className="w-full flex-col-center  shadow-lg shadow-slate-400 bg-white rounded-lg px-3 pt-2 pb-10 ">
      <section className="flex-col-centered pt-5">
        <img className="avatar rounded-full w-[130px] h-[130px] bg-slate-400"></img>
        <div className="name capitalize mt-2 font-bold text-xl">
          John Mwangi
        </div>
        <div className="role capitalize mb-4 text-slate-500 font-bold text-lg">
          tutor
        </div>
      </section>
      <section className="description text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ab ad,
        est provident voluptates soluta. Nostrum aperiam placeat ipsum, possimus
      </section>
    </article>
  );
};

export default TutorCard;
