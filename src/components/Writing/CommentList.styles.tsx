import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { Img, ReCommentList } from "store/serverAPIs/types";

export const CommentListContainer = styled.div<{ isFixedComment: boolean }>`
  border-radius: 20px;
  border: 1px solid lightgray;
  margin-top: 10px;
  padding: 14px 0 2px;
  ${({ isFixedComment }) => isFixedComment && "margin-bottom: 78px;"}
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
  isWriteReComnt: boolean;
  isParentToMark: boolean;
}>`
  display: flex;
  padding: 12px 20px 6px;
  ${theme.media.mobile(`
    padding: 10px 12px 6px;
  `)}
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
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

  ${({ isWriteReComnt }) => isWriteReComnt && `border: 8px double rgba(200,200,200,0.2);`}

  ${({ isParentToMark }) => isParentToMark && `box-shadow: 0 0 5px ${theme.color.main}`}
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
`;
export const CommentContent = styled.p`
  margin: 0 0 3px;
`;

export const NextToImgContainer = styled.div`
  width: 100%;
  margin-left: 10px;
`;
export const UserName = styled.span``;
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

export const MarkParentComment = styled.span`
  color: rgba(0, 0, 0, 0.4);
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
export const WriteCommentContainer = styled.div<{
  isReComment?: true;
  isFixedComment?: boolean;
  isMessage?: true;
}>`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;

  /* padding: 14px 20px; */
  padding: 15px;
  padding-right: 13px;
  ${({ isReComment }) => isReComment && "margin-left:-40px;"}

  // html width <= 820px,   fix comment component to bottom
  ${({ isFixedComment }) =>
    isFixedComment &&
    `position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
    background-color: rgba(255,255,255,1);
    z-index: 1;`}

// for message room component
  ${({ isMessage }) =>
    isMessage &&
    `
    position: relative;
    
    border-radius: 0;
    background-color: rgba(255,255,255,1);
    z-index: 1;
    
    border-left: 0; border-right: 0; border-bottom: 0;
  `}
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
`;

export const WriteText = styled.textarea`
  width: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  height: 28px;
  line-height: 1.5;

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
  reComment?: ReComment[];
};
export interface CommentListProps {
  commentList: Comment[];
  commentIdForScroll?: string;
  commentSort: {
    sortTypeForComments: "new" | "old";
    setSortTypeForComments: React.Dispatch<React.SetStateAction<"new" | "old">>;
  };
  set1ofCommentPageNo: () => void;
  getReComments: (rootCommentId: string) => Promise<void>;
  reComments: {
    [rootCommentId: string]: ReCommentList;
  };
}

export type CommentProps = {
  comment: {
    commentId: string;
    userName: string;
    userImg: Img;
    commentContent: string;
    createDate: string;
    reCommentNo?: number;
    reComment?: ReComment[]; // it is undefined when re-comment is props for CommentWritten
    // following three is used when reComment is not empty for CommentWritten
    parentCommentId?: string;
    firstAncestorCommentId?: string;
    parentCommentUserName?: string;
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

  parentCommentToMark: {
    parentToMark: string;
    setParentToMark: React.Dispatch<React.SetStateAction<string>>;
  };

  getReComments?: (rootCommentId: string) => Promise<void>;

  reCommentsOfRootComments?: ReCommentList;
};
