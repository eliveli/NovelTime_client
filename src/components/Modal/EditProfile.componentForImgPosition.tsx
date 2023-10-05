import Icon from "assets/Icon";
import theme, { styled } from "assets/styles/theme";
import { setTemporaryUserBG } from "store/clientSlices/userProfileSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const PositionControllerContnr = styled.div<{ isBG: boolean }>`
  position: absolute;
  ${({ isBG }) =>
    isBG
      ? `bottom: 37px;
    right: 35px;`
      : ` bottom: -33px;
  left: 0; `};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const PositionOption = styled(Icon.IconBox)<{ isBG: boolean }>`
  color: ${({ isBG }) => (isBG ? theme.color.main : theme.color.mainLight)};
  min-width: 23px;
  max-width: 23px;
  min-height: 23px;
  max-height: 23px;
`;

export default function SelectImagePosition({
  // for changing userImg position
  setProfileImgPosition,
}: {
  setProfileImgPosition?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();

  // for changing userBG position
  const tempUserBG = useAppSelector((state) => state.userProfile.temporaryUserBG);

  return (
    <PositionControllerContnr isBG={!setProfileImgPosition}>
      <PositionOption isBG={!setProfileImgPosition} />
      <PositionOption isBG={!setProfileImgPosition}>
        <Icon.PositionTop
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("top");
              return;
            }
            dispatch(setTemporaryUserBG({ ...tempUserBG, position: "top" }));
          }}
        />
      </PositionOption>
      <PositionOption isBG={!setProfileImgPosition} />
      <PositionOption isBG={!setProfileImgPosition}>
        <Icon.PositionLeft
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("left");
              return;
            }
            dispatch(setTemporaryUserBG({ ...tempUserBG, position: "left" }));
          }}
        />
      </PositionOption>
      <PositionOption isBG={!setProfileImgPosition}>
        <Icon.PositionCenter
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("center");
              return;
            }
            dispatch(setTemporaryUserBG({ ...tempUserBG, position: "center" }));
          }}
        />
      </PositionOption>
      <PositionOption isBG={!setProfileImgPosition}>
        <Icon.PositionRight
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("right");
              return;
            }
            dispatch(setTemporaryUserBG({ ...tempUserBG, position: "right" }));
          }}
        />
      </PositionOption>
      <PositionOption isBG={!setProfileImgPosition} />
      <PositionOption isBG={!setProfileImgPosition}>
        <Icon.PositionBottom
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("bottom");
              return;
            }
            dispatch(setTemporaryUserBG({ ...tempUserBG, position: "bottom" }));
          }}
        />
      </PositionOption>
      <PositionOption isBG={!setProfileImgPosition} />
    </PositionControllerContnr>
  );
}
