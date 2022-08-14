import { useState, useCallback } from "react";

// it is required to use useCallback instead of useRef in useEffect deps array
// in order to work exactly when ref.current is changed and read in useEffect deps array
const useCallbackComponentHeight = (
  state1?: boolean | string | number, // state 변경될 때 height 재계산
  state2?: boolean | string | number, // state 변경될 때 height 재계산
) => {
  const [height, setHeight] = useState(0);

  const refCallback = useCallback(
    (node: HTMLDivElement) => {
      const getHeight = () => node.getBoundingClientRect().height;
      if (node !== null) {
        setHeight(getHeight());
      }
      const handleResize = () => setHeight(getHeight());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    [state1, state2],
  );

  return { height, refCallback };
};

export default useCallbackComponentHeight;
