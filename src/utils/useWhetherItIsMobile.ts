import { useState, useEffect } from "react";

export default function useWhetherItIsMobile() {
  const [isMobile, handleMobile] = useState(false);

  const checkItIsMobile = () => {
    const windowWidth = window.innerWidth; // including scrollbar
    return windowWidth < 768;
  };

  const handleResize = () => handleMobile(checkItIsMobile());

  useEffect(() => {
    handleMobile(checkItIsMobile());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
