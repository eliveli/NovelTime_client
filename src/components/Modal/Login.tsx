import { closeModal } from "store/clientSlices/modalSlice";
import Icon from "assets/Icon";
import { catWalking } from "assets/images";
import { useAppDispatch } from "../../store/hooks";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL, GOOGLE_AUTH_URL } from "./utils/OAuth";
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

export default function Login() {
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
          <ModalTitle>로그인</ModalTitle>
          <SocialCategoryContnr>
            <SocialLink href={KAKAO_AUTH_URL}>
              <SocialCategory isKaKao>
                <SocialIconBox isKaKao size={20}>
                  <Icon.Kakao />
                </SocialIconBox>
                카카오
              </SocialCategory>
            </SocialLink>
            <SocialLink href={NAVER_AUTH_URL}>
              <SocialCategory isNaver>
                <SocialIconBox isNaver size={20}>
                  <Icon.Naver />
                </SocialIconBox>
                네이버
              </SocialCategory>
            </SocialLink>
            <SocialLink href={GOOGLE_AUTH_URL}>
              <SocialCategory isGoogle>
                <SocialIconBox isGoogle size={20}>
                  <Icon.Google />
                </SocialIconBox>
                구글
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
