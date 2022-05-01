import { useRef, useState } from "react";
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
  ModalBox,
  LoginCategoryContnr,
  LoginCategory,
  LoginTitle,
  ContentContnr,
  LoginIconBox,
  Logo,
  LogoContnr,
  LoginLink,
  ProfileImg,
  ProfileImgBox,
  ProfileName,
  ProfileNameBox,
  SelectBtn,
  SelectBtnBox,
  UploadImg,
} from "./Modal.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal, sortWriting, filterContent } from "../../store/clientSlices/modalSlice";
import { usePreventScroll } from "../../utils";
import { KAKAO_AUTH_URL } from "./utils/OAuth";

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
  const sortingText = useAppSelector((state) => state.modal.sortingText);
  const filteringContent = useAppSelector((state) => state.modal.filteringContent);

  // get login user info
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const userNameRef = useRef<HTMLInputElement>(null);

  const confirmUserName = () => {
    if (!userNameRef.current?.value) {
      alert("유저 네임을 입력해 주세요");
    }
    // 서버에 보내서 동일 유저 네임 여부 확인
    // 유저 네임 길이 제한(얼만큼?) 알림 문구도 미리 넣자.
    // 성공하면 변경된 유저 네임 스토어에 저장
  };

  // set image
  const [selectedProfileImage, setSelectedProfileImage] = useState<null | File | Blob>(null);
  const [selectedProfileBGImage, setSelectedProfileBGImage] = useState<null | File | Blob>(null);

  // prevent scrolling body when modal displays
  usePreventScroll(modalCategory);

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
                      <LoginLink>
                        <LoginCategory>
                          <LoginIconBox size={20}>
                            <Icon.Naver />
                          </LoginIconBox>
                          네이버
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
          case "editProfile":
            return (
              <TranslucentBG onClick={() => dispatch(closeModal())}>
                <ModalBox
                  padding="54px 40px"
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                  }}
                >
                  <ClosingBox isSmallWidth onClick={() => dispatch(closeModal())}>
                    <ClosingIcon />
                  </ClosingBox>
                  <ContentContnr>
                    <ProfileImgBox>
                      <ProfileImg userImg={loginUserInfo.userImg} />
                      <SelectBtnBox isPhoto>
                        <SelectBtn isPhoto onClick={() => {}}>
                          수정
                        </SelectBtn>

                        <UploadImg
                          type="file"
                          name="myImage"
                          onChange={(event) => {
                            if (event && event.target && event.target.files) {
                              console.log(event.target.files[0]);
                              setSelectedProfileImage(event.target.files[0]);
                            }
                          }}
                        />
                      </SelectBtnBox>
                    </ProfileImgBox>
                    <ProfileNameBox>
                      <ProfileName
                        type="text"
                        ref={userNameRef}
                        defaultValue={loginUserInfo.userName}
                      />
                      <SelectBtn onClick={confirmUserName}>선택</SelectBtn>
                    </ProfileNameBox>
                    <SelectBtnBox isBG>
                      <SelectBtn isBG onClick={() => {}}>
                        배경 수정
                        {/* 배경 이미지도 요청 시 받아와야 하는군... */}
                      </SelectBtn>
                      <UploadImg
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                          if (event && event.target && event.target.files) {
                            console.log(event.target.files[0]);
                            setSelectedProfileBGImage(event.target.files[0]);
                          }
                        }}
                      />
                    </SelectBtnBox>
                  </ContentContnr>
                </ModalBox>
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
