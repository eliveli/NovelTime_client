import { useState, useEffect } from "react";

export default function useWhetherItIsMobile() {
  const [isMobile, handleMobile] = useState(false);

  const checkItIsMobile = () => {
    const htmlWidth = document.documentElement.offsetWidth;
    return htmlWidth < 768;
  };

  const handleResize = () => handleMobile(checkItIsMobile());

  useEffect(() => {
    handleMobile(checkItIsMobile());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
