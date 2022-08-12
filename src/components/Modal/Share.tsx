import { closeModal } from "store/clientSlices/modalSlice";

import Icon from "assets/Icon";
import { catWalking } from "assets/images";
import { useAppDispatch } from "../../store/hooks";

import {} from "./utils/SocialSharing";
import {
  SocialCategoryContnr,
  SocialCategory,
  ModalTitle,
  ContentContnr,
  SocialIconBox,
  Logo,
  LogoContnr,
  TranslucentBG,
  ClosingBox,
  ClosingIcon,
  ModalBox,
} from "./Modal.styles";

export default function Share() {
  const dispatch = useAppDispatch();

  const { href } = window.location;

  interface SocialList {
    [x: string]: string;
  }
  const socialUrl = {
    facebook: `https://www.facebook.com/sharer.php?u=${href}`,
    twitter: `https://twitter.com/share?url=${href}&text=NovelTime`,
  };
  const socialList: SocialList = { FB: socialUrl.facebook, TW: socialUrl.twitter };

  const onSharingClick = (site: string) => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    if (screenWidth <= 420 || screenHeight <= 420) {
      window.open(socialList[site], "sharer");
    } else {
      window.open(socialList[site], "sharer", "width=400,height=400,scrollbars=yes");
    }
  };

  return (
    <TranslucentBG onClick={() => dispatch(closeModal())}>
      <ModalBox
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <ClosingBox isSmallWidth onClick={() => dispatch(closeModal())}>
          <ClosingIcon />
        </ClosingBox>

        <ContentContnr>
          <ModalTitle>공유하기</ModalTitle>
          <SocialCategoryContnr>
            <SocialCategory isFaceBook onClick={() => onSharingClick("FB")}>
              <SocialIconBox isFaceBook size={20}>
                <Icon.FaceBook />
              </SocialIconBox>
              페이스북
            </SocialCategory>
            <SocialCategory isTwitter onClick={() => onSharingClick("TW")}>
              <SocialIconBox isTwitter size={20}>
                <Icon.Twitter />
              </SocialIconBox>
              트위터
            </SocialCategory>
          </SocialCategoryContnr>
        </ContentContnr>
        <LogoContnr>
          <Logo src={catWalking} alt="cat walking" />
        </LogoContnr>
      </ModalBox>
    </TranslucentBG>
  );
}
