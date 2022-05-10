import { useAppSelector } from "../../store/hooks";
import { usePreventScroll } from "../../utils";
import NovelImage from "./NovelImage";
import SortWriting from "./SortWriting";
import FilterContent from "./FilterContent";
import Login from "./Login";
import EditProfile from "./EditProfile.components";

export default function Modal() {
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);

  // prevent scrolling body when modal displays
  usePreventScroll(modalCategory);

  return (
    <div>
      {(() => {
        switch (modalCategory) {
          case "novelImage":
            return <NovelImage />;
          case "sortWriting":
            return <SortWriting />;
          case "filterContent":
            return <FilterContent />;
          case "login":
            return <Login />;
          case "editProfile":
            return <EditProfile />;

          case "none":
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;

          default:
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
        }
      })()}
    </div>
  );
}
