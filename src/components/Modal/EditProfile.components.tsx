import { useEffect, useRef, useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";
import { useComponentHeight, useComponentWidth } from "utils";

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
  CropImageCanvas,
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
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const [selectedProfileBGImage, setSelectedProfileBGImage] = useState<null | File | Blob>(null);

  // convert file to DataURL
  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event && event.target && event.target.files) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // canvas
  const cropImgCanvasRef = useRef<HTMLCanvasElement>(null);
  // set canvas width and height as 100%
  const BGRef = useRef<HTMLDivElement>(null);
  const BGWidth = useComponentWidth(BGRef);
  const BGHeight = useComponentHeight(BGRef);
  // set canvas and draw image
  useEffect(() => {
    if (!cropImgCanvasRef.current) return;
    const canvas = cropImgCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.canvas.width = BGWidth;
    ctx.canvas.height = BGHeight;

    const image = new Image();
    image.src = selectedProfileImage;

    image.onload = () => {
      ctx.drawImage(image, 150, 200, 500, 300, 60, 60, 500, 300);
    };
  }, [cropImgCanvasRef, selectedProfileImage, BGWidth, BGHeight]);
  return (
    <TranslucentBG onClick={() => dispatch(closeModal())} ref={BGRef}>
      {selectedProfileImage && (
        <CropImageCanvas width="100%" height="100%" ref={cropImgCanvasRef} />
      )}
      {!selectedProfileImage && (
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
              <ProfileImg userImg={selectedProfileImage || loginUserInfo.userImg} />
              <SelectBtnBox isPhoto>
                <SelectBtn isPhoto>수정</SelectBtn>

                <UploadImg
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    handleProfileImage(event);
                  }}
                />
              </SelectBtnBox>
            </ProfileImgBox>
            <ProfileNameBox>
              <ProfileName type="text" ref={userNameRef} defaultValue={loginUserInfo.userName} />
              <SelectBtn onClick={confirmUserName}>선택</SelectBtn>
            </ProfileNameBox>
            <SelectBtnBox isBG>
              <SelectBtn isBG>
                배경 수정
                {/* 배경 이미지도 요청 시 받아와야 하는군... */}
              </SelectBtn>
              <UploadImg
                type="file"
                name="BGImage"
                onChange={(event) => {
                  if (event && event.target && event.target.files) {
                    setSelectedProfileBGImage(event.target.files[0]);
                  }
                }}
              />
            </SelectBtnBox>
          </ContentContnr>
        </ModalBox>
      )}
    </TranslucentBG>
  );
}
