import Icon from "./Icon";
import { styled } from "./styles/theme";

const NextContentBtn = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  padding: 10px;
  display: flex;

  justify-content: center;
  align-items: center;

  box-shadow: 0 0 2px rgb(0 0 0 / 20%);
  color: rgba(0, 0, 0, 0.66);
  font-weight: 300;
`;

export default function ShowMoreContent({ _onClick }: { _onClick: () => unknown }) {
  return (
    <NextContentBtn onClick={() => _onClick()}>
      <Icon.IconBox noPointer>
        <Icon.SmallDown />
      </Icon.IconBox>
      더보기
    </NextContentBtn>
  );
}
