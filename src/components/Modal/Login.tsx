import { closeModal } from "store/clientSlices/modalSlice";

import Icon from "assets/Icon";
import { catWalking } from "assets/images";
import { useAppDispatch } from "../../store/hooks";

import { KAKAO_AUTH_URL, NAVER_AUTH_URL, GOOGLE_AUTH_URL } from "./utils/OAuth";
import {
  LoginCategoryContnr,
  LoginCategory,
  LoginTitle,
  ContentContnr,
  LoginIconBox,
  Logo,
  LogoContnr,
  LoginLink,
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
          <LoginTitle>로그인</LoginTitle>
          <LoginCategoryContnr>
            <LoginLink href={KAKAO_AUTH_URL}>
              <LoginCategory isKaKao>
                <LoginIconBox isKaKao size={20}>
                  <Icon.Kakao />
                </LoginIconBox>
                카카오
              </LoginCategory>
            </LoginLink>
            <LoginLink href={NAVER_AUTH_URL}>
              <LoginCategory isNaver>
                <LoginIconBox size={20}>
                  <Icon.Naver />
                </LoginIconBox>
                네이버
              </LoginCategory>
            </LoginLink>
            <LoginLink href={GOOGLE_AUTH_URL}>
              <LoginCategory isGoogle>
                <LoginIconBox size={20}>
                  <Icon.Google />
                </LoginIconBox>
                구글
              </LoginCategory>
            </LoginLink>
          </LoginCategoryContnr>
        </ContentContnr>
        <LogoContnr>
          <Logo src={catWalking} alt="cat walking" />
        </LogoContnr>
      </ModalBox>
    </TranslucentBG>
  );
}
