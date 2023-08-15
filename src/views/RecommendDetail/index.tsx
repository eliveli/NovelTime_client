import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import {
  WritingDetailContainer,
  RecommendDetail,
  NovelInWriting,
  BoardMark,
  LikeAndShare,
  EditAndDelete,
} from "components/Writing";
import { useDeleteWritingMutation, useGetRecommendDetailQuery } from "store/serverAPIs/novelTime";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { handleWritingToEdit } from "store/clientSlices/writingSlice";
import { EDIT_WRITING, RECOMMEND_LIST } from "utils/pathname";
import { useWhetherItIsDesktop } from "utils";
import { setSearchList } from "store/clientSlices/filterSlice";
import Spinner from "assets/Spinner";
import { EditAndDeleteContainer } from "components/Writing/WritingDetail.styles";
import { DotLine, DotAnimation, ContentAnimation } from "./RecommendDetail.styles";

// server request by recommendId
export default function NovelDetailRecommend() {
  const { recommendId } = useParams();

  const recommend = useGetRecommendDetailQuery(recommendId as string);

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
  const isWriter = loginUserName && loginUserName === recommend.data?.recommend.userName;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!recommend.data) return;

    dispatch(
      handleWritingToEdit({
        writingId: recommend.data.recommend.recommendId,
        writingTitle: recommend.data.recommend.recommendTitle,
        writingDesc: recommend.data.recommend.recommendDesc,
        writingType: "Recommend",
        novelTitle: recommend.data.novel.novelTitle,
      }),
    );
    navigate(EDIT_WRITING);
  };

  const isDesktop = useWhetherItIsDesktop();

  const [deleteWriting, deleteWritingResult] = useDeleteWritingMutation();

  async function handleDelete() {
    if (!recommend.data) return;

    // * ask whether you really want to delete the comment
    // * change this after making the modal

    if (deleteWritingResult.isLoading) return; // prevent click while loading for prev request

    await deleteWriting({
      writingId: recommend.data.recommend.recommendId,
      writingType: "R",
    });

    if (deleteWritingResult.isError) {
      alert("글을 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요");
    }

    // go to the recommend list page
    if (isDesktop) {
      navigate(
        `${RECOMMEND_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`,
        {
          replace: true,
        },
      );
    } else {
      dispatch(
        setSearchList({
          listType: "recommend",
          list: "reset",
        }),
      );

      navigate(RECOMMEND_LIST, { replace: true });
    }
  }

  const recommendDetail = {
    recomDtlImgWidth: "min-width: 92px;",
    recomDtlTextHeight: "height: 64px;",
  };

  if (!recommendId || recommend.isError) return <div>***에러 페이지 띄우기</div>;

  return (
    <>
      {recommend.isLoading && <Spinner styles="fixed" />}
      {recommend.data && (
        <MainBG isWritingDetail>
          <NovelInWriting recommendDetail={recommendDetail} novel={recommend.data.novel} />
          <DotAnimation>
            <DotLine />
          </DotAnimation>
          <ContentAnimation>
            <WritingDetailContainer>
              <EditAndDeleteContainer>
                {isWriter && (
                  <EditAndDelete
                    clickToEdit={handleEdit}
                    clickToDelete={async () => handleDelete()}
                  />
                )}
              </EditAndDeleteContainer>

              <BoardMark>Let's Recommend Novel!</BoardMark>
              <RecommendDetail detailRecommend={recommend.data.recommend} />
              <LikeAndShare
                isLike={recommend.data.recommend.isLike}
                likeNO={recommend.data.recommend.likeNO}
                writingId={recommend.data.recommend.recommendId}
                writingType="R"
              />
            </WritingDetailContainer>
          </ContentAnimation>
        </MainBG>
      )}
    </>
  );
}
