import { useState, useEffect } from "react";

export default function useWhetherItIsTablet() {
  const [isDeskTop, handleDeskTop] = useState(false);

  const checkItIsTablet = () => {
    const windowWidth = window.innerWidth; // including scrollbar
    return windowWidth >= 768;
    // scrollbar width must be included
    //  for when resizing window and navigating between message list and message room
    //  where scrollbar can exist or not
  };

  const handleResize = () => handleDeskTop(checkItIsTablet());

  useEffect(() => {
    handleDeskTop(checkItIsTablet());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDeskTop;
}
