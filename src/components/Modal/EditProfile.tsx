import { useEffect, useRef, useState } from "react";
import { closeModal, handleAlert, openModal } from "store/clientSlices/modalSlice";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";
import { useCheckForUserNameMutation, useSaveUserInfoMutation } from "store/serverAPIs/novelTime";
import { CheckDeviceType } from "utils";

import { setAccessToken, setLoginUser } from "store/clientSlices/loginUserSlice";
import Spinner from "assets/Spinner";
import { useNavigate } from "react-router-dom";
import { setTemporaryUserBG, setUserProfile } from "store/clientSlices/userProfileSlice";
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
  TextByteContnr,
  NoteUserName,
  MarkUserNameAsByte,
  NormalFontWeight,
  UserNameAsByteContnr,
} from "./Modal.styles";
import SelectImagePosition from "./EditProfile.componentForImgPosition";
import dataURLtoBlob from "./utils/dataURLtoBlob";
import formatBytes from "./utils/formatBytes";
import { getTextLength } from "./utils/EditProfile.utils";

export default function EditProfile() {
  const BGRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoadingRef = useRef(false);

  // get login user info
  const loginUser = useAppSelector((state) => state.loginUser.user);
  const userNameRef = useRef<HTMLInputElement>(null);

  // userName
  const [userNameByte, setUserNameByte] = useState(0);
  // as clicking "save" button : pass for undefined or true, stop for false
  const isCheckedForDuplicateRef = useRef<undefined | boolean>();

  // onChange handler to calculate the user name as bytes as typing userName
  const handleTypeUserName = () => {
    if (userNameByte === undefined) return;
    // (X) don't do : if (!userNameByte)
    // it worked when userNameByte was zero because it was also falsy value.
    // after I removed all the text and typed again, this handler looked not working
    // in that time the current text byte shown in modal didn't change from 0
    //
    const tempUserName = userNameRef.current?.value as string;
    setUserNameByte(getTextLength(tempUserName));

    // not yet checked for duplicate user name
    isCheckedForDuplicateRef.current = false;
  };

  const [CheckForUserName] = useCheckForUserNameMutation();
  const [SaveUserInfo] = useSaveUserInfoMutation();

  // as clicking the select button for user name
  const confirmUserName = async () => {
    const tempUserName = userNameRef.current?.value as string;
    if (!tempUserName) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("유저 네임을 입력해 주세요"));
      //
    } else if (userNameByte > 12) {
      // limit the text length by 12byte
      dispatch(openModal("alert"));
      dispatch(handleAlert("입력 가능한 글자 수를 초과했어요"));
      //
    } else if (tempUserName === loginUser.userName) {
      dispatch(openModal("alert"));
      dispatch(handleAlert(`기존 이름과 같아요.\n새로운 이름을 입력해 주세요`));
      //
    } else if (tempUserName[0] === " " || tempUserName[tempUserName.length - 1] === " ") {
      // Make user exclude leading or trailing spaces in userName
      // and allow spaces between userName letters. this naming rule is the same as kakao's
      dispatch(openModal("alert"));
      dispatch(handleAlert("이름 맨 앞 또는 맨 뒤 공백이 없어야 해요"));
      //
    } else {
      // request with user name to check if it is duplicate or not
      await CheckForUserName(tempUserName).then((result) => {
        if ("data" in result) {
          const alertMessage = result.data;

          dispatch(openModal("alert"));
          dispatch(handleAlert(alertMessage));

          if (alertMessage === "you can use this name") {
            // complete checking for duplicate user name
            isCheckedForDuplicateRef.current = true;
          }
        }
      });
      // 중복일 경우 alert, 중복 값 true 설정 (디폴트 false. false일 때 최종적으로 저장 가능(버튼클릭))
      // 중복 아니면 alert "사용 가능한 이름이에요"
    }
  };

  // set image
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const [newProfileImage, setNewProfileImage] = useState<Blob>(); // image link after hosting image
  const [newProfileImageAsString, setNewProfileImageAsString] = useState<string>(); // to show as profile image
  const [isEditingImage, handleEditingImage] = useState(false); // if it is false show the profile modal

  // set profile image background position for mobile and tablet device
  const [profileImgPosition, setProfileImgPosition] = useState("");

  // to show image background positioning controller for temporary userBG just after selecting it
  const tempUserBG = useAppSelector((state) => state.userProfile.temporaryUserBG);
  // to host image as blob
  const temUserBGasBlobRef = useRef<Blob>();

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
          if (!blob) {
            dispatch(openModal("alert"));
            dispatch(handleAlert(`이미지 편집에 실패했습니다.\n다시 한 번 시도해주세요.`));
            return;
          }

          const dataCapacity = formatBytes(blob.size);

          // if blob size is smaller than 20MB image hosting is available
          if (blob.size <= 2e7) {
            // set the image and show it as image profile
            setNewProfileImage(blob);
          } else {
            dispatch(openModal("alert"));
            dispatch(
              handleAlert(
                `20MB 이하로 저장 가능해요!\n다른 이미지를 선택해 주세요.\n현재 용량: ${dataCapacity}`,
              ),
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

  const handleProfileBG = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event && event.target && event.target.files) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        const blob = dataURLtoBlob(reader.result as string);
        if (!blob) {
          dispatch(openModal("alert"));
          dispatch(handleAlert(`이미지 편집에 실패했습니다.\n다시 한 번 시도해주세요.`));
          return;
        }

        const dataCapacity = formatBytes(blob.size);

        // if blob size is smaller than 20MB image hosting is available
        if (blob.size <= 2e7) {
          temUserBGasBlobRef.current = blob;
          const BGasString = window.URL.createObjectURL(blob);
          // show selected BG in UserPageParent component
          dispatch(setTemporaryUserBG({ src: BGasString, position: "" }));
        } else {
          dispatch(openModal("alert"));
          dispatch(
            handleAlert(
              `20MB 이하로 저장 가능해요!\n다른 이미지를 선택해 주세요.\n현재 용량: ${dataCapacity}`,
            ),
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const closeProfileModal = () => {
    dispatch(closeModal());
    dispatch(setTemporaryUserBG({ src: "", position: "" })); // remove the temp bg data
  };

  // image hosting on imgur
  const [ImageHosting] = useImageHostingMutation();
  const handleImageHosting = (selectedImg: Blob) =>
    new Promise<any>((resolve) => {
      const formData = new FormData();

      formData.append("image", selectedImg);

      ImageHosting(formData)
        .unwrap()
        .then((result) => {
          const imageLink = result.link; // get image link from imgur
          resolve(imageLink);
        });
    });

  const saveChangedInfo = async () => {
    // set loading state
    isLoadingRef.current = true;

    // in this case don't save and do alert
    if (isCheckedForDuplicateRef.current === false) {
      isLoadingRef.current = false;
      dispatch(openModal("alert"));
      dispatch(handleAlert("유저네임 중복 체크를 완료해 주세요"));
      return;
    }

    let profileImgLink = "";
    let bgImgLink = "";
    // hosting user profile image
    if (newProfileImage) {
      await handleImageHosting(newProfileImage).then((link) => {
        profileImgLink = link as string;
      });
    }
    // hosting user bg image
    if (temUserBGasBlobRef?.current) {
      await handleImageHosting(temUserBGasBlobRef?.current).then((link) => {
        bgImgLink = link as string;
      });
    }

    // changed or unchanged user info(as it didn't exist) to save
    const changedUserInfo = {
      changedUserName: userNameRef.current?.value || loginUser.userName,
      changedUserImg: {
        src: profileImgLink || loginUser.userImg.src,
        position: profileImgPosition || loginUser.userImg.position,
      },
      changedUserBG: {
        src: bgImgLink || loginUser.userBG.src,
        position: tempUserBG.position || loginUser.userBG.position,
      },
    };

    // save changed user info in DB
    // and set new token and user info in redux store
    try {
      const payload = await SaveUserInfo(changedUserInfo).unwrap();
      dispatch(setLoginUser(payload.userInfo));
      dispatch(setAccessToken(payload.accessToken));
      dispatch(setUserProfile(payload.userInfo));
      isLoadingRef.current = false;
      dispatch(openModal("alert"));
      dispatch(handleAlert("유저 정보가 성공적으로 저장되었어요"));

      // navigate to next path by new user name //
      const { pathname } = window.location; // pathname : "/user-page/" + userName (+ ...)
      // get the back of user name in url
      const pages = [
        "/writing/created",
        "/writing/liked",
        "/novel-list/created",
        "/novel-list/liked",
      ];
      let backIndexOfUserName = -1;
      for (const page of pages) {
        const indexOfPageName = pathname.indexOf(page);
        if (indexOfPageName !== -1) {
          backIndexOfUserName = indexOfPageName;
          break;
        }
      }
      const backOfUserName = pathname.substring(backIndexOfUserName);

      let nextPathName;
      if (backIndexOfUserName === -1) {
        nextPathName = `/user-page/${payload.userInfo.userName}`;
      } else {
        nextPathName = `/user-page/${payload.userInfo.userName}${backOfUserName}`;
      }

      navigate(nextPathName);
    } catch (err) {
      isLoadingRef.current = false;
      dispatch(openModal("alert"));
      dispatch(handleAlert("유저 정보 저장에 실패했어요"));
    }
    // after all passed close the modal // change upper code later
    closeProfileModal();
  };

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

  // set the userNameByte at first
  useEffect(() => {
    if (loginUser.userName) {
      setUserNameByte(getTextLength(loginUser.userName));
    }
  }, [loginUser.userName]);

  return (
    <TranslucentBG
      ref={BGRef}
      isEditingUserBG={!!tempUserBG.src}
      onClick={() => {
        // prevent modal from being closed
        //  when dragging to area outside the modal as editing the image
        if (!isEditingImage) closeProfileModal();
      }}
    >
      {isLoadingRef.current && <Spinner />}

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
          isEditingUserBG={!!tempUserBG.src}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }}
        >
          <CloseOrSave>
            <ClosingBox isSmallWidth isProfile onClick={closeProfileModal}>
              <ClosingIcon isProfile />
            </ClosingBox>
            <TextForSave
              onClick={() => {
                saveChangedInfo();
              }}
            >
              저장
            </TextForSave>
          </CloseOrSave>
          <ContentContnr>
            <ProfileImgBox>
              <ProfileImg
                imgPosition={profileImgPosition}
                userImg={newProfileImageAsString || selectedProfileImage || loginUser.userImg.src}
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
              <ProfileName
                type="text"
                ref={userNameRef}
                defaultValue={loginUser.userName}
                onChange={handleTypeUserName}
              />
              <SelectBtn onClick={confirmUserName}>선택</SelectBtn>
              <TextByteContnr>
                <NoteUserName>영문, 숫자는 1로, 한글은 2로 계산됩니다</NoteUserName>
                <UserNameAsByteContnr>
                  <MarkUserNameAsByte userNameByte={userNameByte}>
                    {`${userNameByte} `}
                  </MarkUserNameAsByte>
                  <NormalFontWeight>/</NormalFontWeight>
                  {" 12"}
                </UserNameAsByteContnr>
              </TextByteContnr>
            </ProfileNameBox>
            <SelectBtnBox isBG>
              <SelectBtn isBG>배경 수정</SelectBtn>
              <UploadImg
                type="file"
                name="BGImage"
                onChange={(event) => {
                  handleProfileBG(event);
                }}
              />
            </SelectBtnBox>
            {tempUserBG.src && <SelectImagePosition />}
          </ContentContnr>
        </ModalBox>
      )}
    </TranslucentBG>
  );
}
