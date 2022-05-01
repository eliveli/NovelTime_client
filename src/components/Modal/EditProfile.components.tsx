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
  // get BG width and height to size canvas
  const BGRef = useRef<HTMLDivElement>(null);
  const BGWidth = useComponentWidth(BGRef);
  const BGHeight = useComponentHeight(BGRef);
  // set canvas and draw image
  useEffect(() => {
    if (!cropImgCanvasRef.current) return;
    const canvas = cropImgCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = selectedProfileImage;

    image.onload = () => {
      // fit image as background in canvas
      // set canvas width, height, x, y to show full size image and center it in screen
      const canvasRatio = image.width / image.height;
      let newCanvasWidth = BGWidth;
      let newCanvasHeight = newCanvasWidth / canvasRatio;
      if (newCanvasHeight > BGHeight) {
        newCanvasHeight = BGHeight;
        newCanvasWidth = newCanvasHeight * canvasRatio;
      }
      const xOffset = newCanvasWidth < BGWidth ? (BGWidth - newCanvasWidth) / 2 : 0;
      const yOffset = newCanvasHeight < BGHeight ? (BGHeight - newCanvasHeight) / 2 : 0;

      canvas.style.top = `${yOffset}px`;
      canvas.style.left = `${xOffset}px`;
      canvas.style.width = `${newCanvasWidth}px`;
      canvas.style.height = `${newCanvasHeight}px`;
      canvas.style.backgroundImage = `url(${selectedProfileImage})`; // set image as background

      //   ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

      //   이미지를 캔버스의 백그라운드 이미지로 넣고
      //   캔버스의 크기와 위치를 조정하자

      //   그러고 나서 캔버스 위에서 정사각형을 그리자
      //   ctx.beginPath();
      //   ctx.rect(20, 20, 150, 100);
      //   ctx.stroke();
    };
  }, [cropImgCanvasRef, selectedProfileImage, BGWidth, BGHeight]);
  return (
    <TranslucentBG onClick={() => dispatch(closeModal())} ref={BGRef}>
      {selectedProfileImage && <CropImageCanvas ref={cropImgCanvasRef} />}
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
