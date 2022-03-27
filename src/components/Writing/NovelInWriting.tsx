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
  recommend?: true;
}

export default function NovelInfo({ recommend, novel }: NovelProps) {
  const [isNovelDetail, handleNovelDetail] = useState(false);
  return (
    <NovelSpace recommend={recommend}>
      <NovelContainer recommend={recommend} isNovelDetail={isNovelDetail}>
        <NovelTitleContainer onClick={() => handleNovelDetail(!isNovelDetail)}>
          <NovelTitle>{novel.novelTitle}</NovelTitle>
          <DownIconBox>
            {isNovelDetail && <UpIcon />}
            {!isNovelDetail && <DownIcon />}
          </DownIconBox>
        </NovelTitleContainer>
        {isNovelDetail && (
          <NovelDetailContainer>
            <NovelColumnDetail novel={novel} />
          </NovelDetailContainer>
        )}
      </NovelContainer>
    </NovelSpace>
  );
}
