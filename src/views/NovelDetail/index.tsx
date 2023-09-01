import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import { useGetNovelInDetailQuery, useGetWritingsOfNovelQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import ShowMoreContent from "assets/ShowMoreContent";
import { WritingWithoutGenre } from "store/serverAPIs/types";
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

  if (!novelId || novelInDetail.isError) return <div>***에러 페이지 띄우기</div>;

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
            fontSize={20}
            categoryText="Let's talk about the novel"
            isTalk={writingOption.type === "T"}
            selectWritingType={selectWritingType}
            novelTitle={novelInDetail.data.novel.novelTitle}
            writing
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
            categoryId="novelPublishedByTheAuthor"
            categoryText="작가의 다른 작품"
            novelNO={novelInDetail.data.novelsPublishedByTheAuthor.length}
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
