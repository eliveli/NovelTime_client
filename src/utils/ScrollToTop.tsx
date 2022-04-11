import { ReactChild, ReactChildren, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop({ children }: { children: ReactChild | ReactChildren }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    // scroll to top except when you click the back button
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{children}</>;
}

export default ScrollToTop;
