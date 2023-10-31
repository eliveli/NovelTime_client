import { useState, useCallback } from "react";

// Not used now (was used before in <UserNovelListDetailed>)
// it is required to use useCallback instead of useRef in useEffect deps array
// in order to work exactly when ref.current is changed and read in useEffect deps array
const useCallbackComponentWidth = (
  state1?: boolean | string | number, // state 변경될 때 width 재계산
  state2?: boolean | string | number, // state 변경될 때 width 재계산
) => {
  const [width, setWidth] = useState(0);

  const refCallback = useCallback(
    (node: HTMLDivElement) => {
      const getWidth = () => node.getBoundingClientRect().width;
      if (node !== null) {
        setWidth(getWidth());
      }
      const handleResize = () => setWidth(getWidth());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    [state1, state2],
  );

  return { width, refCallback };
};

export default useCallbackComponentWidth;
