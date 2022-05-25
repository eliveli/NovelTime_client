import Icon from "assets/Icon";
import theme, { styled } from "assets/styles/theme";

const PoisitionControllerContnr = styled.div`
  position: absolute;
  bottom: -33px;
  left: 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
`;
const PositionOption = styled(Icon.IconBox)`
  color: ${theme.color.mainLight};
  min-width: 23px;
  max-width: 23px;
  min-height: 23px;
  max-height: 23px;
`;

export default function SelectImagePosition({
  setProfileImgPosition,
}: {
  setProfileImgPosition: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <PoisitionControllerContnr>
      <PositionOption />
      <PositionOption>
        <Icon.PositionTop onClick={() => setProfileImgPosition("top")} />
      </PositionOption>
      <PositionOption />
      <PositionOption>
        <Icon.PositionLeft onClick={() => setProfileImgPosition("left")} />
      </PositionOption>
      <PositionOption>
        <Icon.PositionCenter onClick={() => setProfileImgPosition("center")} />
      </PositionOption>
      <PositionOption>
        <Icon.PositionRight onClick={() => setProfileImgPosition("right")} />
      </PositionOption>
      <PositionOption />
      <PositionOption>
        <Icon.PositionBottom onClick={() => setProfileImgPosition("bottom")} />
      </PositionOption>
      <PositionOption />
    </PoisitionControllerContnr>
  );
}
