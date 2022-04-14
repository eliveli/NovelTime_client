import { useRef } from "react";
import Icon from "assets/Icon";
import { catWalking } from "assets/images";
import {
  NovelImgBG,
  NovelImgBig,
  ClosingIcon,
  ClosingBox,
  NovelImgContainer,
  MobileBG,
  SortBox,
  SortText,
  ClosingSpace,
  TranslucentBG,
  LoginBox,
  LoginCategoryContnr,
  LoginCategory,
  LoginTitle,
  ContentContnr,
  LoginIconBox,
  Logo,
  LogoContnr,
} from "./Modal.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal, sortWriting, filterContent } from "../../store/clientSlices/modalSlice";
import { usePreventScroll } from "../../utils";
import useCloseModalClickOutside from "./utils/useCloseModalClickOutside";

export default function Modal() {
  const dispatch = useAppDispatch();
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);
  const novelImage = useAppSelector((state) => state.modal.novelImage);

  // 네이버 시리즈 이미지 url 변경, 큰 사이즈 가져오기
  let imgSrc;
  if (novelImage.slice(novelImage.length - 10, novelImage.length) === "?type=m260") {
    imgSrc = novelImage.slice(0, novelImage.indexOf("?type=m260"));
  } else {
    imgSrc = novelImage;
  }
  // get selected category text to mark in the list
  const { sortingText, filteringContent } = useAppSelector((state) => state.modal);

  // prevent scrolling body when modal displays
  usePreventScroll(modalCategory);

  // to close login box when clicking outside
  // of course, login modal will be closed when clicking the close icon. go seeing in "case login:"
  const loginBoxRef = useRef<HTMLDivElement>(null);
  useCloseModalClickOutside(loginBoxRef, "login");
  //  .!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // warning : this works unexpectedly. It does work even I clicked the inside element...
  //

  return (
    <div>
      {(() => {
        switch (modalCategory) {
          case "novelImage":
            return (
              <NovelImgBG>
                <NovelImgContainer>
                  {/* <NovelImgBig src={imgSrc} /> */}
                  <NovelImgBig src={imgSrc} alt="BigSize Image" />
                  <ClosingBox onClick={() => dispatch(closeModal())}>
                    <ClosingIcon />
                  </ClosingBox>
                </NovelImgContainer>
              </NovelImgBG>
            );
          case "sortWriting":
            return (
              <MobileBG>
                <SortBox>
                  {["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"].map(
                    (_) => (
                      <SortText
                        key={_}
                        selectedCategory={sortingText}
                        category={_}
                        onClick={() => {
                          dispatch(sortWriting(_));
                          dispatch(closeModal());
                        }}
                      >
                        {_}
                      </SortText>
                    ),
                  )}
                </SortBox>
                <ClosingSpace
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                />
              </MobileBG>
            );
          case "filterContent":
            return (
              <MobileBG>
                <SortBox>
                  {["Novel", "FreeTalk", "Recommend"].map((_) => (
                    <SortText
                      key={_}
                      selectedCategory={filteringContent}
                      category={_}
                      onClick={() => {
                        dispatch(filterContent(_));
                        dispatch(closeModal());
                      }}
                    >
                      {_}
                    </SortText>
                  ))}
                </SortBox>
                <ClosingSpace
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                />
              </MobileBG>
            );
          case "login":
            return (
              <TranslucentBG>
                <LoginBox ref={loginBoxRef}>
                  <ClosingBox isSmallWidth onClick={() => dispatch(closeModal())}>
                    <ClosingIcon />
                  </ClosingBox>
                  <ContentContnr>
                    <LoginTitle>로그인</LoginTitle>
                    <LoginCategoryContnr>
                      <LoginCategory isKaKao>
                        <LoginIconBox isKaKao size={20}>
                          <Icon.Kakao />
                        </LoginIconBox>
                        카카오
                      </LoginCategory>
                      <LoginCategory>
                        <LoginIconBox size={20}>
                          <Icon.Naver />
                        </LoginIconBox>
                        네이버
                      </LoginCategory>
                    </LoginCategoryContnr>
                  </ContentContnr>
                  <LogoContnr>
                    <Logo src={catWalking} alt="cat walking" />
                  </LogoContnr>
                </LoginBox>
              </TranslucentBG>
            );
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
