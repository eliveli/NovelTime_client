import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { Img, ReCommentList } from "store/serverAPIs/types";

export const CommentListContainer = styled.div`
  border-radius: 20px;
  border: 1px solid lightgray;
  margin-top: 10px;
  padding: 14px 0 2px;

  @media (max-width: 820px) {
    margin-bottom: 78px;
  }
`;
export const CommentMarkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  /* border-bottom: 1px dotted rgba(0, 0, 0, 0.1); */
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
  ${theme.media.mobile(`
    padding: 0 16px;
  `)}/* padding: 0 0 10px 0; */
`;
export const CommentMark = styled.span``;
export const CommentContainer = styled.div<{
  isReComment?: true;
}>`
  display: flex;
  padding: 12px 20px 6px;
  ${theme.media.mobile(`
    padding: 10px 12px 6px;
  `)}

  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);

  font-size: 15px;

  &:last-child {
    border-bottom: 0;
    ${({ isReComment }) =>
      !isReComment &&
      `padding-bottom: 12px;
    `}
  }

  ${({ isReComment }) =>
    isReComment &&
    `padding: 0;
    padding-top: 10px;
    margin-top: 5px;
    border-top: 1px dotted rgba(0, 0, 0, 0.1);
    border-bottom: 0;
  `}
`;

export const DeletedCommentContainer = styled.div<{
  isReComment?: true;
}>`
  display: flex;
  flex-direction: column;
  padding: 12px 20px 6px;
  ${theme.media.mobile(`
    padding: 10px 12px 6px;
  `)}

  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);

  font-size: 15px;

  &:last-child {
    border-bottom: 0;
    ${({ isReComment }) =>
      !isReComment &&
      `padding-bottom: 12px;
    `}
  }

  ${({ isReComment }) =>
    isReComment &&
    `padding: 0;
    padding-top: 10px;
    margin-top: 5px;
    border-top: 1px dotted rgba(0, 0, 0, 0.1);
    border-bottom: 0;
  `}
`;

export const DeletedCommentFirstLineContainer = styled.div`
  display: flex;
`;

export const LeftSpaceOfDeletedComment = styled.div`
  width: 40px;
`;

export const DeletedComment = styled.div<{ isParentToMark: boolean; hasReComment: boolean }>`
  width: 100%;

  padding: 4px 6px 2px;

  border-radius: 3px;

  ${({ hasReComment }) => hasReComment && `padding: 4px 6px 4px;`}

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
  ${({ isParentToWriteReComment }) => isParentToWriteReComment && "color: rgba(3, 199, 90, 0.6);"}
`;
export const CommentSortContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const CommentSort = styled.span<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    !!isSelected &&
    `
    color: ${theme.color.main}
  `}
`;

export const ReCommentMarkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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
`;

export const ReCommentMark = styled.span`
  margin-left: 5px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  font-size: 14px;
`;
export const ReCommentUser = styled.span`
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`;
// export const ReCommentContainer = styled.div`
//   margin-left: -20px;
//   margin-bottom: -12px;
// `;

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
  /* border-radius: 20px; */
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 14px;

  position: relative;
`;

export const SpaceForUserNameOnTextArea = styled.span`
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
  /* min-width: 30px; */
  /* height: 34px; */
  /* border-radius: 20px; */
  background-color: transparent;
  white-space: nowrap;
  margin-left: 10px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;

  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;
export type ReComment = {
  commentId: string;
  parentCommentId: string;
  firstAncestorCommentId: string;
  parentCommentUserName: string;
  userName: string;
  userImg: Img;
  commentContent: string;
  createDate: string;
};
export type Comment = {
  commentId: string;
  userName: string;
  userImg: Img;
  commentContent: string;
  createDate: string;
  isDeleted: 0 | 1;
  isEdited: 0 | 1;
  reComment?: ReComment[];
};
export interface CommentListProps {
  commentList: Comment[];
  commentIdForScroll?: string;
  commentSort: {
    sortTypeForComments: "new" | "old";
    setSortTypeForComments: React.Dispatch<React.SetStateAction<"new" | "old">>;
  };
  set1inCommentPageNo: () => void;
  reComments?: ReCommentList;

  rootCommentSelected: {
    rootCommentIdToShowReComments: string;
    setRootCommentIdToShowReComments: React.Dispatch<React.SetStateAction<string>>;
  };

  parentCommentForNewReComment: {
    parentForNewReComment: {
      parentCommentId: string;
      parentCommentUserName: string;
    };
    setParentForNewReComment: React.Dispatch<
      React.SetStateAction<{
        parentCommentId: string;
        parentCommentUserName: string;
      }>
    >;
  };

  commentPageNo: number;
  getAllRootCommentPages: () => void;

  talkId: string;
  novelTitle: string;
}

export type CommentProps = {
  isFirstComment?: boolean;
  commentPageNo?: number;
  getAllRootCommentPages?: () => void;
  commentSortType?: "new" | "old";

  comment: {
    commentId: string;
    userName: string;
    userImg: Img;
    commentContent: string;
    createDate: string;
    reCommentNo?: number; // in rootComment

    // for reComment (not for rootComment)
    parentCommentId?: string;
    parentCommentUserName?: string;

    isDeleted: 0 | 1;
    isEdited: 0 | 1;
  };
  // when reComment is props for CommentWritten
  isReComment?: true;
  commentIdForScroll?: string;

  parentCommentForNewReComment: {
    parentForNewReComment: {
      parentCommentId: string;
      parentCommentUserName: string;
    };
    setParentForNewReComment: React.Dispatch<
      React.SetStateAction<{
        parentCommentId: string;
        parentCommentUserName: string;
      }>
    >;
  };

  parentAndChildCommentToMark: {
    parentAndChildToMark: {
      parent: string;
      child: string;
    };
    setParentAndChildToMark: React.Dispatch<
      React.SetStateAction<{
        parent: string;
        child: string;
      }>
    >;
  };

  reCommentsOfRootComment?: ReCommentList;

  rootCommentSelected?: {
    rootCommentIdToShowReComments: string;
    setRootCommentIdToShowReComments: React.Dispatch<React.SetStateAction<string>>;
  };

  itsRootCommentWasDeleted?: boolean;

  talkId: string;
  novelTitle: string;
};
