import { useState, useEffect } from "react";

// it can be not accurate when y-scrollbar exists
export default function useWhetherItIsDesktop() {
  const [isDeskTop, handleDeskTop] = useState(false);

  const checkItIsDeskTop = () => {
    const htmlWidth = document.documentElement.offsetWidth;
    return htmlWidth >= 1024;
  };

  const handleResize = () => handleDeskTop(checkItIsDeskTop());

  useEffect(() => {
    handleDeskTop(checkItIsDeskTop());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDeskTop;
}
