import { useAppSelector } from "../../store/hooks";
import { usePreventScroll } from "../../utils";
import NovelImage from "./NovelImage";
import SortWriting from "./SortWriting";
import FilterContent from "./FilterContent";
import Login from "./Login";
import EditProfile from "./EditProfile";
import Share from "./Share";
import GetNovelURL from "./GetNovelURL";
import AddToMyNovelList from "./AddToMyNovelList";
import Confirm from "./Confirm";
import Alert from "./Alert";
import WriteNewListTitle from "./WriteNewListTitle";
import ChangeListTitle from "./ChangeListTitle";

export default function Modal() {
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);

  // prevent scrolling body when modal displays
  usePreventScroll(modalCategory);

  return (
    <>
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
          case "share":
            return <Share />;
          case "getNovelURL":
            return <GetNovelURL />;
          case "addToMyNovelList":
            return <AddToMyNovelList />;
          case "changeListTitle":
            return <ChangeListTitle />;
          case "confirm":
            return <Confirm />;
          case "alert":
            return <Alert />;
          case "writeNewListTitle":
            return <WriteNewListTitle />;

          case "none":
            return <></>;

          default:
            return <></>;
        }
      })()}
    </>
  );
}
