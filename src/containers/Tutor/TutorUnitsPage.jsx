import { UnitCard } from "../../components";
const TutorUnitsPage = () => {
  return (
    <div className="w-full relative h-full flex flex-col ">
      <header className="bg-slate-400 h-[300px] relative flex items-center justify-center">
        <h1 className="text-white font-bold text-center text-4xl uppercase">
          DISCRETE MATHEMATICS
        </h1>
      </header>
      <section className="relative w-full h-full bg-secondary">
        {/* When this is absolute the parent collapses. */}
        <div className="relative top-[-70px] w-full h-full px-20 ">
          <main className="relative main-content grid grid-cols-2 gap-10">
            <UnitCard
              number={"01"}
              heading={"Thermodynamics"}
              summary={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorem nam ipsum doloribus nihil pariatur fugi"
              }
            />

            <UnitCard
              number={"02"}
              heading={"Solid Mechanics"}
              summary={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorem nam ipsum doloribus nihil pariatur fugi"
              }
            />
            <UnitCard
              number={"03"}
              heading={"Engineering Materials"}
              summary={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorem nam ipsum doloribus nihil pariatur fugi"
              }
            />
            <UnitCard
              number={"04"}
              heading={"Calculus 2"}
              summary={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorem nam ipsum doloribus nihil pariatur fugi"
              }
            />
          </main>
        </div>
      </section>
    </div>
  );
};

export default TutorUnitsPage;
