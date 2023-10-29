import { useState, useEffect } from "react";

export default function useWhetherItIsMobile() {
  const [isMobile, handleMobile] = useState(false);

  const checkItIsMobile = () => window.innerWidth < 768; // including scrollbar
  // media query width matches window inner width (not html width)

  const handleResize = () => handleMobile(checkItIsMobile());

  useEffect(() => {
    handleMobile(checkItIsMobile());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
