import { useEffect } from "react";

function usePreventScroll(firstModalCategory?: string) {
  // Prevent scrolling body while modal opens
  //  except for when editing profile so as to see the whole userBG that user edits now
  useEffect(() => {
    if (firstModalCategory && firstModalCategory !== "editProfile") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [firstModalCategory]);
}

export default usePreventScroll;
