import { CHAT_ROOM, CHAT_ROOM_LIST } from "./pathname";

export default function getCurrentRoomId() {
  const { pathname, search } = window.location;

  if (pathname === CHAT_ROOM_LIST && search.indexOf(`?roomId=`) === 0) {
    return search.substring(8);
  }

  if (pathname.indexOf(`${CHAT_ROOM}/`) === 0) {
    return pathname.substring(11);
  }

  return "";
}
