import {
  NovelImg,
  NovelTitle,
  NovelContainer,
  NovelInfoBox,
  NovelAuthor,
  NovelDesc,
  Note,
} from "./NovelColumnSkeleton.styles";

export default function NovelColumnSkeleton({ text }: { text?: string }) {
  return (
    <NovelContainer text={text}>
      <NovelImg />
      <NovelInfoBox>
        <NovelTitle />
        <NovelAuthor />
        <NovelDesc />
      </NovelInfoBox>

      {text && <Note>{text}</Note>}
    </NovelContainer>
  );
}
