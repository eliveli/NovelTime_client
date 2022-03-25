// import { CommentListContainer, CommentContainer } from "./FreeTalkDetail.styles";

import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const CommentListContainer = styled.div`
  border-radius: 20px;
  border: 1px solid lightgray;
  margin-top: 10px;
  padding: 14px 0 2px;
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
  /* padding: 0 0 10px 0; */
`;
export const CommentMark = styled.span``;
export const CommentContainer = styled.div<{ isReComment: boolean | undefined }>`
  display: flex;
  /* padding: 12px 20px; */
  padding: 12px 20px 6px;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
  &:last-child {
    border-bottom: 0;
    ${({ isReComment }) =>
      !isReComment &&
      `padding: 12px 20px;
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
export const UserNameContainer = styled.div`
  display: flex;
`;
export const UserImgBox = styled.div`
  min-width: 30px;
`;
export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  padding-top: 100%;
  background-image: url(${({ userImg }) => userImg});
  background-position: center;
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
export const CommentSort = styled.span``;
export const ReCommentMarkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const ReCommentMark = styled.span`
  margin-left: 5px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 600;
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
export const WriteCommentContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid lightgray;
  margin-top: 10px;
  padding: 14px 20px;
`;
export const WriteTextCntnr = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 14px;
`;

export const WriteText = styled.textarea`
  width: 100%;
  height: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;
`;
export const EmojiCntnr = styled(Icon.IconBox)`
  display: flex;
  align-items: center;
`;
export const EmojiIcon = styled(Icon.Emoji)``;
export const WriteCommentSubmit = styled.button`
  min-width: 30px;
  height: 34px;
  background-color: transparent;
  white-space: nowrap;
  margin-left: 10px;
  display: flex;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
`;
type ReComment = {
  commentId: string;
  reCommentUserName: string;
  userName: string;
  userImg: string;
  commentContent: string;
  createDate: string;
};
type Comment = {
  commentId: string;
  userName: string;
  userImg: string;
  commentContent: string;
  createDate: string;
  reComment: ReComment[];
};
interface CommentListProps {
  commentList: Comment[];
}
type CommentProps = {
  comment: {
    commentId: string;
    userName: string;
    userImg: string;
    commentContent: string;
    createDate: string;
    reComment?: ReComment[];
    reCommentUserName?: string; // when re-comment is props for TalkComment
  };
  // when re-comment is props for TalkComment
  isReComment?: boolean;
};

export function WriteComment() {
  return (
    <WriteCommentContainer>
      <WriteTextCntnr>
        <WriteText placeholder="Write your comment!" />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </WriteTextCntnr>
      <WriteCommentSubmit>작성</WriteCommentSubmit>
    </WriteCommentContainer>
  );
}

function TalkComment({ isReComment, comment }: CommentProps) {
  const { commentId, userName, userImg, commentContent, createDate, reComment, reCommentUserName } =
    comment;
  return (
    //       reComment: [
    //        {
    //       reCommentUserName: "lala",
    //           userName: "리리리",
    //           userImg: "",
    //           commentContent: "",
    //           createDate: "22.01.05",
    //       }
    <CommentContainer isReComment={isReComment}>
      <UserImgBox>
        <UserImg userImg={userImg} />
      </UserImgBox>
      <NextToImgContainer>
        <UserNameContainer>
          <UserName>{userName}</UserName>
          <CreateDate>{createDate}</CreateDate>
        </UserNameContainer>
        <CommentContent>
          {isReComment && <ReCommentUser>{`@${reCommentUserName as string} `}</ReCommentUser>}
          {commentContent}
        </CommentContent>
        <ReCommentMarkContainer>
          <Icon.IconBox size={15}>
            <Icon.Comment />
          </Icon.IconBox>
          <ReCommentMark>답글</ReCommentMark>
        </ReCommentMarkContainer>
        {reComment?.length &&
          reComment.map((_) => <TalkComment key={_.commentId} isReComment comment={_} />)}
      </NextToImgContainer>
    </CommentContainer>
  );
}
export function CommentList({ commentList }: CommentListProps) {
  return (
    <CommentListContainer>
      <CommentMarkContainer>
        <CommentMark>댓글</CommentMark>
        <CommentSortContainer>
          {["NEW", "OLD"].map((_) => (
            <CommentSort key={_}>{_}</CommentSort>
          ))}
        </CommentSortContainer>
      </CommentMarkContainer>
      {commentList.map((_) => (
        <TalkComment key={_.commentId} comment={_} />
      ))}
    </CommentListContainer>
  );
}
