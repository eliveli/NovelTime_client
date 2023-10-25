import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../store/clientSlices/modalSlice";

// this is not used now
//
// warning !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// it does work unexpectedly. even if I click the inside element, that element is closed.

//
// when clicking outside componentRef
//       and firstModalCategory is the same as inputModalCategory
// componentRef will be closed

export default function useCloseModalClickOutside(
  componentRef: React.RefObject<HTMLElement>,
  inputModalCategory: string,
) {
  const dispatch = useAppDispatch();
  const firstModalCategory = useAppSelector((state) => state.modal.firstModalCategory);
  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      const clickedElement = event.currentTarget;
      if (firstModalCategory !== inputModalCategory) return;
      if (
        !(
          clickedElement &&
          clickedElement instanceof Node &&
          componentRef.current?.contains(clickedElement)
        )
      ) {
        dispatch(closeModal({ isSecond: undefined })); // fix if it is used later
      }
    };
    window.addEventListener("click", closeOutside);
    return () => {
      window.removeEventListener("click", closeOutside);
    };
  }, [componentRef, firstModalCategory]);
  // deps list is required. if it is empty, click event don't work...
}
