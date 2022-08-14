import { useState, useCallback } from "react";

// 컴포넌트 width 가져오는 hook : 스크린 resize 대비
const useCallbackComponentHeightAndScrollWidth = (
  state1?: boolean | string | number, // state 변경될 때 width 재계산
  state2?: boolean | string | number, // state 변경될 때 width 재계산
) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const refCallback = useCallback(
    (node: HTMLDivElement) => {
      const getWidth = () => node.getBoundingClientRect().width;
      const getHeight = () => node.getBoundingClientRect().height;
      if (node !== null) {
        setWidth(getWidth());
        setHeight(getHeight());
      }
      const handleResize = () => {
        setWidth(getWidth());
        setHeight(getHeight());
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    [state1, state2],
  );

  return { width, height, refCallback };
};

export default useCallbackComponentHeightAndScrollWidth;
