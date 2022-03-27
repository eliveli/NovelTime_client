import { useState } from "react";
import {
  NovelContainer,
  NovelDetailContainer,
  NovelTitleContainer,
  NovelTitle,
  DownIconBox,
  DownIcon,
  UpIcon,
  NovelSpace,
} from "./NovelInWriting.styles";
import { NovelColumnDetail } from "../Novel";

interface NovelProps {
  novel: {
    novelId: string;
    novelImg: string;
    novelTitle: string;
    novelAuthor: string;
    novelGenre: string;
    novelDesc: string;
  };
  recommendDetail?: { recomDtlImgWidth: string; recomDtlTextHeight: string };
}

export default function NovelInfo({ recommendDetail, novel }: NovelProps) {
  const isRecommend = !!recommendDetail;
  const [isNovelDetail, handleNovelDetail] = useState(isRecommend);
  return (
    <NovelSpace recommend={isRecommend}>
      <NovelContainer recommend={isRecommend}>
        <NovelTitleContainer onClick={() => handleNovelDetail(!isNovelDetail)}>
          <NovelTitle>{novel.novelTitle}</NovelTitle>
          <DownIconBox>
            {isNovelDetail && <UpIcon />}
            {!isNovelDetail && <DownIcon />}
          </DownIconBox>
        </NovelTitleContainer>
        {isNovelDetail && (
          <NovelDetailContainer>
            <NovelColumnDetail novel={novel} recommendDetail={recommendDetail} />
          </NovelDetailContainer>
        )}
      </NovelContainer>
    </NovelSpace>
  );
}
