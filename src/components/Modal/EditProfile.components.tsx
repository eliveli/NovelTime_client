import { useRef, useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  ClosingIcon,
  ClosingBox,
  TranslucentBG,
  ModalBox,
  ContentContnr,
  ProfileImg,
  ProfileImgBox,
  ProfileName,
  ProfileNameBox,
  SelectBtn,
  SelectBtnBox,
  UploadImg,
} from "./Modal.styles";

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const modalCategory = useAppSelector((state) => state.modal.modalCategory);

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
            <ProfileName type="text" ref={userNameRef} defaultValue={loginUserInfo.userName} />
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
}
