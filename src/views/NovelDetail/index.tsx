import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import MainBG from "components/MainBG";
import { useGetNovelInDetailQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { useAppDispatch } from "../../store/hooks";
import { getNovelTitle } from "../../store/clientSlices/modalSlice";
import { RowSlide } from "../../components/NovelListFrame";
import { WritingListFrame, WritingTitle } from "../../components/Writing";
import { NovelRow } from "../../components/Novel";
import NovelDetailInfo from "./NovelDetail.components";

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
              novelInDetail.data.talks.map((talk) => (
                <WritingTitle key={talk.writingId} writing={talk} />
              ))}
            {!isTalk &&
              novelInDetail.data.recommends.map((recommend) => (
                <WritingTitle key={recommend.writingId} writing={recommend} />
              ))}
          </WritingListFrame>

          <RowSlide
            novelId={novelId}
            categoryId="novelPublishedByTheAuthor"
            categoryText="작가의 다른 작품"
            novelNO={novelInDetail.data.novelsPublishedByTheAuthor.length}
          >
            {novelInDetail.data.novelsPublishedByTheAuthor.map((novel) => {
              if (novel.novelId !== novelInDetail.data.novel.novelId) {
                return <NovelRow key={novel.novelId} novel={novel} isFromSameAuthor />;
              }
            })}
          </RowSlide>
        </MainBG>
      )}
    </>
  );
}
