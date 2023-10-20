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
  isRecommend?: true;
}

export default function NovelInfo({ isRecommend, novel }: NovelProps) {
  const [isNovelDetail, handleNovelDetail] = useState(!!isRecommend);

  return (
    <NovelSpace isRecommend={isRecommend}>
      <NovelContainer isRecommend={isRecommend}>
        <NovelTitleContainer onClick={() => handleNovelDetail(!isNovelDetail)}>
          <NovelTitle>{novel.novelTitle}</NovelTitle>
          <DownIconBox>
            {isNovelDetail && <UpIcon />}
            {!isNovelDetail && <DownIcon />}
          </DownIconBox>
        </NovelTitleContainer>

        {isNovelDetail && (
          <NovelDetailContainer>
            <NovelColumnDetail novel={novel} isRecommend={isRecommend} />
          </NovelDetailContainer>
        )}
      </NovelContainer>
    </NovelSpace>
  );
}
