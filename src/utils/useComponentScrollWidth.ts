import { useState, useEffect } from "react";

// 컴포넌트 width 가져오는 hook : 스크린 resize 대비
const useComponentScrollWidth = (
  componentRef: React.RefObject<HTMLElement>,
  state1?: boolean | string | number, // state 변경될 때 width 재계산
  state2?: boolean | string | number, // state 변경될 때 width 재계산
) => {
  const [width, setWidth] = useState(0);
  // width 초기값 0. 렌더 이후 ref.current 이용, offsetWidth 가져와 width 재설정
  useEffect(() => {
    const getWidth = () => componentRef.current?.scrollWidth;

    if (componentRef.current) {
      setWidth(getWidth() as number);
    }

    const handleResize = () => setWidth(getWidth() as number);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [componentRef, state1, state2]);

  return width;
};

export default useComponentScrollWidth;
