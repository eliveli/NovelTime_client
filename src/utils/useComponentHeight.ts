import { useState, useEffect } from "react";

// 컴포넌트 height 가져오는 hook
const useComponentHeight = (
  componentRef: React.RefObject<HTMLElement>,
  state1?: boolean | string | number, // state 변경될 때 height 재계산
  state2?: boolean | string | number, // state 변경될 때 height 재계산
) => {
  const [height, setHeight] = useState(0);

  // height 초기값 0. 렌더 이후 ref.current 이용, offsetHeight가져와 height 재설정

  useEffect(() => {
    const getHeight = () => componentRef.current?.offsetHeight;
    if (componentRef.current) {
      setHeight(getHeight() as number);
    }

    const handleResize = () => setHeight(getHeight() as number);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [componentRef, state1, state2]);

  return height;
};

export default useComponentHeight;
