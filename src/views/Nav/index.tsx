import { useWhetherItIsDesktop } from "utils";
import {
  NavPC,
  NavMobileMainTop,
  NavMobileMainBottom,
  NavMobileDetail,
  ChatRoomNav,
} from "./Nav.components";
import { NavTopBG, NavBottomBG } from "./Nav.styles";

export function MainListNav() {
  const isDesktop = useWhetherItIsDesktop();

  return (
    <>
      {isDesktop && (
        <NavTopBG>
          <NavPC />
        </NavTopBG>
      )}

      {!isDesktop && (
        <>
          <NavTopBG>
            <NavMobileMainTop />
          </NavTopBG>

          <NavBottomBG>
            <NavMobileMainBottom />
          </NavBottomBG>
        </>
      )}
    </>
  );
}

export function DetailNav() {
  const isDesktop = useWhetherItIsDesktop();

  return (
    <NavTopBG>
      {isDesktop && <NavPC />}
      {!isDesktop && <NavMobileDetail />}
    </NavTopBG>
  );
}

// only used where chat room page (not chat room list page)
export function ChatRoomNavMobile() {
  return (
    <NavTopBG isChatRoom>
      <ChatRoomNav />
    </NavTopBG>
  );
}
