import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { useToggleLikeMutation } from "store/serverAPIs/novelTime";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";

type Props = React.PropsWithChildren<{
  isLike: boolean;
  likeNO: number;
  writingId: string;
  writingType: "T" | "R";
  novelId: string;
}>;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-end;

  border-top: 1px dotted rgba(0, 0, 0, 0.1);
  margin-top: 18px;

  ${theme.media.mobile(`
    padding: 8px 12px 0;
  `)}
  ${theme.media.tablet(`
    padding: 8px 20px 0;
  `)}
`;
const LikeNumber = styled.span`
  margin-right: 20px;
  margin-left: 5px;
`;

export default function LikeAndShare({ isLike, likeNO, writingId, writingType, novelId }: Props) {
  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const [toggleLike, toggleLikeResult] = useToggleLikeMutation();

  const isLikeSet = toggleLikeResult.data?.isLike || isLike;
  const likeNoSet =
    toggleLikeResult.data?.likeNo !== undefined ? toggleLikeResult.data.likeNo : likeNO;

  const dispatch = useAppDispatch();
  const toggleLikeRequest = () => {
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "좋아요를 누르려면 로그인을 해 주세요." }));
      return;
    }

    if (toggleLikeResult.isLoading) return; // prevent click event as loading

    toggleLike({
      contentType: "writing",
      contentId: writingId,
      forWriting: {
        writingType,
        novelId,
      },
    }).catch(() => {
      dispatch(openFirstModal("alert"));
      dispatch(
        handleAlert({
          text: `좋아요 기능이 정상적으로 작동하지 않습니다.\n새로고침 후 시도해주세요`,
        }),
      );
    });
  };

  return (
    <IconContainer>
      <Icon.IconBox color={isLikeSet ? theme.color.main : ""} onClick={toggleLikeRequest}>
        {isLikeSet && <Icon.BigFillHeart />}
        {!isLikeSet && <Icon.BigEmptyHeart />}
      </Icon.IconBox>

      <LikeNumber>{likeNoSet}</LikeNumber>

      <Icon.IconBox size={23}>
        <Icon.Share />
      </Icon.IconBox>
    </IconContainer>
  );
}
