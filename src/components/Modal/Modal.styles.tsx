import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelImgBG = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  ${theme.hideScrollBar}
`;
export const NovelImgContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;

  position: relative;
  ${theme.media.tablet(`
    width: auto;
    height:100%;
  `)}/* position: static; */
`;

export const NovelImgBig = styled.img`
  /* div로 가로세로 비율 맞출 때 */
  /* padding-top: 135%; //카카오페이지 */
  /* padding-top: 146%; //시리즈, 리디북스 */

  width: 100%;
  ${theme.media.tablet(`
    width: auto;
    height: 100%;
 `)}
`;
// export const NovelImgBig = styled.div<{ src: string }>`
//   /* padding-top: 135%; //카카오페이지 */
//   /* padding-top: 146%; //시리즈, 리디북스 */
//   /* padding-top: ${({ src }) => (src.includes("dn-img-page.kakao.com") ? "135%" : "146%")}; */

//   background-image: url(${({ src }) => src});
//   background-position-y: top;
//   background-repeat: no-repeat;
//   background-size: cover;
//   width: 100%;
//   ${theme.media.tablet(`
//     width: auto;
//     height: 100%;
//  `)}
// `;

export const CloseOrSave = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  padding: 4px;

  display: flex;
  justify-content: space-between;

  white-space: nowrap;
`;
export const TextForSave = styled.span`
  padding: 3px 5px 1px;
  font-size: 14px;

  color: rgba(0, 0, 0, 0.55);
  font-weight: 400;

  background-color: rgba(255, 255, 255, 0.9);
  border: 3px double rgba(150, 150, 150, 0.2);
  border-radius: 7px;

  min-height: 30px;
  max-height: 30px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background-color: rgba(200, 200, 200, 0.4);
    }
  }
`;
export const ClosingBox = styled(Icon.IconBox)<{ isSmallWidth?: true; isProfile?: true }>`
  z-index: 1;

  ${({ isProfile }) =>
    !isProfile &&
    `position: absolute;
    top: 1px;
    right: 1px;
  `}

  padding: 4px;
  align-self: flex-end;
  background-color: rgba(255, 255, 255, 0.9);
  border: 3px double rgba(150, 150, 150, 0.2);
  border-radius: 7px;

  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;

  @media screen and (min-width: 768px) {
    padding: 6px;
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
    ${({ isSmallWidth }) =>
      isSmallWidth &&
      `
        padding: 4px;
        min-width: 30px;
        max-width: 30px;
        min-height: 30px;
        max-height: 30px;
      `}
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background-color: rgba(200, 200, 200, 0.4);
    }
  }
`;
export const ClosingIcon = styled(Icon.Close)<{ isProfile?: true }>`
  opacity: 0.24;

  ${({ isProfile }) => isProfile && `opacity: 0.35;`}
`;

export const MobileBG = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  ${theme.media.tablet(`
    display: none;
  `)}
`;
export const ClosingSpace = styled.div`
  width: 100%;
  height: 100%;
`;
export const SortBox = styled.div`
  bottom: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
`;
export const SortText = styled.p<{ selectedCategory: string; category: string }>`
  padding: 10px 0;
  ${({ selectedCategory, category }) =>
    selectedCategory === category && `color: ${theme.color.main};`}

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const TranslucentBG = styled.div<{ isEditingUserBG?: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ isEditingUserBG }) =>
    isEditingUserBG ? `transparent` : "rgba(0, 0, 0, 0.5)"};
`;
export const CanvasContnr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
  border-radius: 7px;
`;
export const BtnUponCanvasContnr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 10px;
`;
export const TextForCropImg = styled.span`
  font-size: 15px;
  padding-top: 3px;
`;
export const BtnUponCanvas = styled.button`
  font-size: 13px;
  font-weight: 500;

  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.2);

  white-space: nowrap;

  border-radius: 20px;
  padding: 2px 9px 2px 7px;
`;

export const CropImageCanvas = styled.canvas`
  background-size: contain; // to show full image
  margin: 0 10px 10px;

  background-repeat: no-repeat;
  background-position: center;
`;

