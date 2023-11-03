import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { Img } from "store/serverAPIs/types";

export const CommentListContainer = styled.div`
  border-radius: 20px;
  border: 1px solid lightgray;
  margin-top: 10px;
  padding: 14px 0 2px;

  margin-bottom: 10px;
`;
export const CommentMarkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);

  ${theme.media.mobile(`
    padding: 0 16px;
  `)}
  ${theme.media.tablet(`
    padding-bottom: 7px;
    padding-left: 20px;
    padding-right: 20px;
  `)}
`;
export const CommentMark = styled.span``;
export const CommentContainer = styled.div<{
  isReComment?: true;
}>`
  display: flex;
  font-size: 15px;

  @media (max-width: 767px) {
    ${({ isReComment }) =>
      isReComment
        ? `
          padding: 10px 0 4px;
          margin-top: 5px;
          border-top: 1px dotted rgba(0, 0, 0, 0.1);
          border-bottom: 0;
          `
        : `padding: 10px 12px 6px;
           border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
    `}

    &:last-child {
      border-bottom: 0;
      padding: ${({ isReComment }) => (isReComment ? `10px 0 4px` : `10px 12px 12px`)};
    }
  }

  @media (min-width: 768px) {
    ${({ isReComment }) =>
      isReComment
        ? `padding: 10px 0 0 0;
          margin-top: 5px;
          border-top: 1px dotted rgba(0, 0, 0, 0.1);
          border-bottom: 0;
        `
        : `padding: 12px 20px;
           border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
    `}

    &:last-child {
      border-bottom: 0;
      padding: ${({ isReComment }) => (isReComment ? `10px 0 0 0` : `12px 20px 12px`)};
    }
  }
`;

export const DeletedCommentContainer = styled.div<{
  isReComment?: true;
}>`
  display: flex;
  flex-direction: column;
  font-size: 15px;

  @media (max-width: 767px) {
    ${({ isReComment }) =>
      isReComment
        ? `
          padding: 10px 0 4px;
          margin-top: 5px;
          border-top: 1px dotted rgba(0, 0, 0, 0.1);
          border-bottom: 0;
          `
        : `padding: 10px 12px 6px;
           border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
    `}

    &:last-child {
      border-bottom: 0;
      padding: ${({ isReComment }) => (isReComment ? `10px 0 4px` : `10px 12px 12px`)};
    }
  }

  @media (min-width: 768px) {
    ${({ isReComment }) =>
      isReComment
        ? `padding: 10px 0 0 0;
          margin-top: 5px;
          border-top: 1px dotted rgba(0, 0, 0, 0.1);
          border-bottom: 0;
        `
        : `padding: 12px 20px;
           border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
    `}

    &:last-child {
      border-bottom: 0;
      padding: ${({ isReComment }) => (isReComment ? `10px 0 0 0` : `12px 20px 12px`)};
    }
  }
`;

export const DeletedCommentFirstLineContainer = styled.div`
  display: flex;
`;

export const LeftSpaceOfDeletedComment = styled.div`
  width: 40px;
`;

export const DeletedComment = styled.div<{ isParentToMark: boolean; hasReComment: boolean }>`
  width: 100%;

  border-radius: 3px;

  ${({ hasReComment }) => (hasReComment ? `padding: 4px 6px 4px;` : `padding: 4px 6px 2px;`)}

  ${({ isParentToMark }) => isParentToMark && `border: 1px solid ${theme.color.mainLight};`}
  
  ${theme.media.tablet(`margin-top: -5px;`)}
`;

export const DeletedCommentNumberContainer = styled.div`
  margin-left: 40px;
`;

export const UserNameAndEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const UserNameContainer = styled.div`
  display: flex;
`;
export const UserImgBox = styled.div`
  min-width: 30px;
`;
export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  padding-top: 100%;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;
export const CreateDate = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

export const MarkForEdited = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: darkgray;
`;

