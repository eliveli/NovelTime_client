import { ReactChild, ReactChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ children }: { children: ReactChild | ReactChildren }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
}

export default ScrollToTop;
