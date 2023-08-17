import { NavigateFunction } from "react-router-dom";
import { USER_PAGE } from "./pathname";

export default function goToUserPage(
  navigate: NavigateFunction,
  event: React.MouseEvent<HTMLElement>,
  userName: string,
) {
  if (!userName) return;

  event.stopPropagation();

  navigate(`${USER_PAGE}/${userName}`);
}
