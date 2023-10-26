import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
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
import {
  logoImg,
  handleAlert,
  handleConfirm,
  openFirstModal,
  setMetaTags,
} from "store/clientSlices/modalSlice";
import MetaTag from "utils/MetaTag";
import { DotLine, DotAnimation, ContentAnimation } from "./RecommendDetail.styles";

export default function NovelDetailRecommend() {
  const { recommendId } = useParams();

  const recommend = useGetRecommendDetailQuery(recommendId as string);

  const loginUserName = useAppSelector((state) => state.loginUser.user.userName);
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
        novelId: recommend.data.novel.novelId,
        novelTitle: recommend.data.novel.novelTitle,
      }),
    );
    navigate(EDIT_WRITING);
  };

  const isDesktop = useWhetherItIsDesktop();

  const [deleteWriting, deleteWritingResult] = useDeleteWritingMutation();

  async function handleDelete() {
    if (!recommend.data) return;

    await deleteWriting({
      writingId: recommend.data.recommend.recommendId,
      writingType: "R",
      novelId: recommend.data.novel.novelId,
    });

    if (deleteWritingResult.isError) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: `글을 삭제할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }));
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

  const confirmDelete = () => {
    if (deleteWritingResult.isLoading) return; // prevent click while loading for prev request

    dispatch(
      handleConfirm({
        question: "글을 삭제하시겠습니까?",
        textForYes: "삭제",
        textForNo: "취소",
        functionForYes: async () => handleDelete(),
      }),
    );

    dispatch(openFirstModal("confirm"));
  };

  if (!recommendId || recommend.isError) {
    dispatch(openFirstModal("alert"));
    dispatch(handleAlert({ text: `글을 불러올 수 없습니다.` }));
    navigate(-1);
  }

  // Set meta tags //
  const metaTags = () => ({
    title: recommend.data?.recommend.recommendTitle || "",
    description: recommend.data?.recommend.recommendDesc || "",
    image:
      recommend.data?.recommend.recommendImg || recommend.data?.recommend.userImg.src || logoImg,
    url: window.location.href,
  });

  useEffect(() => {
    if (!recommend.data) return;

    dispatch(setMetaTags(metaTags()));
  }, [recommend.data]);
  return (
    <>
      {recommend.data && <MetaTag tags={metaTags()} />}

      {recommend.isFetching && <Spinner styles="fixed" />}

      {recommend.data && (
        <MainBG isDetail="R">
          <NovelInWriting isRecommend novel={recommend.data.novel} />
          <DotAnimation>
            <DotLine />
          </DotAnimation>
          <ContentAnimation>
            <WritingDetailContainer>
              <EditAndDeleteContainer>
                {isWriter && (
                  <EditAndDelete clickToEdit={handleEdit} clickToDelete={confirmDelete} />
                )}
              </EditAndDeleteContainer>

              <BoardMark>Let's Recommend Novel!</BoardMark>
              <RecommendDetail detailRecommend={recommend.data.recommend} />
              <LikeAndShare
                isLike={recommend.data.recommend.isLike}
                likeNO={recommend.data.recommend.likeNO}
                writingId={recommend.data.recommend.recommendId}
                writingType="R"
                novelId={recommend.data.novel.novelId}
              />
            </WritingDetailContainer>
          </ContentAnimation>
        </MainBG>
      )}
    </>
  );
}
