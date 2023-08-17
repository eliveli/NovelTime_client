import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { useToggleLikeMutation } from "store/serverAPIs/novelTime";
import { useAppSelector } from "store/hooks";

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
  /* margin-top: 20px; */

  border-top: 1px dotted rgba(0, 0, 0, 0.1);
  padding: 8px 20px 0;
  margin-top: 18px;
  ${theme.media.mobile(`
      padding: 8px 12px 0;
  `)}
`;
const IconBox = styled(Icon.IconBox)``;
const HeartIcon = styled(Icon.BigEmptyHeart)``;
const FillHeartIcon = styled(Icon.BigFillHeart)``;
const ShareIcon = styled(Icon.Share)``;
const LikeNumber = styled.span`
  /* margin-right: 10px; */
  margin-right: 20px;
  margin-left: 5px;
`;
export default function LikeAndShare({ isLike, likeNO, writingId, writingType, novelId }: Props) {
  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const [toggleLike, toggleLikeResult] = useToggleLikeMutation();

  const isLikeSet = toggleLikeResult.data?.isLike || isLike;
  const likeNoSet =
    toggleLikeResult.data?.likeNo !== undefined ? toggleLikeResult.data.likeNo : likeNO;

  const toggleLikeRequest = async () => {
    try {
      if (!loginUserId) {
        alert("좋아요를 누르려면 로그인을 해 주세요.");
        return;
      }

      if (toggleLikeResult.isLoading) return; // prevent click event as loading

      await toggleLike({
        contentType: "writing",
        contentId: writingId,
        forWriting: {
          writingType,
          novelId,
        },
      });
    } catch (error) {
      console.log("Failed to toggle LIKE:", error);
    }
  };

  return (
    <IconContainer>
      <IconBox
        onClick={async () => {
          await toggleLikeRequest();
        }}
      >
        {isLikeSet && <FillHeartIcon />}
        {!isLikeSet && <HeartIcon />}
      </IconBox>
      <LikeNumber>{likeNoSet}</LikeNumber>
      <IconBox size={23}>
        <ShareIcon />
      </IconBox>
    </IconContainer>
  );
}
// export default function LikeAndShare({ children, isLike, likeNO }: Props) {
//   return (
//     <Container>
//       <IconContainer>
//         <IconBox>
//           {isLike && <FillHeartIcon />}
//           {!isLike && <HeartIcon />}
//         </IconBox>
//         <LikeNumber>{likeNO}</LikeNumber>
//         <IconBox>
//           <ShareIcon />
//         </IconBox>
//       </IconContainer>
//       {children}
//     </Container>
//   );
// }