export const CommentContentToEdit = styled.p<{ isParentToMark: boolean }>`
  margin: 0 0 3px;

  white-space: pre-wrap; // allow the line break

  border: none;
  border-radius: 5px;
  background-color: whitesmoke;

  ${({ isParentToMark }) =>
    isParentToMark && `border: 1px solid ${theme.color.mainLight}; padding: 0 5px;`}
`;

export const CommentContent = styled.p<{ isParentToMark: boolean }>`
  margin: 0 0 3px;

  white-space: pre-wrap; // allow the line break

  ${({ isParentToMark }) =>
    isParentToMark && `border: 1px solid ${theme.color.mainLight}; padding: 0 5px;`}
`;

export const NextToImgContainer = styled.div`
  width: 100%;
  margin-left: 10px;
`;
export const UserName = styled.span<{ isParentToWriteReComment: boolean }>`
  font-weight: ${({ isParentToWriteReComment }) => (isParentToWriteReComment ? 400 : 300)};

  color: ${({ isParentToWriteReComment }) =>
    isParentToWriteReComment ? "rgba(3, 199, 90, 0.6)" : "inherit"};
`;
export const CommentSortContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const CommentSort = styled.span<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected
      ? `color: ${theme.color.main};`
      : theme.media.hover(
          `cursor: pointer;
          opacity: 0.7;`,
        )}
`;

export const ReCommentMarkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;

export const ReCommentButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const MarkParentAndChildComment = styled.span<{
  childComment: string;
  currentComment: string;
}>`
  color: ${({ childComment, currentComment }) =>
    childComment === currentComment ? theme.color.mainLight : "rgba(0, 0, 0, 0.4)"};

  font-weight: 500;
  font-size: 14px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;

export const ReCommentMark = styled.span<{ isSelected?: true }>`
  margin-left: 5px;
  color: ${({ isSelected }) => (isSelected ? "rgba(3, 199, 90, 0.6)" : "rgba(0, 0, 0, 0.4)")};
  font-weight: ${({ isSelected }) => (isSelected ? 400 : 500)};
  font-size: 14px;
`;
export const ReCommentUser = styled.span`
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`;
export const CommentInputContainerOnMobile = styled.div<{ isRootCommentInput: boolean }>`
  display: flex;
  align-items: center;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;

  margin-top: 10px;
  padding: 15px;
  padding-right: 13px;

  position: sticky;
  // o 문제 : y스크롤 없을 때 또는 y스크롤 최하단에서 컴포넌트가 가려짐
  // o 세부 상황 : 직접적으로 넣은 적 없는 canvas 요소가 html의 첫번째 child로 나타나고
  //          canvas의 'position : fixed' 자동 적용, canvas가 html보다 height이 큼
  // o 대처 : fix -> sticky

  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 1;
`;

export const CommentInputContainerOnTablet = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;

  padding: 15px;
  padding-right: 13px;
`;

export const WriteTextCntnr = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 14px;

  position: relative;
`;

export const SpaceForUserName = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 10px;
  margin-left: 11px;
  color: rgba(3, 199, 90, 0.6);
`;

export const WriteText = styled.textarea<{ spaceForUserName?: number }>`
  width: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  height: 28px;
  line-height: 1.5;

  ${({ spaceForUserName }) => spaceForUserName && `text-indent: ${spaceForUserName}px;`}

  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-family: "Californian FB", D2Coding, Arial, sans-serif;

  background-color: transparent;

  ::placeholder {
    color: rgba(100, 100, 100, 0.6);
    font-size: 16px;
    font-weight: 500;
  }
`;
export const EmojiCntnr = styled(Icon.IconBox)`
  display: flex;
  align-items: center;
`;
export const EmojiIcon = styled(Icon.Emoji)``;
export const WriteCommentSubmit = styled.button`
  min-width: 46px;
  height: 46px;
  border-radius: 14px;
  background-color: transparent;
  white-space: nowrap;
  margin-left: 10px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;

  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