export const ModalBox = styled.div<{ padding?: string; isEditingUserBG?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ padding }) => padding || "54px"};
  background-color: white;
  position: relative;
  border-radius: 7px;

  ${({ isEditingUserBG }) =>
    isEditingUserBG &&
    `
      bottom: -122px;
      border: 1px solid rgba(0,0,0,0.1);
    `}
`;

export const BoxForPadding = styled.div`
  display: flex;
  flex-direction: column;
  padding: 54px;
`;
export const SocialCategoryContnr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const SocialLink = styled.a``;
export const SocialCategory = styled.button<{
  isKaKao?: true;
  isNaver?: true;
  isGoogle?: true;
  isFaceBook?: true;
  isTwitter?: true;
  isLink?: true;
}>`
  width: 100%;

  padding: 13px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
  font-size: 17px;
  font-weight: 500;
  background-color: white;
  border: 0;

  ${theme.media.hover(`cursor: pointer; opacity: 0.7;`)}

  ${({ isKaKao }) =>
    isKaKao && `color: rgb(211 204 0 / 76%); box-shadow: 0 0 4px rgb(250 225 0 / 100%);`};
  ${({ isNaver }) =>
    isNaver && `color: rgba(3,199,90,0.6); box-shadow: 0 0 4px rgba(3, 199, 90, 0.5);`};
  ${({ isGoogle }) =>
    isGoogle && `color: rgba(255, 61, 0, 0.6); box-shadow: 0 0 4px rgb(255 61 0 / 44%);`};
  ${({ isFaceBook }) =>
    isFaceBook && `color: rgb(8 116 231 / 63%); box-shadow: 0 0 4px rgb(8 116 231 / 66%);`};
  ${({ isTwitter }) =>
    isTwitter && `color: rgb(44 184 251 / 86%); box-shadow: 0 0 4px rgb(29 155 240 / 88%);`};
  ${({ isLink }) =>
    isLink && `color: rgb(96 96 96 / 65%); box-shadow: 0 0 4px rgb(96 96 96 / 75%); `};
`;

export const SelectHowToContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const SelectHowTo = styled.div<{
  category: "WithShareLink" | "Directly";
  selected: "WithShareLink" | "Directly";
}>`
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 500;

  ${({ category, selected }) =>
    category === selected &&
    `background-color: white; color: ${theme.color.main}; border-block-color:  ${theme.color.mainLight};`}
`;

export const GuideImgAlbumContainer = styled.div`
  margin-top: 20px;
  height: 450px;

  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GuideImgAlbum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
`;
export const GuideImg = styled.img`
  width: 300px; // same with the actual image width
  height: auto; // to get the original height among images that have different heights

  @media (max-width: 330px) {
    width: 280px;
  }

  border: 1px solid #a9a9a95e;
  border-radius: 3px;
`;

export const ArrowBox = styled.div`
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  width: 30px;
  height: 30px;

  color: rgba(100, 100, 100, 0.4);

  padding: 2px 7px 0px;
`;

export const ModalTitle = styled.h3<{ marginBottom?: number }>`
  margin: 0;
  text-align: center;
  margin-bottom: ${({ marginBottom }) => marginBottom || 30}px;
  color: rgba(100, 100, 100, 0.7);
  font-weight: 500;
`;
export const ContentContnr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ListTitleInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 14px;
`;
export const ListTitleInput = styled.input`
  @media screen and (min-width: 500px) {
    width: 300px;
  }
  border: 0;
  resize: none;
  -ms-overflow-style: none;
  outline: none;
  font-size: 16px;
  height: 28px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-family: "Californian FB", D2Coding, Arial, sans-serif;

  ::placeholder {
    color: #959595b0;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const ButtonContainerForAnswer = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-evenly;
  height: 45px;
  background-color: white;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
`;

export const ButtonForAnswer = styled.div<{ isSingleButton?: true }>`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    ${({ isSingleButton }) => !isSingleButton && "border-left: 1px solid rgba(0, 0, 0, 0.1);"}
  }

  color: rgba(100, 100, 100, 0.6);
  font-weight: 500;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const TextForAlertOrConfirm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4px;

  color: rgba(100, 100, 100, 0.6);
  font-weight: 500;

  white-space: pre-line;
  text-align: center;
`;

