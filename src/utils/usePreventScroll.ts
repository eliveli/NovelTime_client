import { useEffect } from "react";
import { useAppSelector } from "store/hooks";

function usePreventScroll(firstModalCategory?: string) {
  const isEditingBG = !!useAppSelector((state) => state.userProfile.temporaryUserBG.src);

  // Prevent scrolling body while modal opens
  useEffect(() => {
    if (firstModalCategory === "editProfile" && isEditingBG) {
      // Scroll to top to see the whole userBG when editing userBG
      //  _scroll is prevented after this
      document.body.scrollIntoView();
    }

    if (firstModalCategory) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [firstModalCategory, isEditingBG]);
}

export default usePreventScroll;
