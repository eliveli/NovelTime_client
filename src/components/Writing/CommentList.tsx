// import { CommentListContainer, CommentContainer } from "./FreeTalkDetail.styles";

import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { useRef, useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setReComment, getClosingReComnt } from "../../store/clientSlices/writingSlice";

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
export const WriteCommentContainer = styled.div<{ isReComment?: true; isFixedComment?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid lightgray;
  margin-top: 10px;

  /* padding: 14px 20px; */
  padding: 15px;
  padding-right: 13px;
  ${({ isReComment }) => isReComment && "margin-left:-40px;"}

  // screen size <= 820px,   fix comment component to bottom
  ${({ isFixedComment }) =>
    isFixedComment &&
    `position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
    background-color: rgba(255,255,255,1);
    z-index: 1;`}
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
  height: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  height: 28px;
  line-height: 1.5;
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
  isReComment?: true;
};

function CommentPageMobile() {
  return <div />;
}

const screenWidth = window.screen.width;
const isTablet = screenWidth >= 768;
const isPC = window.screen.width >= 1024;
const isFixedComment = screenWidth <= 820;

export function WriteComment({ isReComment }: { isReComment?: true }) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState("");

  // learn more about useCallback!
  const writeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textRef.current) return;

    setComment(e.target.value); // store content of comment
    textRef.current.style.height = "28px"; // Default: height of 1 line
    const textHeight = textRef.current.scrollHeight; // current scroll height

    // max-height : 15 lines of 364px - for Tablet, Desktop
    if (isTablet) {
      textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
      return;
    }
    // max-height : 5 lines of 124px - for Mobile
    textRef.current.style.height = `${textHeight <= 124 ? textRef.current.scrollHeight : 124}px`;
  }, []);

  // for mobile and tablet, get reComment ID and userName
  // then show reCommentID in textarea
  const { reCommentId, reCommentUserName } = useAppSelector((state) => state.writing.reCommentUser);
  useEffect(() => {
    if (!textRef.current) return;
    if (!isPC && reCommentUserName) {
      textRef.current.value = `@${reCommentUserName} `;
    }
  }, [reCommentUserName]);
  const handleSubmit = () => {
    // server request : provide comment to server
  };
  return (
    <WriteCommentContainer isFixedComment={isFixedComment} isReComment={isReComment}>
      <WriteTextCntnr>
        <WriteText ref={textRef} onChange={writeComment} placeholder="Write your comment!" />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </WriteTextCntnr>
      <WriteCommentSubmit onClick={handleSubmit}>작성</WriteCommentSubmit>
    </WriteCommentContainer>
  );
}

function TalkComment({ isReComment, comment }: CommentProps) {
  const { commentId, userName, userImg, commentContent, createDate, reComment, reCommentUserName } =
    comment;

  // reComment one by one : can not set two reComment at once

  // go writing reComment
  const [isWriteReComnt, handleWriteReComnt] = useState(false);

  const dispatch = useAppDispatch();

  const { handlePrevReComnt } = useAppSelector((state) => state.writing);
  const { reCommentId } = useAppSelector((state) => state.writing.reCommentUser);

  // clicking "답글", then
  const handleReComment = () => {
    // set false of previous write-comment component
    handlePrevReComnt(false);

    // show or not component for writing reComment
    handleWriteReComnt(!isWriteReComnt);

    if (reCommentId) {
      alert(
        `작성 중인 답글이 존재해요! 이전 답글을 삭제할까요?
         - how do I know that? At least previous comment is empty? when and how do I get the state? do not add this feature? If yes, maybe many things necessary`,
      );
    }

    // for mobile & tablet, get userName for marking in textarea
    // for all devices, store info and after writing comment, send them to the server
    dispatch(setReComment({ reCommentId: commentId, reCommentUserName: userName }));
    // get function to close reComment next time
    dispatch(getClosingReComnt({ handleWriteReComnt }));
  };

  return (
    <CommentContainer isWriteReComnt={isWriteReComnt} isReComment={isReComment}>
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
          {!isWriteReComnt && <ReCommentMark onClick={handleReComment}>답글</ReCommentMark>}
          {isWriteReComnt && <ReCommentMark onClick={handleReComment}>답글 취소</ReCommentMark>}
        </ReCommentMarkContainer>
        {/* 답글 작성 컴포넌트 : 댓글의 답글일 경우 isReComment true -> 댓글의 답글에 모두 같은 레이아웃 설정 */}
        {isPC && isWriteReComnt && <WriteComment isReComment={isReComment} />}

        {reComment?.length &&
          reComment.map((_) => <TalkComment key={_.commentId} isReComment comment={_} />)}
      </NextToImgContainer>
    </CommentContainer>
  );
}
export function CommentList({ commentList }: CommentListProps) {
  // when write-comment component is fixed to screen bottom, give comment-list-component margin-bottom

  return (
    <CommentListContainer isFixedComment={isFixedComment}>
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
