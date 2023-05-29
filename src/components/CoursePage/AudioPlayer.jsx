// import React, { useState, useEffect } from "react";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
// import musicLogo from "../../assets/music-logo.jpg";
// const useAudio = (url) => {
//   console.log(`Audio Player activated ${url}`);
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);
//   const toggle = () => setPlaying(!playing);
//   // Toggles the playing state.
//   useEffect(() => {
//     playing ? audio.play() : audio.pause();
//   }, [playing]);

//   useEffect(() => {
//     audio.addEventListener("ended", () => setPlaying(false));
//     return () => {
//       audio.removeEventListener("ended", () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

// const AudioPlayer = ({ url, lessonName }) => {
//   // It is not a must to run a function via the useEffect.
//   const [playing, toggle] = useAudio(url);

//   return (
//     <div className="flex flex-col debug border-black items-center justify-start p-2">
//       <div className="relative h-[450px] w-[850px] rounded-lg flex flex-row-centered">
//         <img
//           src={musicLogo}
//           className="w-full h-full rounded-lg"
//           alt="Music placeholder"
//         />
//         <div className="rounded-lg absolute backdrop-blur-md w-full h-full flex-row-centered">
//           <button className=" m-auto text-4xl text-white" onClick={toggle}>
//             {playing ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
//           </button>
//         </div>
//       </div>
//       <h1 className="font-bold text-xl uppercase mt-2">{lessonName}</h1>
//       <p className="text-slate-400 font-medium text-lg">
//         Ausin Mwangi , Mechanical Department
//       </p>
//     </div>
//   );
// };

// export default AudioPlayer;

import React from "react";

const AudioPlayer = () => {
  return <div>AudioPlayer</div>;
};

export default AudioPlayer;
