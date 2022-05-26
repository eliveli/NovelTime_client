import { useEffect, useRef, useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";
import { CheckDeviceType } from "utils";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import EditProfileImg from "./EditProfile.components";

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
import SelectImagePosition from "./EditProfile.componentForMobile";
import dataURLtoBlob from "./utils/dataURLtoBlob";
import formatBytes from "./utils/formatBytes";

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
  const [newProfileImage, setNewProfileImage] = useState<Blob>(); // image link after hosting image
  const [newProfileImageAsString, setNewProfileImageAsString] = useState<string>();
  const [isEditingImage, handleEditingImage] = useState(false); // if it is false show the profile modal
  const [selectedProfileBGImage, setSelectedProfileBGImage] = useState<null | File | Blob>(null);

  // set profile image background position for mobile and tablet device
  const [profileImgPosition, setProfileImgPosition] = useState("center");

  // convert file to DataURL
  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event && event.target && event.target.files) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        // check the image data capacity in mobile or tablet browser
        //    in desktop, data capacity would be checked after editing image
        if (CheckDeviceType() !== "desktop") {
          const blob = dataURLtoBlob(reader.result as string);

          const dataCapacity = formatBytes(blob.size);

          // if blob size is smaller than 20MB image hosting is available
          if (blob.size <= 2e7) {
            // set the image and show it as image profile
            setNewProfileImage(blob);
          } else {
            alert(
              `20MB 이하로 저장 가능해요! 다른 이미지를 선택해 주세요. 현재 용량: ${dataCapacity}`,
            );
          }
        }
        // always set the image in desktop
        else {
          setSelectedProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      //
      handleEditingImage(true); // for desktop
      // if this is the second time that user try to edit image
      // this setState will make the user do that
      // without this user can't edit the second image on canvas
    }
  };

  // image hosting on imgur after finishing editing the profile image
  const [ImageHosting] = useImageHostingMutation();
  const handleImageHosting = async () => {
    if (newProfileImage) {
      const formData = new FormData();

      formData.append("image", newProfileImage);

      await ImageHosting(formData)
        .unwrap()
        .then((result) => {
          const imageLink = result.link; // get image link from imgur
        })
        .catch((err) => {
          console.log("as requesting image hosting err occurred:", err);
        });
    }
  };

  const BGRef = useRef<HTMLDivElement>(null);

  // this will set selectedProfileImage as empty string //
  // thanks to this setting
  //    in EditProfileImg component especially when user try to edit image twice
  //    values depending on this state "selectedProfileImage" such as canvas size, sXY, squareSize
  //    will be set as their initial value
  // if not the values will be set as them as when the previous image was displayed
  //    and user will see the untidy square on canvas and the feature for resizing square won't work
  useEffect(() => {
    if (isEditingImage) {
      setSelectedProfileImage("");
    }
    // convert newProfileImage type from blob to string to show it on profile modal
    if (newProfileImage) {
      setNewProfileImageAsString(window.URL.createObjectURL(newProfileImage));
    }
  }, [isEditingImage, newProfileImage]);

  return (
    <TranslucentBG
      onClick={() => {
        // prevent modal from being closed
        //  when dragging to area outside the modal as editing the image
        if (!isEditingImage) dispatch(closeModal());
      }}
      ref={BGRef}
    >
      {/* edit image on desktop not on mobile or tablet where canvas can't work */}
      {/* note : it is not about screen size. it is about device type */}
      {/* after selecting image close the component */}
      {selectedProfileImage && isEditingImage && CheckDeviceType() === "desktop" && (
        <EditProfileImg
          selectedProfileImage={selectedProfileImage}
          setNewProfileImage={setNewProfileImage}
          handleEditingImage={handleEditingImage}
          BGRef={BGRef}
        />
      )}

      {/* show profile modal at first and after hosting image */}
      {/* (at first) || (canceling editing image and back here) || (finishing editing and back) */}
      {/* || (mobile or tablet browser)  : in this case user see the selected image directly */}
      {(!selectedProfileImage ||
        !isEditingImage ||
        (newProfileImage && !isEditingImage) ||
        CheckDeviceType() !== "desktop") && (
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
            <TextForSave
              onClick={() => {
                handleImageHosting();
              }}
            >
              저장
            </TextForSave>
          </CloseOrSave>
          <ContentContnr>
            <ProfileImgBox>
              <ProfileImg
                imgPosition={profileImgPosition}
                userImg={newProfileImageAsString || selectedProfileImage || loginUserInfo.userImg}
              />
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
              {/* select the image position on mobile or tablet browser */}
              {newProfileImage && CheckDeviceType() !== "desktop" && (
                <SelectImagePosition setProfileImgPosition={setProfileImgPosition} />
              )}
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
