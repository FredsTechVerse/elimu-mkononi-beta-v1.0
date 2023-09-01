import React, { useState, useEffect } from "react";

const UseScrollHandler = () => {
  // setting initial value to true
  //   const [scroll, setScroll] = useState(1);
  const [pos, setPos] = useState("top");

  // scrollCheck is a boolean and scroll is a number
  // running on mount
  useEffect(() => {
    // const onScroll = () => {
    //   const scrollCheck = window.scrollY < 10;
    //   if (scrollCheck !== scroll) {
    //     setScroll(scrollCheck);
    //   }
    // };

    const onScroll = (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      console({ scrolled });
      if (scrolled >= 5) {
        setPos("moved");
      } else {
        setPos("top");
      }
    };

    // setting the event handler from web API
    document.addEventListener("scroll", onScroll);

    // cleaning up from the web API
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
    //   }, [scroll, setScroll]);
  }, []);

  //   return scroll;
  return pos;
};

export default UseScrollHandler;
