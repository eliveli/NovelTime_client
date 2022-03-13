import { useState, useEffect } from "react";

// 컴포넌트 width 가져오는 hook : 스크린 resize 대비
const useComponentWidth = (componentRef: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);
  // width 초기값 0. 렌더 이후 ref.current 이용, offsetWidth 가져와 width 재설정
  useEffect(() => {
    const getWidth = () => componentRef.current?.offsetWidth;

    if (componentRef.current) {
      setWidth(getWidth() as number);
    }

    const handleResize = () => setWidth(getWidth() as number);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [componentRef]);

  return width;
};

export default useComponentWidth;
