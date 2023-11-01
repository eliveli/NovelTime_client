import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import { useGetNovelInDetailQuery, useGetWritingsOfNovelQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import ShowMoreContent from "assets/ShowMoreContent";
import { WritingWithoutGenre } from "store/serverAPIs/types";
import { useAppDispatch } from "store/hooks";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
import { RowSlide } from "../../components/NovelListFrame";
import { WritingListFrame, WritingInNovelDetail } from "../../components/Writing";
import { NovelRow } from "../../components/Novel";
import NovelDetailInfo from "./NovelDetail.components";
import { NoContent } from "./NovelDetail.styles";

export default function NovelDetail() {
  const { novelId } = useParams();

  const novelInDetail = useGetNovelInDetailQuery(novelId as string);

  //
  const [writingOption, handleWritingOption] = useState<{ type: "T" | "R"; pageNo: number }>({
    type: "T",
    pageNo: 1,
  });

  const selectWritingType = (writingType: "T" | "R") => {
    if (writingType === "T") {
      handleWritingOption({ type: "T", pageNo: 1 });
      return;
    }

    handleWritingOption({ type: "R", pageNo: 1 });
  };

  const writingsOfNovel = useGetWritingsOfNovelQuery({
    novelId: novelId as string,
    writingType: writingOption.type,
    pageNo: writingOption.pageNo,
  });

  const [writings, handleWritings] = useState<WritingWithoutGenre[]>([]);

  useEffect(() => {
    if (!writingsOfNovel.data) return;

    // replace writings
    if (writingOption.pageNo === 1) {
      handleWritings(writingsOfNovel.data.writings);
      return;
    }

    // add writings
    const writingsToSet = writingsOfNovel.data.writings;
    handleWritings((prev) => [...prev, ...writingsToSet]);
  }, [writingsOfNovel.data]);

  //
  const isOtherNovelsOfTheAuthor =
    novelInDetail.data && novelInDetail.data.novelsPublishedByTheAuthor.length > 1;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!novelId || novelInDetail.isError) {
    dispatch(openFirstModal("alert"));
    dispatch(handleAlert({ text: `소설을 불러올 수 없습니다.`, nextFunction: () => navigate(-1) }));
    return <></>;
  }

  return (
    <>
      {(novelInDetail.isFetching || writingsOfNovel.isFetching) && <Spinner styles="fixed" />}

      {novelInDetail.data && (
        <MainBG>
          <NovelDetailInfo
            novel={novelInDetail.data.novel}
            writingNoWithAllType={writingsOfNovel.data?.writingNoWithAllType}
          />

          <WritingListFrame
            novelId={novelId}
            categoryText="Let's talk about the novel" // font size is set with this in <CategoryMark>
            isTalk={writingOption.type === "T"}
            selectWritingType={selectWritingType}
            novelTitle={novelInDetail.data.novel.novelTitle}
          >
            {writings.length ? (
              writings.map((writing) => (
                <WritingInNovelDetail key={writing.writingId} writing={writing} />
              ))
            ) : (
              <NoContent>작성된 게시글이 없어요</NoContent>
            )}
          </WritingListFrame>

          {!!writingsOfNovel.data?.hasNext && (
            <ShowMoreContent
              _onClick={() => handleWritingOption((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }))}
            />
          )}

          <RowSlide
            categoryText="작가의 다른 작품"
            novelNo={novelInDetail.data.novelsPublishedByTheAuthor.length}
          >
            {isOtherNovelsOfTheAuthor &&
              novelInDetail.data.novelsPublishedByTheAuthor.map((novel) => {
                if (novel.novelId !== novelInDetail.data.novel.novelId) {
                  return <NovelRow key={novel.novelId} novel={novel} isFromSameAuthor />;
                }
              })}
          </RowSlide>
          {!isOtherNovelsOfTheAuthor && (
            <NoContent isForOtherNovels>작가의 다른 작품이 없어요</NoContent>
          )}
        </MainBG>
      )}
    </>
  );
}
