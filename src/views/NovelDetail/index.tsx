import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import { useGetNovelInDetailQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { RowSlide } from "../../components/NovelListFrame";
import { WritingListFrame, WritingInNovelDetail } from "../../components/Writing";
import { NovelRow } from "../../components/Novel";
import NovelDetailInfo from "./NovelDetail.components";
import { NoContent } from "./NovelDetail.styles";

export default function NovelDetail() {
  const { novelId } = useParams();

  const novelInDetail = useGetNovelInDetailQuery(novelId as string);

  const [isTalk, handleTalk] = useState(true);

  if (!novelId || novelInDetail.isError) return <div>***에러 페이지 띄우기</div>;

  return (
    <>
      {novelInDetail.isFetching && <Spinner styles="fixed" />}
      {novelInDetail.data && (
        <MainBG>
          <NovelDetailInfo novel={novelInDetail.data.novel} />

          <WritingListFrame
            fontSize={20}
            categoryText="Let's talk and play!"
            isTalk={isTalk}
            handleTalk={handleTalk}
            novelId={novelId}
            novelTitle={novelInDetail.data.novel.novelTitle}
            writing
            isShowAllMark
          >
            {isTalk &&
              (novelInDetail.data.talks.length ? (
                novelInDetail.data.talks.map((talk) => (
                  <WritingInNovelDetail key={talk.writingId} writing={talk} />
                ))
              ) : (
                <NoContent>작성된 게시글이 없어요</NoContent>
              ))}

            {!isTalk &&
              (novelInDetail.data.recommends.length ? (
                novelInDetail.data.recommends.map((recommend) => (
                  <WritingInNovelDetail key={recommend.writingId} writing={recommend} />
                ))
              ) : (
                <NoContent>작성된 게시글이 없어요</NoContent>
              ))}
          </WritingListFrame>

          <RowSlide
            novelId={novelId}
            categoryId="novelPublishedByTheAuthor"
            categoryText="작가의 다른 작품"
            novelNO={novelInDetail.data.novelsPublishedByTheAuthor.length}
          >
            {novelInDetail.data.novelsPublishedByTheAuthor.length > 1 &&
              novelInDetail.data.novelsPublishedByTheAuthor.map((novel) => {
                if (novel.novelId !== novelInDetail.data.novel.novelId) {
                  return <NovelRow key={novel.novelId} novel={novel} isFromSameAuthor />;
                }
              })}
          </RowSlide>

          {novelInDetail.data.novelsPublishedByTheAuthor.length === 1 && (
            <NoContent isForOtherNovels>작가의 다른 작품이 없어요</NoContent>
          )}
        </MainBG>
      )}
    </>
  );
}
