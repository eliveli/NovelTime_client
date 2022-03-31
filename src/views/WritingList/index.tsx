import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionBG from "components/SectionBG";
import { SortOnly } from "components/Filter";
import { useAppDispatch } from "../../store/hooks";
import { getNovelTitle } from "../../store/clientSlices/modalSlice";

import { WritingListFrame, WritingTitle } from "../../components/Writing";

// 컴포넌트에서 api 요청 : novelId 이용 (see under the two lines)

export default function WritingList() {
  const { novelId } = useParams(); // for server request

  const novelTitle = "헌터와 매드 사이언티스트"; // get title. required when page refresh

  const infoTalk = {
    talkId: "20220225082010201", // 필요성: 클릭 시 상세페이지 정보 요청
    userId: "20220225082010201", // 필요성: 클릭 시 유저페이지 정보 요청

    userName: "Nana",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
    createDate: "22.01.01",
    talkTitle: "자유롭게 말해요",
    likeNO: 5,
    commentNO: 7,

    // 사진 가져오기
    talkPhoto:
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260",
  };
  const arrayInfoTalk = [infoTalk, infoTalk, infoTalk, infoTalk, infoTalk]; // 5개 씩?

  const infoRecommend = {
    recommendId: "20220225082010201", // 필요성: 클릭 시 상세페이지 정보 요청
    userId: "20220225082010201", // 필요성: 클릭 시 유저페이지 정보 요청

    userName: "Nana",
    userImg: "", // 없을 때 컴포넌트에서 디폴트 이미지 적용
    createDate: "22.01.01",
    recommendTitle: "추천추천추천",
    likeNO: 5,

    // 사진 가져오기
    recommendPhoto: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfoRecommend = [
    infoRecommend,
    infoRecommend,
    infoRecommend,
    infoRecommend,
    infoRecommend,
  ];

  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getNovelTitle(novelTitle));
  });

  const [isTalk, handleTalk] = useState(true);

  return (
    <SectionBG>
      <p>
        여기는 소설 공간!
        {novelTitle}
      </p>

      {/* server request */}
      <SortOnly height={35} marginBottom={-52} borderOpacity={0.1} />

      <WritingListFrame
        fontSize={20}
        categoryText={`Let's talk and play!`}
        isTalk={isTalk}
        handleTalk={handleTalk}
        novelId={novelId as string}
        novelTitle={novelTitle}
        writing
        isShowAll
      >
        {isTalk && arrayInfoTalk.map((talk) => <WritingTitle key={talk.talkId} writing={talk} />)}
        {!isTalk &&
          arrayInfoRecommend.map((recommend) => (
            <WritingTitle key={recommend.recommendId} writing={recommend} />
          ))}
      </WritingListFrame>
    </SectionBG>
  );
}
