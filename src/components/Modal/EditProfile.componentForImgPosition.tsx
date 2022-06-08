import Icon from "assets/Icon";
import theme, { styled } from "assets/styles/theme";
import { setTempUserBG } from "store/clientSlices/userSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const PositionControllerContnr = styled.div`
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
  // for changing userImg position
  setProfileImgPosition,
}: {
  setProfileImgPosition?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();

  // for changing userBG position
  const tempUserBG = useAppSelector((state) => state.user.tempUserBG);

  return (
    <PositionControllerContnr>
      <PositionOption />
      <PositionOption>
        <Icon.PositionTop
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("top");
              return;
            }
            dispatch(setTempUserBG({ ...tempUserBG, position: "top" }));
          }}
        />
      </PositionOption>
      <PositionOption />
      <PositionOption>
        <Icon.PositionLeft
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("left");
              return;
            }
            dispatch(setTempUserBG({ ...tempUserBG, position: "left" }));
          }}
        />
      </PositionOption>
      <PositionOption>
        <Icon.PositionCenter
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("center");
              return;
            }
            dispatch(setTempUserBG({ ...tempUserBG, position: "center" }));
          }}
        />
      </PositionOption>
      <PositionOption>
        <Icon.PositionRight
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("right");
              return;
            }
            dispatch(setTempUserBG({ ...tempUserBG, position: "right" }));
          }}
        />
      </PositionOption>
      <PositionOption />
      <PositionOption>
        <Icon.PositionBottom
          onClick={() => {
            if (setProfileImgPosition) {
              setProfileImgPosition("bottom");
              return;
            }
            dispatch(setTempUserBG({ ...tempUserBG, position: "bottom" }));
          }}
        />
      </PositionOption>
      <PositionOption />
    </PositionControllerContnr>
  );
}
