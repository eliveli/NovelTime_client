import { useState, useEffect } from "react";

// 모달 활성화 hook (with animation)
export default function useModal() {
  const [isModal, setModal] = useState(false);

  const [isModalShown, handleShowModal] = useState(true); // state for animation: show on or show off

  const handleModal = () => {
    // 1) 모달 false 일 때(최초 모달 오픈 시) => modal true & showOn true
    if (!isModal) {
      setModal(true);
      handleShowModal(true); // 모달 오픈 2회차부터 필수
      return;
    }
    // 2-1) 모달 true 일 때 => show false & 아래 useEffect에서 modal false
    handleShowModal(false);
  };

  // 2-2) 2-1 이후 modal false (최종: show false, modal false)
  // setTimeout 이용해 기다린 후 show false animation 끝나고 모달 false (컴포넌트 언마운트)
  useEffect(() => {
    if (isModal && !isModalShown) {
      setTimeout(() => setModal(false), 500);
    }
  }, [isModalShown]);

  return { isModal, handleModal, isModalShown };
} // Only animation show true <=> show false (for Navigation bar)
useModal.useShowOn = function useShowOn() {
  const [isShowOn, handleShowOn] = useState(false); // state for animation: show true or show false

  const handleShow = () => {
    handleShowOn(!isShowOn); // show true <=> show false
  };

  return { handleShow, isShowOn };
};
