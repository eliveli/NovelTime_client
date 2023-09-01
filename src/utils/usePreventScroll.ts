import { useEffect } from "react";

function usePreventScroll(modalCategory: string) {
  // 모달 띄운 동안 body 영역 스크롤 막기
  useEffect(() => {
    if (modalCategory !== "none") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [modalCategory]);
}

export default usePreventScroll;
