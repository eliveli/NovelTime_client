import { useState, useEffect } from "react";

export default function useWhetherItIsTablet() {
  const [isDeskTop, handleDeskTop] = useState(false);

  const checkItIsTablet = () => {
    const htmlWidth = document.documentElement.offsetWidth;
    return htmlWidth >= 768;
  };

  const handleResize = () => handleDeskTop(checkItIsTablet());

  useEffect(() => {
    handleDeskTop(checkItIsTablet());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDeskTop;
}
