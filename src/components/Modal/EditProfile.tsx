import { useRef, useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";
import { CheckDeviceType } from "utils";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import EditProfileImg from "./EditProfile.components";
import HostingProfileImgForMobile from "./EditProfile.HostingProfileImgForMobile";
import {
  CloseOrSave,
  TextForSave,
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
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const [isNewProfileImage, handleNewProfileImage] = useState<boolean>(false);
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

      handleNewProfileImage(false); // show component to edit image
    }
  };

  const BGRef = useRef<HTMLDivElement>(null);

  return (
    <TranslucentBG
      onClick={() => {
        dispatch(closeModal());
      }}
      ref={BGRef}
    >
      {/* edit image on desktop not on mobile or tablet where canvas can't work */}
      {/* note : it is not about screen size. it is about device type */}
      {/* after selecting and hosting image close the component */}
      {selectedProfileImage && !isNewProfileImage && CheckDeviceType() === "desktop" && (
        <EditProfileImg
          selectedProfileImage={selectedProfileImage}
          setSelectedProfileImage={setSelectedProfileImage}
          handleNewProfileImage={handleNewProfileImage}
          BGRef={BGRef}
        />
      )}
      {selectedProfileImage && !isNewProfileImage && CheckDeviceType() !== "desktop" && (
        <HostingProfileImgForMobile
          selectedProfileImage={selectedProfileImage}
          handleNewProfileImage={handleNewProfileImage}
        />
      )}
      {/* show profile modal at first and after hosting image */}
      {(!selectedProfileImage || (selectedProfileImage && isNewProfileImage)) && (
        <ModalBox
          padding="54px 40px"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }}
        >
          <CloseOrSave>
            <ClosingBox isSmallWidth isProfile onClick={() => dispatch(closeModal())}>
              <ClosingIcon isProfile />
            </ClosingBox>
            <TextForSave onClick={() => {}}>저장</TextForSave>
          </CloseOrSave>
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
