// @flow
import React, { useState, useEffect } from "react";

export default function useWindowWidth(): number {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const doSetWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", doSetWidth);
    return () => window.removeEventListener("resize", doSetWidth);
  }, []);
  return width;
}
