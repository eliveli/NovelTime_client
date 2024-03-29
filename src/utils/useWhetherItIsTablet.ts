import { useState, useEffect } from "react";

export default function useWhetherItIsTablet() {
  const [isDeskTop, handleDeskTop] = useState(false);

  const checkItIsTablet = () => window.innerWidth >= 768; // including scrollbar
  // scrollbar width must be included
  //  for when resizing window and navigating between chat room list and chat room
  //  where scrollbar can exist or not

  const handleResize = () => handleDeskTop(checkItIsTablet());

  useEffect(() => {
    handleDeskTop(checkItIsTablet());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDeskTop;
}
