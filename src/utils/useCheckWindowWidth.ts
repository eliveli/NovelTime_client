import { useState, useEffect } from "react";

export default function useCheckWindowWidth(width: number) {
  const [isInTheWidth, handleWindowWidth] = useState(false);

  const checkWindowWidth = () => window.innerWidth <= width; // including scrollbar

  const handleResize = () => handleWindowWidth(checkWindowWidth());

  useEffect(() => {
    handleWindowWidth(checkWindowWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isInTheWidth;
}
