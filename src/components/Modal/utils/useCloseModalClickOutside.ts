import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../store/clientSlices/modalSlice";

// warning !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// it does work unexpectedly. even if I click the inside element, that element is closed.

//
// when clicking outside componentRef
//       and modalCategory is the same as inputModalCategory
// componentRef will be closed

// type InputModalType = "novelImage" | "sortWriting" | "filterContent" | "login" | "none";
export default function useCloseModalClickOutside(
  componentRef: React.RefObject<HTMLElement>,
  inputModalCategory: string,
) {
  const dispatch = useAppDispatch();
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);
  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      const clickedElement = event.currentTarget;
      if (modalCategory !== inputModalCategory) return;
      if (
        !(
          clickedElement &&
          clickedElement instanceof Node &&
          componentRef.current?.contains(clickedElement)
        )
      ) {
        dispatch(closeModal());
        console.log("clickedElement:", clickedElement);
        console.log("componentRef.current:", componentRef.current);
      }
    };
    window.addEventListener("click", closeOutside);
    return () => {
      window.removeEventListener("click", closeOutside);
    };
  }, [componentRef, modalCategory]);
  // deps list is required. if it is empty, click event don't work...
}
