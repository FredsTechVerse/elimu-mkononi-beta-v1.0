import Tutor1 from "../../assets/tutor-1.png";
import Tutor2 from "../../assets/tutor-2.png";
import { TeamCard } from "..";
const tutors = [
  {
    name: "Prof. Eugine Maina",
    image: Tutor1,
    course: "Mechatronic Engineering",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores iusto alias ducimus minus debitis. Odit.",
    whatsapp: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Dr. Evelyne Chemboi",
    image: Tutor2,
    course: "Electrical Engineering",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores iusto alias ducimus minus debitis. Odit.",
    whatsapp: "#",
    twitter: "#",
    linkedin: "#",
  },
];

const TeamSection = () => {
  return (
    <div className="w-full px-2 flex flex-col items-center justify-center my-5">
      <h3 className="text-5xl font-bold text-center mt-3">Our Team</h3>
      <p className="mb-6 text-center">Meet our lead Tutors</p>

      <div className="flex phone:flex-col tablet:flex-row gap-5 w-full justify-center items-center ">
        {tutors.map((tutor, index) => {
          return <TeamCard tutor={tutor} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TeamSection;
