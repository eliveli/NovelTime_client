import { useNavigate } from "react-router-dom";

import {
  NovelImg,
  NovelTitle,
  NovelLink,
  NovelInfoBox,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
} from "./NovelColumn.styles";

type MyComponentProps = React.PropsWithChildren<{
  novel: {
    novelId: string;
    novelImg: string;
    novelTitle: string;
    novelAuthor: string;
    novelGenre: string;
    novelIsEnd?: boolean;
  };

  isBorder?: true;
}>;

export default function NovelColumn({ novel, isBorder }: MyComponentProps) {
  const { novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelIsEnd } = novel;

  const navigate = useNavigate();

  return (
    <NovelLink
      isBorder={isBorder}
      onClick={() => {
        navigate(`/novel-detail/${novelId}`);
      }}
    >
      <NovelImg novelImg={novelImg} />
      <NovelInfoBox>
        <NovelTitle>{novelTitle}</NovelTitle>
        <NovelSubInfoBox>
          <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
          {novelIsEnd ? (
            <NovelInfo>{`${novelGenre} | 완결`}</NovelInfo>
          ) : (
            <NovelInfo>{novelGenre}</NovelInfo>
          )}
        </NovelSubInfoBox>
      </NovelInfoBox>
    </NovelLink>
  );
}
