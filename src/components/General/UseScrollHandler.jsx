import { useState, useEffect } from "react";

const UseScrollHandler = () => {
  const [scroll, setScroll] = useState(true);
  const onScroll = (e) => {
    const scrollCheck = window.scrollY < 800;
    // console.log({ scrollY: window.scrollY, scrollCheck });
    if (scrollCheck !== scroll) {
      setScroll(scrollCheck);
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [scroll, setScroll]);
  // Either nothing , empty params or what we have here works

  return scroll;
};

export default UseScrollHandler;
