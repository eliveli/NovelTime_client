import { useEffect } from "react";

// when clicking outside componentRef and isCloseState is true,
// set false of handleCloseState
// then componentRef will be closed
export default function useCloseOutsideClick(
  componentRef: React.RefObject<HTMLElement>,
  isCloseState: boolean,
  handleCloseState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const closeList = (e: MouseEvent) => {
      const clickedElement = e.currentTarget;
      if (!isCloseState) return;
      if (
        !(
          clickedElement &&
          clickedElement instanceof Node &&
          componentRef.current?.contains(clickedElement)
        )
      ) {
        handleCloseState(false);
      }
    };
    window.addEventListener("click", closeList);
    return () => {
      window.removeEventListener("click", closeList);
    };
  }, [componentRef, isCloseState]);
  // deps list is required. if it is empty, click event don't work...
}