export const ProfileImgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;
export const ProfileImg = styled.div<{ userImg: string; imgPosition: string }>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  min-width: 200px;
  max-width: 200px;
  height: 200px;

  ${({ userImg }) => !userImg && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg});
  background-position: ${({ imgPosition }) => imgPosition || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;
export const ProfileNameBox = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 6px 8px 6px 12px;
  border-radius: 50px;

  position: relative;
`;
export const ProfileName = styled.input`
  text-align: center;
  font-size: 17px;
  border: 0;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
`;
export const SelectBtnBox = styled.div<{ isPhoto?: true; isBG?: true }>`
  ${({ isPhoto }) =>
    isPhoto &&
    `position: absolute;
    bottom: 0;
    right: 15px;
    margin:0;`}

  ${({ isBG }) => isBG && `margin: 0; margin-top: 40px; position: relative;`}

@media (hover: hover) {
    &:hover {
      background-color: rgba(200, 200, 200, 0.4);
      border-radius: 20px;
    }
  }
`;

// do not set cursor to buttons for photo, bg where it doesn't work properly

export const UploadImg = styled.input`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; // to not show but work
`;

export const SelectBtn = styled.button<{ isPhoto?: true; isBG?: true }>`
  color: rgba(100, 100, 100, 0.7);
  font-weight: 500;
  white-space: nowrap;
  border-radius: 20px;
  background-color: transparent;

  ${({ isBG }) =>
    isBG
      ? `padding: 6px 18px 6px 18px;
        font-size: 14px;
        border: 1px solid rgba(0,0,0,0.16);
    `
      : `padding: 2px 9px 2px 7px;
        font-size: 13px;
        border: 1px dotted rgba(0, 0, 0, 0.2);
    `}

  ${({ isPhoto, isBG }) =>
    !isPhoto &&
    !isBG &&
    theme.media.hover(`
      cursor: pointer;
      background-color: rgba(200,200,200,0.4);
  `)}
`;

export const TextByteContnr = styled.div`
  position: absolute;
  bottom: -25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  left: 0;
  width: 100%;
`;
export const NoteUserName = styled.span`
  font-size: 12px;
`;
export const UserNameAsByteContnr = styled.span`
  font-size: 15px;
  font-weight: 700;
`;
export const MarkUserNameAsByte = styled.span<{ userNameByte: number }>`
  font-size: 15px;
  font-weight: 700;
  // mark as color when the user name bytes was over the limit
  ${({ userNameByte }) => userNameByte > 12 && `color: ${theme.color.main}`}
`;
export const NormalFontWeight = styled.span`
  font-weight: 300;
`;
export const SocialIconBox = styled(Icon.IconBox)<{
  isKaKao?: true;
  isNaver?: true;
  isGoogle?: true; // not used
  isFaceBook?: true;
  isTwitter?: true;
  isLink?: true;
}>`
  margin-right: 10px;

  ${theme.media.hover(``)}; // don't use hover here. already used in SocialCategory

  ${({ isKaKao }) =>
    isKaKao &&
    ` background-color: rgba(250, 225, 0,0.6);
      color: rgba(60, 30, 30,0.7);
      padding: 2px;
      border-radius: 3px;
    `}
  ${({ isNaver }) =>
    isNaver &&
    ` color: rgba(3, 199, 90, 0.6);
    `};
  ${({ isFaceBook }) => isFaceBook && `color: rgb(8 116 231 / 85%);`};
  ${({ isTwitter }) => isTwitter && `color: rgb(29 155 240 / 88%);`};
  ${({ isLink }) => isLink && `color: rgb(96 96 96 / 98%);`};
`;
export const LogoContnr = styled.div`
  opacity: 0.8;
  margin-top: 31px;
`;
export const Logo = styled.img``;

export const GuideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 10px;
`;
export const ContainerToCreateNewList = styled.div`
  display: flex;
`;
export const GuideText = styled.span`
  color: #959595b0;
  font-size: 16px;
  font-weight: 500;
`;
export const MyListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const MyList = styled.div`
  display: flex;
  gap: 8px;
`;
export const ListTitle = styled.span``;
