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
  SocialLink,
  TranslucentBG,
  ClosingBox,
  ClosingIcon,
  ModalBox,
} from "./Modal.styles";

export default function Share() {
  const dispatch = useAppDispatch();

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
            <SocialLink href="">
              <SocialCategory isFaceBook>
                <SocialIconBox isFaceBook size={20}>
                  <Icon.FaceBook />
                </SocialIconBox>
                페이스북
              </SocialCategory>
            </SocialLink>
          </SocialCategoryContnr>
        </ContentContnr>
        <LogoContnr>
          <Logo src={catWalking} alt="cat walking" />
        </LogoContnr>
      </ModalBox>
    </TranslucentBG>
  );
}
