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

function ModalOpen({ category, isSecond }: { category: string; isSecond?: true }) {
  switch (category) {
    case "novelImage":
      return <NovelImage isSecond={isSecond} />;
    case "sortWriting":
      return <SortWriting isSecond={isSecond} />; // Used on mobile
    case "filterContent":
      return <FilterContent isSecond={isSecond} />;
    case "login":
      return <Login isSecond={isSecond} />;
    case "editProfile":
      return <EditProfile isSecond={isSecond} />;
    case "share":
      return <Share isSecond={isSecond} />;
    case "getNovelURL":
      return <GetNovelURL isSecond={isSecond} />;
    case "addToMyNovelList":
      return <AddToMyNovelList isSecond={isSecond} />;
    case "changeListTitle":
      return <ChangeListTitle isSecond={isSecond} />;
    case "confirm":
      return <Confirm isSecond={isSecond} />;
    case "alert":
      return <Alert isSecond={isSecond} />;
    case "writeNewListTitle":
      return <WriteNewListTitle isSecond={isSecond} />;

    case "none":
      return <></>;

    default:
      return <></>;
  }
}
export default function Modal() {
  const firstModalCategory = useAppSelector((state) => state.modal.firstModalCategory);
  const secondModalCategory = useAppSelector((state) => state.modal.secondModalCategory);

  // prevent scrolling body when modal displays
  usePreventScroll(firstModalCategory);

  return (
    <>
      {firstModalCategory && <ModalOpen category={firstModalCategory} />}

      {secondModalCategory && <ModalOpen isSecond category={secondModalCategory} />}
    </>
  );
}
