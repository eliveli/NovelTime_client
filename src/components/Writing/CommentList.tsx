// import { CommentListContainer, CommentContainer } from "./FreeTalkDetail.styles";

import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const CommentListContainer = styled.div``;

export const CommentContainer = styled.div``;

type ReComment = {
  userName: string;
  userImg: string;
  commentContent: string;
  createDate: string;
};
type Comment = {
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
    userName: string;
    userImg: string;
    commentContent: string;
    createDate: string;
    reComment: ReComment[];
  };
};

function TalkComment({ comment }: CommentProps) {
  const { userName, userImg, commentContent, createDate, reComment } = comment;
  return <CommentContainer />;
}
export default function CommentList({ commentList }: CommentListProps) {
  // const commentList = [
  //     {
  //       userName: "리리리",
  //       userImg: "",
  //       commentContent: "",
  //       createDate: "22.01.05",
  //       reComment: [
  //        {
  //           userName: "리리리",
  //           userImg: "",
  //           commentContent: "",
  //           createDate: "22.01.05",
  //       }]
  //    }]

  return (
    <CommentListContainer>
      {commentList.map((_) => (
        <TalkComment comment={_} />
      ))}
    </CommentListContainer>
  );
}
